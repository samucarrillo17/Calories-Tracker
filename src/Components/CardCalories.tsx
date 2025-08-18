import type { JSX } from "react";
type CardCaloriesProps = {
  text:string
  bgColor:string
  border:string
  icon: JSX.Element
  textColor:string
  calories:number
};

export function CardCalories({ text, bgColor, border, icon, textColor, calories }: CardCaloriesProps) {
  return (
    <div className={`${bgColor} border ${border} rounded-2xl  p-4 flex flex-col ${textColor} font-medium mt-4 md:h-35 md:gap-2 ${calories !== 0 ? "" : "opacity-50"}`}>

      <div className="flex gap-2 items-center">
        {icon}
        <p>{text}</p>
      </div>

      <p className="text-2xl font-bold md:text-4xl">{calories}</p>
      <p>Calories</p>
    </div>
  )
}
