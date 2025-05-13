import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const VervAccordion = () => {
  return (
    <div className="px-[20px]">
      <Accordion
        type="single"
        defaultValue="item-1"
        collapsible
        className="w-full"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-colorTextPrimary text-2xl font-semibold leading-[32px]">
            What is Verve all about?
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-colorTextSecondary leading-[24px] text-base">
              Verv is a digital platform transforming the rental market. We
              focus on making renting simpler, safer, and fairer by providing
              modern tools and transparent processes. We streamline everything
              from advertising properties to managing tenancies in one
              easy-to-use system.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-colorTextPrimary text-2xl font-semibold leading-[32px]">
            How does it work?
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-colorTextSecondary leading-[24px] text-base">
              Verv simplifies the renting process for both landlords and
              tenants. Landlords can list properties, connect with verified
              tenants, and manage every aspect of the tenancy. Tenants can
              browse verified listings, communicate securely, and manage their
              rental journey in one place. Reviews and ratings help build trust
              and ensure informed decisions for everyone involved.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="text-colorTextPrimary text-2xl font-semibold leading-[32px]">
            What charges are there for Landlords?
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-colorTextSecondary leading-[24px] text-basev">
              Listing properties on Verv is free. Optional add-ons, like
              boosting visibility or fast-tracking tenant checks, are available
              for a small fee. Our pricing is transparent and straightforward,
              offering significant savings compared to traditional approaches.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger className="text-colorTextPrimary text-2xl font-semibold leading-[32px]">
            What charges are there for Tenants?
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-colorTextSecondary leading-[24px] text-base">
              Browsing and messaging landlords on Verv is completely free. If
              you choose to apply for a property, a refundable holding deposit
              is required. This amount is credited toward your first month’s
              rent if the tenancy proceeds. Verv adheres strictly to the Tenant
              Fees Act 2019, ensuring fairness and transparency for tenants.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger className="text-colorTextPrimary text-2xl font-semibold leading-[32px]">
            What is Rent Now?
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-colorTextSecondary leading-[24px] text-base">
              Rent Ready is our all-in-one solution for landlords and tenants
              once they’ve agreed to proceed. It includes referencing, contract
              signing, deposit protection, and rent automation, ensuring a
              smooth and professional tenancy process that complies with all
              legal requirements.
            </p>
          </AccordionContent>
        </AccordionItem>
        {/* <AccordionItem value="item-6">
          <AccordionTrigger className="text-colorTextPrimary text-2xl font-semibold leading-[32px]">
            How do I start Rent Now?
          </AccordionTrigger>
          <AccordionContent>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Voluptatibus eveniet quisquam voluptas quos aliquid facere et odio
            ut debitis! Odit eaque aperiam error eligendi distinctio, nobis
            voluptatum minima neque ipsam.
          </AccordionContent>
        </AccordionItem> */}
        <AccordionItem value="item-6">
          <AccordionTrigger className="text-colorTextPrimary text-2xl font-semibold leading-[32px]">
            Why do tenants have to place a holding deposit?
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-colorTextSecondary leading-[24px] text-basev">
              A holding deposit demonstrates a tenant’s commitment to renting a
              property, giving landlords the confidence to focus on the
              application. If the tenancy proceeds, this deposit is applied
              toward the first month’s rent. In case of cancellation or false
              information, the deposit may be retained to cover incurred costs,
              ensuring fairness for all parties.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-7">
          <AccordionTrigger className="text-colorTextPrimary text-2xl font-semibold leading-[32px]">
            Who keeps the holding deposit?
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-colorTextSecondary leading-[24px] text-base">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Voluptatibus, consequuntur eveniet, distinctio quia quo minima
              rem, sunt quibusdam reprehenderit facilis placeat modi corrupti
              nemo fugit nihil laborum cum perspiciatis nulla?
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default VervAccordion;
