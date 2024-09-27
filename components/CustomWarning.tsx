import { View, Text, Image } from "react-native";
import React from "react";
import { icons } from "@/constants";
import tw from "@/twrnc-config";



const CustomWarning = ({ warning, textColor='' }: { warning: string, textColor?: string }) => {
  return (
    <View style={tw`bg-[#FEF5CB80] w-full flex-row gap-3 rounded-xl p-5`}>
       <icons.WarningIcon/>
      <View style={tw`flex-1 flex-col gap-2`}>
        <Text style={tw`text-base font-semibold ${textColor}`}>Note:</Text>
        <Text style={tw`font-intmedium text-sm`}>{warning}</Text>
      </View>
    </View>
  );
};

export default CustomWarning;
