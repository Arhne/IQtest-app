import React, { FC } from "react";
import { Text, View, Dimensions } from "react-native";
import { Circle, Svg, Defs, LinearGradient, Stop } from "react-native-svg";
import { ProgressChart, PieChart as RNChart } from "react-native-chart-kit";
import tw from "@/twrnc-config";
import { ProgressChartData } from "react-native-chart-kit/dist/ProgressChart";
import { labelColorMap } from "@/data/data-config";

// const screenWidth = Dimensions.get('screen').width;
const screenWidth = 158;

interface IMultipleChart {
  data : ProgressChartData
}
const data = [
  {
    name: "Correct Answer",
    population: 18,
    color: "#8fbf00",
  },
  {
    name: "Wrong Answer",
    population: 6,
    color: "#00bcbf",
  },
  {
    name: "Unanswered",
    population: 6,
    color: "#dd2e2e",
  },
];

const totalAnswers = data.reduce((acc, item) => acc + item.population, 0);
const correctPercentage = ((data[0].population / totalAnswers) * 100) // Calculating percentage

const progressdata : ProgressChartData = {
  labels: ["Swim", "Bike", "Run", "Swim", "Bike"], // optional
  data: [0.4, 0.6, 0.8, 0.5, 0.8],
};

export const CircularProgress = ({
  percentage,
  text,
  radius = 35,
}: {
  percentage: number;
  text?: string;
  radius?: number;
}) => {
  // const radius = 35;
  const strokeWidth = 5;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference * (percentage / 100);

  return (
    <View style={tw`items-center justify-center`}>
      <Svg height="80" width="80">
        <Defs>
          <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#D568EF" stopOpacity="0.6" />
            <Stop offset="100%" stopColor="#8D0CCA" stopOpacity="1" />
          </LinearGradient>
        </Defs>

        <Circle
          cx="40"
          cy="40"
          r={radius}
          stroke="white"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          cx="40"
          cy="40"
          r={radius}
          stroke="url(#grad)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round"
          fill="none"
          transform={`rotate(-90, 40, 40)`}
        />
      </Svg>

      <View style={tw`absolute items-center justify-center`}>
        <Text style={tw`text-base text-[#8D0CCA]`}>{percentage}%</Text>
        {text && <Text style={tw`text-xs text-white`}> {text} </Text>}
      </View>
    </View>
  );
};

export const PieChart = () => {
  return (
    <View style={tw`flex justify-center items-center mb-5`}>
      <RNChart
        data={data}
        width={160}
        height={200}
        chartConfig={{
          backgroundColor: "#fff",
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="39"
        absolute
        hasLegend={false}
      />
      {/* Donut Chart Overlay - White Circle */}
      <View style={[tw`absolute bg-white`, {
        width: 80, // Set appropriate width for the white circle
        height: 80, // Set appropriate height for the white circle
        borderRadius: 40, // Half of width/height to make it circular
        justifyContent: 'center',
        alignItems: 'center',
      }]} />

      {/* Overlayed Percentage Text */}
      <View style={tw`absolute flex justify-center items-center`}>
        <Text style={tw`text-xl font-bold text-black`}>
          {correctPercentage}%
        </Text>
      </View>
    </View>
  );
};

export const MultipleChart : FC<IMultipleChart> = ({data}) => {
  return (
    <ProgressChart
      data={data}
      width={screenWidth}
      height={220}
      strokeWidth={8} // Increase stroke width to make circles thicker
      radius={12} // Reduce radius to bring circles closer
      chartConfig={{
        backgroundGradientFrom: "transparent",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "transparent",
        backgroundGradientToOpacity: 0,
        color: (opacity = 1, index) => {
          // Set the color for the filled part based on the data's index
          const colors = Object.values(labelColorMap).map((item) => item);
          return colors[index ?? 0] || `rgba(26, 255, 146, ${opacity})`; // Default color if no color is found
        },
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        fillShadowGradient: "transparent", // Ensure the filled gradient is transparent
        fillShadowGradientOpacity: 0, // No shadow for unfilled portions
        backgroundColor: "transparent", // Make the whole chart background transparent
      }}
      hideLegend={true} // Hide legend if needed
    />
  );
};
