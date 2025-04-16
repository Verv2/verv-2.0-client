"use client";
import { Input } from "@/components/ui/input";
import { MapPin, Search } from "lucide-react";
import { useState } from "react";

type ToggleType = "Buy" | "Rent";

type LocationItem = {
  location: string;
};

const demoData: Record<ToggleType, LocationItem[]> = {
  Buy: [
    { location: "New York City" },
    { location: "Los Angeles" },
    { location: "Miami" },
  ],
  Rent: [
    { location: "San Francisco" },
    { location: "Chicago" },
    { location: "Austin" },
  ],
};

const SearchBar = () => {
  const [toggle, setToggle] = useState("Rent");
  const [query, setQuery] = useState("");

  const results = demoData[toggle as ToggleType];
  const filteredResults = query
    ? results.filter((item: LocationItem) =>
        item.location.toLowerCase().includes(query.toLowerCase())
      )
    : [];

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
      <div className="flex bg-white items-center rounded-full justify-between p-4">
        <MapPin className="w-[28px] h-[28px] text-[#A6AFBB]" />
        <div className="w-5/6">
          <p className="text-gray-900 text-lg font-semibold ml-2 mb-2">
            Location
          </p>
          <Input
            type="text"
            placeholder="Where are you looking to rent?"
            className="w-full p-2 border-0 shadow-none focus:border-none rounded focus:outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="lg:p-4 p-3 bg-slate-700 rounded-full shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] ">
          <Search className="text-white" />
        </div>
      </div>

      <ul className="bg-white rounded-bl-lg rounded-br-lg w-4/5 mx-auto overflow-y-auto space-y-2">
        {filteredResults.map((item, index) => (
          <li key={index} className="p-2   border-gray-200">
            <div className="text-gray-500 text-sm"> {item.location}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;
