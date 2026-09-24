"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";

const SNAP_PIXEL_ID = "02406cda-1020-4433-9e2e-2a7eec556401";

const SnapPixel = () => {
  const pathname = usePathname();
  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }
    if (typeof window === "undefined" || !window.snaptr) return;
    window.snaptr("track", "PAGE_VIEW");
  }, [pathname]);

  
  return (
    <Script
      id="snap-pixel"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function(e,t,n){if(e.snaptr)return;var a=e.snaptr=function()
          {a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)};
          a.queue=[];var s='script';r=t.createElement(s);r.async=!0;
          r.src=n;var u=t.getElementsByTagName(s)[0];
          u.parentNode.insertBefore(r,u);})(window,document,
          'https://sc-static.net/scevent.min.js');

          snaptr('init', '${SNAP_PIXEL_ID}', {});
          snaptr('track', 'PAGE_VIEW');
        `,
      }}
    />
  );
};

export default SnapPixel;
