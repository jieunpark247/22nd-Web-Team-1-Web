'use client';

import Link from 'next/link';
import { useProfile } from '@/api/user';
import { Button, Typography } from '@/components';
import { GradientText } from '@/app/home/components';
import { section, title, subTitle, button } from './HeroSection.css';
import { useLoginRedirect } from '@/hooks';

const HeroSection = () => {
  const { data: profile } = useProfile();
  const { loginPath } = useLoginRedirect();

  return (
    <section className={section}>
      <Typography variant="display2" as="h1" className={title}>
        <GradientText color="pinkBlue" text="매일 똑같은 " />
        <GradientText color="blue" text="삼성 생활" />
        <GradientText color="pink" text="을" />
        <br />
        <GradientText color="bluePink" text="더 다채롭게 만들어 줄 " />
        <GradientText color="blue" text="먹팟" />
      </Typography>
      <Typography variant="body1" as="h2" className={subTitle}>
        우리 회사 동료들과 점심시간 이용해
        <br />
        가볍게 대화해보세요!
      </Typography>

      <Link href={profile ? '/write' : loginPath}>
        <Button color="primary" className={button}>
          <Typography color="white" variant="title2">
            우리 회사 먹팟 만들기
          </Typography>
        </Button>
      </Link>
    </section>
  );
};

export default HeroSection;
