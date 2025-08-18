import type { Activity } from "../types";

export type ActivityActions = 
  | { type: 'ADD_ACTIVITY'; payload: Activity }
  | { type: 'REMOVE_ACTIVITY'; payload: {id:Activity['id']} }
  | { type: 'UPDATE_ACTIVITY'; payload: {id:Activity['id']} }
  | { type: 'SET_ACTIVE_ID'; payload: {id:Activity['id']} }

  export type ActivityState = {
    activities: Activity[];
    activeId: Activity['id']
  }

  export const initialActivityState: ActivityState = {
    activities: [],
    activeId: 0
  }

  export const ActivityReducer = (state: ActivityState = initialActivityState, action: ActivityActions) => {

    if (action.type === 'ADD_ACTIVITY') {

      let updateActivity : Activity[] = []

      if(state.activeId) {
        updateActivity = state.activities.map(activity => 
          activity.id === state.activeId ? action.payload : activity
        );
      }else{
        updateActivity = [...state.activities, action.payload];
      }



      return {
        ...state,
        activities:updateActivity,
        activeId:0
      };
    }

    if(action.type === 'SET_ACTIVE_ID') {
      return {
        ...state,
        activeId: action.payload.id
      };
    }

    if(action.type === 'REMOVE_ACTIVITY') {
      const filteredActivities = state.activities.filter(activity => activity.id !== action.payload.id);
      return {
        ...state,
        activities: filteredActivities
      };
    }

    return state;
  }

