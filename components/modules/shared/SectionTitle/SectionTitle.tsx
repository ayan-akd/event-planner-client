import React from "react";

const SectionTitle = ({
  sectionTitle,
  sectionSubTitle,
}: {
  sectionTitle: string;
  sectionSubTitle: string;
}) => {
  return (
    <div className="max-w-xl mx-auto text-center mb-3 md:mb-6 2xl:mb-8">
      <h3 className="text-2xl md:text-4xl font-bold">{sectionTitle}</h3>
      <p className="text-base md:text-lg">{sectionSubTitle}</p>
    </div>
  );
};

export default SectionTitle;
