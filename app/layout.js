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
            <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2915175777820694"
     crossorigin="anonymous"></script>
<!-- weather app -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-2915175777820694"
     data-ad-slot="1000866683"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
      </body>
    </html>
  );
}
