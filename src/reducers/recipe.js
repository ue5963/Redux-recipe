import {
  SET_LIST,
  RECIPE_FILTER,
} from '../actionTypes'
/**
 * Simple Reducer
 * action type に対してstateを返すだけ
 *
 * 引数のstateは変更前の state が渡される
 * action は action.type でアクションタイプと任意の値のaction.xxx が渡される
 * その値から新しい state を返す役割がある。
 */
const recipe = (state = [], action) => {
  switch (action.type) {
    case SET_LIST:
    case RECIPE_FILTER:
      return action.list
    default:
      return state
  }
}

export default recipe
