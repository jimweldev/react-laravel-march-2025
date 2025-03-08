import React from 'react';

interface FormHeaderProps {
  children: React.ReactNode;
}

const FormHeader = ({ children }: FormHeaderProps) => {
  return (
    <div className="border-primary border-3 border-t-0 border-r-0 border-l-0 border-double">
      <h4 className="text-primary text-sm font-medium">{children}</h4>
    </div>
  );
};

export default FormHeader;
