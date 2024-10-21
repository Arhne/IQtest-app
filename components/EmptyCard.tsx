import React from "react";
import tw from "@/twrnc-config";
import {images} from "@/constants"
import { Image, View, Text } from "react-native";
import { ThemedText } from '@/components/ThemedText';

const EmptyCard = ({title}: {title: string}) => {
  return (
    <View style={tw`grid place-content-center`}>
      <View style={tw``}>
        <Image
          source={images.emptyCard}
          width={120}
          height={120}
          alt="An empty card"
        />
      </View>
      <ThemedText style={tw`pt-8`}>{title}</ThemedText>
    </View>
  );
};

export default EmptyCard;
