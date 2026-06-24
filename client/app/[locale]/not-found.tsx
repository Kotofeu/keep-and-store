'use client';

import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@shared/i18n/routing';
import { Button } from '@shared/ui/button';
import { ErrorPageTemplate } from '@widgets/error-page-template';

const NotFoundPage: FC = () => {
  const t = useTranslations('not-found');
  const router = useRouter();

  return (
    <ErrorPageTemplate
      code="404"
      title={t('title')}
      description={t('description')}
      actions={<Button onClick={() => router.push('/')}>{t('goHome')}</Button>}
    />
  );
};

export default NotFoundPage;
