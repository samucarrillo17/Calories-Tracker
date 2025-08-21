import { Form } from './Components/Form'
import { CardActivities } from './Components/CardActivities';
import{ Toaster } from 'react-hot-toast';
import { useEffect, useMemo, useReducer} from 'react';
import { ActivityReducer, initialActivityState, } from './Reducers/ActivityReducer';
import { ArrowTrendingUpIcon,FireIcon,ArrowTrendingDownIcon} from "@heroicons/react/24/outline"
import { CardCalories } from './Components/CardCalories';
import { FloatButton } from 'antd';
import { Activity, Apple, EllipsisIcon,Moon,RotateCcw, Sun } from 'lucide-react';
import './App.css';

function App() {
  const [state, dispatch] = useReducer(ActivityReducer, initialActivityState);


  const caloriesConsumed = useMemo(() => state.activities.reduce((total,activity)=> activity.type === "food" ? total + activity.calories : total, 0), [state.activities]);

  const caloriesBurned = useMemo(() => state.activities.reduce((total,activity)=> activity.type === "exercise" ? total + activity.calories : total, 0), [state.activities]);

  const calorieBalance = useMemo(() => caloriesConsumed - caloriesBurned, [caloriesConsumed, caloriesBurned]);
  

  useEffect(() => {
    const root = document.documentElement;
      if (state.isDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
        }
    }, [state.isDark]);

  const DarkMode = () => {
   dispatch({ type: 'DARK-MODE' , payload: { isDark: !state.isDark } });
 };
 
  const restarApp = () => {
    dispatch({ type: 'RESET' });
  };

  return (
    <>
   
    <FloatButton.Group
      trigger="click"
      type="default"
      icon={<div className='flex items-center justify-center w-full h-full'><EllipsisIcon className='size-5' /></div>}
    >

      <FloatButton  
      icon={state.isDark === true ? 
      <div className='flex items-center justify-center w-full h-full'><Sun className='size-5'/></div>: 
      <div className='flex items-center justify-center w-full h-full'><Moon className='size-5'/></div> } onClick={DarkMode} />

      <FloatButton icon={<div className='flex items-center justify-center w-full h-full'><RotateCcw className='size-5'  /></div>} 
      onClick={restarApp} />
    </FloatButton.Group>

    <Toaster
      toastOptions={{
        className: 'my-component',
        duration: 3000,
        position: 'top-left',

      }}
    />
    <main className='bg-orange-50 min-h-screen flex flex-col items-center md:justify-start md:items-center md:px-2 font-Inter dark:bg-gray-900 transition-colors duration-300'>
        <header className='flex items-center gap-2 justify-center p-4 '>
          <img src="apple.svg" className='bg-orange-500 rounded-full size-10' alt="" />
          <h1 className='text-4xl font-bold text-orange-500'>Calorie Tracker</h1>
      </header>

     <div className='w-[375px] rounded-2xl md:w-[1000px] md:flex md:flex-wrap md:gap-2 '>

     <section className="bg-white mb-4 rounded-2xl md:w-[500px] dark:bg-white/5 dark:backdrop-blur-md dark:border dark:border-white/20">
      <Form
        dispatch={dispatch}
        state={state}
      />
     </section>

      <section className='bg-white mb-4 rounded-2xl p-2 md:w-[490px] md:p-4 dark:bg-white/5 dark:backdrop-blur-md dark:border dark:border-white/20 dark:text-gray-300'>
        <h2 className='font-medium text-lg mb-4 md:text-xl'>Calorie Log</h2>
        <CardCalories
          text = "Calories Consumed"
          bgColor='bg-green-50 dark:bg-green-900/70'
          border='border-green-500'
          icon={<ArrowTrendingUpIcon className="size-8 rounded-full p-1 text-green-700 dark:text-green-400" />}
          textColor='text-green-700 dark:text-green-400'
          calories={caloriesConsumed}
        />

        <CardCalories
          text = "Calories Burned"
          bgColor='bg-blue-50 dark:bg-blue-900/70'
          border='border-blue-500'
          icon={<FireIcon className="size-8 rounded-full p-1 text-blue-700 dark:text-blue-400" />}
          textColor='text-blue-700 dark:text-blue-400'
          calories={caloriesBurned}
        />

        <CardCalories
          text = "Calorie Balance"
          bgColor='bg-purple-50 dark:bg-purple-900/70'
          border='border-purple-500'
          icon={<ArrowTrendingDownIcon className="size-8 rounded-full p-1 text-purple-700 dark:text-purple-400" />}
          textColor='text-purple-700 dark:text-purple-400'
          calories={calorieBalance}
        />
      </section>

     <section className='bg-white rounded-2xl p-2 w-full md:p-4 dark:bg-white/5 dark:backdrop-blur-md dark:border dark:border-white/20 dark:text-gray-300'>
        <h2 className="font-medium text-lg mb-4 md:text-xl">Activity Log</h2>
        { state.activities.length === 0 ? (
          <div className='flex flex-col justify-center items-center'>
            <div className='dark:bg-gray-700/50 rounded-full dark:p-2 mb-2'>
              <Activity className='size-5 text-gray-300  md:size-10 text-center  dark:text-gray-500' />
            </div>
            
            <p className='text-gray-500 md:text-md text-sm'>No activities recorded...</p>
          </div>
          
        ) : (
          state.activities.map(activity => (
          <CardActivities
            key={activity.id}
            Activity={activity.name}
            Category={activity.category}
            Calories={activity.calories}
            bgColor={activity.type === 'food' ? 'bg-orange-50 dark:bg-orange-500/10' : 'bg-blue-50 dark:bg-blue-500/10'}
            border={activity.type === 'food' ? 'border-orange-500 dark:border-orange-500/30' : 'border-blue-500 dark:border-blue-500/30'}
            icon={activity.type === 'food' ? <Apple className='size-8 p-1 bg-orange-500 rounded-full text-white md:size-9'/> : <ArrowTrendingUpIcon className="size-8 bg-blue-500 rounded-full p-1 text-white md:size-9" 
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
