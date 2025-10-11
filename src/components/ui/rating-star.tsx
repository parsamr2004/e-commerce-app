import { Star } from "lucide-react";
import React from "react";

interface RatingStarProps {
  fillPercentage: number;
  size?: number;
}

export const RatingStar: React.FC<RatingStarProps> = ({
  fillPercentage,
  size = 5,
}) => {
  const clampedPercentage = Math.max(0, Math.min(100, fillPercentage));

  return (
    <div className={`relative h-${size} w-${size}`}>
      <Star
        className={`absolute h-${size} w-${size} text-black dark:text-white`}
      />

      <div
        className="absolute overflow-hidden"
        style={{ width: `${clampedPercentage}%` }}
      >
        <Star
          className={`h-${size} w-${size} fill-black dark:fill-white text-black  dark:text-white `}
        />
      </div>
    </div>
  );
};
