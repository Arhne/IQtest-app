import { View, Text, TextInput } from 'react-native'
import React from 'react'
import tw from "@/twrnc-config"

interface IFormInput{
    title?: string;
    value: string;
    placeholder?: string;
    handleChangeText: () => void;
    otherStyles?: string;
    }
    

const CustomFormInput = ({ title, value, placeholder,
    handleChangeText, otherStyles ='', ...props
}: IFormInput) => {
  return (
    <View style={tw`space-y-2 ${otherStyles}`}>
      {title && <Text style={tw`text-base`}>{title}</Text>}
      <View style={tw`w-full h-15 px-4 bg-black rounded-2x focus:border-secondary items-center`}>
        <TextInput 
        style={tw`flex-1 text-white text-base`}
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#7b7b8b"
        onChange={handleChangeText}
        />
      </View>
    </View>
  )
}

export default CustomFormInput