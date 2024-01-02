import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import { COLOR } from '../../utils/commonstyles/Color';

const CommonButton = ({title, onPress = () => {}}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        height: 45,
        width: '100%',
        backgroundColor: COLOR.Primary_Color,
        marginVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:10
      }}>
      <Text style={{color: COLOR.white, fontWeight: 'bold', fontSize: 15}}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CommonButton;
