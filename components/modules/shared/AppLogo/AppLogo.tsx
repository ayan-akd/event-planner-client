import Link from "next/link";

const AppLogo = () => {
  return (
    <Link href="/">
      <div>
        <h2 className="text-lg md:text-2xl uppercase font-extrabold font-mono ">
          even<span className="text-primary ">zo</span>
        </h2>
        <h6 className=" uppercase text-xs font-semibold">event planner</h6>
      </div>
    </Link>
  );
};

export default AppLogo;
