import { ArrowUpRight } from "lucide-react";
import React from "react";

interface ICrewCardProps {
  crew: {
    name: string;
    title: string;
    image: string;
  };
}

const Crew = ({ crew }: ICrewCardProps) => {
  const { name, title, image } = crew;
  return (
    <div className="flex flex-col items-start gap-5 w-[280px]">
      <div
        className="w-full h-[260px] rounded-[20px] bg-gray-300 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <div className="w-full flex justify-between">
        <div>
          <h4 className="text-xl font-semibold leading-[30px] text-[#233244]">
            {name}
          </h4>
          <p className="font-medium text-colorTextPrimary leading-[24px]">
            {title}
          </p>
        </div>
        <ArrowUpRight />
      </div>
    </div>
  );
};

export default Crew;
