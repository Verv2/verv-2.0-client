import React from "react";

const page = async ({ params }: { params: Promise<{ userId: string }> }) => {
  const { userId } = await params;
  return (
    <div>
      <h2>User Id: {userId}</h2>
    </div>
  );
};

export default page;
