import { Geist, Geist_Mono } from "next/font/google";
import styles from "./page.module.css";
import ReduxProvider from "./redux/Provider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Event Manager</title>
         <script async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2915175777820694"
          crossorigin="anonymous"></script>
      </head>
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
