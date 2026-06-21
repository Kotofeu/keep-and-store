import { FC } from 'react';
import { notFound } from 'next/navigation';

const CatchAllPage: FC = () => {
  notFound();
};

export default CatchAllPage;
