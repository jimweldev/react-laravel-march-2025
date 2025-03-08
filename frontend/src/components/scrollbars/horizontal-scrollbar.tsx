import React from 'react';

interface HorizontalScrollbarProps {
  children: React.ReactNode;
}

const HorizontalScrollbar = ({ children }: HorizontalScrollbarProps) => {
  return (
    <div className="horizontal-scrollbar w-full overflow-x-auto">
      {children}
    </div>
  );
};

export default HorizontalScrollbar;
