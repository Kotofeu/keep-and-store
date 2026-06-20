import { FC } from 'react';
import { cn } from '@shared/utils/cn';

interface ColorPaletteProps {
  className?: string;
  colorsClass: string[];
}

const sectorClipPath = (startAngle: number, endAngle: number, steps = 60): string => {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const centerX = 50;
  const centerY = 50;
  const radius = 50;

  const points: string[] = [`${centerX}% ${centerY}%`];

  const angleRange = endAngle - startAngle;
  const stepDeg = angleRange / steps;

  for (let i = 0; i <= steps; i++) {
    const angle = startAngle + i * stepDeg;
    const rad = toRad(angle - 90);
    const x = centerX + radius * Math.cos(rad);
    const y = centerY + radius * Math.sin(rad);
    points.push(`${x}% ${y}%`);
  }

  return `polygon(${points.join(', ')})`;
};

export const ColorPalette: FC<ColorPaletteProps> = ({ className, colorsClass }) => {
  if (colorsClass.length === 0) {
    return null;
  }

  const total = colorsClass.length;
  const sectorAngle = 360 / total;

  return (
    <div className={cn('relative overflow-hidden rounded-full', className)}>
      {colorsClass.map((bgClass, index) => {
        const startAngle = index * sectorAngle;
        const endAngle = startAngle + sectorAngle;

        return (
          <div
            key={index}
            className={cn('absolute inset-0', bgClass)}
            style={{
              clipPath: sectorClipPath(startAngle, endAngle)
            }}
          />
        );
      })}
    </div>
  );
};
