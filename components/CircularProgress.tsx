import React from "react";
import { Text, View } from "react-native";
import { Circle, Svg, Defs, LinearGradient, Stop } from "react-native-svg";

const CircularProgress = ({
  percentage,
  text,
}: {
  percentage: number;
  text?: string;
}) => {
  const radius = 35;
  const strokeWidth = 5;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference * (percentage / 100);

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
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

      <View
        style={{
          position: "absolute",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 16, color: "#8D0CCA" }}>{percentage}%</Text>
        {text && <Text style={{ fontSize: 12, color: "#fff" }}> {text} </Text>}
      </View>
    </View>
  );
};

export default CircularProgress;
