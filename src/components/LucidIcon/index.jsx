import { memo } from 'react';
import dynamic from 'next/dynamic';
import dynamicIconImports from 'lucide-react/dynamicIconImports';

const LucidIcon = ({ name, ...props }) => {
  const LucideIcon = dynamic(dynamicIconImports[name]);
  return <LucideIcon {...props} />;
};

export default memo(LucidIcon);