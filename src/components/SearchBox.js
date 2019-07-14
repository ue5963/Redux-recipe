import React, { useState } from 'react'

import { listFilter } from '../util'

import _ from 'lodash'

const SearchBox = ({ originList, setFilterList }) => {

  const [ text, setText ] = useState('search text')

  const onChange = e => {
    e.preventDefault()

    setText(e.target.value)

    const filteredList = listFilter(_.cloneDeep(originList), e.target.value)
    setFilterList(filteredList)
  }

  return (
    <input type='text' value={text} onChange={onChange} />
  )
}

export default SearchBox
