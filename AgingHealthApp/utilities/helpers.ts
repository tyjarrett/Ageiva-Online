import { surveyQuestions } from "./constants";

export const getVariable = (variableId: string) => {
  const v = surveyQuestions.filter((v) => v.variableId === variableId);
  return v.length > 0 ? v[0] : null;
};
