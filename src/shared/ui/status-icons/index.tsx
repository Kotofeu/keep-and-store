import { classNames } from '@/shared/lib';

import { Icon } from '../icon';
import styles from './styles.module.scss';

interface StatusIconsProps {
  className?: string;
  error?: boolean | string | null;
  success?: boolean | string | null;
  warming?: boolean | string | null;
}

type StatusResult = {
  type: 'error' | 'success' | 'warming';
  value: string;
} | null;

const getStatus = (props: StatusIconsProps): StatusResult => {
  const entries = Object.entries(props) as [keyof StatusIconsProps, string | boolean][];

  for (const [type, value] of entries) {
    if (type === 'className') {
      continue;
    }

    if (value) {
      return {
        type: type as 'error' | 'success' | 'warming',
        value: typeof value === 'string' ? value : ''
      };
    }
  }

  return null;
};

export const StatusIcons = (props: StatusIconsProps) => {
  const status = getStatus(props);

  if (!status) {
    return null;
  }

  return (
    <div className={classNames(styles.status, {}, [props.className])}>
      <Icon type={status.type} title={status.value || undefined} />
    </div>
  );
};
