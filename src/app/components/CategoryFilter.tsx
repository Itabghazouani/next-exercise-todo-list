"use client"

import { CATEGORIES } from '@/constants'
import React from 'react'

const CategoryFilter = () => {

  return (
    <div className='mb-4'>
      <label htmlFor="CategoryFilter">
        Filter By Category:
      </label>
      <select
        id="CategoryFilter"
        className='border p-2 rounded'>
        <option value="">All</option>
        {CATEGORIES.map(category => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
        </select>
    </div>
  )
}

export default CategoryFilter
