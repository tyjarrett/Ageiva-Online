import { ProfileSurveyQuestion } from "../types/Profile";

// need to change for production
export const API_URL =
  "http://django-env.eba-eygr6bby.us-east-2.elasticbeanstalk.com/api";

export const surveyQuestions: Array<ProfileSurveyQuestion> = [
  {
    variableId: "gait_speed",
    question: "gait speed averaged between two timed walks",
    hasQuantitative: true,
    unit: "m/s",
    qualitativeOptions: [
      "unable",
      "extremely slow",
      "slow",
      "average",
      "fast",
      "extremely fast",
    ],
    required: false,
  },
  {
    variableId: "grip_dom",
    question: "your grip strength of your dominant hand",
    hasQuantitative: true,
    unit: "lbs",
    qualitativeOptions: [
      "Very weak",
      "Weak",
      "Average",
      "Strong",
      "Very strong",
    ],
    required: false,
  },
  {
    variableId: "grip_ndom",
    question: "your grip strength of your non-dominant hand",
    hasQuantitative: true,
    unit: "lbs",
    qualitativeOptions: [
      "Very weak",
      "Weak",
      "Average",
      "Strong",
      "Very strong",
    ],
    required: false,
  },
  {
    variableId: "FI_ADL",
    question:
      "Any difficulty in the last 3 months because of physical, mental, emotional, or memory problems: (a) dressing (including putting on shoes and socks), (b) eating (such as cutting up your food), (c) using the toilet (including getting up and down), (d) bathing and showering, (e) getting in and out of bed, and (f) walking across a room",
    hasQuantitative: false,
    unit: "sum",
    qualitativeOptions: ["1", "2", "3", "4", "5", "6"],
    required: false,
  },
  {
    variableId: "FI_IADL",
    question:
      "Any difficulty in the last 3 months because of physical, mental, emotional, or memory problems: (a) preparing a hot meal, (b) shopping for groceries, (c) making telephone calls, (d) taking medications, and (e) managing your money, such as paying your bills and keeping track of expenses",
    hasQuantitative: false,
    unit: "sum",
    qualitativeOptions: ["1", "2", "3", "4", "5"],
    required: false,
  },
  {
    variableId: "chair",
    question:
      "'I want you to try to stand up from a firm straight-backed chair, like a dining chair. First, fold your arms across your chest and sit so that your feet are on the floor; then stand up keeping your arms folded across your chest. repeat 5 times",
    hasQuantitative: true,
    unit: "sec",
    qualitativeOptions: [
      "extremely slow",
      "slow",
      "average",
      "fast",
      "extremely fast",
    ],
    required: false,
  },
  {
    variableId: "leg_raise",
    question:
      "Try to stand on one leg, whichever one you want, and raise the other leg off the ground a few inches. Stand for as long as you can - I will stop you at 30 seconds. You may use your arms, bend your knees, or move your body to maintain your balance, but try not to move your feet. Try to hold this position until I tell you to stop. You may support yourself on a chair, table or wall while getting into position.",
    hasQuantitative: true,
    unit: "sec",
    qualitativeOptions: [
      "less than half duration",
      "more than half duration",
      "full duration",
    ],
    required: false,
  },
  {
    variableId: "full_tandem",
    question:
      "Tandem stance: stand side by side with their feet together: Ages 50-69 were asked to hold for 30 seconds, 70+ for 10 seconds. Stopwatch was stopped when the participant steps out of position or grabs the nurses arm.",
    hasQuantitative: true,
    unit: "sec",
    qualitativeOptions: [
      "less than half duration",
      "more than half duration",
      "full duration",
    ],
    required: false,
  },
  {
    variableId: "srh",
    question: "How would you say your health is?",
    hasQuantitative: false,
    unit: "sec",
    qualitativeOptions: ["excellent", "very good", "good", "fair", "poor"],
    required: false,
  },
  {
    variableId: "eye",
    question: "How would you rate your eyesight?",
    hasQuantitative: false,
    unit: "sec",
    qualitativeOptions: [
      "excellent",
      "very good",
      "good",
      "fair",
      "poor",
      "registered/legally blind",
    ],
    required: false,
  },
  {
    variableId: "hear",
    question: "How would you rate your hearing?",
    hasQuantitative: false,
    unit: "sec",
    qualitativeOptions: ["excellent", "very good", "good", "fair", "poor"],
    required: false,
  },
  {
    variableId: "func",
    question:
      "By yourself and without using any special equipment, how much difficulty do you have walking for a quarter of a mile?",
    hasQuantitative: false,
    unit: "sec",
    qualitativeOptions: [
      "no difficulty",
      "some difficulty",
      "much difficulty",
      "unable",
    ],
    required: false,
  },
  {
    variableId: "dias",
    question: "diastolic blood pressure from 3 measurements",
    hasQuantitative: true,
    unit: "mmHg",
    qualitativeOptions: [
      "extremely low",
      "low",
      "average",
      "high",
      "extremely high",
    ],
    required: false,
  },
  {
    variableId: "sys",
    question: "systolic blood pressure from 3 measurements",
    hasQuantitative: true,
    unit: "mmHg",
    qualitativeOptions: [
      "extremely low",
      "low",
      "average",
      "high",
      "extremely high",
    ],
    required: false,
  },
  {
    variableId: "pulse",
    question: "pulse",
    hasQuantitative: true,
    unit: "bpm",
    qualitativeOptions: [
      "extremely low",
      "low",
      "average",
      "high",
      "extremely high",
    ],
    required: false,
  },
  {
    variableId: "trig",
    question:
      "Together with total and HDL cholesterol, they provide a lipid profile that can give information on the risk of cardiovascular disease.",
    hasQuantitative: true,
    unit: "mmol/l",
    qualitativeOptions: [
      "Normal: Less than 150 mg/dL (1.69 mmol/L)",
      "Borderline high: 150 to 199 mg/dL (1.69 to 2.25 mmol/L)",
      "High: 200 to 499 mg/dL (2.26 to 5.64 mmol/L)",
      "Very high: 500 mg/dL or above (5.65 mmol/L)",
    ],
    required: false,
  },
  {
    variableId: "crp",
    question:
      "The level of this protein in the blood gives information on inflammatory activity in the body, and it is also associated with risk of heart disease.",
    hasQuantitative: true,
    unit: "mg/l",
    qualitativeOptions: [
      "Normal: Less than 0.3 mg/dL",
      "Minor elevation: 0.3 to 1.0 mg/dL",
      "Moderate elevation: 1.0 to 10.0 mg/d",
      "Marked elevation: More than 10.0 mg/dL",
      "Severe elevation: More than 50.0 mg/dL",
    ],
    required: false,
  },
  {
    variableId: "hdl",
    question:
      "This is ‘good’ cholesterol, which is protective for heart disease. Triglycerides - Together with total and HDL cholesterol, they provide a lipid profile that can give information on the risk of cardiovascular disease.",
    hasQuantitative: true,
    unit: "mmol/l",
    qualitativeOptions: [
      "Excellent: 60 mg/dL (1.5 mmol/L) or higher",
      "Average: 40-59 mg/dL (1-1.5 mmol/L)",
      "Low: less than 40 mg/dL (1.03 mmol/L)",
    ],
    required: false,
  },
  {
    variableId: "ldl",
    question:
      "This is ‘bad’ cholesterol; increased levels are associated with atherosclerosis, and thus myocardial infarctions, strokes and peripheral vascular disease.",
    hasQuantitative: true,
    unit: "mmol/l",
    qualitativeOptions: [
      "Very High: 190 mg/dL (4.9 mmol/L) or high with coronary artery disease",
      "High: 160-189 mg/dL (3.4 - 4.9 mmol/L) or  borderline high or near optimal with coronary artery disease",
      "Near Optimal: 100 -129 mg/dL (2.6-3.3 mmol/L) or optimal with coronary artery disease",
      "Optimal: Below 100 mg/dL (Below 2.6 mmol/L)",
      "Best: Below 70 mg/dL (Below 1.8 mmol/L)",
    ],
    required: false,
  },
  {
    variableId: "glucose",
    question:
      "Blood glucose levels indicate the presence or risk of type 2 diabetes, which is associated with an increased risk of heart disease.",
    hasQuantitative: true,
    unit: "mmol/l",
    qualitativeOptions: [
      "Normal Fasting blood sugar level: 100 mg/dL (5.6 mmol/L)",
      "High: 160-189 mg/dL (3.4 - 4.9 mmol/L) or  borderline high or near optimal with coronary artery disease",
      "Near Optimal: 100 -129 mg/dL (2.6-3.3 mmol/L) or optimal with coronary artery disease",
      "Optimal: Below 100 mg/dL (Below 2.6 mmol/L)",
      "Best: Below 70 mg/dL (Below 1.8 mmol/L)",
    ],
    required: false,
  },
  {
    variableId: "age",
    question: "How old are you?",
    hasQuantitative: true,
    unit: "years",
    qualitativeOptions: [],
    required: true,
  },
];
