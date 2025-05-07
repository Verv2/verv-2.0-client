import {
  ListingArrowTip,
  ListingFullArrow,
  ListingHalfArrow,
} from "@/assets/icons/icons";
import { cn } from "@/lib/utils";

const InitiateRentTab = ({
  isInitiate,
  isReferencing,
  isSigning,
  isPay,
  isComplete,
}: {
  isInitiate?: boolean;
  isReferencing?: boolean;
  isSigning?: boolean;
  isPay?: boolean;
  isComplete?: boolean;
}) => {
  return (
    <div className="hidden lg:flex w-full m-auto">
      {/* Initiate Rent Now */}
      <div className="relative w-[220px] h-[58px] flex justify-center items-center">
        <p
          className={cn(
            "text-lg",
            isInitiate ? "text-white" : "text-[#314660]"
          )}
        >
          Initiate Rent Now
        </p>
        <div className="flex absolute top-0 left-0 -z-10">
          <div>
            <ListingFullArrow
              width={220}
              height={58}
              fill={isInitiate ? "#50B533" : "#F5F7F7"}
            />
          </div>
        </div>
      </div>

      <div>
        <ListingArrowTip
          width={23}
          height={58}
          fill={isInitiate ? "#50B533" : "#F5F7F7"}
        />
      </div>

      {/* Tenant Referencing */}
      <div className="relative w-[235.876px] h-[58px] flex justify-center items-center -ml-2">
        <p
          className={cn(
            "text-lg",
            isReferencing ? "text-white" : "text-[#314660]"
          )}
        >
          Tenant Referencing
        </p>
        <div className="flex absolute top-0 left-0 -z-10">
          <div>
            <ListingHalfArrow
              width={235.876}
              height={58}
              fill={isReferencing ? "#50B533" : "#F5F7F7"}
            />
          </div>
        </div>
      </div>
      <div>
        <ListingArrowTip
          width={23}
          height={58}
          fill={isReferencing ? "#50B533" : "#F5F7F7"}
        />
      </div>

      {/* Digital Contract Signing */}
      <div className="relative w-[268.876px] h-[58px] flex justify-center items-center -ml-2">
        <p
          className={cn("text-lg", isSigning ? "text-white" : "text-[#314660]")}
        >
          Digital Contract Signing
        </p>
        <div className="flex absolute top-0 left-0 -z-10">
          <div>
            <ListingHalfArrow
              width={268.876}
              height={58}
              fill={isSigning ? "#50B533" : "#F5F7F7"}
            />
          </div>
        </div>
      </div>
      <div>
        <ListingArrowTip
          width={23}
          height={58}
          fill={isSigning ? "#50B533" : "#F5F7F7"}
        />
      </div>

      {/* Pay Security Deposit & Rent */}
      <div className="relative w-[243px] h-[58px] flex justify-center items-center text-center -ml-2">
        <p className={cn("text-lg", isPay ? "text-white" : "text-[#314660]")}>
          Pay Security <br /> Deposit & Rent
        </p>
        <div className="flex absolute top-0 left-0 -z-10">
          <div>
            <ListingHalfArrow
              width={243}
              height={58}
              fill={isPay ? "#50B533" : "#F5F7F7"}
            />
          </div>
        </div>
      </div>
      <div>
        <ListingArrowTip
          width={23}
          height={58}
          fill={isPay ? "#50B533" : "#F5F7F7"}
        />
      </div>

      {/* Complete */}
      <div className="relative w-[218px] h-[58px] flex justify-center items-center -ml-2">
        <p
          className={cn(
            "text-lg",
            isComplete ? "text-white" : "text-[#314660]"
          )}
        >
          Complete
        </p>
        <div className="flex absolute top-0 left-0 -z-10">
          <div>
            <ListingHalfArrow
              width={217}
              height={58}
              fill={isComplete ? "#50B533" : "#F5F7F7"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InitiateRentTab;
