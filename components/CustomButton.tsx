import { TouchableOpacity, View, Text } from "react-native";
import { Link } from "expo-router";
import React from "react";
// import tw from "twrnc";
import tw from "@/twrnc-config";

interface ICustomButton {
  title: string;
  handlePress?: () => void;
  containerStyles?: string;
  textStyles?: string;
  isLoading?: boolean;
}

export const CustomButton = ({
  title,
  handlePress,
  containerStyles = "",
  textStyles = "",
  isLoading,
}: ICustomButton) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      style={tw`rounded-xl min-h-[62px] justify-center items-center ${containerStyles} 
        ${isLoading ? "opacity-50" : ""}`}
      disabled={isLoading}
    >
      <Text style={tw`leading-[16px] font-medium text-base ${textStyles}`}>
        {title}
        {/* {isLoading ? (
        <span className={styles.loader}>
          <ImSpinner9 className={styles.loader} size={25} />
        </span>
      ) : (
        text
      )} */}
      </Text>
    </TouchableOpacity>
  );
};
