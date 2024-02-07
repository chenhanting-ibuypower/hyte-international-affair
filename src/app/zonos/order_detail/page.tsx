"use client";

import { useSearchParams } from "next/navigation";

export default function OrderDetail() {
  const searchParams = useSearchParams();
  // @ts-ignore
  const orderId = searchParams.get("orderId");

  return (
    <div>
      <h1>Order Detail Page</h1>
      <p>Order ID: {orderId}</p>
      {/* Fetch and display order details based on orderId */}
    </div>
  );
}
