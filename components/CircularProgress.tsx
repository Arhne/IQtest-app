import React, { FC, useMemo } from "react";
import { Text, View, Dimensions } from "react-native";
import { Circle, Svg, Defs, LinearGradient, Stop } from "react-native-svg";
import { ProgressChart, PieChart as RNChart } from "react-native-chart-kit";
import tw from "@/twrnc-config";
import { ProgressChartData } from "react-native-chart-kit/dist/ProgressChart";
import { labelColorMap } from "@/data/data-config";
import { useColorScheme } from "@/hooks/useColorScheme";
import { hexToRgba } from "@/utils/helper-functions";

// const screenWidth = Dimensions.get('screen').width;
const screenWidth = 158;

interface IMultipleChart {
  data : ProgressChartData
  total: number
}

interface PieChartData {
  data: {
    name: string;
    population: number;
    color: string;
}[];
percentage: number;
}

export const CircularProgress = ({
  percentage,
  text,
  radius = 35,
  textColor = "text-[#000]",
}: {
  percentage: number;
  text?: string;
  radius?: number;
  textColor?: string;
}) => {
  const colorScheme = useColorScheme();

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
        <Text style={tw`text-base ${colorScheme === "dark" ? `${textColor}` : "text-[#8D0CCA]"}`}>{percentage}%</Text>
        {text && <Text style={tw`text-xs text-white`}> {text} </Text>}
      </View>
    </View>
  );
};

export const PieChart: FC<PieChartData> = ({data, percentage}) => {
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
        paddingLeft="40"
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
          {percentage}%
        </Text>
      </View>
    </View>
  );
};

export const MultipleChart : FC<IMultipleChart> = ({data, total}) => {
  const neededData : ProgressChartData = useMemo(() => {
    if (Array.isArray(data)) return {} as ProgressChartData;
    return {
      labels: data.labels,
      colors: data.colors,
      data: data.data.map((item) => item/total)
    }
  }, [total])

  return (
    <ProgressChart
      data={neededData}
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
          const colors = Object.values(labelColorMap).map((colorHex) =>
            hexToRgba(colorHex, opacity)
          );
          return colors[index ?? 0] || `rgba(26, 255, 146, ${opacity})`; // Default color if index is out of bounds
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
