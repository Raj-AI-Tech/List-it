import React from 'react';
import * as Icons from 'lucide-react';

interface IconRendererProps {
  name: string;
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
}

export const IconRenderer: React.FC<IconRendererProps> = ({
  name,
  size = 20,
  color = 'currentColor',
  strokeWidth = 2.2,
  className = '',
}) => {
  const LucideIcon = (Icons as Record<string, any>)[name] || Icons.CheckSquare;
  return <LucideIcon size={size} color={color} strokeWidth={strokeWidth} className={className} />;
};
