import { Button } from '@shared/ui/button';

export default function Home() {
  return (
    <div className="min-h-screen">
      <main className="container mx-auto p-8">
        <h1 className="mb-4 text-4xl font-bold">Заголовок первого уровня</h1>
        <h2 className="mb-3 text-3xl font-semibold">Заголовок второго уровня</h2>
        <p className="mb-4 text-lg">
          Это пример основного текста. В стандартной теме используется Open Sans, а в теме «блокнот» — моноширинный
          Courier Prime.
        </p>
        <p className="text-lg">Фон и цвет текста меняются в зависимости от выбранной комбинации.</p>
        <Button variant="secondary">Обычная</Button>
        <Button variant="secondary" disabled>
          Disabled
        </Button>
        <Button variant="primary">Обычная</Button>
        <Button variant="primary" disabled>
          Disabled
        </Button>
      </main>
    </div>
  );
}
