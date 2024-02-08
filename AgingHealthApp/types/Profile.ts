export type ProfileScreenName = "Profile" | "Survey";

const variableIds = [
  "gait speed",
  "grip dom",
  "grip ndom",
  "FI ADL",
  "FI IADL",
  "chair",
  "leg raise",
  "full tandem",
  "srh",
  "eye",
  "hear",
  "func",
  "dias",
  "sys",
  "pulse",
  "trig",
  "crp",
  "hdl",
  "ldl",
  "glucose",
  "igf1",
  "hgb",
  "fib",
  "fer",
  "chol",
  "wbc",
  "mch",
  "hba1c",
  "vitd",
  "BP med",
  "anticoagulent med",
  "chol med",
  "hip/knee treat",
  "lung/asthma med",
  "longill",
  "limitact",
  "effort",
  "smkevr",
  "smknow",
  "mobility",
  "country",
  "alcohol",
  "jointrep",
  "fractures",
  "height",
  "bmi",
  "ethnicity",
  "sex",
] as const;

export type VariableId = (typeof variableIds)[number];

export type ProfileSurveyQuestion = {
  variableId: VariableId;
  question: string;
  unit: string | undefined;
  hasQuantitative: boolean;
  qualitativeOptions: Array<string>;
};

export type QuestionAndResponse = {
  variableId: VariableId;
  type: "quantitative" | "qualitative";
  response: string;
};
