import { test } from "node:test";
import assert from "node:assert/strict";
import {
  confidence,
  frames,
  hitRadius,
  hoverable,
  keyTimes,
  keypointNames,
  limbPath,
  skeleton,
  viewBox,
} from "../lib/pose.ts";

const LIMBS = [[5, 7], [7, 9], [6, 8], [8, 10], [11, 13], [13, 15], [12, 14], [14, 16], [5, 11], [6, 12]];

const COCO_17 = [
  "nose", "left_eye", "right_eye", "left_ear", "right_ear",
  "left_shoulder", "right_shoulder", "left_elbow", "right_elbow",
  "left_wrist", "right_wrist", "left_hip", "right_hip",
  "left_knee", "right_knee", "left_ankle", "right_ankle",
];

test("keypoints are COCO-17, in COCO order", () => {
  assert.deepEqual([...keypointNames], COCO_17);
});

test("the skeleton is COCO's 19 limbs between valid keypoints", () => {
  assert.equal(skeleton.length, 19);
  for (const [a, b] of skeleton) {
    assert.ok(a >= 0 && a < 17 && b >= 0 && b < 17 && a !== b, `${a}-${b}`);
  }
});

test("every frame places all 17 keypoints inside the drawing", () => {
  for (const [i, frame] of frames.entries()) {
    assert.equal(frame.length, 17, `frame ${i}`);
    for (const [x, y] of frame) {
      assert.ok(x >= 0 && x <= viewBox.width && y >= 0 && y <= viewBox.height, `frame ${i}: ${x},${y}`);
    }
  }
});

test("limbs keep their length through the delivery (within 20% of their mean)", () => {
  for (const [a, b] of LIMBS) {
    const lengths = frames.map((f) => Math.hypot(f[a][0] - f[b][0], f[a][1] - f[b][1]));
    const mean = lengths.reduce((sum, l) => sum + l, 0) / lengths.length;
    for (const l of lengths) {
      assert.ok(Math.abs(l - mean) / mean <= 0.2, `${keypointNames[a]}–${keypointNames[b]}: ${l.toFixed(1)} vs ${mean.toFixed(1)}`);
    }
  }
});

test("the delivery ends at release: the bowling wrist is the highest point", () => {
  const release = frames[frames.length - 1];
  const wristY = release[10][1]; // right_wrist
  for (const [i, [, y]] of release.entries()) {
    if (i !== 10) assert.ok(wristY < y, keypointNames[i]);
  }
});

test("key times run from 0 to 1, one per frame, strictly increasing", () => {
  assert.equal(keyTimes.length, frames.length);
  assert.equal(keyTimes[0], 0);
  assert.equal(keyTimes[keyTimes.length - 1], 1);
  for (let i = 1; i < keyTimes.length; i++) assert.ok(keyTimes[i] > keyTimes[i - 1]);
});

test("every frame's limb path has the same shape, so the browser can morph between them", () => {
  const shapes = frames.map((f) => limbPath(f).replace(/-?[\d.]+/g, "#"));
  for (const shape of shapes) assert.equal(shape, shapes[0]);
  assert.equal(shapes[0].match(/M/g)?.length, 19);
});

// SMIL moves each point in a straight line between frames. If a frame step turns a limb
// too far, the limb visibly shrinks halfway through that step.
test("limbs stay at least 90% of their length halfway between frames", () => {
  for (let f = 0; f + 1 < frames.length; f++) {
    const [p, q] = [frames[f], frames[f + 1]];
    for (const [a, b] of LIMBS) {
      const length = (pose: typeof p) => Math.hypot(pose[a][0] - pose[b][0], pose[a][1] - pose[b][1]);
      const midA = [(p[a][0] + q[a][0]) / 2, (p[a][1] + q[a][1]) / 2];
      const midB = [(p[b][0] + q[b][0]) / 2, (p[b][1] + q[b][1]) / 2];
      const ratio = Math.hypot(midA[0] - midB[0], midA[1] - midB[1]) / ((length(p) + length(q)) / 2);
      assert.ok(ratio >= 0.9, `frames ${f}→${f + 1}, ${keypointNames[a]}–${keypointNames[b]}: ${(ratio * 100).toFixed(0)}%`);
    }
  }
});

test("in the held release pose, every hoverable joint has its own hover target", () => {
  const release = frames[frames.length - 1];
  for (const a of hoverable) {
    for (const b of hoverable) {
      if (a >= b) continue;
      const d = Math.hypot(release[a][0] - release[b][0], release[a][1] - release[b][1]);
      assert.ok(d >= 2 * hitRadius, `${keypointNames[a]}–${keypointNames[b]}: ${d.toFixed(1)}`);
    }
  }
});

test("every keypoint has a confidence between 0 and 1", () => {
  assert.equal(confidence.length, 17);
  for (const c of confidence) assert.ok(c > 0 && c <= 1);
});
