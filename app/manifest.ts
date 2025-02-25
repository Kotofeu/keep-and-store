import { MetadataRoute } from 'next';
import { getTranslations } from 'next-intl/server';

/*
  TODO
  https://developer.mozilla.org/en-US/docs/Web/Manifest/file_handlers
  1. Поменять id
  2. Поменять file_handlers
  3. Поменять цвета theme_color и background_color
  4. Загрузить новые скриншоты и иконки
  5. Поменять описание и категории
  6. Подумать над orientation
  7. Добавить манифест для ru?
  8. Настроить share_target для запросов и scope
  9. Настроить страницы shortcuts
*/
const manifest = async (): Promise<MetadataRoute.Manifest> => {
  const locale = 'en';
  const t = await getTranslations({ locale, namespace: 'Manifest' });
  return {
    //id: 'https://localhost:4000',
    name: t('name'),
    short_name: t('short_name'),
    start_url: '/',
    theme_color: '#121212',
    background_color: '#121212',
    icons: [
      {
        src: 'icons/android-icon-36x36.png',
        sizes: '36x36',
        type: 'image/png'
      },
      {
        src: 'icons/android-icon-48x48.png',
        sizes: '48x48',
        type: 'image/png'
      },
      {
        src: 'icons/android-icon-72x72.png',
        sizes: '72x72',
        type: 'image/png'
      },
      {
        src: 'icons/android-icon-96x96.png',
        sizes: '96x96',
        type: 'image/png'
      },
      {
        src: 'icons/android-icon-144x144.png',
        sizes: '144x144',
        type: 'image/png'
      },
      {
        src: 'icons/android-icon-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: 'icons/apple-icon-57x57.png',
        sizes: '57x57',
        type: 'image/png'
      },
      {
        src: 'icons/apple-icon-60x60.png',
        sizes: '60x60',
        type: 'image/png'
      },
      {
        src: 'icons/apple-icon-72x72.png',
        sizes: '72x72',
        type: 'image/png'
      },
      {
        src: 'icons/apple-icon-76x76.png',
        sizes: '76x76',
        type: 'image/png'
      },
      {
        src: 'icons/apple-icon-114x114.png',
        sizes: '114x114',
        type: 'image/png'
      },
      {
        src: 'icons/apple-icon-120x120.png',
        sizes: '120x120',
        type: 'image/png'
      },
      {
        src: 'icons/apple-icon-144x144.png',
        sizes: '144x144',
        type: 'image/png'
      },
      {
        src: 'icons/apple-icon-152x152.png',
        sizes: '152x152',
        type: 'image/png'
      },
      {
        src: 'icons/apple-icon-180x180.png',
        sizes: '180x180',
        type: 'image/png'
      },
      {
        src: 'icons/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png'
      },
      {
        src: 'icons/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png'
      },
      {
        src: 'icons/favicon-96x96.png',
        sizes: '96x96',
        type: 'image/png'
      },
      {
        src: 'icons/ms-icon-70x70.png',
        sizes: '70x70',
        type: 'image/png'
      },
      {
        src: 'icons/ms-icon-144x144.png',
        sizes: '144x144',
        type: 'image/png'
      },
      {
        src: 'icons/ms-icon-150x150.png',
        sizes: '150x150',
        type: 'image/png'
      },
      {
        src: 'icons/ms-icon-310x310.png',
        sizes: '310x310',
        type: 'image/png'
      },
      {
        src: 'favicon.ico',
        sizes: 'any',
        type: 'image/x-icon'
      }
    ],
    screenshots: [
      {
        src: 'images/screenshot-wide.png',
        sizes: '1280x800',
        type: 'image/png'
      },
      {
        src: 'images/screenshot-portrait.png',
        sizes: '800x1280',
        type: 'image/png'
      }
    ],
    dir: 'ltr',
    display: 'standalone',
    categories: [
      'Security',
      'Data Storage',
      'Productivity',
      'Password Managers',
      'Notes',
      'Archiving',
      'Information Management'
    ],
    description: t('description'),
    orientation: 'portrait-primary',
    lang: locale
  };
};

export default manifest;
