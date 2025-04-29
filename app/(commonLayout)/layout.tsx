import Navbar from "@/components/modules/shared/Navbar/Navbar";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default layout;
