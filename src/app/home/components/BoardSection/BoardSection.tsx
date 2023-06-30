import { Typography } from '@/components';
import { Suspense } from '@suspensive/react';
import { HydratedBoardCardList, BoardCardListLoading } from '@/app/home/components';
import { section, title, listGrid } from './BoardSection.css';

const BoardSection = async () => {
  return (
    <section className={section}>
      <Typography variant="heading2" as="h2" color="navy" className={title}>
        지금 먹팟을 찾고 있는 동료
      </Typography>
      <ul className={listGrid}>
        <Suspense fallback={<BoardCardListLoading />}>
          <HydratedBoardCardList />
        </Suspense>
      </ul>
    </section>
  );
};

export default BoardSection;
