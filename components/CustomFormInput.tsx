import { View, Text, TextInput } from 'react-native'
import React from 'react'
import tw from "@/twrnc-config"

interface IFormInput{
    title?: string;
    value: string;
    placeholder?: string;
    handleChangeText: (text: string) => void;
    otherStyles?: string;
    multiline?: boolean;
    numberOfLines?: number;
    heightStyle: string;
    }
    

const CustomFormInput = ({ title, value, placeholder, heightStyle,
    handleChangeText, otherStyles ='', numberOfLines, multiline, ...props
}: IFormInput) => {
  return (
    <View style={tw`space-y-2 ${otherStyles}`}>
      {title && <Text style={tw`text-base p-2`}>{title}</Text>}
      <View style={[tw`w-full px-4 border border-[#EAE8EE] rounded-2x focus:border-secondary`, { height: parseInt(heightStyle) }]}>
        <TextInput 
        style={tw`text-base`}
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#7b7b8b"
        onChangeText={handleChangeText}
        multiline={multiline}
        numberOfLines={numberOfLines}
        />
      </View>
    </View>
  )
}

export default CustomFormInput;

