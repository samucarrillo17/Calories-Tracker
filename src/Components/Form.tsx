import { ArrowTrendingUpIcon,PlusIcon } from '@heroicons/react/24/solid'
import { useState, useEffect} from 'react'
import type { Activity,ActivityType } from '../types';
import { foodCategories, exerciseCategories } from '../data/categories';
import toast from 'react-hot-toast';
import type { ActivityActions, ActivityState } from '../Reducers/ActivityReducer';
import type { Dispatch } from 'react';
import { Apple } from 'lucide-react';

type FormProps = {
  dispatch: Dispatch<ActivityActions>
  state: ActivityState
};


export function Form({dispatch, state}: FormProps) {

  const succes = () => toast.success('Saved activity.');
  const error = () => toast.error('Please fill all fields.');

  
  
  const initialState: Activity = {
    id: Date.now(),
    type: 'food',
    category: '',
    name: '',
    calories: 0
  };

  const [formData, setFormData] = useState<Activity>(initialState);

  // Obtener las categorías según el tipo seleccionado
  const categories = formData.type === 'food' ? foodCategories : exerciseCategories;

  const handleTypeClick = (type: ActivityType) => {
    setFormData(prev => ({ ...prev, type, category: '' }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, category: e.target.value }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: id === 'calories' ? Number(value) : value }));
  };

  const handleSubmit = () => {
    if (!formData.category || !formData.name || !formData.calories) {

        error();
        return;
    }
    dispatch({ type: 'ADD_ACTIVITY', payload: { ...formData} });
    setFormData(initialState);
    succes()
    
  };

  return (
    <form action="" className=''>
    <div className='p-4 flex flex-col gap-4 w-full dark:text-gray-300 transition-colors duration-300  '> 
      <h2 className='font-medium text-start text-lg md:text-xl '>Add Activity</h2>
      <div className="flex flex-col gap-4 md:flex-row">
        <button
          type="button"
          onClick={() => handleTypeClick('food')}
          className={`w-full md:w-1/2 h-13 rounded-lg md:text-lg border-1 transition-colors duration-300 flex gap-3 justify-center items-center cursor-pointer md:h-16  dark:border-2 ${
            formData.type === 'food'
              ? 'border-orange-500 bg-orange-50 text-orange-700 dark:text-orange-600 dark:bg-orange-500/10 dark:border-orange-500'
              : 'border-gray-200 hover:border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:hover:border-gray-500'
          }`}>
          <Apple className='size-7' />
          Food
        </button>
        <button
          type="button"
          onClick={() => handleTypeClick('exercise')}
          className={`w-full md:w-1/2 h-13 rounded-lg md:text-lg border-1  flex gap-3 justify-center items-center cursor-pointer md:h-16 dark:border-2 transition-colors duration-300  ${
            formData.type === 'exercise'
              ? 'border-blue-500 bg-blue-50 text-blue-700 dark:text-blue-600 dark:bg-blue-500/10 dark:border-blue-500'
              : 'border-gray-200 hover:border-gray-300 dark:border-gray-600 dark:hover:border-gray-500 dark:bg-gray-700 '
          }`}>
          <ArrowTrendingUpIcon className="size-7 " />
          Exercise
        </button>
      </div>

      <div className='flex flex-col gap-3 transition-colors duration-300'>
        <label htmlFor="categorie" className='font-bold md:text-md'>Category</label>
        <select
          name="categorie"
          id="categorie"
          className="border border-gray-200 p-2 rounded-md w-full h-12 dark:bg-gray-700 dark:border-gray-600 transition-colors duration-300"
          value={formData.category}
          onChange={handleCategoryChange}
        >
          <option value="" disabled>Select a category</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.name}>{cat.name}</option>
          ))}
        </select>
      </div>

      <div className='flex flex-col gap-3'>
        <label htmlFor="name" className='font-bold md:text-md'>Name</label>
        <input
          type="text"
          id="name"
          className="border border-gray-200 p-2 rounded-md w-full h-12 dark:bg-gray-700 dark:border-gray-600 transition-colors duration-300"
          value={formData.name}
          onChange={handleInputChange}
        />
      </div>

      <div className='flex flex-col gap-3'>
        <label htmlFor="calories" className='font-bold md:text-md'>Calories</label>
        <input
          type="number"
          id="calories"
          className="border border-gray-200 p-2 rounded-md w-full h-12 dark:bg-gray-700 dark:border-gray-600 transition-colors duration-300"
          value={formData.calories === 0 ? '' : formData.calories}
          min={0}
          max={10000}
          onChange={handleInputChange}
        />
      </div>

      <button
        type='button'
        className='bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-md w-full h-12 flex items-center justify-center gap-2 text-lg cursor-pointer md:h-12 dark:bg-orange-600 dark:hover:bg-orange-700 transition-colors duration-300'
        onClick={handleSubmit}
      >
        <PlusIcon className='size-6 text-white' />
        {formData.type === 'food' ? 'Add Food' : 'Add Exercise'}
        
      </button>
    </div>
    </form>
  );

}


