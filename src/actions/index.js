export const setOriginalList = list => ({
  type: 'SET_ORIGINAL_LIST',
  originList: list,
})

export const setList = list => ({
  type: 'SET_LIST',
  list,
})

export const setFilterList = list => ({
  type: 'RECIPE_FILTER',
  list,
})
