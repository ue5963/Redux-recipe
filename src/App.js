import React from 'react'
import './App.css'

import SearchBox from './components/SearchBox'
import RecipeList from './components/RecipeList'

import { recipe } from './mock/list'

function App() {
  return (
    <div>
      <SearchBox />
      <RecipeList list={recipe} />
    </div>
  )
}

export default App
