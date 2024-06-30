import Image from "next/image";

import tower from "./tower.png";
import dollar from "./dollar.png";

// Revalidate every 15 minutes
export const revalidate = 60 * 15;

// Bills in ARS
const BILLS = [10000, 2000, 1000, 500, 200, 100, 50, 20, 10, 5, 2, 0];

export default async function Home() {
  const PRICE = await fetch("https://api.bluelytics.com.ar/v2/latest")
    .then((res) => res.json() as Promise<{blue: {value_sell: number}}>)
    .then((res) => res.blue.value_sell);

  const lowest = BILLS.findIndex((bill) => bill <= PRICE);
  const [max, min] = BILLS.slice(lowest - 1, lowest + 1);

  return (
    <main className="m-auto flex min-h-screen w-full max-w-[420px] items-end justify-center">
      <div className="relative">
        <Image alt="Mortal Kombat tower" className="min-w-[360px]" height={1080} src={tower} />
        <div
          className="absolute bottom-0 left-[70px] grid w-[190px] grid-cols-1 gap-[6px] px-2"
          style={{gridTemplateRows: `repeat(${BILLS.length - 1}, 93px) 85px`}}
        >
          <div
            className="relative h-full w-full px-4"
            style={{gridRowStart: lowest, gridRowEnd: lowest + 2}}
          >
            <div
              className="absolute flex h-[93px] flex-col items-center justify-end py-2"
              style={{bottom: `calc(${((PRICE - min) * 100) / (max - min) / 2}%)`}}
            >
              <Image alt="One Dollar" height={72} src={dollar} />
              <p className="absolute bottom-1 h-[24px] bg-[Canvas] px-1 text-sm leading-[24px] text-[CanvasText]">
                {Number(PRICE).toLocaleString("es-AR", {style: "currency", currency: "ARS"})}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
