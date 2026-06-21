import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@shared/utils/cn';

export const buttonVariants = cva(
  'flex items-center justify-center rounded-md px-4 py-2 font-semibold transition-colors border border-transparent disabled:pointer-events-none cursor-pointer',
  {
    variants: {
      variant: {
        primary:
          'bg-button-primary-bg text-button-primary-text hover:bg-button-primary-bg-hover active:bg-button-primary-bg-active disabled:bg-button-primary-bg-disabled disabled:text-button-primary-text-disabled',
        secondary: `bg-button-secondary-bg text-button-secondary-text border-button-secondary-border 
          hover:bg-button-secondary-bg-hover hover:border-button-secondary-border-hover hover:text-button-secondary-text-hover 
          active:bg-button-secondary-bg-active active:border-button-secondary-border-active active:text-button-secondary-text-active 
          disabled:border-button-secondary-border-disabled disabled:text-button-secondary-text-disabled disabled:bg-button-secondary-bg-disabled`,
        clear:
          'appearance-none block p-0 m-0 border-0 rounded-none font-normal text-inherit bg-transparent cursor-pointer disabled:pointer-events-auto transition-none'
      }
    },
    defaultVariants: {
      variant: 'primary'
    }
  }
);

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ variant, className, children, ...props }, ref) => (
  <button ref={ref} className={cn(buttonVariants({ variant }), className)} {...props}>
    {children}
  </button>
));
