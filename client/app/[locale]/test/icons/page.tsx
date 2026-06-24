import { FC } from 'react';
import { Icon, ICON_TYPES } from '@shared/ui/icon';

export const Icons: FC = ({}) => {
  return (
    <div className="custom-container">
      <div className="flex flex-wrap justify-center gap-2">
        {ICON_TYPES.map((type) => (
          <div
            key={type}
            className="bg-bg border-accent-3 flex w-30 flex-col items-center rounded-lg border p-4 shadow-sm"
          >
            <Icon type={type} className="text-icon-primary h-8 w-8" iconClassName="w-full h-full" />
            <span className="text-foreground mt-2 text-sm">{type}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Icons;
