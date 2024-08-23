import React from 'react';
import { Image, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import PhotoTaking from '@/components/PhotoTaking';
import AntDesign from '@expo/vector-icons/AntDesign';

type FaceUploadProps = {
  onSetStep?: (step: number) => void;
  onSetImages?: (images: string[]) => void;
  onConfirm?: () => void;
  images: string[];
};

const FaceUpload: React.FC<FaceUploadProps> = ({
  onSetImages,
  onConfirm,
  onSetStep,
  images = [],
}) => {
  const photoChange = (images: string[]) => {
    onSetImages && onSetImages(images);
  }

  const beforeOnConfirm = () => {
    if (images.length === 0) {
      alert('Please upload at least one image');
      return;
    }

    onConfirm && onConfirm();
  }

  return (
    <ScrollView className='p-8'>
      <AntDesign name='arrowleft' size={24} color='black' onPress={() => onSetStep && onSetStep(2)} />
      <Text className='text-center text-3xl font-bold mb-4 text-gray-700'>Face Recognition</Text>
      <Text className='text-center mb-10 text-gray-400'>Please upload face photos</Text>
      <View className='justify-center items-center mb-4'>
        <Image
          resizeMode='contain'
          source={require('@/assets/images/faceSnapt.png')}
          style={{width: 250, height: 250}} />
      </View>
      <PhotoTaking images={images} onPhotoChange={photoChange} maxImages={4}></PhotoTaking>
      <Text className='text-center mt-8 mb-5 text-gray-400'>Up to 4 images can be uploaded</Text>
      <TouchableOpacity className='mt-10 bg-blue-500 p-3 rounded-lg mb-40' onPress={beforeOnConfirm}>
        <Text className='text-white text-center text-lg'>Register</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default FaceUpload;