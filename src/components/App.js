import React, {useEffect} from 'react'
import '../App.css'

import SearchBox from '../containers/SerchBoxContainer'
import RecipeList from '../containers/RecipeListContainer'

import recipe from '../mock/list'

const App = ({ setList, setOriginalList }) => {

  // componentDidMount or componentWillReceiveProps 時にmockのリストをセットする
  useEffect(() => {
    setOriginalList(recipe)
    setList(recipe)
  })

  return (
    <div>
      <SearchBox />
      <RecipeList />
    </div>
  )
}

export default App
