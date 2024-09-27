import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import tw from '@/twrnc-config';

interface ProgressBarProps {
  progress1: number; 
  progress2: number;
  progress3: number;
}

const ThreeInOneProgressBar: React.FC<ProgressBarProps> = ({ progress1, progress2, progress3 }) => {
  return (
    <View style={tw`w-full flex flex-row items-center mt-5`}>
      <View style={[styles.progressSegment, { flex: 1 }]}>
      <View style={[styles.innerBar, { width: `${progress1}%` }]} />
      </View>

      <View style={tw`w-2`} />

      <View style={[styles.progressSegment, { flex:1 }]}>
      <View style={[styles.innerBar, { width: `${progress2}%` }]} />
      </View>

      <View style={tw`w-2`} />

      <View style={[styles.progressSegment, { flex:1}]}>
      <View style={[styles.innerBar, { width: `${progress3}%` }]} />
      </View>
    </View>
  );
};

export default ThreeInOneProgressBar;

const styles = StyleSheet.create({
  progressSegment: {
    height: 8, 
    backgroundColor: '#E0E0E0', 
    borderRadius: 10,
    overflow: 'hidden', 
  },
  innerBar: {
    height: '100%',
    backgroundColor: '#8D0CCA', 
  },
});
