import { View, Text, Image } from "react-native";
import React from "react";
import { icons } from "@/constants";
import tw from "@/twrnc-config";



const CustomWarning = ({ warning, textColor='' }: { warning: string, textColor?: string }) => {
  return (
    <View style={tw`bg-[#FEF5CB] w-full flex-row gap-3 rounded-xl p-5`}>
       <icons.WarningIcon/>
      <View style={tw`flex-1 flex-col gap-2`}>
        <Text style={tw`text-base font-semibold ${textColor}`}>Note:</Text>
        <Text style={tw`font-intmedium text-sm`}>{warning}</Text>
      </View>
    </View>
  );
};

export default CustomWarning;



export const CustomDetailResult = ({icon, noteHeading, noteDesc, bgcolor, textColor='' }: {icon?: React.ReactNode, noteHeading: string, noteDesc: string, bgcolor: string; textColor?: string }) => {
  return (
    <View style={tw`${bgcolor} w-full flex-row gap-3 rounded-xl p-5`}>
       <View>{icon}</View>
      <View style={tw`flex-1 flex-col gap-2`}>
        <Text style={tw`text-base font-semibold ${textColor}`}>{noteHeading}</Text>
        <Text style={tw`font-intmedium text-sm text-[#57575B]`}>{noteDesc}</Text>
      </View>
    </View>
  );
};

export const UnorderedList = ({ items }: {items: string[]}) => {
  return (
    <View>
      {items.map((item, index) => (
        <View key={index} style={{flexDirection: 'row', alignItems: "center", marginBottom: 2,}}>
          <Text style={{fontSize: 20, marginRight: 10, color: '#848288'}}>{'\u2022'}</Text> 
          <Text style={{fontSize: 14, color: '#848288'}}>{item}</Text>
        </View>
      ))}
    </View>
  );
};
