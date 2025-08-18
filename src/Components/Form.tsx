import { ArrowTrendingUpIcon,CakeIcon,PlusIcon } from '@heroicons/react/24/solid'
import { useState, useEffect} from 'react'
import type { Activity,ActivityType } from '../types';
import { foodCategories, exerciseCategories } from '../data/categories';
import toast from 'react-hot-toast';
import type { ActivityActions, ActivityState } from '../Reducers/ActivityReducer';
import type { Dispatch } from 'react';

type FormProps = {
  dispatch: Dispatch<ActivityActions>
  state: ActivityState
};


export function Form({dispatch, state}: FormProps) {

  const succes = () => toast.success('Saved activity.');
  const error = () => toast.error('Please fill all fields.');

  useEffect(() => {
    if(state.activeId){
      const activity = state.activities.filter(act => act.id === state.activeId)[0]
      
      if(activity){
        setFormData(activity);
      }
    }
  },[state.activeId, state.activities]);
  
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
    <form action="">
    <div className='p-4 flex flex-col gap-4 w-full'>
      <h2 className='font-medium text-start text-lg md:text-2xl'>Add Activity</h2>
      <div className="flex flex-col gap-4 md:flex-row">
        <button
          type="button"
          onClick={() => handleTypeClick('food')}
          className={`w-full md:w-1/2 h-13 rounded-lg md:text-xl border-1 transition-all flex gap-3 justify-center items-center cursor-pointer md:h-18 ${
            formData.type === 'food'
              ? 'border-orange-500 bg-orange-50 text-orange-700'
              : 'border-gray-200 hover:border-gray-300'
          }`}>
          <CakeIcon className="size-7 md:size-8"  />
          Food
        </button>
        <button
          type="button"
          onClick={() => handleTypeClick('exercise')}
          className={`w-full md:w-1/2 h-13 rounded-lg md:text-xl border-1 transition-all flex gap-3 justify-center items-center cursor-pointer md:h-18 ${
            formData.type === 'exercise'
              ? 'border-blue-500 bg-blue-50 text-blue-700'
              : 'border-gray-200 hover:border-gray-300'
          }`}>
          <ArrowTrendingUpIcon className="size-7 md:size-8" />
          Exercise
        </button>
      </div>

      <div className='flex flex-col gap-3'>
        <label htmlFor="categorie" className='font-bold md:text-lg'>Category</label>
        <select
          name="categorie"
          id="categorie"
          className="border border-gray-200 p-2 rounded-md w-full h-12"
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
        <label htmlFor="name" className='font-bold md:text-lg'>Name</label>
        <input
          type="text"
          id="name"
          className="border border-gray-200 p-2 rounded-md w-full h-12"
          value={formData.name}
          onChange={handleInputChange}
        />
      </div>

      <div className='flex flex-col gap-3'>
        <label htmlFor="calories" className='font-bold md:text-lg'>Calories</label>
        <input
          type="number"
          id="calories"
          className="border border-gray-200 p-2 rounded-md w-full h-12"
          value={formData.calories === 0 ? '' : formData.calories}
          min={0}
          max={10000}
          onChange={handleInputChange}
        />
      </div>

      <button
        type='button'
        className='bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-md w-full h-12 flex items-center justify-center gap-2 text-xl cursor-pointer md:h-14'
        onClick={handleSubmit}
      >
        <PlusIcon className='size-7 text-white' />
        {state.activeId ? 'Update Activity' : formData.type === 'food' ? 'Add Food' : 'Add Exercise'}
        
      </button>
    </div>
    </form>
  );

}


