import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AdvancedFilter = () => {
  return (
    <div className="w-[1200px] m-auto">
      <h2>This is advanced filter components</h2>
      <div className="flex justify-between items-center gap-5 bg-blue-100 px-10 py-5">
        {/* left part */}
        <div className="w-full">
          <div className="w-full">
            <h4>Price & Rooms</h4>
            {/* Rooms */}
            <div>
              <Label>Bedrooms</Label>
              <div className="flex gap-5">
                <Input
                  type="number"
                  placeholder="Minimum number of rooms"
                  className="w-full"
                />
                <Input
                  type="number"
                  placeholder="Maximum number of rooms"
                  className="w-full"
                />
              </div>
            </div>
            <div>
              <Label>Price</Label>
              <div className="flex gap-5">
                <Input
                  type="number"
                  placeholder="Minimum Price"
                  className="w-full"
                />
                <Input
                  type="number"
                  placeholder="Maximum Price"
                  className="w-full"
                />
              </div>
            </div>
          </div>
          <div className="w-full">
            <h4>Type of Property</h4>
            {/* type */}
            <div className="flex gap-5">
              <div className="w-1/2">
                <Label>Furnished Options</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FURNISHED">Furnished</SelectItem>
                    <SelectItem value="UNFURNISHED">Unfurnished</SelectItem>
                    <SelectItem value="CHOICE">Choice</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-1/2">
                <Label>Property Types</Label>
                <Select>
                  <SelectTrigger className="">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FLAT">Flat</SelectItem>
                    <SelectItem value="BEDSIT">Bedsit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className="w-full space-y-3">
            <div className="flex items-center gap-2 ">
              <Checkbox className="w-6 h-6 border-gray-400 data-[state=checked]:bg-colorButton data-[state=checked]:border-colorButton" />
              <Label className="">Bills Included</Label>
            </div>
            <div className="flex items-center gap-2 ">
              <Checkbox className="w-6 h-6 border-gray-400 data-[state=checked]:bg-colorButton data-[state=checked]:border-colorButton" />
              <Label className="">Garden Access</Label>
            </div>
            <div className="flex items-center gap-2 ">
              <Checkbox className="w-6 h-6 border-gray-400 data-[state=checked]:bg-colorButton data-[state=checked]:border-colorButton" />
              <Label className="">Parking</Label>
            </div>
            <div className="flex items-center gap-2 ">
              <Checkbox className="w-6 h-6 border-gray-400 data-[state=checked]:bg-colorButton data-[state=checked]:border-colorButton" />
              <Label className="">Fireplace</Label>
            </div>
            <div className="flex items-center gap-2 ">
              <Checkbox className="w-6 h-6 border-gray-400 data-[state=checked]:bg-colorButton data-[state=checked]:border-colorButton" />
              <Label className="">Students Allowed</Label>
            </div>
            <div className="flex items-center gap-2 ">
              <Checkbox className="w-6 h-6 border-gray-400 data-[state=checked]:bg-colorButton data-[state=checked]:border-colorButton" />
              <Label className="">Families Allowed</Label>
            </div>
            <div className="flex items-center gap-2 ">
              <Checkbox className="w-6 h-6 border-gray-400 data-[state=checked]:bg-colorButton data-[state=checked]:border-colorButton" />
              <Label className="">DSS Income Accepted</Label>
            </div>
            <div className="flex items-center gap-2 ">
              <Checkbox className="w-6 h-6 border-gray-400 data-[state=checked]:bg-colorButton data-[state=checked]:border-colorButton" />
              <Label className="">Pets Allowed</Label>
            </div>
            <div className="flex items-center gap-2 ">
              <Checkbox className="w-6 h-6 border-gray-400 data-[state=checked]:bg-colorButton data-[state=checked]:border-colorButton" />
              <Label className="">Smokers Allowed</Label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedFilter;
