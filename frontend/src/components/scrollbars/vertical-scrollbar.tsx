import React from 'react';

interface VerticalScrollbarProps {
  children: React.ReactNode;
}

const VerticalScrollbar = ({ children }: VerticalScrollbarProps) => {
  return (
    <div className="vertical-scrollbar h-full overflow-y-auto">{children}</div>
  );
};

export default VerticalScrollbar;
