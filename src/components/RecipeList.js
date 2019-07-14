import React from 'react'

const RecipeList = ({ list }) => {
  return (
    <ul>
      {
        list && list.map((item, index) => <li key={index}>{item.name}</li>)
      }
    </ul>
  )
}

export default RecipeList
