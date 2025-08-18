import { Form } from './Components/Form'
import { CardActivities } from './Components/CardActivities';
import{ Toaster } from 'react-hot-toast';
import { useMemo, useReducer } from 'react';
import { ActivityReducer, initialActivityState, } from './Reducers/ActivityReducer';
import { CakeIcon,ArrowTrendingUpIcon,FireIcon,ArrowTrendingDownIcon,ArrowPathIcon } from "@heroicons/react/24/outline"
import { CardCalories } from './Components/CardCalories';
import { FloatButton } from 'antd';

function App() {
  const [state, dispatch] = useReducer(ActivityReducer, initialActivityState);

  const caloriesConsumed = useMemo(() => state.activities.reduce((total,activity)=> activity.type === "food" ? total + activity.calories : total, 0), [state.activities]);

  const caloriesBurned = useMemo(() => state.activities.reduce((total,activity)=> activity.type === "exercise" ? total + activity.calories : total, 0), [state.activities]);

  const calorieBalance = useMemo(() => caloriesConsumed - caloriesBurned, [caloriesConsumed, caloriesBurned]);

  const restarApp = () => {
    dispatch({ type: 'RESET' });
  };

  return (
    <>
    <FloatButton className={`${state.activities.length === 0 ? 'opacity-50 cursor-alias' : ''}`}  onClick={restarApp} icon={<ArrowPathIcon />} type='primary' tooltip={<div>Restar App</div>} />

    <Toaster
      toastOptions={{
        className: 'bg-white border border-gray-200 shadow-md text-xl text-red-500',
        duration: 3000,
        position: 'top-left'
      }}
    />
    <main className='bg-orange-50 min-h-screen flex flex-col items-center md:justify-start md:items-center md:px-2 font-Inter'>
        <header className='flex items-center gap-2 justify-center p-4 '>
          <img src="apple.svg" className='bg-orange-500 rounded-full size-10' alt="" />
          <h1 className='text-4xl font-bold text-orange-500'>Calorie Tracker</h1>
      </header>

     <div className='w-[375px] rounded-2xl md:w-[1200px] md:flex md:flex-wrap md:gap-2'>

     <section className='bg-white mb-4 rounded-2xl md:w-[590px]'>
      <Form
        dispatch={dispatch}
        state={state}
      />
     </section>

      <section className='bg-white mb-4 rounded-2xl p-2 md:w-[600px] md:p-4'>
        <h2 className='font-medium text-lg mb-4 md:text-2xl'>Calorie Log</h2>
        <CardCalories
          text = "Calories Consumed"
          bgColor='bg-green-50'
          border='border-green-500'
          icon={<ArrowTrendingUpIcon className="size-8 rounded-full p-1 text-green-700" />}
          textColor='text-green-700'
          calories={caloriesConsumed}
        />

        <CardCalories
          text = "Calories Burned"
          bgColor='bg-blue-50'
          border='border-blue-500'
          icon={<FireIcon className="size-8 rounded-full p-1 text-blue-700" />}
          textColor='text-blue-700'
          calories={caloriesBurned}
        />

        <CardCalories
          text = "Calorie Balance"
          bgColor='bg-purple-50'
          border='border-purple-500'
          icon={<ArrowTrendingDownIcon className="size-8 rounded-full p-1 text-purple-700" />}
          textColor='text-purple-700'
          calories={calorieBalance}
        />
      </section>

     <section className='bg-white rounded-2xl p-2 w-full md:p-4'>
        <h2 className="font-medium text-lg mb-4 md:text-2xl">Activity Log</h2>
        { state.activities.length === 0 ? (
          <div className='flex flex-col justify-center items-center'>
            <ArrowTrendingUpIcon className="size-7 text-gray-300  md:size-20 text-center" />
            <p className='text-gray-500 text-lg'>No activities recorded...</p>
          </div>
          
        ) : (
          state.activities.map(activity => (
          <CardActivities
            key={activity.id}
            Activity={activity.name}
            Category={activity.category}
            Calories={activity.calories}
            bgColor={activity.type === 'food' ? 'bg-orange-50' : 'bg-blue-50'}
            border={activity.type === 'food' ? 'border-orange-500' : 'border-blue-500'}
            icon={activity.type === 'food' ? <CakeIcon className="size-8 p-1 bg-orange-500 rounded-full text-white md:size-10" /> : <ArrowTrendingUpIcon className="size-8 bg-blue-500 rounded-full p-1 text-white md:size-10" 
            />}
            dispatch={dispatch}
            Activities={activity}
          />
          )))}

        
        
     </section>

    













 </div>

    </main>
     
    </>
  )
}

export default App
