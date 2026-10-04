/** COCO-17 keypoint names in COCO order, the format ViTPose++ outputs. */
export const keypointNames = [
  "nose",
  "left_eye",
  "right_eye",
  "left_ear",
  "right_ear",
  "left_shoulder",
  "right_shoulder",
  "left_elbow",
  "right_elbow",
  "left_wrist",
  "right_wrist",
  "left_hip",
  "right_hip",
  "left_knee",
  "right_knee",
  "left_ankle",
  "right_ankle",
] as const;

/** COCO's 19 limbs, as pairs of keypoint indices. */
export const skeleton: ReadonlyArray<readonly [number, number]> = [
  [15, 13], [13, 11], [16, 14], [14, 12], [11, 12], [5, 11], [6, 12],
  [5, 6], [5, 7], [6, 8], [7, 9], [8, 10],
  [1, 2], [0, 1], [0, 2], [1, 3], [2, 4], [3, 5], [4, 6],
];

/** Drawing space; the figure stands on y = 150, and the hover caption sits below it. */
export const viewBox = { width: 120, height: 172 } as const;

/** Joints with their own hover target. The eyes and ears sit too close to the nose to split. */
export const hoverable: readonly number[] = [0, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

/** Hover target radius, in drawing units. */
export const hitRadius = 2.8;

type Point = readonly [x: number, y: number];
type Pose = readonly Point[];

// Key poses of a right-arm bowling delivery, seen side on with a slight three-quarter
// turn so left and right joints don't sit on top of each other. One point per keypoint.
const runUp: Pose = [
  [59, 20], [58, 17], [61, 18], [53, 19], [56, 20],
  [47, 39], [54, 36], [58, 53], [44, 51], [66, 68], [39, 67],
  [46, 79], [52, 77], [58, 106], [46, 107], [56, 141], [37, 137],
];

const gather: Pose = [
  [68, 21], [67, 18], [70, 19], [62, 20], [65, 21],
  [57, 40], [64, 37], [66, 25], [56, 52], [73, 10], [48, 66],
  [55, 80], [61, 78], [84, 86], [59, 109], [82, 120], [55, 140],
];

const landing: Pose = [
  [77, 23], [76, 20], [79, 21], [71, 22], [74, 23],
  [66, 42], [73, 39], [82, 47], [63, 25], [98, 54], [56, 11],
  [64, 81], [70, 79], [80, 107], [63, 109], [90, 141], [51, 137],
];

// The bowling arm is high and just in front of the head, the front arm pulled down.
const release: Pose = [
  [80, 27], [79, 24], [82, 25], [74, 26], [77, 27],
  [71, 44], [78, 41], [69, 61], [88, 25], [62, 77], [93, 8],
  [69, 83], [75, 81], [84, 110], [66, 110], [96, 143], [50, 134],
];

const keyPoses: readonly Pose[] = [runUp, gather, landing, release];
const keyPoseTimes = [0, 0.4, 0.7, 1];
const stepsPerSegment = 4;

// Each keypoint hangs off a parent (the left hip is the root). In-between poses turn
// every limb about its joint instead of sliding its ends in straight lines, which would
// shrink an arm in the middle of its swing.
const parent: ReadonlyArray<number | null> = [6, 0, 0, 0, 0, 11, 5, 5, 6, 7, 8, null, 11, 11, 12, 13, 14];
const solveOrder = [11, 12, 5, 6, 7, 9, 8, 10, 13, 15, 14, 16, 0, 1, 2, 3, 4];

const round = (v: number) => Math.round(v * 10) / 10;

function between(from: Pose, to: Pose, u: number): Pose {
  const out = from.map(([x, y]): [number, number] => [x, y]);
  for (const i of solveOrder) {
    const p = parent[i];
    if (p === null) {
      out[i] = [from[i][0] + (to[i][0] - from[i][0]) * u, from[i][1] + (to[i][1] - from[i][1]) * u];
      continue;
    }
    const [fx, fy] = [from[i][0] - from[p][0], from[i][1] - from[p][1]];
    const [tx, ty] = [to[i][0] - to[p][0], to[i][1] - to[p][1]];
    const a0 = Math.atan2(fy, fx);
    // Shortest way round, in (-π, π].
    const turn = ((Math.atan2(ty, tx) - a0 + 3 * Math.PI) % (2 * Math.PI)) - Math.PI;
    const angle = a0 + turn * u;
    const length = Math.hypot(fx, fy) + (Math.hypot(tx, ty) - Math.hypot(fx, fy)) * u;
    out[i] = [out[p][0] + length * Math.cos(angle), out[p][1] + length * Math.sin(angle)];
  }
  return out.map(([x, y]) => [round(x), round(y)] as const);
}

const generated: { pose: Pose; time: number }[] = [];
for (let k = 0; k + 1 < keyPoses.length; k++) {
  const last = k + 2 === keyPoses.length;
  for (let j = 0; j < stepsPerSegment; j++) {
    const s = j / stepsPerSegment;
    // The final swing eases out into the release pose; earlier segments keep moving.
    const u = last ? Math.sin((s * Math.PI) / 2) : s;
    const time = keyPoseTimes[k] + (keyPoseTimes[k + 1] - keyPoseTimes[k]) * s;
    generated.push({ pose: between(keyPoses[k], keyPoses[k + 1], u), time });
  }
}
generated.push({ pose: release, time: 1 });

/** Every frame of the delivery, ending on the release pose that the animation holds. */
export const frames: readonly Pose[] = generated.map((g) => g.pose);

/** When each frame is reached, as a fraction of the animation's duration. */
export const keyTimes: readonly number[] = generated.map((g) => Math.round(g.time * 1000) / 1000);

/** Illustrative per-keypoint confidences for the hover caption, like a pose model's output. */
export const confidence: readonly number[] = [
  0.99, 0.98, 0.98, 0.91, 0.94, 0.98, 0.99, 0.96, 0.97,
  0.93, 0.97, 0.97, 0.98, 0.95, 0.96, 0.92, 0.9,
];

/**
 * Every limb of a pose as one SVG path ("M x y L x y" per limb). The command sequence is
 * the same for every pose, which is what lets SMIL morph one frame into the next.
 */
export function limbPath(pose: Pose): string {
  return skeleton
    .map(([a, b]) => `M${pose[a][0]} ${pose[a][1]}L${pose[b][0]} ${pose[b][1]}`)
    .join("");
}
