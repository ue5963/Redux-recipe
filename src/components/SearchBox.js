import React, { useState } from 'react'

const SearchBox = ({ searchList }) => {
  const [ text, setText ] = useState('search text')

  const onChange = e => {
    e.preventDefault()
    setText(e.target.value)
    searchList(e.target.value)
  }

  return (
    <input type='text' value={text} onChange={onChange} />
  )
}

export default SearchBox
