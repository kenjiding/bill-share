import { Image, ScrollView, Text, View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useUserStore } from '@/store';
import Entypo from '@expo/vector-icons/Entypo';
import TanantBillDetail from '@/components/TanantBillDetail';
import ManagerBillDetail from '@/components/ManagerBillDetail';
import ResourceUsageList, { CategoryEnum } from '@/components/ResourceUsage';
import CommonWraper from '@/components/CommonWraper';

const mockResourceUsageList = [
  {
    id: 1,
    category: 'water' as CategoryEnum,
    amount: 2.124,
    date: '02/04/2024',
  },
  {
    id: 2,
    category: 'electric' as CategoryEnum,
    amount: 12.124,
    date: '02/04/2024',
  },
  {
    id: 3,
    category: 'gas' as CategoryEnum,
    amount: 3.4,
    date: '02/04/2024',
  },
  {
    id: 1,
    category: 'water' as CategoryEnum,
    amount: 2.124,
    date: '02/04/2024',
  },
  {
    id: 2,
    category: 'electric' as CategoryEnum,
    amount: 12.124,
    date: '02/04/2024',
  },
  {
    id: 3,
    category: 'gas' as CategoryEnum,
    amount: 3.4,
    date: '02/04/2024',
  },
  {
    id: 1,
    category: 'water' as CategoryEnum,
    amount: 2.124,
    date: '02/04/2024',
  },
  {
    id: 2,
    category: 'electric' as CategoryEnum,
    amount: 12.124,
    date: '02/04/2024',
  },
  {
    id: 3,
    category: 'gas' as CategoryEnum,
    amount: 3.4,
    date: '02/04/2024',
  },
];

export default function HomeScreen() {
  // const { user: { username, email } } = useUserStore();

  return (
    <CommonWraper>
      <ScrollView className='pl-6 pr-6'>
        <View className='flex-row h-24'>
          <View className='flex-row items-center flex-grow'>
            <View className="w-20 h-20 rounded-full overflow-hidden">
              <Image
                className="w-full h-full"
                source={require('@/assets/images/default-avator.png')}
                resizeMode="cover"
              />
            </View>
            <View>
              <Text className='font-sans'>Hello Tanant</Text>
              <Text className='pt-3 font-bold text-lg'>Monica</Text>
            </View>
          </View>
          <View className='flex-row items-center justify-end pr-4'>
            <Entypo className='mr-2' name="bell" size={24} color='#b30b0b' />
            <AntDesign name="setting" size={24} color="black" />
          </View>
        </View>
        <View className='mt-3'>
          <TanantBillDetail data={{
            date: '01/04/2024 - 30/04/2024',
            amount: 459
          }}></TanantBillDetail>
        </View>
        <View className='mt-3'>
          <ManagerBillDetail data={{
            water: 2.4,
            electric: 12.1,
            gas: 3.8,
          }}
          linearGradientStyles={{
            colors: ['#e7ebf6', '#a2b6f7'],
            start: { x: 0, y: 0 },
            end: { x: 1, y: 1 },
          }}></ManagerBillDetail>
        </View>
        <View className='mt-8'>
          <Text className='text-2xl font-sans'>Resource Usage</Text>
          <ResourceUsageList resourceUsageList={mockResourceUsageList} />
        </View>
      </ScrollView>
    </CommonWraper>
  );
}
