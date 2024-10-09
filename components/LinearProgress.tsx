import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import tw from '@/twrnc-config';

interface ProgressBarProps {
  progress: number; 
 
}

const LinearProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <View style={tw`w-full flex flex-row items-center`}>
      <View style={[styles.progressSegment, { flex: 1 }]}>
      <View style={[styles.innerBar, { width: `${progress}%` }]} />
      </View>
    </View>
  );
};

export default LinearProgressBar;

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
