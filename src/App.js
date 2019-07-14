import React, { useState } from 'react'
import './App.css'

import SearchBox from './components/SearchBox'
import RecipeList from './components/RecipeList'

import { listFilter } from './util/index'

import { recipe } from './mock/list'
import _ from 'lodash'


const App = () => {

  const [list, setList] = useState(recipe)

  const searchList = text => {
    const filteredList = listFilter(_.cloneDeep(recipe), text)
    setList(filteredList)
  }

  return (
    <div>
      <SearchBox searchList={searchList} />
      <RecipeList list={list} />
    </div>
  )
}

export default App
