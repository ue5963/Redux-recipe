export const listFilter = (list, text) => {
  return list.filter(item => item.name.indexOf(text) !== -1)
}
