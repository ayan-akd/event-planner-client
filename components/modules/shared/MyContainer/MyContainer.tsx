import { ReactNode } from "react";

const MyContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="container mx-auto px-4 md:px-0 mt-12 md:mt-28">
      {children}
    </div>
  );
};

export default MyContainer;
