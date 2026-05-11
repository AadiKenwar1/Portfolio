// ── Types ─────────────────────────────────────

export const DEFAULT_PREVIEW_BACKGROUND = "bg-[#0a0a12]";
export const DEFAULT_PREVIEW_SCALE = 1;

export type Project = {
  title: string;
  description: string;
  tags: readonly string[];
  github: string;
  demo: string;
  /** When `false`, the Live Demo button is hidden on cards and in the project modal. */
  showDemo: boolean;
  preview: string; //image path under public (starts with /) or tailwind gradient fallback
  previewBackground?: string;
  previewScale?: number;
  images: string[];
  mobile: boolean;
  /** When true, the project card uses a light golden accent border and a “Highlighted” label. */
  highlight?: boolean;
};


// ── Hero ──────────────────────────────────────
export const HERO = {
  eyebrow: "Developer",
  name: "Aadi Kenwar",
  school: "Computer Science @ The Ohio State University",
  bio: "Hi there! I’m a product-minded software engineer with a strong focus in end-to-end product development, from design and development to deployment. I enjoy building useful, reliable, and innovative software.",
} as const;


// ── Projects ──────────────────────────────────
export const PROJECTS: readonly Project[] = [
  {
    title: "LiftTrition",
    description:
      "LiftTrition is a cross platform fitness tracking platform that combines weightlifting and nutrition management into a seamless dual-mode interface with instant UX and AI-assisted logging tools. It features advanced workout and nutrition tracking, automated macro and fatigue calculations powered by highly reserached fitness algorithms, and interactive progress visualizations for strength, fatigue, bodyweight, calories, and macronutrient trends.",
    tags: ["React Native", "Supabase", "Powersync", "OpenAI", "Expo", "Deployed on App Store"],
    github: "https://github.com/AadiKenwar1/LiftTrition",
    demo: "https://demo.example.com/ai-study-assistant",
    preview: "/images/LiftTritionImages/LTIcon.png",
    previewBackground: "bg-[#121212]",
    previewScale: 1.4,
    images: [
      "/images/LiftTritionImages/WorkoutPreview.png",
      "/images/LiftTritionImages/ExercisesPreview.png",
      "/images/LiftTritionImages/LogsPreview.png",
      "/images/LiftTritionImages/NutrtionPreview.png",
      "/images/LiftTritionImages/AiPicturePreview.png",
      "/images/LiftTritionImages/ManualNutritionPreview.png",
      "/images/LiftTritionImages/FoodDBPreview.png",
      "/images/LiftTritionImages/LiftProgressPreview.png",
      "/images/LiftTritionImages/NutrtitionGraphsPreview.png",
    ],
    mobile: true,
    showDemo: false,
    highlight: true,
  },
  {
    title: "OSU Grader Portal",
    description: "Led a team of 5 to build a Ruby on Rails application that allows students to apply for grader positions, instructors to submit recommendations, and administrators to manage course staffing and grader assignments through a centralized system. Integrated OSU course catalog APIs, implemented RESTful workflows with SQLite-backed data models, and added role-based login.",
    tags: ["Ruby on Rails", "SQLite", "CSS", "HTML"],
    github: "https://github.com/AadiKenwar1/OSU-Grader-Portal",
    demo: "https://demo.example.com/campus-events",
    preview: "/images/GraderPortal/AdminCatalog.png",
    previewBackground: "bg-[#181818]",
    images: [
      "/images/GraderPortal/AdminDashboard.png",
      "/images/GraderPortal/AdminCatalog.png",
      "/images/GraderPortal/ReviewApplications.png",
      "/images/GraderPortal/StudentApplications.png",
      "/images/GraderPortal/StudentCatalog.png",
    ],
    mobile: false,
    showDemo: false,
  },
  {
    title: "UFC Fight Predictor",
    description: "Deployed an end-to-end machine learning system that predicts UFC fight outcomes from historical fight stats, engineered matchup features, and an XGBoost model. The pipeline uses temporal splits (train on the past, test on future fights) so metrics reflect realistic forecasting. The UFC is a noisy environment where fights can change outcomes in a split second, yet we managed to achieve a 76% Test Accuracy and 84% ROC-AUC, which is well above the baseline for complete randomness.",
    tags: ["Python", "FastAPI", "XGBoost", "scikit-learn", "pandas", "HTML", "CSS", "JavaScript", "Deployed on Render"],
    github: "https://github.com/AadiKenwar1/UFC-Matchup-Predictor",
    demo: "https://ufc-matchup-predictor.onrender.com/",
    preview: "/images/UFCPredictor/UFC_Predictor.png",
    images: ["/images/UFCPredictor/UFC_Predictor.png"],
    mobile: false,
    showDemo: true,
  },
  
];

export const CONTACT = {
  email: "aadikenwar983@gmail.com",
  github: "https://github.com/aadikenwar1",
  linkedin: "https://linkedin.com/in/aadikenwar",
} as const;
