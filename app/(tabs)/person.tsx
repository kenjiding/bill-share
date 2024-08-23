import React from 'react';
import { View, Text } from 'react-native';
import CommonWraper from '@/components/CommonWraper';
import ManagerBillDetail from '@/components/ManagerBillDetail';
import { useRouter } from 'expo-router';

type exploreProps = {
  // props
};

const Person: React.FC<exploreProps> = (props) => {
  const router = useRouter();
  return (
    <CommonWraper>
      <View>
        <ManagerBillDetail data={{
          water: 100,
          electric: 200,
          gas: 300,
        }}></ManagerBillDetail>
        <Text onPress={() => router.push('/login')}>Person</Text>
      </View>
    </CommonWraper>
  );
};

export default Person;