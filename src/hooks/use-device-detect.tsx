import { useState, useEffect } from "react";

export interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  screenWidth: number;
  screenHeight: number;
  orientation: "portrait" | "landscape";
}

export function useDeviceDetect(): DeviceInfo {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    screenWidth: typeof window !== "undefined" ? window.innerWidth : 1920,
    screenHeight: typeof window !== "undefined" ? window.innerHeight : 1080,
    orientation: "landscape",
  });

  useEffect(() => {
    const updateDeviceInfo = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Check user agent for mobile devices
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobileUA = /android|webos|iphone|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      const isTabletUA = /ipad|android(?!.*mobile)|tablet/i.test(userAgent);
      
      // Screen size based detection
      const isMobileScreen = width < 768;
      const isTabletScreen = width >= 768 && width < 1024;
      const isDesktopScreen = width >= 1024;
      
      // Combine UA and screen size
      const isMobile = isMobileUA || isMobileScreen;
      const isTablet = (isTabletUA || isTabletScreen) && !isMobile;
      const isDesktop = isDesktopScreen && !isMobileUA && !isTabletUA;
      
      const orientation = width > height ? "landscape" : "portrait";

      setDeviceInfo({
        isMobile,
        isTablet,
        isDesktop,
        screenWidth: width,
        screenHeight: height,
        orientation,
      });
    };

    updateDeviceInfo();
    
    window.addEventListener("resize", updateDeviceInfo);
    window.addEventListener("orientationchange", updateDeviceInfo);
    
    return () => {
      window.removeEventListener("resize", updateDeviceInfo);
      window.removeEventListener("orientationchange", updateDeviceInfo);
    };
  }, []);

  return deviceInfo;
}

// Simplified hook for just checking if mobile
export function useIsMobile(): boolean {
  const { isMobile, isTablet } = useDeviceDetect();
  return isMobile || isTablet;
}
