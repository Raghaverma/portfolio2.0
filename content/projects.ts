export type LinkItem = { label: string; href: string };

/** Rendered as "figure text", with the figure in bold ink. */
export type Highlight = { figure?: string; text: string };

export type Table = { caption: string; columns: string[]; rows: string[][] };

export type FeaturedProject = {
  /** Anchor id on the home page. */
  slug: string;
  name: string;
  tag: string;
  /** Shows the amber "live" dot before the tag. */
  live?: boolean;
  summary: string;
  highlights: [Highlight, Highlight, Highlight];
  stack: string[];
  links: LinkItem[];
  details: { bullets: string[]; table?: Table };
};

export type OtherProject = {
  name: string;
  summary: string;
  links: LinkItem[];
  /** Shown instead of links, e.g. "Private". */
  note?: string;
};

export const featured: FeaturedProject[] = [
  {
    slug: "autoclip",
    name: "AutoClip",
    tag: "Khel.AI · In production",
    live: true,
    summary:
      "Turns raw cricket video into one clip per delivery or shot, with ball speed and biomechanics metrics attached. Deployed on NVIDIA T4 and L4 GPU servers.",
    highlights: [
      {
        text: "Bowler and batter modes share one ViTPose++ pose backbone, migrated from YOLO11-pose.",
      },
      {
        text: "Measures ball speed, run-up speed, stride length and elbow and knee angles for bowlers, and bat speed and weight transfer for batters.",
      },
      {
        text: "Sends doubtful ball tracks to a reviewer instead of reporting a confident, wrong speed.",
      },
    ],
    stack: [
      "Python",
      "PyTorch",
      "ViTPose++",
      "YOLO",
      "ByteTrack",
      "OpenCV",
      "FFmpeg",
      "TensorRT",
      "Flask",
    ],
    links: [],
    details: {
      bullets: [
        "For bowlers, YOLO finds people, ByteTrack keeps their IDs and a scoring tracker locks onto the bowler; ViTPose++ then runs on batched, upscaled crops. For batters, the person whose wrist is nearest the detected bat is the batter, with a size-and-position fallback when the bat isn't found.",
        "A state machine over the pose sequence marks run-up, release and follow-through (or the bat swing). Each trigger becomes one clip, cut with FFmpeg and re-encoded to H.264/AAC so any browser can play it.",
        "Ball tracking links detections into competing tracks and keeps the longest, smoothest one. A track that wanders or barely moves goes to a reviewer, not into a speed.",
        "Reviewers work in a Flask app with Google sign-in, and a manual ball mark always overrides the automatic number. Bowler clips can also get a Gemini-written biomechanics review.",
        "Jobs stream in from Khel.AI's backend and run one at a time per GPU, with config overlays per GPU (T4, L4, A4000, A5000). YOLO detectors load from TensorRT engines when they exist.",
      ],
    },
  },
  {
    slug: "vitpose-bench",
    name: "ViTPose++ inference bench",
    tag: "Open source",
    summary:
      "How far can ViTPose++-L inference go on one NVIDIA L4 without moving the poses? Compares PyTorch, ONNX Runtime and TensorRT (FP16 and INT8), from the bare model to a full video pipeline. Every speedup must pass an accuracy gate first.",
    highlights: [
      {
        figure: "4.08×",
        text: "faster pose model at batch 1: TensorRT FP16 runs in 5.07 ms.",
      },
      {
        figure: "2.9×",
        text: "throughput from an asynchronous, multi-stream video pipeline (68.0 frames/s), with the same poses.",
      },
      {
        figure: "0.809",
        text: "COCO keypoint AP for TensorRT FP16, identical to PyTorch.",
      },
    ],
    stack: ["PyTorch", "ONNX Runtime", "TensorRT", "Triton", "CUDA", "YOLOv8", "pycocotools"],
    links: [
      { label: "GitHub", href: "https://github.com/Raghaverma/vitpose-inference-bench" },
    ],
    details: {
      bullets: [
        "Every backend is gated against a golden reference on raw-tensor error and decoded keypoint distance, and every pipeline change against the poses it replaces, before any latency counts.",
        "The first INT8 engine was broken, with 72 px keypoint error. Quantizing only the MatMul inputs, calibrated on real footage split by video, fixed it: 1.74× over FP16 at batch 16.",
        "Profiling showed the bottleneck was Hugging Face's CPU crop warp (43% of a frame), not the model. A Triton kernel reproduces it bit for bit on the GPU; with a GPU pose decode, CPU use halves.",
        "The GPU is shared with production, so a contention guard discards and re-runs any chunk that overlapped another job.",
        "Found a float32 indexing bug in Hugging Face's pose decode that misdecodes calls with 300 or more boxes.",
      ],
      table: {
        caption: "From model to fleet",
        columns: ["Step", "Result"],
        rows: [
          ["Pose model alone, batch 1", "5.07 ms, 4.08× PyTorch"],
          ["Synchronous video pipeline", "23.5 frames/s"],
          ["Asynchronous pipeline", "68.0 frames/s"],
          [
            "All 82 job videos, all FP16 (55 projected)",
            "97.8 frames/s, +11% over the production config",
          ],
        ],
      },
    },
  },
  {
    slug: "cricketfm",
    name: "CricketFM",
    tag: "In progress · Open source",
    summary:
      "Do foundation models beat specialist vision systems at cricket? Sapiens against ViTPose++ for pose, and a 4B vision-language model, zero-shot against LoRA, for shot recognition. The protocol was frozen before any cricket label or result existed.",
    highlights: [
      {
        figure: "0.809 vs 0.667",
        text: "COCO AP: ViTPose++-L leads Sapiens-0.3B in the baseline check. A fair head-to-head waits on Sapiens' COCO-17 head.",
      },
      {
        figure: "4.4–21×",
        text: "the throughput of Sapiens on an L4, at about 1/21 of the energy per image.",
      },
      {
        text: "Every pose model must pass a COCO accuracy gate before it touches cricket footage, which catches wrong crops and scrambled keypoint maps.",
      },
    ],
    stack: [
      "PyTorch",
      "Transformers",
      "Sapiens",
      "ViTPose++",
      "Qwen3.5-4B",
      "LoRA",
      "pycocotools",
    ],
    links: [{ label: "GitHub", href: "https://github.com/Raghaverma/CricketFM" }],
    details: {
      bullets: [
        "Status: protocol v1.0 frozen, pose adapters pass the COCO gate, latency measured. Next: 800 labelled frames for the pose benchmark, and shot labels for the VLM pilot.",
        "Sapiens doesn't batch on the L4: a single 1024×768 crop already holds the card at its 72 W power cap.",
        "Footage comes from 118 AutoClip job videos. Re-uploads are caught by content fingerprint and kept in one split. Footage stays private; only aggregates are committed.",
        "Shot recognition runs as a pilot: about 19 minutes of batting from 10 batters should give on the order of 100 shots.",
      ],
      table: {
        caption: "Baseline on an L4",
        columns: ["", "ViTPose++-L", "Sapiens-0.3B"],
        rows: [
          ["COCO AP", "0.809", "0.667"],
          ["Images/s, batch 16", "222", "10.4"],
          ["Energy per image", "0.32 J", "6.88 J"],
          ["End to end, one person", "27.6 ms", "90.8 ms"],
        ],
      },
    },
  },
];

export const otherWork: OtherProject[] = [
  {
    name: "Meridian",
    summary:
      "TypeScript SDK that gives 46 third-party APIs one typed interface for errors, rate limits, retries and failover, with zero required runtime dependencies.",
    links: [
      { label: "GitHub", href: "https://github.com/Raghaverma/Meridianjs" },
      { label: "npm", href: "https://www.npmjs.com/package/meridianjs" },
    ],
  },
  {
    name: "Forge",
    summary:
      "Runtime for AI operators that act on real business tools only through approval gates, with an append-only audit log.",
    links: [],
    note: "Private",
  },
  {
    name: "Phalanx",
    summary:
      "Security platform that merges findings from many scanners and triages them with deterministic rules, scoring exploitability by reachability.",
    links: [],
    note: "Private",
  },
];
