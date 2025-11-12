'use client'
import { useState  } from "react";

export default function SlideshowToggle(){
  const [slideshowActive, setSlideshowActive] = useState(false);
 
  const handleSlideshowToggle = () => {
    setSlideshowActive((prev) => !prev);
  
  };

  return (
    <button onClick={handleSlideshowToggle}>
      {slideshowActive ? 'STOP SLIDESHOW' : 'START SLIDESHOW'}
    </button>
  );
}