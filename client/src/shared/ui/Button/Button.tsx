import { cva, type VariantProps } from 'class-variance-authority';
import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@shared/lib/classNames';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md px-4 py-2 font-semibold transition-colors border border-transparent disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary: 'bg-button-primary-bg text-button-primary-text hover:bg-button-primary-hover',
        secondary:
          'bg-transparent text-button-secondary-text border-button-secondary-border hover:bg-button-secondary-hover-bg hover:border-button-secondary-hover-border hover:text-button-secondary-hover-text'
      }
    },
    defaultVariants: {
      variant: 'primary'
    }
  }
);

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ variant, className, children, ...props }, ref) => (
  <button ref={ref} className={cn(buttonVariants({ variant }), className)} {...props}>
    {children}
  </button>
));

Button.displayName = 'Button';

export { Button, buttonVariants };
