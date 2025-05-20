"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const CompleteProfilePage = () => {
  const router = useRouter();
  return (
    <div className="w-[300px] m-auto space-y-4 py-[200px]">
      <Button
        className="w-full"
        onClick={() => router.push("/profile/complete-profile/landlord")}
      >
        Complete your profile as Landlord
      </Button>
      <Button
        className="w-full"
        onClick={() => router.push("/profile/complete-profile/tenant")}
      >
        Complete your profile as Tenant
      </Button>
    </div>
  );
};

export default CompleteProfilePage;
