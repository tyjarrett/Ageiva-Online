import { ProfileSurveyQuestion } from "../types/Profile";

// need to change for production
export const API_URL =
  "http://django-env.eba-eygr6bby.us-east-2.elasticbeanstalk.com/api";

export const surveyQuestions: Array<ProfileSurveyQuestion> = [
  {
    variableId: "grip dom",
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
  },
  {
    variableId: "grip ndom",
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
  },
];
