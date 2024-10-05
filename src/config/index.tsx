// import { createConfig, http } from "wagmi";
// import { mainnet, scrollSepolia, sepolia } from "wagmi/chains";
// import { walletConnect } from "wagmi/connectors";

// export const config = createConfig({
//   chains: [mainnet, scrollSepolia],
//   connectors: [
//     walletConnect({
//       projectId: "3fcc6bba6f1de962d911bb5b5c3dba68",
//     }),
//   ],
//   transports: {
//     [mainnet.id]: http(),
//     [scrollSepolia.id]: http(),
//   },
// });

import { defaultWagmiConfig } from "@web3modal/wagmi/dist/types/exports";
import { cookieStorage, createStorage } from "wagmi";
import { scrollSepolia, sepolia } from "wagmi/chains";

export const projectId = "daf39d9657871b2275a60f6d47f4504d";

if (!projectId) throw new Error("Project ID is not defined");

const metadata = {
  name: "Web3Modal Example",
  description: "Web3Modal Example",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

export const config = defaultWagmiConfig({
  chains: [scrollSepolia],
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
});
