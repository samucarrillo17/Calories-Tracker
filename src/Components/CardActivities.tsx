import { PencilIcon,TrashIcon} from "@heroicons/react/24/outline"
import type { Dispatch } from "react"
import type { JSX } from "react"
import type { ActivityActions,ActivityState } from "../Reducers/ActivityReducer"
import type { Activity } from "../types"
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState,useEffect } from 'react'
import { SquarePenIcon } from 'lucide-react';


type CardActivities = {
   Activity: string
    Category:string
    Calories:number
    bgColor:string
    border:string
    icon: JSX.Element
    dispatch: Dispatch<ActivityActions>
    Activities: Activity
    state: ActivityState
}

export function CardActivities({ Activity, Category, Calories, bgColor, border, icon, dispatch, Activities,state }: CardActivities) {
    const handleEdit = () => {
        dispatch({ type: 'SET_ACTIVE_ID', payload: { id:Activities.id } })
        setIsOpen(true)
    }

    const handleDelete = () => {
        dispatch({ type: 'REMOVE_ACTIVITY', payload: { id:Activities.id } })
    }

    let [isOpen, setIsOpen] = useState(false)
    const [editData, seteditData] = useState<Activity>(Activities);

    const handleCancel = () => {
        setIsOpen(false);
        dispatch({ type: 'SET_ACTIVE_ID', payload: { id: 0 } });
    }

    const handleUpdate = () => {
        dispatch({ type: 'UPDATE_ACTIVITY', payload: editData });
        setIsOpen(false);
    }
    useEffect(() => {
        if(state.activeId){
          const activity = state.activities.filter(act => act.id === state.activeId)[0]
          
          if(activity){
            seteditData(activity);
          }
        }
      },[state.activeId, state.activities]);

  return (
    <div className={`p-2 rounded-lg shadow-sm ${bgColor} mb-4 border-l-4 ${border} flex justify-between items-center md:h-20 md:p-4 dark:backdrop-blur-md transition-colors duration-300`}>

      <Dialog open={isOpen} onClose={()=>isOpen} className="relative z-50">
       
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="w-md space-y-2 border border-gray-100 shadow-2xl bg-white p-8 rounded-lg  dark:bg-white/5 dark:backdrop-blur-xl dark:border dark:border-white/20">
          <DialogTitle className={'font-medium mb-4 dark:text-blue-100 text-xl flex gap-2 items-center'}><SquarePenIcon className="size-5" /> Edit activity </DialogTitle>
          
          <div className="flex flex-col gap-4">
            <label className="block">
              <span className="text-gray-700 dark:dark:text-blue-50 text-sm font-medium">Activity Name</span>
              <input type="text" value={editData.name} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 dark:dark:text-blue-100 text-sm dark:bg-gray-600 dark:border-gray-600" 
              onChange={(e) => seteditData({ ...editData, name: e.target.value })}/>
            </label>
            <label className="block">
              <span className="text-gray-700 dark:dark:text-blue-50 text-sm font-medium">Category</span>
              <input type="text" value={editData.category} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 dark:bg-gray-600 dark:border-gray-600 dark:text-blue-100 text-sm" 
              onChange={(e) => seteditData({ ...editData, category: e.target.value })}/>
            </label>
            <label className="block">
              <span className="text-gray-700 dark:dark:text-blue-50 text-sm font-medium">Calories</span>
              <input type="number" value={editData.calories} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 dark:bg-gray-600 dark:border-gray-600 dark:text-blue-100 text-sm" 
              onChange={(e) => seteditData({ ...editData, calories: Number(+e.target.value) })}/>
            </label>

          <div className="flex justify-end gap-2 mt-4">
             <button className="bg-gray-400 p-2 rounded-lg text-white font-medium cursor-pointer hover:bg-gray-500" onClick={handleCancel}>Cancel
              
            </button>
            <button className="bg-orange-500 p-2 rounded-lg text-white font-medium cursor-pointer hover:bg-orange-600"  onClick={handleUpdate}>Update activity

            </button>
          </div>


          </div>
            
        </DialogPanel>
      </div>
    </Dialog>
        
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
          <PencilIcon className={`size-5 text-gray-500 cursor-pointer md:size-6 ${Activities.type === "food" ? "hover:text-orange-500" : "hover:text-blue-500"}`} onClick={handleEdit}  />
          <TrashIcon className={`size-5 text-gray-500 cursor-pointer md:size-6 ${Activities.type === "food" ? "hover:text-orange-500" : "hover:text-blue-500"}`} onClick={handleDelete}/>
        </div>
        
      
    </div>
  )
}
