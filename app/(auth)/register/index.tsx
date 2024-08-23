import React, { useEffect, useState } from 'react';
import Register from './UserRegister';
import IdCard from './IdCardUpload';
import FaceUpload from './FaceUpload';
import Property, { IProperty } from './Property';
import CommonWraper from '@/components/CommonWraper';
import { register } from '@/service/auth';
import { catchError } from '@utils/helper';
import { useGlobalStore } from '@/store';
import { useRouter } from 'expo-router';

type indexProps = {
  // props
};
interface IForm {
  phone: string;
  password: string;
  confirmPassword: string;
  email: string;
  username: string;
  role: string;
  propertyInfo: IProperty,
  idCardImages: string[];
  faceImages: string[];
}

const Index: React.FC<indexProps> = (props) => {
  const router = useRouter();
  const { updateLoading } = useGlobalStore();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<IForm>({
    phone: '',
    password: '',
    username: '',
    confirmPassword: '',
    email: Math.random().toString(36).substring(2) + '@gmail.com',
    propertyInfo: {
      address: '',
      state: '',
      code: '',
      city: '',
      propertyPhotos: [],
    },
    role: 'tenant',
    idCardImages: [],
    faceImages: []
  });

  const registed = async () => {
    updateLoading({ loading: true, text: 'registering' });
    const tempData = {...form, propertyInfo: {...form.propertyInfo, propertyPhotos: []} };
    const [err] = await catchError<any>(
      fetch('http://192.168.1.105:8080/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tempData),
      }));
    updateLoading({ loading: false });
    if (err) return;
    router.replace('/login');
  }

  const beforeSetStep = (num: number) => {
    setStep(num);
  }

  return (
    <CommonWraper linearGradientConf={{
      colors: ['#E4F2FF', '#B8DDFF'],
      start: { x: 0.5, y: 0 },
      end: { x: 0.5, y: 1 }
    }}>
      {
        step === 1 &&
        <Register
          data={form}
          onSetFormData={(data) => setForm({...form, ...data })}
          onSetStep={beforeSetStep} />
      }
      {
        step === 2 &&
        <IdCard
          onSetImages={(images) => setForm({...form, idCardImages: images })}
          images={form.idCardImages}
          onSetStep={beforeSetStep} />
      }
      {
        step === 3 && 
        <FaceUpload
          onSetImages={(images) => setForm({...form, faceImages: images })}
          images={form.faceImages}
          onConfirm={registed} 
          onSetStep={beforeSetStep} />
      }
      {
        step === 4 &&
        <Property
          data={form.propertyInfo}
          onSetStep={beforeSetStep}
          onConfirm={registed}
          onSetFormData={(data) => setForm({...form, propertyInfo: data })}></Property>
      }
    </CommonWraper>
  );
};

export default Index;