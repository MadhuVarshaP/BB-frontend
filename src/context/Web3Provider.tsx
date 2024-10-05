// import React from "react";

// import { WagmiProvider, createConfig } from "wagmi";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ConnectKitProvider, getDefaultConfig } from "connectkit";

// const config = createConfig(
//   getDefaultConfig({
//     appName: "ConnectKit Next.js demo",
//     walletConnectProjectId: "daf39d9657871b2275a60f6d47f4504d",
//   })
// );

// const queryClient = new QueryClient();

// export function Web3Provider({ children }: { children: React.ReactNode }) {
//   return (
//     <WagmiProvider config={config}>
//       <QueryClientProvider client={queryClient}>
//         <ConnectKitProvider debugMode>{children}</ConnectKitProvider>
//       </QueryClientProvider>
//     </WagmiProvider>
//   );
// }
