/* eslint-disable no-restricted-imports */
import { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import defaultMessages from '@shared/i18n/messages/en.json';

export const renderWithProviders = (ui: ReactElement) =>
  render(
    <NextIntlClientProvider locale="en" messages={defaultMessages}>
      {ui}
    </NextIntlClientProvider>
  );
