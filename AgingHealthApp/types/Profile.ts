export type ProfileScreenName = "Profile" | "Survey";

export type ProfileSurveyQuestion = {
  questionId: string;
  question: string;
  unit: string | undefined;
  hasQuantitative: boolean;
  qualitativeOptions: Array<string>;
};
