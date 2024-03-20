import { VictoryThemeDefinition } from "victory-core";
import { VictoryTheme } from "victory-native";

export const graphColors = {
  var: "#005AB5",
  mean: "red",
  axes: "#FFFFFF",
};

export const graphTheme: VictoryThemeDefinition = {
  ...VictoryTheme.grayscale,
  axis: {
    style: {
      axis: { stroke: graphColors.axes, strokeWidth: 0.5 },
      ticks: { stroke: graphColors.axes },
      tickLabels: {
        fill: graphColors.axes,
        letterSpacing: "normal",
        padding: "10",
        stroke: "transparent",
        fontFamily: "sans-serif",
        fontSize: 14,
      },
      axisLabel: { fill: graphColors.axes, padding: 30, fontSize: 20 },
      grid: { strokeWidth: 0 },
    },
  },
  legend: {
    ...VictoryTheme.grayscale.legend,
    style: {
      ...VictoryTheme.grayscale.legend?.style,
      labels: {
        fill: graphColors.axes,
        fontFamily: "sans-serif",
        fontSize: 12,
        letterSpacing: "normal",
        padding: 10,
        stroke: "transparent",
      },
    },
  },
  line: {
    ...VictoryTheme.grayscale.line,
    style: {
      ...VictoryTheme.grayscale.line?.style,
      data: { strokeWidth: 2 },
    },
  },
  scatter: {
    style: {
      data: {
        fill: graphColors.var,
      },
    },
  },
};
