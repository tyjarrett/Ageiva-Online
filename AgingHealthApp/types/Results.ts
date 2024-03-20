import { VariableId } from "./Profile";

export type PredictionData = {
  date: Date;
  data: Record<VariableId, number>;
};
export type DateAndValue = {
  date: Date;
  value: number;
};
export type GraphData = {
  predictionData: PredictionData[];
  survivalData: DateAndValue[];
};
