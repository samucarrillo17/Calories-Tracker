import { PencilIcon,TrashIcon} from "@heroicons/react/24/outline"
import type { Dispatch } from "react"
import type { JSX } from "react"
import type { ActivityActions } from "../Reducers/ActivityReducer"
import type { Activity } from "../types"

type CardActivities = {
   Activity: string
    Category:string
    Calories:number
    bgColor:string
    border:string
    icon: JSX.Element
    dispatch: Dispatch<ActivityActions>
    Activities: Activity
}

export function CardActivities({ Activity, Category, Calories, bgColor, border, icon, dispatch, Activities }: CardActivities) {
    const handleEdit = () => {
        dispatch({ type: 'SET_ACTIVE_ID', payload: { id:Activities.id } })
    }

    const handleDelete = () => {
        dispatch({ type: 'REMOVE_ACTIVITY', payload: { id:Activities.id } })
    }

  return (
    <div className={`p-2 rounded-lg shadow-sm ${bgColor} mb-4 border-l-4 ${border} flex justify-between items-center md:h-20 md:p-4 dark:backdrop-blur-md transition-colors duration-300`}>
        
        <div className="flex gap-4 items-center">
          {icon}
          <div className="flex flex-col">
              <h3 className="font-medium md:text-lg dark:dark:text-white">{Activity}</h3>

              <div className="flex gap-2">
                  <p className="text-md font-medium text-gray-500 md:text-sm ">{Category} -</p>
                  <p className="text-md text-gray-500 md:text-sm">{Calories} calories</p>
              </div>
          </div>

        </div>

        <div className="flex gap-4">
          <PencilIcon className={`size-5 text-gray-500 cursor-pointer md:size-6 ${Activities.type === "food" ? "hover:text-orange-500" : "hover:text-blue-500"}`} onClick={handleEdit} href="#form" />
          <TrashIcon className={`size-5 text-gray-500 cursor-pointer md:size-6 ${Activities.type === "food" ? "hover:text-orange-500" : "hover:text-blue-500"}`} onClick={handleDelete}/>
        </div>
        
      
    </div>
  )
}
