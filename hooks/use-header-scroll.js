import { useState, useEffect } from "react";

const useHeaderScroll = () => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    let prevScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > prevScrollY) setIsOpen(false);
      else setIsOpen(true);

      prevScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return isOpen;
};

export default useHeaderScroll;
