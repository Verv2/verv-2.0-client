import { Button } from "@/components/ui/button";
import vervAbout from "../../../../../../assets/images/verv-about.jpg";
import vervHouse from "../../../../../../assets/images/verv-house.png";
import vervDoll from "../../../../../../assets/images/verv-doll.png";
import vervMissionStatement from "../../../../../../assets/images/verv-mission-statement.png";
import Image from "next/image";
import VervAccordion from "./VervAccordion";
import Reviews from "../../../Shared/Reviews";
import AreLandlord from "../../../Shared/AreLandlord";
import { CalendarIcon, HomeFill } from "@/assets/icons/icons";
import { crewData } from "./CrewData";
import Crew from "./Crew";

const Verv = () => {
  return (
    <div>
      {/* hero section */}
      <section className="py-20 px-10  mb-[98px]  bg-[linear-gradient(to_bottom,_#EEF1F3_65%,_transparent_50%)]">
        <div className="flex justify-center items-center gap-[58px] flex-shrink-0">
          <h2 className="text-[48px] font-bold leading-[125%] text-[#233244] w-[559px]">
            Find the perfect match between landlords and tenants!
          </h2>
          <div className="space-y-[24px] w-[559px]">
            <p className="text-lg text-[#233244] leading-[28px]">
              Since its founding in 2018, Verv has grown to become the UK’s
              largest letting agent, with one clear mission: to make renting
              fairer, safer, and more affordable for everyone.
            </p>
            <Button className="text-sm font-semibold text-[#233244] hover:text-white flex justify-center items-center w-[147px] h-[40px] px-4 py-2 rounded-[32px] border border-solid border-[#B4DFA7] bg-[#EEF8EB]">
              Learn More
            </Button>
          </div>
        </div>
        <div
          className="w-[1214px] h-[462px] m-auto mt-[100px] rounded-[40px] bg-gray-300 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${vervAbout.src})` }}
        ></div>
      </section>

      {/* tailored for property */}
      <section className="w-[1216px] h-[811px] m-auto flex justify-between items-start gap-[33px] mb-[100px]">
        <div className="w-[489px] flex flex-col items-start gap-[50px] self-stretch">
          <div className="flex flex-col items-start gap-6 self-stretch">
            <h2 className="text-colorTextPrimary text-4xl font-bold leading-[44px]">
              Tailored for Property Owners and Renters
            </h2>
            <p className="text-colorTextSecondary leading-[24px]">
              Welcome to Verv, where we transform the rental experience for both
              landlords and tenants. Say goodbye to hidden fees, outdated
              listings, and the expensive 10% commissions landlords once paid.
              The future of renting is here—more transparent, efficient, and
              cost-effective than ever!
            </p>
          </div>
          <div className="grid grid-cols-2 grid-rows-2 gap-4">
            {/* first box */}
            <div className="inline-flex items-center p-[20px_47px_20px_20px] rounded-[12px] bg-[var(--secondary-1,#EEF1F3)]">
              <div className="flex flex-col items-start gap-[4px]">
                <div className="flex items-center gap-[6px]">
                  <CalendarIcon width={16} height={18} fill="#50B533" />
                  <p className="text-[var(--secondary-8,#233244)] text-center font-inter text-[18px] font-bold leading-[28px]">
                    6 Days
                  </p>
                </div>
                <p className="w-[98px] text-[var(--secondary-5,#56677D)] font-inter text-[14px] font-medium leading-[20px]">
                  Average to Let
                </p>
              </div>
            </div>
            {/* second box */}
            <div className="inline-flex p-[20px_54px_20px_20px] items-center rounded-[12px] bg-[var(--secondary-1,#EEF1F3)]">
              <div className="flex flex-col items-start gap-[4px]">
                <div className="flex items-center gap-[6px]">
                  <HomeFill width={20} height={20} fill="#50B533" />
                  <p className="text-[var(--secondary-8,#233244)] text-center font-inter text-[18px] font-bold leading-[28px]">
                    1,269,346
                  </p>
                </div>
                <p className="text-[var(--secondary-5,#56677D)] font-inter text-[14px] font-medium leading-[20px]">
                  Properties Let On Verve
                </p>
              </div>
            </div>
            {/* third */}
            <div className="inline-flex p-[20px_10px_20px_20px] items-center rounded-[12px] bg-[var(--secondary-1,#EEF1F3)]">
              <div className="flex flex-col items-start gap-[4px]">
                <div className="flex items-center gap-[6px]">
                  <CalendarIcon width={16} height={18} fill="#50B533" />
                  <p className="text-[var(--secondary-8,#233244)] text-center font-inter text-[18px] font-bold leading-[28px]">
                    7,078,438
                  </p>
                </div>
                <p className="text-[var(--secondary-5,#56677D)] font-inter text-[14px] font-medium leading-[20px]">
                  Registered Landlords & Te..
                </p>
              </div>
            </div>
            {/* fourth */}
            <div className="inline-flex p-[20px] items-center rounded-[12px] bg-[var(--secondary-1,#EEF1F3)]">
              <div className="flex flex-col items-start gap-[4px]">
                <div className="flex items-center gap-[6px]">
                  <CalendarIcon width={16} height={18} fill="#50B533" />
                  <p className="text-[var(--secondary-8,#233244)] text-center font-inter text-[18px] font-bold leading-[28px]">
                    No Admin Fee
                  </p>
                </div>
                <p className="w-[98px] text-[var(--secondary-5,#56677D)] font-inter text-[14px] font-medium leading-[20px]">
                  Since 2012
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[694px] flex flex-col items-start gap-[16px]">
          {/* first part */}
          <div className="h-[399px] self-stretch rounded-[16px] border border-[#CED3D9] bg-[#FCFCFC] p-[28px]">
            {/* Floated image wrapper */}
            <div className="float-right w-[120px] h-[123px]">
              <Image
                src={vervHouse}
                alt="house Image"
                height={123}
                width={120}
              />
            </div>

            <p className="text-[#398124] text-[24px] font-semibold leading-[32px] mb-[16px]">
              Landlords
            </p>

            <div className="text-colorTextPrimary leading-[24px]">
              <p className="mb-4">
                We understand that property management should be straightforward
                and cost-effective. Since our inception, we’ve empowered
                landlords to:
              </p>
              <ul className="list-disc space-y-1 pl-6">
                <li>
                  Create detailed property listings with high-quality images,
                  descriptions, and essential details like amenities, rent,
                  deposit requirements, and EPC ratings.
                </li>
                <li>
                  Easily manage tenant inquiries, verify tenants, and establish
                  clear communication directly through our secure platform.
                </li>
                <li>
                  Save time and reduce costs with transparent processes and
                  straightforward tools designed for modern landlords.
                </li>
              </ul>
            </div>

            <div className="pt-[16px]">
              <Button className="text-[16px] font-medium leading-[24px] flex w-[168px] h-[44px] px-4 justify-center items-center gap-[8px] rounded-[32px] bg-[#50B533]">
                Find Out More
              </Button>
            </div>
          </div>
          {/* second part */}
          <div className="h-[399px] self-stretch rounded-[16px] border border-[#CED3D9] bg-[#FCFCFC] p-[28px]">
            {/* Floated image wrapper */}
            <div className="float-right w-[169px] h-[144px]">
              <Image src={vervDoll} alt="Doll Image" height={169} width={144} />
            </div>

            <p className="text-[#398124] text-[24px] font-semibold leading-[32px] mb-[16px]">
              Tenants
            </p>

            <div className="text-colorTextPrimary leading-[24px]">
              <p className="mb-4">
                Everyone deserves a secure and simple way to find their ideal
                home. Verv prioritises tenant needs by providing:
              </p>
              <ul className="list-disc space-y-1 pl-6">
                <li>Verified listings and transparent rental terms.</li>
                <li>
                  Advanced search filters tailored for different preferences,
                  including pet-friendly homes, student accommodation, and more.
                </li>
                <li>
                  A secure and hassle-free application process, from property
                  inquiries to referencing and deposit protection.
                </li>
              </ul>
              <p className="mt-4">
                Our platform ensures a fair and convenient experience for
                tenants, helping you find the right home without any stress.
              </p>
            </div>

            <div className="pt-[16px]">
              <Button className="text-[16px] font-medium leading-[24px] flex w-[168px] h-[44px] px-4 justify-center items-center gap-[8px] rounded-[32px] bg-[#50B533]">
                Find Out More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* frequent questions */}
      <section className="w-[1009px] m-auto">
        <h2 className="text-colorTextPrimary text-4xl font-bold leading-[44px] text-center mb-[60px]">
          Frequently Asked Questions
        </h2>
        {/* accordion */}
        <VervAccordion />
      </section>

      {/* mission statement */}
      <section className="w-[1216px] m-auto flex items-center gap-[55px] mt-[80px]">
        <div className="flex flex-col items-start gap-[47px] w-[569px]">
          <div>
            <h2 className="text-[36px] font-bold text-[#233244] leading-[44px] mb-[17px]">
              Mission Statement
            </h2>
            <p className="text-colorTextPrimary leading-[24px]">
              We are committed to transparency and honesty in every interaction,
              always striving to be user-friendly. Our goal is to provide users
              with clear, accessible information whenever they need it. By doing
              so, we enhance their experience and build a stronger sense of
              trust and loyalty.
            </p>
          </div>
          <p className="text-colorTextPrimary font-medium leading-[24px]">
            Verv - 2024
          </p>
        </div>
        <div
          className="w-[592px] h-[363px] rounded-[27px] bg-gray-300 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${vervMissionStatement.src})` }}
        ></div>
      </section>

      {/* talented crew! */}
      <section className="w-full bg-[#EEF8EB] py-[100px] mt-[80px]">
        <div className="w-[1216px] m-auto">
          <h2 className="text-4xl text-[#233244] font-bold leading-[44px] text-center">
            Introducing our talented crew!
          </h2>
          <div className="grid grid-cols-4 gap-8 mt-[60px]">
            {crewData.map((crew, index) => (
              <Crew key={index} crew={crew} />
            ))}
          </div>
        </div>
      </section>

      {/* our happy clients */}
      <section className="mt-[100px]">
        <div className="w-[1216px] h-[425px] m-auto flex flex-col items-start gap-7">
          <h1 className="text-colorTextPrimary text-[30px] font-semibold leading-[38px] w-full text-center">
            Our happy clients
          </h1>
          {/* clients review carousel */}
          <Reviews />
        </div>
      </section>
      <AreLandlord />
    </div>
  );
};

export default Verv;
