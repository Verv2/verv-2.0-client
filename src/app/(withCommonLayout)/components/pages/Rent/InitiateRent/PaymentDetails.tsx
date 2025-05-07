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
                <TableHead className="text-xl font-semibold leading-[120%] text-colorTextPrimary w-[600px]">
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
      </div>
    </div>
  );
};

export default PaymentDetails;
