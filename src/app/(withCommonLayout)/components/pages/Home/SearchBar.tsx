"use client";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/debounce.hook";
import { useSearchListing } from "@/hooks/search.hook";
import { TGetListing } from "@/types";
import { MapPin, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const SearchBar = () => {
  const [toggle, setToggle] = useState("Rent");
  const [searchResults, setSearchResults] = useState<TGetListing[] | []>([]);
  // const [query, setQuery] = useState<string>("");
  const router = useRouter();

  const {
    mutate: handleSearchListing,
    data,
    isPending,
    isSuccess,
  } = useSearchListing();

  const { register, handleSubmit, watch } = useForm();
  const searchTerm = useDebounce(watch("search"));

  useEffect(() => {
    if (searchTerm && toggle) {
      const queryData = {
        searchTerm: searchTerm as string,
        propertyFor: toggle,
      };

      handleSearchListing(queryData);
    }
  }, [handleSearchListing, searchTerm, toggle]);

  useEffect(() => {
    if (!searchTerm || !toggle) {
      setSearchResults([]);
    }
    if (!isPending && isSuccess && data && searchTerm && toggle) {
      setSearchResults(data?.data ?? []);
    }
  }, [isPending, isSuccess, data, searchTerm, toggle]);

  console.log("data", data);
  console.log("searchResults", searchResults);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // handleSeeAll(data.search);
    const queryData = {
      searchTerm: data.search,
      propertyFor: toggle.toUpperCase(),
    };
    console.log("Search submitted:", queryData);
    const queryString = searchTerm.trim().split(" ").join("+");
    router.push(
      `/all-listings?searchTerm=${queryString}&propertyFor=${toggle.toUpperCase()}`
    );
  };

  const handleSeeAll = (query: string) => {
    const queryString = query.trim().split(" ").join("+");
    router.push(
      `/all-listings?searchTerm=${queryString}&propertyFor=${toggle.toUpperCase()}`
    );
  };

  return (
    <div className="lg:w-[630px] w-94  mx-auto p-2 mt-7 rounded-lg relative ">
      <div className="flex justify-center mb-6 ">
        <button
          className={`px-1 w-[70px]  text-[16px] rounded-lg flex justify-evenly items-center ${
            toggle === "Buy"
              ? "bg-white text-[#50B533]"
              : "bg-[#50B533] text-white "
          }`}
          onClick={() => setToggle("Buy")}
        >
          <div
            className={`w-2.5 h-2.5 bg-[#50B533] rounded-3xl  ${
              toggle === "Buy" ? "block" : "hidden"
            } `}
          />
          Buy
        </button>
        <button
          className={`px-1 w-[70px]  text-[16px] rounded-lg flex justify-evenly items-center ${
            toggle === "Rent"
              ? "bg-white text-[#50B533]"
              : "bg-[#50B533] text-white"
          }`}
          onClick={() => setToggle("Rent")}
        >
          <div className="w-2.5 h-2.5 bg-[#50B533] rounded-3xl" />
          Rent
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="relative">
          <p className="text-gray-900 text-lg font-semibold ml-2 mb-2 absolute top-[24px] left-[62px]">
            Location
          </p>
          <MapPin className="w-[28px] h-[28px] text-[#A6AFBB] absolute top-1/2 left-[24px] transform -translate-y-1/2" />
          <Input
            type="text"
            placeholder="Where are you looking to rent?"
            {...register("search")}
            className="flex bg-white items-center rounded-full justify-between pt-[50px] pl-[68px] pb-6 pr-6 h-[95px]"
          />
          <button className="lg:p-4 p-3 bg-slate-700 rounded-full shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] h-[64px] w-[64px] flex items-center justify-center absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer hover:bg-slate-600 transition">
            <Search className="text-white" />
          </button>
        </div>
      </form>
      {searchResults.length > 0 && (
        <div className="mt-2 rounded-xl p-3 bg-white shadow-md">
          <div className="space-y-3">
            {searchResults.map((item, index) => (
              <Link
                key={index}
                className="text-default-900 block rounded-md from-default-200 p-2 transition-all hover:bg-gradient-to-l hover:bg-gray-300"
                href={`/all-listings/${item.id}`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <img
                      alt="item"
                      className="h-20 w-20 rounded-md"
                      src={item.propertyImages[0]}
                    />
                    <div>
                      <p className="text-lg font-semibold">
                        {item.bedrooms} Bed, {item.bathrooms} Bath house{" "}
                      </p>
                      <p className="mt-1 line-clamp-2 h-12 w-full text-sm">
                        {item.town}, {item.address}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-3 flex justify-center border-t-1 border-default-50 pt-3">
            <button
              className="flex items-center justify-center gap-1"
              onClick={() => handleSeeAll(searchTerm)}
            >
              <span>See All</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
