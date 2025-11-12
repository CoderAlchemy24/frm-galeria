'use client'
import { useState  } from "react";

export default function SlideshowToggle(){
  const [slideshowActive, setSlideshowActive] = useState(false);
 
  const handleSlideshowToggle = () => {
    setSlideshowActive((prev) => !prev);
  
  };

  return (
    <button type="button" onClick={handleSlideshowToggle}>
      {slideshowActive ? 'STOP SLIDESHOW' : 'START SLIDESHOW'}
    </button>
  );
}