'use client';
import FirstStep from './components/Form/FirstStep';
import SecondStep from './components/Form/SecondStep';
import { Typography } from '@/components';
import { wrapper } from './style.css';
import { useEffect } from 'react';
import { useIsMobile, useFunnel } from '@/hooks';

export default function Write() {
  const [step, { nextStep }] = useFunnel(['1', '2']);
  const mobile = useIsMobile();

  const preventClose = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = '';
  };

  useEffect(() => {
    (() => {
      window.addEventListener('beforeunload', preventClose);
    })();
    return () => {
      window.removeEventListener('beforeunload', preventClose);
    };
  }, []);

  return (
    <div className={wrapper}>
      <Typography variant={mobile ? 'title1' : 'heading1'} as="p" color="primary500">
        우리 회사 먹팟 만들기
      </Typography>
      {step === '1' && <FirstStep nextStep={nextStep} />}
      {step === '2' && <SecondStep />}
    </div>
  );
}
