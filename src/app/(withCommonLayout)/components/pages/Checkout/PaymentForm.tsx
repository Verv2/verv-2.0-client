/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCreateListing } from "@/hooks/listing.hook";
import { useCreatePaymentIntent } from "@/hooks/payment.hook";
import { TPaymentProps, TPaymentSuccess } from "@/types";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import Loading from "../../UI/Loading/Loading";
// import { useRouter } from "next/navigation";
import {
  AlertDialog,
  // AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Check } from "lucide-react";
import Link from "next/link";

const CARD_NUMBER_OPTIONS = {
  style: {
    base: {
      "::placeholder": {
        color: "#7D8A9B",
        content: "Card number", // This is for illustrative purpose only
      },
    },
    invalid: {
      color: "#fa755a",
    },
  },
  placeholder: "Card number", // ✅ Set the placeholder here
};

const CARD_EXPIRE_OPTIONS = {
  style: {
    base: {
      "::placeholder": {
        color: "#7D8A9B",
        content: "Card number", // This is for illustrative purpose only
      },
    },
    invalid: {
      color: "#fa755a",
    },
  },
  placeholder: "MM/YY", // ✅ Set the placeholder here
};

const PaymentForm = ({ amount, planId, userData }: TPaymentProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [name, setName] = useState("");
  // const [postalCode, setPostalCode] = useState("");
  const [error, setError] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [open, setOpen] = useState(false);

  // const router = useRouter();

  const {
    mutateAsync: createPaymentIntent,
    isPending: isPaymentIntentPending,
    isSuccess: isPaymentIntentSuccess,
  } = useCreatePaymentIntent();
  const {
    mutateAsync: handleCreateListing,
    isPending: isCreateListingPending,
    isSuccess: isCreateListingSuccess,
  } = useCreateListing();

  const shippingFee = 0;
  const tax = 0;
  const discount = amount * 0.05;
  const total = amount - (discount + shippingFee + tax);

  useEffect(() => {
    console.log("amount", total);
    if (total > 0) {
      (async () => {
        try {
          const data = await createPaymentIntent(total);
          setClientSecret(data);
        } catch (error: any) {
          console.error("Error creating payment intent:", error.message);
        }
      })();
    }
  }, [total, createPaymentIntent]);

  console.log("client secret", clientSecret);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardNumberElement);

    console.log("card", card);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("payment error", error);
      setError(error.message || ""); // Handle undefined case
    } else {
      console.log("payment method", paymentMethod);
      setError("");
    }

    // confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: userData.email,
            name: userData.fullName,
            phone: userData.phoneNumber,
          },
        },
      });

    if (confirmError) {
      console.log("confirm error", confirmError);
    } else {
      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);

        const listingData: TPaymentSuccess = {
          planId: planId!,
          transactionId: paymentIntent.id,
          propertyFor: "RENT",
        };

        handleCreateListing(listingData);

        if (isPaymentIntentPending || isCreateListingPending) {
          return <Loading />;
        }

        if (isPaymentIntentSuccess || isCreateListingSuccess) {
          setOpen(true);
        }
      }
    }
  };

  return (
    <div>
      <h2>This is payment form {amount}</h2>

      <div className="">
        <form className="" onSubmit={handleSubmit}>
          <div className="lg:flex justify-between items-start gap-x-8">
            <div className="grid grid-cols-1 gap-y-5 mb-4 lg:mb-0">
              {/* -----Personal Details Section------- */}
              <div className="lg:w-[800px]  w-96 bg-[#FCFCFC] shadow-custom p-6 rounded-xl ">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-slate-500 text-lg font-semibold">
                    Personal Details
                  </h3>
                  {/* <Button className="bg-gray-100 hover:bg-slate-700 rounded text-slate-700 hover:text-gray-100 text-[18px] font-semibold py-2 px-4">Edit</Button> */}
                </div>
                <div className="grid lg:grid-cols-3 grid-cols-1 gap-y-4 gap-x-4">
                  <div>
                    <p className="text-slate-500 text-[16px] text-base font-medium mb-2">
                      Full Name
                    </p>
                    <div className="w-[220px] bg-[#EEF1F3] px-3 py-2 rounded-lg">
                      <span className=" text-[#233244] text-[16px] font-[500] ">
                        {" "}
                        {userData?.fullName}{" "}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-slate-500 text-[16px] text-base font-medium mb-2">
                      Email address
                    </p>
                    <div className="w-[220px] bg-[#EEF1F3] px-3 py-2 rounded-lg">
                      <span className=" text-[#233244] text-[16px] font-[500] ">
                        {" "}
                        {userData?.email}{" "}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-slate-500 text-[16px] text-base font-medium mb-2">
                      Phone number
                    </p>
                    <div className="w-[220px] bg-[#EEF1F3] px-3 py-2 rounded-lg">
                      <span className=" text-[#233244] text-[16px] font-[500] ">
                        {" "}
                        {userData?.phoneNumber}{" "}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* -----Personal Details Section------- */}

              <div className="bg-[#FCFCFC] shadow-custom p-6 rounded-xl ">
                {/* Payment Card */}
                <h3 className="text-slate-500 text-lg font-semibold mb-4">
                  Payment Details
                </h3>
                <div className="space-y-4">
                  {/* card number */}
                  <div>
                    <label
                      htmlFor="card-number"
                      className="block text-sm font-medium text-[#56677D] mb-1"
                    >
                      Card Number
                    </label>
                    <CardNumberElement
                      options={CARD_NUMBER_OPTIONS}
                      id="card-number"
                      className="text-sm text-gray-500 bg-white border border-gray-300 rounded px-3 py-2"
                    />
                  </div>

                  {/* card holder name */}
                  <div>
                    <label
                      htmlFor="card-holder-name"
                      className="block text-sm font-medium text-[#56677D] mb-1"
                    >
                      Name on card
                    </label>
                    <input
                      type="text"
                      id="card-holder-name"
                      placeholder="Name on card"
                      className="text-sm text-gray-500 bg-white border border-gray-300 rounded px-3 py-2 w-full placeholder-[#7D8A9B] focus:outline-none"
                      value={name}
                      style={{ fontWeight: "500" }}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="flex gap-4">
                    {/* card expiry */}
                    <div className="w-1/2">
                      <label
                        htmlFor="card-expiry"
                        className="block text-sm font-medium text-[#56677D] mb-1"
                      >
                        Expiration date
                      </label>
                      <CardExpiryElement
                        id="card-expiry"
                        options={CARD_EXPIRE_OPTIONS}
                        className="text-sm text-gray-500 bg-white border border-gray-300 rounded px-3 py-2"
                      />
                    </div>
                    {/* card cvc */}
                    <div className="w-1/2">
                      <label
                        htmlFor="card-cvc"
                        className="block text-sm font-medium text-[#56677D]  mb-1"
                      >
                        Security code
                      </label>
                      <CardCvcElement
                        id="card-cvc"
                        className="text-sm text-gray-500 bg-white border border-gray-300 rounded px-3 py-2"
                      />
                    </div>
                  </div>
                  <p className="text-red-600">{error}</p>
                </div>
              </div>
              <div className="bg-[#FCFCFC] shadow-custom p-6 rounded-xl lg:w-[800px] w-96">
                <h4 className="text-slate-500 text-lg font-semibold mb-2">
                  Cancellation Policy
                </h4>
                <p className="text-slate-700 text-lg font-normal mb-2">
                  At Verv, we understand that plans can change unexpectedly.
                  That’s why we’ve crafted our cancellation policy to provide
                  you with flexibility and peace of mind.
                </p>
                <Link
                  href="#"
                  className="text-[#50B533] text-lg font-semibold "
                >
                  Terms and Conditions
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-y-5 lg:w-[384px] ">
              <div className="bg-[#FCFCFC] shadow-custom p-6 rounded-xl ">
                <div className="  text-slate-500 text-lg font-semibold mb-4">
                  Order Summary
                </div>
                <div className="grid grid-cols-1 gap-y-5">
                  <div className="grid grid-cols-1 gap-y-5">
                    <div className="flex justify-between items-start">
                      <div className="">
                        {planId === "rent-ready" && (
                          <h5 className=" text-slate-700 text-lg font-semibold ">
                            {" "}
                            Rent Ready{" "}
                          </h5>
                        )}
                        {planId === "premier-listing" && (
                          <h5 className=" text-slate-700 text-lg font-semibold ">
                            {" "}
                            Premier Listings{" "}
                          </h5>
                        )}
                        {planId === "listing-only" && (
                          <h5 className=" text-slate-700 text-lg font-semibold ">
                            {" "}
                            Listing Only{" "}
                          </h5>
                        )}

                        <p className=" text-slate-500 text-base font-normal">
                          For Landlords & Agents
                        </p>
                      </div>
                      <div className=" text-slate-700 text-base font-semibold ">
                        £{amount}
                      </div>
                    </div>
                  </div>
                  <div className=" w-full h-0.5   bg-[#EAECEE]" />
                  <div className="grid grid-cols-1 gap-y-2">
                    <div className=" flex justify-between items-start">
                      <p className=" text-slate-500 text-base font-normal">
                        Sub-total
                      </p>
                      <p className="text-center  text-slate-700 text-base font-semibold ">
                        £{amount}
                      </p>
                    </div>
                    <div className=" flex justify-between items-start">
                      <p className=" text-slate-500 text-base font-normal">
                        Discount
                      </p>
                      <p className="text-center  text-red-600 text-base font-semibold ">
                        - £{discount.toFixed(2)}
                      </p>
                    </div>
                    <div className=" flex justify-between items-start">
                      <p className=" text-slate-500 text-base font-normal">
                        Tax
                      </p>
                      <p className="text-center  text-slate-700 text-base font-semibold ">
                        £{tax}
                      </p>
                    </div>
                    <div className=" flex justify-between items-start">
                      <p className=" text-slate-500 text-base font-normal">
                        Shipping
                      </p>
                      <p className="text-center  text-slate-700 text-base font-semibold ">
                        £{shippingFee}
                      </p>
                    </div>
                  </div>
                  <div className=" w-full h-0.5   bg-[#EAECEE]" />
                  <div className="flex justify-between items-start">
                    <p className=" text-slate-700 text-xl font-semibold">
                      Total
                    </p>
                    <p className="text-center  text-slate-700 text-xl font-semibold">
                      £{total.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-[#FCFCFC] shadow-custom p-6 rounded-xl ">
                <div className="flex items-center justify-between gap-x-4">
                  <Check
                    strokeWidth={2.5}
                    className="h-[28px] w-[40px] text-[#FFFFFF] bg-[#50B533] rounded-full p-1"
                  />
                  <p className="">
                    <span className="text-slate-700 text-[18px] font-normal [##EAECEE]">
                      I agree to Verv’s{" "}
                    </span>
                    <span className="text-[#50B533] text-[18px] font-semibold [##EAECEE]">
                      Terms and Conditions
                    </span>
                    <span className="text-slate-700 text-[18px] font-normal [##EAECEE]">
                      {" "}
                      and{" "}
                    </span>
                    <span className="text-[#50B533] text-[18px] font-semibold [##EAECEE]">
                      Privacy Policy.
                    </span>
                  </p>
                </div>
                <button
                  type="submit"
                  disabled={!stripe || !clientSecret}
                  className={`w-full mt-4 py-4 px-4 bg-[#50B533] rounded-lg justify-center items-center gap-2 inline-flex`}
                >
                  <span className={`text-white text-[16px] font-semibold `}>
                    Complete Payment
                  </span>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <AlertDialog open={open} onOpenChange={setOpen}>
        {
          <AlertDialogContent className="w-[430px] mx-auto ">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-center mb-6">
                <Check
                  strokeWidth={2.5}
                  className="h-[20px] w-[20px] text-[#FFFFFF] mx-auto bg-[#50B533] rounded-full p-1 mb-4"
                />
                <p className=" text-slate-500 text-[20px] font-normal">
                  Payment Success!
                </p>
                <p className="text-center  text-slate-700 text-xl font-semibold mt-2">
                  £{total.toFixed(2)}
                </p>
              </AlertDialogTitle>
              <AlertDialogDescription>
                <p className=" w-full h-[1px]   bg-[#EAECEE]" />
                <div className="grid grid-cols-1 gap-y-4 my-4">
                  <div className=" flex justify-between items-start">
                    <p className=" text-[#56677D] text-[14px] font-normal">
                      Transaction ID
                    </p>
                    {transactionId && (
                      <p className="text-green-600">{transactionId}</p>
                    )}
                  </div>
                  {/* <div className=" flex justify-between items-start">
                    <p className=" text-[#56677D] text-[14px] font-normal">
                      Payment Time
                    </p>
                    <p className="text-center  text-[#314660] text-[14px] font-bold ">
                      25-02-2023, 13:22:16
                    </p>
                  </div> */}
                  {/* <div className=" flex justify-between items-start">
                    <p className=" text-[#56677D] text-[14px] font-normal">
                      Payment Method
                    </p>
                    <p className="text-center  text-[#314660] text-[14px] font-bold ">
                      Bank Transfer
                    </p>
                  </div> */}
                  {/* <div className=" flex justify-between items-start">
                    <p className=" text-[#56677D] text-[14px] font-normal">
                      Sender Name
                    </p>
                    <p className="text-center  text-[#314660] text-[14px] font-bold ">
                      Antonio Roberto
                    </p>
                  </div> */}
                </div>
                {/* <p className=" w-full h-[1px]   bg-[#EAECEE]" />
                <div className="grid grid-cols-1 gap-y-4 mt-4">
                  <div className="flex justify-between items-start">
                    <p className=" text-[#56677D] text-[14px] font-normal">
                      Amount
                    </p>
                    <p className="text-center  text-[#314660] text-[14px] font-bold">
                      IDR 1,000,000
                    </p>
                  </div>
                  <div className="flex justify-between items-start">
                    <p className=" text-[#56677D] text-[14px] font-normal">
                      Admin Fee
                    </p>
                    <p className="text-center  text-[#314660] text-[14px] font-bold">
                      IDR 193.00
                    </p>
                  </div>
                </div> */}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="flex justify-evenly">
              <AlertDialogCancel className="lg:w-auto w-full max-w-[350px] mx-auto  text-black text-[18px] font-semibold px-5 h-[24x] bg-[#F5F5F5] rounded-[32px] ">
                <Link href="/all-listings">Close</Link>
              </AlertDialogCancel>
              {/* <AlertDialogAction className="lg:w-auto w-full max-w-[350px] mx-auto  text-white text-[18px] font-semibold px-5 h-[24x] bg-[#50b533] hover:bg-[#50b533] rounded-[32px] ">
                Download PDF
              </AlertDialogAction> */}
            </div>
          </AlertDialogContent>
        }
      </AlertDialog>
    </div>
  );
};

export default PaymentForm;
