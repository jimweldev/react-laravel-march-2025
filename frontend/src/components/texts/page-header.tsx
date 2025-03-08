import React from 'react';

interface PageHeaderProps {
  children: React.ReactNode;
}

const PageHeader = ({ children }: PageHeaderProps) => {
  return <h2 className="text-2xl font-medium">{children}</h2>;
};

export default PageHeader;
