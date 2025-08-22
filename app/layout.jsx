// styles
import "@/styles/globals.css";
// font
import { Inter } from "next/font/google";
// toast
import { Toaster } from "react-hot-toast";
import AppState from "../context/AppContext";

const inter = Inter({ subsets: ["latin"] });

const defaultTitle = "App's Title";
const defaultDescription = "Description of App";
const defaultUrl = process.env.APP_BASE_URL;
const defaultImage = "Logo of App";
const defaultManifestUrl = "";

export const metadata = {
  title: defaultTitle,
  applicationName: defaultTitle,
  keywords: ["", ""],
  creator: "Harsh Jaiswani",
  metadataBase: new URL(defaultUrl),
  description: defaultDescription,
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    type: "website",
    url: defaultUrl,
    siteName: defaultTitle,
  },
  manifest: defaultManifestUrl,
  icons: {
    icon: defaultImage,
    shortcut: "/shortcut-icon.png",
    apple: "/apple-icon.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/apple-touch-icon-precomposed.png",
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster position="bottom-right" reverseOrder={false} />
        <AppState>{children}</AppState>
      </body>
    </html>
  );
}
