import { ProfileSurveyQuestion } from "../types/Profile";

// need to change for production
export const API_URL =
  "http://django-env.eba-eygr6bby.us-east-2.elasticbeanstalk.com/api";

export const surveyQuestions: Array<ProfileSurveyQuestion> = [
  {
    questionId: "grpdom",
    question: "your grip strength of your dominant hand",
    hasQuantitative: true,
    unit: "lbs",
    qualitativeOptions: [
      "Very weak",
      "Eeak",
      "Average",
      "Strong",
      "Very strong",
    ],
  },
];
