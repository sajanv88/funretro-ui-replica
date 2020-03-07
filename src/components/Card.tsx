import React from "react";
interface CardProps {
  title: string;
  children: React.ReactNode | React.ReactNodeArray;
  shouldClickable?: boolean;
}
export default ({ title, children, shouldClickable = false }: CardProps) => (
  <div
    className={`bg-white mt-5 mb-5 pb-5 border-0 border-blue-400 shadow h-full
 hover:shadow-lg ${shouldClickable ? "cursor-pointer" : ""}`}
  >
    <div className="p-1 flex flex-col h-full">
      <header className="p-2 flex-1">
        <h1
          className={`text-2xl text-center ${
            title ? "border-b" : ""
          } uppercase tracking-wider font-bold text-gray-700`}
        >
          {title}
        </h1>
      </header>
      <div className="pl-3 pr-3 pb-3">{children}</div>
    </div>
  </div>
);
