import React from "react";

interface LayoutProps {
  children: React.ReactNode | React.ReactNodeArray;
}

const Layout = ({ children }: LayoutProps) => {
  return <div className="w-full bg-gray-200 h-screen">{children}</div>;
};

export default React.memo(Layout);
