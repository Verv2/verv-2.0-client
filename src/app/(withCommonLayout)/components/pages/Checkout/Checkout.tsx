"use client";

import envConfig from "@/config/envConfig";
import { loadStripe } from "@stripe/stripe-js";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";
import { useUser } from "@/context/user.provider";
import { TPaymentUserData } from "@/types";

const stripe = loadStripe(envConfig.stripePublicKey as string);

const Checkout = () => {
  const searchParams = useSearchParams();
  const planId = searchParams.get("planId");
  const { user } = useUser();

  const email = user?.email;
  const fullName = user?.firstName + " " + user?.lastName;
  const phoneNumber = user?.phoneNumber;

  const userData: TPaymentUserData = {
    email,
    fullName,
    phoneNumber,
  };

  const [price, setPrice] = useState<number>(0);

  useEffect(() => {
    if (planId === "listing-only") {
      setPrice(0.5);
    } else if (planId === "premier-listings") {
      setPrice(74.99);
    } else if (planId === "rent-ready") {
      setPrice(54.99);
    }
  }, [planId]);

  console.log(planId);
  return (
    <div className="lg:w-[1216px] w-94 mx-auto my-8">
      <h2>
        This is checkout components {planId} - {price}
      </h2>
      <Elements stripe={stripe}>
        <PaymentForm amount={price} planId={planId} userData={userData} />
      </Elements>
    </div>
  );
};

export default Checkout;
