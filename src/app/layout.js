import { orbitrons } from "next/font/google";
import "./globals.css";
import { WagmiProvider, cookieToInitialState } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import WagmiProviderComp from "../context/wagmi-provider";
import { headers } from "next/headers";
import { config } from "../config";
import { Orbitron } from '@next/font/google';
import { Jost } from '@next/font/google';
import bgPattern from "../public/bg-pattern.png";

const queryClient = new QueryClient();

const orbitron = Orbitron({
  subsets: ['latin'],   // Use 'latin' or other subsets you need
  weight: ['400', '700'], // Include the font weights you need
  variable: '--font-orbitron', // Define a CSS variable for the font
});
const jost = Jost({
  subsets: ['latin'],
  weight: ['400', '500', '700'], // Adjust weights as needed
  variable: '--font-jost', // Optional: adds CSS variable for the font
});


export const metadata = {
  title: "BountyBridge",
  description: "Transforming Local Aid with Decentralization",
};

export default function RootLayout({ children }) {
  const initialState = cookieToInitialState(config, headers().get("cookie"));
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="./favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link href="https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"></link>
        <link
          href="https://fonts.googleapis.com/css2?family=orbitrons:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${orbitron.variable} ${jost.variable} bg-[#1A0334] `} style={{
      backgroundImage: `url(${bgPattern.src})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    }}>
            <div className="absolute inset-0 bg-[#1A0334] opacity-50 z-0"></div>

        <WagmiProviderComp initialState={initialState}>
          {children}
        </WagmiProviderComp>
      </body>
    </html>
  );
}
