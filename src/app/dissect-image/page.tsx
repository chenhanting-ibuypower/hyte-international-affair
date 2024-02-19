"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";

export default function OrderDetail() {
  const searchParams = useSearchParams();
  // @ts-ignore
  const orderId = searchParams.get("orderId");

  return (
    <div>
      <div style={{ position: "relative" }}>
        <h2>In 2023, every above solution is deprecated,</h2>
        <p>use below</p>
        <div className="absolute">
          <Image
            src="https://s.yimg.com/ny/api/res/1.2/dbY_OtwFvLdZta7a0zaUaA--/YXBwaWQ9aGlnaGxhbmRlcjt3PTk2MDtoPTQ2OTtjZj13ZWJw/https://s.yimg.com/os/creatr-uploaded-images/2022-09/8a6f31b0-331b-11ed-bf7f-4065fe675e07"
            fill
            className="object-cover lg:mt-[100px]"
            alt="modern functional design image"
          ></Image>
        </div>
      </div>
      <div style={{ position: "relative" }}>
        <h2>Title: Modern Functional Design</h2>
        <p>
          Description: This is an image showcasing implementing full-width image
          sideways.
        </p>
        <style jsx>{`
          .image-container {
            width: 100%;
          }

          .image-container > div {
            position: unset !important;
          }

          .image-container > .image {
            object-fit: contain;
            width: 100% !important;
            position: relative !important;
            height: unset !important;
          }
        `}</style>
        <div className="image-container">
          <Image
            src="/furiren.JPG"
            fill
            className="object-cover lg:mt-[100px]"
            alt="modern functional design image"
          ></Image>
        </div>
      </div>

      <div style={{ position: "relative" }}>
        <h1>First</h1>
        <img
          src="https://content.ibuypower.com/HYTE/Keeb/hyte-keebtkl-converted.webp"
          className="lg:w-full lg:h-full lg:object-cover lg:mt-[100px]"
          alt="modern functional design image"
        ></img>
      </div>

      <div style={{ position: "relative" }}>
        <h1>Second</h1>
        <div className="relative w-full h-full">
          <Image
            src="https://content.ibuypower.com/HYTE/Keeb/hyte-keebtkl-converted.webp"
            fill
            // @ts-ignore
            style={{ position: "" }}
            className="object-cover lg:mt-[100px]"
            alt="modern functional design image"
          ></Image>
        </div>
      </div>
      <div style={{ position: "relative" }}>
        <h1>Third</h1>
        <img
          src="https://content.ibuypower.com/HYTE/Keeb/keeb_modern_human_interface_mobile.webp"
          className="block lg:hidden object-contain h-[400px] lg:h-[50vh]"
        ></img>
      </div>
      <div style={{ position: "relative" }}>
        <h1>Fourth</h1>
        <div className="relative w-full h-full">
          <Image
            src="https://content.ibuypower.com/HYTE/Keeb/keeb_modern_human_interface_mobile.webp"
            fill
            // @ts-ignore
            style={{ position: "" }}
            className="block lg:hidden object-contain !h-[400px] "
            alt="modern human interface image"
          ></Image>
        </div>
      </div>
    </div>
  );
}
