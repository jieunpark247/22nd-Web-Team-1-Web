'use client';
import FirstStep from './components/Form/FirstStep';
import SecondStep from './components/Form/SecondStep';
import useFunnel from '@/hooks/useFunnel/useFunnel';
import { Typography } from '@/components';
import { wrapper } from './style.css';
import { useEffect } from 'react';

export default function StepOnePage() {
  const [step, { nextStep }] = useFunnel(['1', '2']);

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
      <Typography variant="heading1" as="p" color="primary500">
        우리 회사 먹팟 만들기
      </Typography>
      {step === '1' && <FirstStep nextStep={nextStep} />}
      {step === '2' && <SecondStep />}
    </div>
  );
}
