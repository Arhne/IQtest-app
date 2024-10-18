import React, { useEffect, useRef } from "react";
import { View, Animated } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import tw from "@/twrnc-config";

const CustomLoader = ({ loading }: { loading?: boolean }) => {
  const rotation = useRef(new Animated.Value(0)).current;

  // Function to start rotating the icon
  const startRotation = () => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    ).start();
  };

  // Stop the animation by resetting the value
  const stopRotation = () => {
    rotation.setValue(0); // Reset rotation value to initial state
  };

  useEffect(() => {
    if (loading) {
      startRotation(); // Start the rotation when loading is true
    } else {
      stopRotation(); // Stop the rotation when loading is false
    }

    // Clean up the animation when the component unmounts
    return () => {
      stopRotation();
    };
  }, [loading]);

  // Interpolate rotation value to degrees
  const rotateInterpolate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const animatedStyle = {
    transform: [{ rotate: rotateInterpolate }],
  };

  if (!loading) {
    return null; // Return nothing if loading is false
  }

  return (
    <View style={tw`flex-1 justify-center items-center `}>
      <Animated.View style={animatedStyle}>
        <MaterialIcons name="refresh" size={78} color="#ffffff" />
      </Animated.View>
    </View>
  );
};

export default CustomLoader;
