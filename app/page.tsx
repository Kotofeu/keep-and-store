// eslint-disable-next-line no-restricted-imports
import { redirect } from 'next/navigation';
import { type FC } from 'react';

import { routing } from '@shared/i18n';

const RootPage: FC = () => {
  redirect(routing.defaultLocale);
};

export default RootPage;
