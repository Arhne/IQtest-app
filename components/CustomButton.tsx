import { Pressable, View, Text } from "react-native";
import { Link } from "expo-router";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import tw from "@/twrnc-config";
import Ionicons from "@expo/vector-icons/Ionicons";
interface ICustomButton {
  title: string;
  handlePress?: () => void;
  containerStyles?: string;
  textStyles?: string;
  isLoading?: boolean;
  disabled?: boolean;
}

interface ICustomGradientButton {
  title: string;
  paddingStyle?: string;
  isLoading?: boolean;
  handlePress?: () => void;
  color?: string[];
  textStyle?: string;
  
}

type IoniconName = keyof typeof Ionicons.glyphMap
export const CustomButton = ({
  title,
  handlePress,
  containerStyles = "",
  textStyles = "",
  isLoading,
  disabled = false,
}: ICustomButton) => {
  return (
    <Pressable
      onPress={!disabled ? handlePress : undefined}
      style={({ pressed }) => [
        tw`rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${isLoading ? "opacity-50" : ""
          } ${disabled ? 'opacity-50' : 'opacity-100'}`,
        pressed && tw`opacity-70`,
      ]}
      disabled={disabled}
    >
      <Text style={tw`leading-[16px] font-medium text-base ${textStyles}`}>
        {title}
      </Text>
    </Pressable>
  );
};

export const CustomGradientButton = ({
  title,
  paddingStyle = "",
  isLoading,
  handlePress,
  color = ["#8D0CCA", "#D568EF"],
  textStyle = "",
}: ICustomGradientButton) => {
  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        tw`rounded-xl min-h-[62px] justify-center items-center ${isLoading ? "opacity-50" : ""
          }`,
        pressed && tw`opacity-70`,
      ]}
      disabled={isLoading}
    >
      <LinearGradient
        style={tw`rounded-xl min-h-[50px] ${paddingStyle} justify-center items-center`}
        colors={color}
      >
        <Text style={tw`leading-[16px] font-medium text-base ${textStyle}`}>
          {title}
        </Text>
      </LinearGradient>
    </Pressable>
  );
};

export const CustomIconButton = ({ onPress, iconName, iconSize = 24, iconColor = 'black' }: {onPress: ()=> void, 
  iconName: IoniconName, iconSize?: number, iconColor?: string,
}) => {
  return (
    <Pressable style={tw`bg-gray-400 px-6 py-[19.3px] rounded-xl`} onPress={onPress}>
      <View style={tw``}>
       <Ionicons name={iconName} size={iconSize} color={iconColor} />
      </View>
    </Pressable>
  );
};
