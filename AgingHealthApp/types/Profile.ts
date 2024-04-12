import { Float } from "react-native/Libraries/Types/CodegenTypes";

export type ProfileScreenName = "Profile" | "Survey" | "Check";

export const variableIds = [
  "gait_speed",
  "grip_dom",
  "grip_ndom",
  "FI_ADL",
  "FI_IADL",
  "chair",
  "leg_raise",
  "full_tandem",
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
  "age",
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isVariableId = (x: any): x is VariableId =>
  variableIds.includes(x);

export type ProfileSurveyQuestion = {
  variableId: VariableId;
  prettyName: string;
  question: string;
  unit: string | undefined;
  hasQuantitative: boolean;
  qualitativeOptions: Array<string>;
  required: boolean;
  mean: Float;
  stdev: Float;
};

export type QuestionAndResponse = {
  variableId: VariableId;
  type: "quantitative" | "qualitative";
  response: string;
};

export type PResponse = {
  type: "quantitative" | "qualitative";
  response: string;
};
