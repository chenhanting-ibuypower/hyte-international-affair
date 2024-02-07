export default function OrderDetail({
  params,
}: {
  params: { orderId: string };
}) {
  return (
    <div>
      <h1>Order Detail Page</h1>
      <p>Order ID: {params.orderId}</p>
      {/* Fetch and display order details based on orderId */}
    </div>
  );
}
