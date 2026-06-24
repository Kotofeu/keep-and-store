'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@shared/i18n/routing';
import { Button } from '@shared/ui/button';
import { ErrorPageTemplate } from '@widgets/error-page-template';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const ErrorPage = ({ error, reset }: ErrorPageProps) => {
  const t = useTranslations('error');
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorPageTemplate
      code={t('code', { defaultValue: '500' })}
      title={t('title')}
      description={t('description')}
      actions={
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button variant="secondary" onClick={() => reset()}>
            {t('tryAgain', { defaultValue: 'Try again' })}
          </Button>
          <Button onClick={() => router.push('/')}>{t('goHome', { defaultValue: 'Go home' })}</Button>
        </div>
      }
    />
  );
};

export default ErrorPage;
