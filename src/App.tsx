import { Form } from './Components/Form'
import { CardActivities } from './Components/CardActivities';
import{ Toaster } from 'react-hot-toast';
import { useEffect, useMemo, useReducer} from 'react';
import { ActivityReducer, initialActivityState, } from './Reducers/ActivityReducer';
import { ArrowTrendingUpIcon,FireIcon,ArrowTrendingDownIcon} from "@heroicons/react/24/outline"
import { CardCalories } from './Components/CardCalories';
import { Activity, Apple,Moon,RotateCcw, Sun } from 'lucide-react';


function App() {
  const [state, dispatch] = useReducer(ActivityReducer, initialActivityState);


  const caloriesConsumed = useMemo(() => state.activities.reduce((total,activity)=> activity.type === "food" ? total + activity.calories : total, 0), [state.activities]);

  const caloriesBurned = useMemo(() => state.activities.reduce((total,activity)=> activity.type === "exercise" ? total + activity.calories : total, 0), [state.activities]);

  const calorieBalance = useMemo(() => caloriesConsumed - caloriesBurned, [caloriesConsumed, caloriesBurned]);
  

  useEffect(() => {
    localStorage.setItem('isDark', JSON.stringify(state.isDark));
    const root = document.documentElement;
      if (state.isDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
        }
    }, [state.isDark]);


  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(state.activities))
  }, [state.activities])

  const DarkMode = () => {
   dispatch({ type: 'DARK-MODE' , payload: { isDark: !state.isDark } });
 };
 
  const restarApp = () => {
    dispatch({ type: 'RESET' });
  };

  return (
    <>

    <Toaster
      toastOptions={{
        success: {
          style: {
            background: '#f0fdf4',
            color: '#16a34a',
          },
        },
        error: {
          style: {
            background: '#fee2e2',
            color: '#b91c1c',
          },
        },
        position: 'top-center',

      }}
    />
    <main className='bg-orange-50 min-h-scre font-Inter dark:bg-gray-900 transition-colors duration-300 flex flex-col items-center'>

    <div className='flex flex-col w-full'>

      
      <header className='flex justify-between p-6 sticky top-0 z-40  dark:backdrop-blur-md  items-center backdrop-blur-md w-full'>

        <div className='flex gap-2 items-center'>
          <img src="apple.svg" className='bg-orange-500 rounded-full size-10' alt="" />
          <h1 className='md:text-4xl font-bold text-orange-500 text-lg'>Calorie Tracker</h1>
        </div>

        <div className='flex gap-4'>
          <button className='bg-white p-2 rounded-lg hover:bg-gray-100 cursor-pointer dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-colors duration-300' onClick={DarkMode}> {state.isDark === true ? <Sun className='size-5'/> : <Moon className='size-5'/>}      </button>

          <button className='bg-white p-2 rounded-lg hover:bg-gray-100 cursor-pointer dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-colors duration-300' onClick={restarApp}> <RotateCcw className='size-5'/></button>
          
        </div>
          
      </header>

     <div className='rounded-2xl md:flex md:flex-wrap md:gap-2 md:justify-center '>

     <section className="bg-white mb-4 rounded-2xl md:w-[500px] dark:bg-white/5 dark:backdrop-blur-md dark:border dark:border-white/20">
      <Form
        dispatch={dispatch}
        
      />
     </section>

      <section className='bg-white mb-4 rounded-2xl p-2 md:w-[500px] md:p-4 dark:bg-white/5 dark:backdrop-blur-md dark:border dark:border-white/20 dark:text-gray-300'>
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

     <section className='bg-white rounded-2xl p-2 md:w-[1000px] md:p-4 dark:bg-white/5 dark:backdrop-blur-md dark:border dark:border-white/20 dark:text-gray-300'>
        <h2 className="font-medium text-lg mb-4 md:text-xl">Activity Log</h2>
        { state.activities.length === 0 ? (
          <div className='flex flex-col justify-center items-center'>
            <div className='dark:bg-gray-700/50 rounded-full dark:p-2 mb-2'>
              <Activity className='size-6 text-gray-300  md:size-10 text-center  dark:text-gray-500' />
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
            state={state}
          />
          )))}

        
        
     </section>

   </div>

 </div>

    </main>
     
    </>
  )
}

export default App
