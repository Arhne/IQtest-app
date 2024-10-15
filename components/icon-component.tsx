import { images } from "@/constants";
import { SubCategoryConfig } from "@/data/data-config";
import { SubCategories } from "@/data/enum";
import React from "react";
import { Image, View } from "react-native";
import { SvgProps } from "react-native-svg";
import tw from "twrnc"; // Tailwind for React Native

const IconComponent: React.FC<{ latestSubDetails?: IDetails | null }> = ({
  latestSubDetails,
}) => {
  // Check if there is an interactionicon in the config
  const Icon = latestSubDetails
    ? SubCategoryConfig[latestSubDetails?.latestTest as SubCategories]
        ?.interactionicon
    : undefined;

  // If Icon exists and is a valid React component
  if (Icon) {
    return <Icon width={134} height={133} />;
  }

  // Otherwise, return the default image
  return (
    <View>
      <Image
        source={images.brain}
        style={tw`w-[134px] h-[133px]`}
        resizeMode="contain"
      />
    </View>
  );
};

export default IconComponent;
