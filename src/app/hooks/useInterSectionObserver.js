import { useState, useEffect, useRef } from 'react';

const useIntersectionObserver = () => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const currentElement = elementRef.current; // Copy the current value to a variable

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(currentElement); // Stop observing after it becomes visible
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );

    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) observer.unobserve(currentElement); // Use the copied value in the cleanup
    };
  }, []);

  return [isVisible, elementRef];
};

export default useIntersectionObserver;
