import React, { useCallback, useEffect, useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';
import { TouchableOpacity, View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import dayjs from 'dayjs';
import DateCalendar from './DateCalendar';

export enum CategoryEnum {
  electric = 'electric',
  water = 'water',
  gas = 'gas',
}

export interface resourceUsage {
  id: number;
  category: CategoryEnum;
  amount: number;
  date: string;
  username?: string;
}

type ResourceUsageProps = {
  needDate?: boolean,
  resourceUsageList: resourceUsage[],
  enableRoute?: boolean
};

const categoryMap = {
  electric: <MaterialIcons name="electric-bolt" size={24} color="#f2d452" />,
  water: <Entypo name="water" size={20} color="#1ad732" />,
  gas: <Entypo name="air" size={20} color="#f37e3d" />
}

const categoryStyles = 'rounded-lg flex-1 h-10 items-center justify-center flex-row border-1 border-blue-200';

const ResourceUsage: React.FC<ResourceUsageProps> = ({
  resourceUsageList = [],
  needDate,
  enableRoute = true
}) => {
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(() => {
    const currentDate = dayjs().format('MM/DD/YYYY');
    return {
      start: currentDate,
      end: currentDate,
    }
  });
  const router = useRouter();

  useEffect(() => {
    console.log('getResouceUsageByDate: ', {
      ...date,
      category,
    });
  }, [category, date]);

  const handlePress = () => {
    enableRoute && router.push('/resourceUsageScreen');
  };

  const categoryHandlePress = (category: CategoryEnum) => {
    setCategory(category);
  }

  const onDateChange = (dateData: any) => {
    setDate({...dateData});
  }

  const touchableComponent = (item: resourceUsage) => {
    const ItemCom = <View className='flex-row items-center justify-between border-b border-gray-100'>
      <View className={`flex-row items-center justify-between pt-3 pb-4 ${enableRoute ? 'mt-3' : 'mt-1'}`}>
        { categoryMap[item.category] }
        <View className=''>
          { item.username && <Text className='ml-4 mb-3 font-bold'>{item.username}</Text> }
          <Text className='ml-4 text-gray-500'>{item.date}</Text>
        </View>
      </View>
      <View className='flex-row items-center justify-center mt-1'>
        <Text className='font-bold text-xl mr-3' style={{color: '#6270EE'}}>{item.amount}A</Text>
        { enableRoute && <AntDesign name="right" size={20} color="#dddcdc" /> }
      </View>
    </View>;

    return enableRoute ? <TouchableOpacity onPress={handlePress}>{ItemCom}</TouchableOpacity> : ItemCom;
  }

  return (
    <View>
      <View className='flex-row items-center justify-between mt-4'>
        <TouchableOpacity
          style={{backgroundColor: 'rgba(129, 218, 237, 0.5)'}}
          className={`${categoryStyles} mr-4`}
          onPress={() => categoryHandlePress(CategoryEnum.electric)} >
          <MaterialIcons name="electric-bolt" size={20} color="#f2d452" />
          <Text className='ml-1'>elec</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{backgroundColor: 'rgba(129, 218, 237, 0.5)'}}
          className={`${categoryStyles} mr-4`}
          onPress={() => categoryHandlePress(CategoryEnum.water)} >
          <Entypo name="water" size={18} color="#1ad732" />
          <Text className='ml-2'>water</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{backgroundColor: 'rgba(129, 218, 237, 0.5)'}}
          className={categoryStyles}
          onPress={() => categoryHandlePress(CategoryEnum.gas)}>
          <Entypo name="air" size={18} color="#f37e3d" />
          <Text className='ml-2'>gas</Text>
        </TouchableOpacity>
      </View>
      {
        needDate && <DateCalendar onDateChange={onDateChange} />
      }
      <View className='bg-white rounded-xl mt-5 pl-7 pr-7 pb-4'>
        {
          resourceUsageList.map((item, i) => {
            return (
              <View key={i}>
                { touchableComponent(item) }
              </View>
            )
          })
        }
      </View>
    </View>
  );
};

export default ResourceUsage;