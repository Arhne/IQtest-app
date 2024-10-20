import { View, Text, Pressable } from "react-native";
import React from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import tw from "@/twrnc-config";

interface ICardComponent {
  icon: React.ReactNode;
  title: string;
  titleStyle?: string;
  pricedesc?: string;
  otherStyles: string;
  textoricon?: string | React.ReactNode;
  textStyle?: string;
  handleClick?: () => void;
  opacityStyle?: string;
}

const CustomCard = ({
  icon,
  title,
  titleStyle = "",
  pricedesc,
  otherStyles,
  textoricon,
  textStyle = "",
  handleClick,
  opacityStyle = "opacity-30",
}: ICardComponent) => {
  const colorScheme = useColorScheme();

  return (
    <Pressable
      style={({ pressed }) => [
        tw` rounded-xl p-6 flex-row w-full items-center justify-between ${otherStyles}`,
        pressed && tw`opacity-30 ${opacityStyle}`,
      ]}
      onPress={handleClick}>
      <View style={tw`flex-row items-center gap-5`}>
        <View>{icon}</View>
        <View style={tw`flex flex-col gap-2`}>
          <Text style={tw`leading-[21.78px] font-intbold ${titleStyle}`}>
            {title}
          </Text>
          {pricedesc && (
            <Text
              style={tw`text-base leading-[16.94px] font-intregular ${colorScheme === "dark" ? "" : "text-[#727272]"}`}>
              {pricedesc}
            </Text>
          )}
        </View>
      </View>

      {textoricon !== undefined &&
        (typeof textoricon === "string" ? (
          <Text style={tw`${textStyle}`}>{textoricon}</Text>
        ) : (
          <View>{textoricon}</View>
        ))}

        
    </Pressable>
  );
};

export default CustomCard;
