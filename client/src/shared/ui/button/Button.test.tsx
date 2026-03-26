import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { renderWithProviders } from '@shared/testing';
import { Button } from './Button';

describe('Button', () => {
  it('renders button with provided text', () => {
    renderWithProviders(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('applies default primary variant classes', () => {
    renderWithProviders(<Button>Primary</Button>);
    const button = screen.getByRole('button');
    expect(button.className).toContain('bg-button-primary-bg');
    expect(button.className).toContain('hover:bg-button-primary-bg-hover');
  });

  it('applies secondary variant classes', () => {
    renderWithProviders(<Button variant="secondary">Secondary</Button>);
    const button = screen.getByRole('button');
    expect(button.className).toContain('bg-transparent');
    expect(button.className).toContain('text-button-secondary-text');
  });

  it('merges custom className with variant classes', () => {
    renderWithProviders(<Button className="extra-class">Custom</Button>);
    const button = screen.getByRole('button');
    expect(button.className).toContain('extra-class');
    expect(button.className).toContain('bg-button-primary-bg');
  });

  it('passes standard button attributes', () => {
    renderWithProviders(
      <Button type="submit" disabled data-testid="btn">
        Submit
      </Button>
    );
    const button = screen.getByTestId('btn');
    expect(button).toHaveAttribute('type', 'submit');
    expect(button).toBeDisabled();
  });

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    renderWithProviders(<Button onClick={handleClick}>Click</Button>);
    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('forwards ref to native button element', () => {
    const ref = { current: null };
    renderWithProviders(<Button ref={ref}>Ref test</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
