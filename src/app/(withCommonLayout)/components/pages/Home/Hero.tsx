import SearchBar from "./SearchBar";

const Hero = () => {
  return (
    <div className=" bg-[#50B533]">
      <div className="lg:w-[900px] mx-auto py-20 h-[450px]">
        <h1 className="text-center justify-start font-[700] text-white text-5xl [#50B533]">
          Rent Smarter with Verified Reviews
        </h1>
        <SearchBar />
        <h4 className="text-center justify-start mt-7">
          <span className="text-white text-[18px] font-normal ">
            Want more visibility?{" "}
          </span>
          <span className="text-white text-[18px] font-semibold">
            List with Verv.
          </span>
        </h4>
      </div>
    </div>
  );
};

export default Hero;
