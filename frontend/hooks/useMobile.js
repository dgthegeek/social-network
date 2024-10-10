import { useEffect, useState } from "react";

const useMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setIsMobile(window.screen.width <= 768);
    });
  }, []);

  return isMobile;
};

export default useMobile;
