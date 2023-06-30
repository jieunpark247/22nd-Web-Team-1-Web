import { notFound } from 'next/navigation';
import { Content } from '@/components';
import { Header } from '@/components/server';
import { Suspense } from '@suspensive/react';
import { HydratedBoardDetail, BoardDetailLoading } from '@/app/board/components';

const BoardDetailPage = async ({
  params: { id },
}: {
  params: {
    id: string;
  };
}) => {
  const boardId = Number(id);
  if (Number.isNaN(boardId)) notFound();

  return (
    <>
      <Header />
      <Content verticalCenter={false} style={{ paddingTop: '120px' }}>
        <Suspense fallback={<BoardDetailLoading />}>
          <HydratedBoardDetail boardId={boardId} />
        </Suspense>
      </Content>
    </>
  );
};

export default BoardDetailPage;
