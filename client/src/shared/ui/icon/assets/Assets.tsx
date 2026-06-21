import { FC } from 'react';
import { cn } from '@shared/utils/cn';

interface IconProps {
  className?: string;
}

export const Cross: FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn('stroke-icon-primary', className)}
  >
    <path d="M23 1L1 23" />
    <path d="M1 1L23 23" />
  </svg>
);

export const ArrowDown: FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn('stroke-icon-primary', className)}
  >
    <path d="M12 17L22 8" />
    <path d="M12 17L2 8" />
  </svg>
);

export const Error: FC<IconProps> = ({ className }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn(className)}
  >
    <circle cx="12" cy="12" r="12" className="fill-status-error" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 5C11.4477 5 11 5.44772 11 6V14C11 14.5523 11.4477 15 12 15C12.5523 15 13 14.5523 13 14V6C13 5.44772 12.5523 5 12 5ZM12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18Z"
      className="fill-white"
    />
  </svg>
);

export const Success: FC<IconProps> = ({ className }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn(className)}
  >
    <circle cx="12" cy="12" r="12" className="fill-status-success" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.6066 8.3934C18.0976 8.8844 18.0976 9.6756 17.6066 10.1666L11.1066 16.6666C10.6156 17.1576 9.8244 17.1576 9.3334 16.6666L6.3934 13.7266C5.9024 13.2356 5.9024 12.4444 6.3934 11.9534C6.8844 11.4624 7.6756 11.4624 8.1666 11.9534L10.224 14.0107L15.8334 8.3934C16.3244 7.9024 17.1156 7.9024 17.6066 8.3934Z"
      className="fill-white"
    />
  </svg>
);

export const Warning: FC<IconProps> = ({ className }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn(className)}
  >
    <circle cx="12" cy="12" r="12" className="fill-status-warning" />
    <path
      d="M12 3.75L19.25 16C19.5278 16.5 19.25 17 18.75 17H5.25C4.75 17 4.47222 16.5 4.75 16L12 3.75Z"
      className="fill-white stroke-white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="15.6" r="1" strokeWidth="1" className="fill-white" />
    <path
      d="M12 7.6V13.1"
      className="stroke-status-warning"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const LightMode: FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn('stroke-icon-primary', className)}
  >
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="4" />
    <line x1="12" y1="20" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" />
    <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="4" y2="12" />
    <line x1="20" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" />
    <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
  </svg>
);

export const DarkMode: FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn('stroke-icon-primary', className)}
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

export const RuFlag: FC<IconProps> = ({ className }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn(className)}
  >
    <path
      d="M22.6027 17.625C23.4946 15.9472 24 14.0326 24 12C24 9.96736 23.4946 8.05277 22.6027 6.375H1.39733C0.505375 8.05277 0 9.96736 0 12C0 14.0326 0.505375 15.9472 1.39733 17.625H22.6027Z"
      fill="#0052B4"
    />
    <path
      d="M23.2722 16.125C21.5901 20.7204 17.178 24 12 24C6.82195 24 2.4099 20.7204 0.727783 16.125H23.2722Z"
      fill="#D80027"
    />
    <path
      d="M23.2722 7.875H0.727783C2.4099 3.27964 6.82195 0 12 0C17.178 0 21.5901 3.27964 23.2722 7.875Z"
      fill="#EEEEEE"
    />
    <circle cx="12" cy="12" r="11.5" stroke="currentColor" strokeWidth="1" className="stroke-icon-primary" />
  </svg>
);

export const UkUsFlag: FC<IconProps> = ({ className }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn(className)}
  >
    <g clipPath="url(#clip0_1902_10021)">
      <mask className={'mask-type-alpha'} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
        <path d="M20.4853 3.51469L20.4853 0H0V20.4853L3.51472 20.4853L16.5 16.5L20.4853 3.51469Z" fill="#FF00FF" />
      </mask>
      <g mask="url(#mask0_1902_10021)">
        <path
          d="M23.5876 15.1304C23.8565 14.1324 24 13.083 24 12L23.5876 8.86959C23.2868 7.75333 22.829 6.70147 22.2393 5.73914L19.4709 2.60869C17.4223 0.976816 14.8277 0.00120207 12.0052 0H11.9948C9.17234 0.00120158 6.57774 0.976815 4.5291 2.60869L1.76073 5.73914C1.17105 6.70147 0.713227 7.75333 0.412405 8.86959L0 12L1.13056e-06 12.0053C0.000465378 13.0864 0.143897 14.1341 0.412415 15.1304L1.76073 18.2609C2.49517 19.4594 3.43415 20.5191 4.52911 21.3913L12 24L19.4709 21.3913C20.5658 20.5191 21.5048 19.4594 22.2393 18.2609L23.5876 15.1304Z"
          fill="#EEEEEE"
        />
        <path
          d="M23.5876 8.86951C23.8565 9.86751 24 10.917 24 12H0C0 10.917 0.143461 9.86751 0.412417 8.86951H23.5876Z"
          fill="#D80027"
        />
        <path
          d="M19.4709 2.60864C20.5658 3.48085 21.5048 4.54052 22.2393 5.7391H1.76073C2.49517 4.54052 3.43416 3.48085 4.52911 2.60864H19.4709Z"
          fill="#D80027"
        />
        <path
          d="M22.2393 18.2608C22.829 17.2985 23.2868 16.2466 23.5876 15.1304H0.412404C0.713226 16.2466 1.17105 17.2985 1.76072 18.2608H22.2393Z"
          fill="#D80027"
        />
        <path
          d="M19.4709 21.3913H4.5291C6.57651 23.0222 9.16926 23.9976 11.9897 24H12.0103C14.8307 23.9976 17.4235 23.0222 19.4709 21.3913Z"
          fill="#D80027"
        />
        <path
          d="M0 11.5118C0.256135 5.11073 5.52635 0 11.9902 0C11.9935 0 11.9967 1.29233e-06 12 3.87651e-06V12H0V11.5118Z"
          fill="#0052B4"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.13309 2.15774C5.5253 1.88359 5.93467 1.63227 6.35925 1.40574L6.40412 1.54382H7.71189L6.65388 2.31251L7.058 3.55628L5.99999 2.78759L4.94198 3.55628L5.3461 2.31251L5.13309 2.15774ZM1.38691 6.39465C1.6638 5.87149 1.97824 5.37125 2.32664 4.89754L2.50412 5.44378H3.8119L2.75388 6.21247L3.15801 7.45624L2.09999 6.68755L1.04198 7.45624L1.38691 6.39465ZM9.89999 0.300049L10.3041 1.54382H11.6119L10.5539 2.31251L10.958 3.55628L9.89999 2.78759L8.84198 3.55628L9.24611 2.31251L8.18809 1.54382H9.49587L9.89999 0.300049ZM5.99999 4.20001L6.40412 5.44378H7.71189L6.65388 6.21247L7.058 7.45624L5.99999 6.68755L4.94198 7.45624L5.3461 6.21247L4.28809 5.44378H5.59587L5.99999 4.20001ZM10.3041 5.44378L9.89999 4.20001L9.49587 5.44378H8.18809L9.24611 6.21247L8.84198 7.45624L9.89999 6.68755L10.958 7.45624L10.5539 6.21247L11.6119 5.44378H10.3041ZM2.09999 8.10002L2.50412 9.34379H3.8119L2.75388 10.1125L3.15801 11.3563L2.09999 10.5876L1.04198 11.3563L1.44611 10.1125L0.388092 9.34379H1.69587L2.09999 8.10002ZM6.40412 9.34379L5.99999 8.10002L5.59587 9.34379H4.28809L5.3461 10.1125L4.94198 11.3563L5.99999 10.5876L7.058 11.3563L6.65388 10.1125L7.71189 9.34379H6.40412ZM9.89999 8.10002L10.3041 9.34379H11.6119L10.5539 10.1125L10.958 11.3563L9.89999 10.5876L8.84198 11.3563L9.24611 10.1125L8.18809 9.34379H9.49587L9.89999 8.10002Z"
          fill="#EEEEEE"
        />
      </g>
      <path
        d="M20.4853 3.51477C22.6569 5.68634 24 8.68634 24 12C24 18.6255 18.6306 23.9968 12.0059 24C12.004 24 12.002 24 12 24C11.998 24 11.9961 24 11.9941 24C8.87351 23.9985 6.03147 22.8059 3.89798 20.8521L9.00003 15.75V15L10.5 13.5H13.5V10.5L20.4853 3.51477Z"
        fill="#EEEEEE"
      />
      <path
        d="M21.5358 4.71423C22.4972 5.97062 23.2159 7.42256 23.622 9.00004L17.25 9.00004L21.5358 4.71423Z"
        fill="#0052B4"
      />
      <path d="M21.5358 19.2858C22.4972 18.0294 23.2159 16.5775 23.622 15H17.25L21.5358 19.2858Z" fill="#0052B4" />
      <path d="M19.2858 21.5358L15 17.25L15 23.622C16.5775 23.216 18.0294 22.4972 19.2858 21.5358Z" fill="#0052B4" />
      <path
        d="M9.00003 23.622L9.00003 17.25L4.7142 21.5359C5.9706 22.4973 7.42255 23.216 9.00003 23.622Z"
        fill="#0052B4"
      />
      <path
        d="M23.9072 13.5C23.9684 13.0086 24 12.508 24 12C24 11.492 23.9684 10.9914 23.9072 10.5L13.5 10.5L10.5 13.5L10.5 23.9072C10.9895 23.9682 11.4881 23.9998 11.9941 24C11.9961 24 11.998 24 12 24C12.002 24 12.004 24 12.0059 24C12.5119 23.9998 13.0105 23.9682 13.5 23.9072L13.5 13.5L23.9072 13.5Z"
        fill="#D80027"
      />
      <path
        d="M21.2023 19.7023L16.5 15H15L20.4853 20.4853C20.7356 20.235 20.9748 19.9737 21.2023 19.7023Z"
        fill="#D80027"
      />
      <path
        d="M4.29775 21.2023L9.00003 16.5V15L3.51474 20.4853C3.765 20.7356 4.02627 20.9748 4.29775 21.2023Z"
        fill="#D80027"
      />
    </g>
    <defs>
      <clipPath>
        <rect width="24" height="24" fill="var(--color-white)" />
      </clipPath>
    </defs>
    <circle cx="12" cy="12" r="11.5" stroke="currentColor" strokeWidth="1" className="stroke-icon-primary" />
  </svg>
);
