import { Geist, Geist_Mono } from "next/font/google";
import styles from "./page.module.css";
import ReduxProvider from "./redux/Provider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Event Manager</title>
      </head>
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
