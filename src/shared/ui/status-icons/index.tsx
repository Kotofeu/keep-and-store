import { useState, useEffect, HTMLAttributes } from 'react';

import { classNames } from '@/shared/lib';
import { StatusValues } from '@/shared/types';

import { Icon } from '../icon';
import styles from './styles.module.scss';
import { Tooltip } from '../tooltip';

interface StatusIconsProps extends HTMLAttributes<HTMLDivElement> {
  statusValues?: StatusValues;
}

type StatusType = 'error' | 'success' | 'warning';

type StatusResult = {
  type: StatusType;
  value: string;
  backgroundColor: string;
} | null;

const getStatusColor = (type: StatusType): string => {
  switch (type) {
    case 'error':
      return 'var(--color-error)';
    case 'success':
      return 'var(--color-success)';
    case 'warning':
      return 'var(--color-warning)';
    default:
      return '';
  }
};

const getStatus = (statusValues?: StatusValues): StatusResult => {
  const statusTypes: StatusType[] = ['error', 'success', 'warning'];

  for (const type of statusTypes) {
    if (statusValues) {
      const value = statusValues[type];
      if (value) {
        return {
          type,
          value: typeof value === 'string' ? value : '',
          backgroundColor: getStatusColor(type)
        };
      }
    }
  }

  return null;
};

export const StatusIcons = (props: StatusIconsProps) => {
  const { className, statusValues, ...othersProps } = props;
  const [lastStatus, setLastStatus] = useState<StatusResult>(null);
  useEffect(() => {
    if (statusValues) {
      const newStatus = getStatus(statusValues);
      if (newStatus) {
        setLastStatus(newStatus);
      }
    }
  }, [statusValues]);

  const currentStatus = getStatus(statusValues);

  return (
    <div
      className={classNames(styles.status, { [styles.status_hidden]: !currentStatus }, [className])}
      {...othersProps}
    >
      <Tooltip
        className={styles.tooltip}
        content={lastStatus?.value || ''}
        backgroundColor={lastStatus?.backgroundColor}
        color={'var(--color-white)'}
      >
        <Icon type={lastStatus?.type || 'none'} aria-hidden />
      </Tooltip>
    </div>
  );
};
