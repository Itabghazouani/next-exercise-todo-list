import { CATEGORIES } from '@/constants'
import React, { FC } from 'react'

interface CategoryFilterProps {
  selectedCategory: string,
  setSelectedCategory: (selectedCategory: string) => void,
}

const CategoryFilter: FC<CategoryFilterProps> = ({selectedCategory, setSelectedCategory}) => {
  return (
    <div className='mb-4'>
      <label htmlFor="CategoryFilter" className='mr-2'>
        Filter by category:
      </label>
      <select
      id="CategoryFilter"
      value={selectedCategory}
      onChange={e => setSelectedCategory(e.target.value)}
      className='border p-2 rounded'>
        <option value="">All</option>
        {CATEGORIES.map(category => (
          <option value={category} key={category}>{category}</option>
        ))}
      </select>
    </div>
  )
}

export default CategoryFilter
