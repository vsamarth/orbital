import type { AppProps } from "next/app";

import "@fontsource/inter";
import "tailwindcss/tailwind.css";

import awsconfig from "../aws-exports";
import Amplify, { Auth } from "aws-amplify";

Amplify.configure(awsconfig);


function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
