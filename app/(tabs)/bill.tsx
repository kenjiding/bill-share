import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, Image, TouchableOpacity } from 'react-native';
import CommonWraper from '@/components/CommonWraper';
import ManagerBillDetail from '@components/ManagerBillDetail';
import DateCalendar from '@components/DateCalendar';

type billProps = {
  // props
};

const Bill: React.FC<billProps> = (props) => {
  const [tanantIdSelected, setTanantIdSelected] = useState<number[]>([]);
  const [form, setForm] = useState({
    electric: '',
    water: '',
    gas: '',
  });

  const onDateChange = (date: any) => {
    console.log('date: ', date);
  }

  const itemClick = (item: number) => {
    const set = new Set<number>(tanantIdSelected);
    if(set.has(item)) {
      set.delete(item);
    } else {
      set.add(item);
    }
    setTanantIdSelected(Array.from(set));
  }


  return (
    <CommonWraper>
      <ScrollView className='pt-5 pb-5 pl-8 pr-8'>
        <ManagerBillDetail data={{
          water: 100,
          electric: 200,
          gas: 300,
        }} />
        <View>
          <DateCalendar onDateChange={onDateChange} />
          <View className='mt-5 flex-row items-center'>
            <Text className='pl-1 w-24 text-lg font-serif mr-2 text-gray-600'>elec bill</Text>
            <TextInput
              className='p-3 border-1 bg-white border-gray-300 rounded-md flex-1 text-right text-gray-600'
              onChangeText={val => setForm({ ...form, electric: val})}
              value={form.electric}
              placeholder="please input electric bill" />
            <Text className='text-lg font-light ml-2 text-gray-600'>$</Text>
          </View>
          <View className='mt-5 flex-row items-center'>
            <Text className='pl-1 w-24 text-lg font-serif mr-2 text-gray-600'>water bill</Text>
            <TextInput
              className='p-3 border-1 bg-white border-gray-300 rounded-md flex-1 text-right text-gray-600'
              onChangeText={val => setForm({ ...form, water: val})}
              value={form.water}
              placeholder="please input water bill" />
            <Text className='text-lg font-light ml-2 text-gray-600'>$</Text>
          </View>
          <View className='mt-5 flex-row items-center'>
            <Text className='pl-1 w-24 text-lg font-serif mr-2 text-gray-600'>gas bill</Text>
            <TextInput
              className='p-3 border-1 bg-white border-gray-300 rounded-md flex-1 text-right text-gray-600'
              onChangeText={val => setForm({ ...form, gas: val})}
              value={form.gas}
              placeholder="please input gas bill" />
            <Text className='text-lg font-light ml-2 text-gray-600'>$</Text>
          </View>
        </View>
        <View className='mt-5 mb-14'>
          {
            [1,2,3,4,5,6].map((item, index) => (
            <TouchableOpacity key={index} onPress={() => itemClick(item)}>
              <View className='border-b-1 border-gray-200 pb-8 pt-6'>
                <View className='flex-row items-center justify-between'>
                  <View className='flex-row items-center'>
                    <View className="w-16 h-16 rounded-full overflow-hidden">
                      <Image
                        className="w-full h-full"
                        source={require('@/assets/images/default-avator.png')}
                        resizeMode="cover"
                      />
                    </View>
                    <Text className='ml-2 font-bold'>Monica</Text>
                  </View>
                  <View className={`w-7 h-7 rounded-full border-1
                  border-gray-300 ${tanantIdSelected.includes(item) ? 'bg-blue-400' : 'bg-gray-100'}`}></View>
                </View>
                <View className='flex-row items-center justify-center'>
                  <View className='flex-1'>
                    <Text className='text-center text-md text-gray-600'>elec</Text>
                    <Text className='text-xl font-sans text-center'>12kw</Text>
                  </View>
                  <View className='flex-1 border-l-1 border-gray-200 border-r-1'>
                    <Text className='text-center text-md text-gray-600'>water</Text>
                    <Text className='text-xl font-sans text-center'>32kj</Text>
                  </View>
                  <View className='flex-1'>
                    <Text className='text-center text-md text-gray-600'>elec</Text>
                    <Text className='text-xl font-sans text-center'>52mj</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>))
          }
        </View>
        <TouchableOpacity>
          <View className='flex-row items-center justify-center border-1
          border-gray-300 rounded-md py-4 w-full bg-blue-400 mb-24'>
            <Text className='text-white text-lg font-bold'>post bill</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </CommonWraper>
  );
};

export default Bill;