import { Button } from '@/shared/ui/button';

import ColorItem from './colorItem';
import styles from './styles.module.scss';

export default function TestPage() {
  return (
    <main className={styles.container}>
      <h1>Color Palette Test</h1>

      {/* Primary Colors */}
      <section>
        <h2>Primary Colors</h2>
        <div className={styles.colorPalette}>
          <ColorItem name='Primary' color='var(--primary-color)' />
          <ColorItem name='Primary Hover' color='var(--primary-color-hover)' />
          <ColorItem name='Primary Active' color='var(--primary-color-active)' />
          <ColorItem name='Primary Disabled' color='var(--primary-color-disabled)' />
        </div>
      </section>

      {/* Secondary Colors */}
      <section>
        <h2>Secondary Colors</h2>
        <div className={styles.colorPalette}>
          <ColorItem name='Secondary' color='var(--secondary-color)' />
          <ColorItem name='Secondary Hover' color='var(--secondary-color-hover)' />
          <ColorItem name='Secondary Active' color='var(--secondary-color-active)' />
          <ColorItem name='Secondary Disabled' color='var(--secondary-color-disabled)' />
        </div>
      </section>

      {/* Text Colors */}
      <section>
        <h2>Text Colors</h2>
        <div className={styles.colorPalette}>
          <ColorItem name='Text Primary' color='var(--text-primary)' />
          <ColorItem name='Text Primary Hover' color='var(--text-primary-hover)' />
          <ColorItem name='Text Primary Active' color='var(--text-primary-active)' />
          <ColorItem name='Text Primary Disabled' color='var(--text-primary-disabled)' />
          <ColorItem name='Text Secondary' color='var(--text-secondary)' />
          <ColorItem name='Text Secondary Hover' color='var(--text-secondary-hover)' />
          <ColorItem name='Text Secondary Active' color='var(--text-secondary-active)' />
          <ColorItem name='Text Secondary Disabled' color='var(--text-secondary-disabled)' />
        </div>
      </section>

      {/* Accent Colors */}
      <section>
        <h2>Accent Colors</h2>
        <div className={styles.colorPalette}>
          <ColorItem name='Accent' color='var(--accent-color)' />
          <ColorItem name='Accent Hover' color='var(--accent-color-hover)' />
          <ColorItem name='Accent Active' color='var(--accent-color-active)' />
          <ColorItem name='Accent Disabled' color='var(--accent-color-disabled)' />
        </div>
      </section>

      {/* Field Colors - Primary */}
      <section>
        <h2>Field Colors - Primary</h2>
        <div className={styles.colorPalette}>
          <ColorItem name='Field Primary Border' color='var(--field-primary-border)' />
          <ColorItem name='Field Primary Background' color='var(--field-primary-background)' />
          <ColorItem name='Field Primary Text' color='var(--field-primary-text)' />
          <ColorItem name='Field Primary Label' color='var(--field-primary-label)' />
          <ColorItem name='Field Primary Placeholder' color='var(--field-primary-placeholder)' />
        </div>
      </section>

      {/* Field Colors - Secondary */}
      <section>
        <h2>Field Colors - Secondary</h2>
        <div className={styles.colorPalette}>
          <ColorItem name='Field Secondary Border' color='var(--field-secondary-border)' />
          <ColorItem name='Field Secondary Background' color='var(--field-secondary-background)' />
          <ColorItem name='Field Secondary Text' color='var(--field-secondary-text)' />
          <ColorItem name='Field Secondary Label' color='var(--field-secondary-label)' />
          <ColorItem name='Field Secondary Placeholder' color='var(--field-secondary-placeholder)' />
        </div>
      </section>

      <section>
        <h2>Buttons Primary</h2>
        <div className={styles.colorPalette}>
          <Button theme='primary' title='Primary'>
            Primary
          </Button>
          <Button theme='primary' title='Primary disabled' disabled>
            Primary disabled
          </Button>
        </div>
      </section>

      <section>
        <h2>Buttons Secondary</h2>
        <div className={styles.colorPalette}>
          <Button theme='secondary' title='Secondary'>
            Secondary
          </Button>
          <Button theme='secondary' title='Secondary disabled' disabled>
            Secondary disabled
          </Button>
        </div>
      </section>
    </main>
  );
}
