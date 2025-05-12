import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const PaymentDetails = () => {
  return (
    <div className="mt-10">
      <h3 className="text-2xl font-semibold leading-[120%] text-[#7D8A9B]">
        Payment Details
      </h3>
      <div className="flex flex-col justify-center items-start gap-5 lg:gap-6 self-stretch p-[18.5px] lg:p-6 mt-5 rounded-[16px] bg-[#FCFCFC] shadow-[0px_1px_4px_0px_rgba(16,24,40,0.10),0px_1px_4px_0px_rgba(16,24,40,0.06)]">
        <div className="w-full rounded-2xl border border-[#CED3D9] overflow-hidden">
          <Table className="w-full">
            <TableHeader className="bg-[#CED3D9]">
              <TableRow>
                <TableHead className="text-xl font-semibold leading-[120%] text-colorTextPrimary lg:w-[600px]">
                  Item
                </TableHead>
                <TableHead className="text-xl font-semibold leading-[120%] text-colorTextPrimary">
                  Amount
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="text-lg leading-[150%] text-colorTextPrimary">
                <TableCell>
                  <p>
                    Holding Deposit Amount{" "}
                    <span className="font-semibold">(payable now)</span>
                  </p>
                  <p className="mt-4">
                    This will go towards paying your first month&apos;s rent.
                  </p>
                </TableCell>
                <TableCell className="font-semibold">£115.00</TableCell>
              </TableRow>

              <TableRow className="text-lg leading-[150%] text-colorTextPrimary">
                <TableCell>
                  <p>
                    Holding Deposit Amount{" "}
                    <span className="font-semibold">(payable now)</span>
                  </p>
                </TableCell>
                <TableCell className="font-semibold">£115.00</TableCell>
              </TableRow>

              <TableRow className="text-lg leading-[150%] text-colorTextPrimary">
                <TableCell>
                  <p>
                    Holding Deposit Amount{" "}
                    <span className="font-semibold">(payable now)</span>
                  </p>
                </TableCell>
                <TableCell className="font-semibold">£115.00</TableCell>
              </TableRow>

              <TableRow className="text-lg leading-[150%] text-colorTextPrimary">
                <TableCell>
                  <p>
                    Holding Deposit Amount{" "}
                    <span className="font-semibold">(payable now)</span>
                  </p>
                </TableCell>
                <TableCell className="font-semibold">£115.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="p-8 justify-center items-center rounded-[16px] border border-solid border-[#B4DFA7] bg-[#F6FFF4]">
          <p className="text-lg leading-[150%] text-colorTextPrimary">
            At present, the total rent and deposit due will be £1076.92. The
            holding deposit of £115.00 will be put towards this, so{" "}
            <span className="font-bold">
              £962.92 will be due once the contract is signed.
            </span>
          </p>
          <p className="text-lg leading-[150%] text-colorTextPrimary mt-4">
            Be aware that the landlord may change these amounts or request
            additional rent in advance before issuing the contract.
          </p>
        </div>
      </div>

      {/* move in date and tenants name */}
      {/* <TenantNamesForm /> */}
    </div>
  );
};

export default PaymentDetails;
