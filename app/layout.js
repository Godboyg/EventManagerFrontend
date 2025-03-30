import { Geist, Geist_Mono } from "next/font/google";
import styles from "./page.module.css";
import ReduxProvider from "./redux/Provider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
