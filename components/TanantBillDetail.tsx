import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View, Text } from 'react-native';

type TanantBillDetailProps = {
  data: any
};

const TanantBillDetail: React.FC<TanantBillDetailProps> = ({
  data = {}
}) => {
  return (
    <View className='relative'>
      <LinearGradient
        colors={['#d5f0ff', '#78cbf8']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          paddingTop: 20,
          paddingBottom: 20,
          paddingLeft: 20,
          paddingRight: 20,
          borderRadius: 15,
        }}>
        <View className='flex-row items-center'>
          <Text className='font-bold text-2xl pr-3 font-sans'>Your bill</Text>
          <AntDesign name="linechart" size={20} color='#cfcfff' />
        </View>
        <View className='mt-6'>
          <View>
            <Text className='font-extralight text-xl pb-2'>Date</Text>
          </View>
          <View>
            <Text className='font-mono'>{data.date}</Text>
          </View>
        </View>
        <View
          className='absolute right-7 top-10 bg-30-opacity-white border-gray-100 border-1
          rounded-full w-20 h-20 flex items-center justify-center shadow-md'>
          <Text className='text-2xl font-sans text-white font-bold'>${data.amount}</Text>
        </View>
      </LinearGradient>
    </View>
  );
};

export default TanantBillDetail;