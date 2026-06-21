'use client';

import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@shared/i18n/routing';
import { Button } from '@shared/ui/button';

const NotFoundPage: FC = () => {
  const t = useTranslations('not-found');
  const router = useRouter();

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="relative flex flex-col items-center text-center">
        <div
          aria-hidden="true"
          className="bg-accent-2/8 z-bg absolute top-1/2 left-1/2 h-120 w-120 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        />
        <div
          aria-hidden="true"
          className="border-accent-3/15 z-bg absolute -top-12 -left-20 h-40 w-40 rounded-full border"
        />
        <div
          aria-hidden="true"
          className="border-accent-3/30 z-bg absolute -right-16 -bottom-14 h-36 w-36 rotate-12 rounded-2xl border"
        />
        <div
          aria-hidden="true"
          className="border-accent-5/10 z-bg absolute top-1/3 -left-30 h-15 w-15 rounded-full border"
        />
        <div
          aria-hidden="true"
          className="bg-accent-2/60 z-bg ring-accent-2/20 absolute top-0 right-4 h-3 w-3 rounded-full ring-2"
        />
        <div
          aria-hidden="true"
          className="bg-accent-2/10 z-bg ring-accent-2/40 absolute bottom-2 left-4 h-2 w-2 rounded-full ring-1"
        />
        <div
          aria-hidden="true"
          className="bg-accent-2/50 z-bg ring-accent-2/30 absolute top-1/2 -right-8 h-2.5 w-2.5 rounded-full ring-1"
        />

        <h1 className="from-accent-4 to-accent-5 mb-4 bg-linear-to-b bg-clip-text text-9xl font-bold text-transparent">
          404
        </h1>
        <div aria-hidden="true" className="bg-accent-1/50 mb-6 h-1 w-28 rounded-full" />
        <h2 className="text-foreground mb-2 text-2xl font-semibold">{t('title')}</h2>
        <p className="text-foreground/70 mb-8 max-w-xs">{t('description')}</p>
        <Button onClick={() => router.push('/')}>{t('goHome')}</Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
