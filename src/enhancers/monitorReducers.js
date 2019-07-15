const monitorReducerEnhancer = createStore => (
  reducer,
  initialState,
  enhancer
) => {
  const monitoredReducer = (state, action) => reducer(state, action)
  return createStore(monitoredReducer, initialState, enhancer)
}

export default monitorReducerEnhancer
