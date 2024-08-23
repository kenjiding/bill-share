import React, { useState } from 'react';
import { TouchableOpacity, View, Modal } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function CalendarSelecter({
  visible,
  onCalendarVisible,
  onCalendarSelected
}: {
  visible: boolean,
  onCalendarVisible: (flag: boolean) => void,
  onCalendarSelected: (startDate: DateData | null, endDate: DateData | null) => void,
}) {
  const [selectedDates, setSelectedDates] = useState({});
  const [startDate, setStartDate] = useState<DateData | null>(null);
  const [endDate, setEndDate] = useState<DateData | null>(null);
  const { top: safeAreaTop } = useSafeAreaInsets(); // 获取安全区域的插图（包括导航条高度）

  const handleDayPress = (day: DateData) => {
    if (!startDate) {
      setStartDate(day);
      setSelectedDates({
        [day.dateString]: { selected: true, marked: true, selectedColor: 'blue' },
      });
    } else if (!endDate) {
      if (new Date(day.dateString) < new Date(startDate.dateString)) {
        setStartDate(day);
        setEndDate(null);
        setSelectedDates({
          [day.dateString]: { selected: true, marked: true, selectedColor: 'blue' },
        });
      } else {
        setEndDate(day);
        const newSelectedDates: any = { ...selectedDates };

        const start = new Date(startDate.dateString);
        const end = new Date(day.dateString);

        for (const key in newSelectedDates) {
          delete newSelectedDates[key];
        }

        for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
          const dateString = d.toISOString().split('T')[0];
          newSelectedDates[dateString] = { selected: true, marked: true, selectedColor: 'blue' };
        }

        setSelectedDates(newSelectedDates);
      }
    } else {
      // 已有开始和结束日期，重置选择
      setStartDate(day);
      setEndDate(null);
      setSelectedDates({
        [day.dateString]: { selected: true, marked: true, selectedColor: 'blue' },
      });
    }
  };

  const calendarSelectedHandler = () => {
    onCalendarVisible(false);
    onCalendarSelected(startDate, endDate);
    console.log('startDate, endDate: ', startDate, endDate);
  }

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => onCalendarVisible(false)}
    >
      <View style={{backgroundColor: 'rgba(0,0,0,0.5)'}} className='flex-1 justify-center items-center'>
        <View className='bg-white w-full'>
          <View className='flex-row justify-between p-4 border-b border-gray-200'>
            <TouchableOpacity>
              <AntDesign name="checkcircleo" size={24} color="#5f5f5f" onPress={calendarSelectedHandler} />
            </TouchableOpacity>
            <TouchableOpacity>
              <AntDesign name="closecircleo" size={24} color="#5f5f5f" onPress={() => onCalendarVisible(false)} />
            </TouchableOpacity>
          </View>
          <Calendar onDayPress={handleDayPress} markedDates={selectedDates} />
          <View className='h-10 bg-white'></View>
        </View>
      </View>
    </Modal>
  );
}

