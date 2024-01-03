import React from "react";
import Script from "next/script";
import { useEffect } from "react";

const Zonos = () => {
  useEffect(() => {
    (async function () {
      const timestamp = new Date().getTime();
      const zonosScript = document.querySelector(`script[src*="/js/zonos.js"]`);

      let zonosItems = [
        {
          amount: 10.99,
          currencyCode: "USD",
          imageUrl: "https://example.com/image1.jpg",
          name: "Product 1",
          quantity: 2,
        },
        {
          amount: 19.99,
          currencyCode: "USD",
          imageUrl: "https://example.com/image2.jpg",
          name: "Product 2",
          quantity: 1,
        },
      ];

      if (!zonosScript) {
        const script = document.createElement("script");
        script.src = `https://js.zonos.com/dist/scripts/loadZonos.js?timestamp=${timestamp}`;
        script.addEventListener(
          "load",
          () => {
            console.log("🌎 Zonos loaded");
            // @ts-ignore
            window.Zonos.init({
              checkoutSettings: {
                placeOrderButtonSelector: "#delivery-button", // Replace with your actual checkout button selector
                /**
                 * Cart info callback for checkout
                 * If the productId is passed in
                 * @returns {object[]} - object with the item info to be added to cart:
                 * - amount: number;
                 * - currencyCode: string;
                 * - description?: string;
                 * - imageUrl?: string;
                 * - name: string;
                 * - quantity: number;
                 */
                buildCartDetail: async () => {
                  // Please provide an array of items to be added to cart
                  return zonosItems;
                },
              },
              zonosApiKey:
                "credential_test_4c7fb1ab-054d-4b5f-9a22-7b0228905489",
            });
          },
          false
        );
        document.head.appendChild(script);
      }
    })();
  }, []);

  return (
    <>
      <Script
        src="https://hello.zonos.com/hello.js?siteKey=1CA619FA79U68"
        onLoad={() => {
          console.log("Zonos's Hello Script has loaded");
        }}
        onError={() =>
          console.log("Zonos's Hello Script has encountered an error")
        }
        onReady={() => console.log("Zonos's Hello Script is ready")}
      ></Script>
      <div>
        <h1>Welcome to the Zonos page!</h1>
        <button
          id="delivery-button"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Delivery Page
        </button>
      </div>
    </>
  );
};

export default Zonos;
