import React, { type ReactNode } from "react";

interface SwipeSliderProps {
  children: ReactNode;
  onSlideChange?: (index: number) => void;
}

export function SwipeSlider({ children }: SwipeSliderProps) {
  return (
    <div className="w-full bg-background relative flex flex-col">
      {React.Children.map(children, (child, idx) => {
        if (!child) return null;
        return (
          <div key={idx} className="w-full relative">
            {child}
          </div>
        );
      })}
    </div>
  );
}
