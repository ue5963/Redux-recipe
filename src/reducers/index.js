/**
 * 各 state のリスト用に作った reducer をここで１つにまとめることで
 * actions の action.type がどのコンポーネントからトリガーされても
 * 対応した action.type を持っている reducer に state が渡って store を変更できるようになる。
 *
 * この例では、originList と recipe が state の key になり、各 container に
 * 渡される。 container では
 * state.originList や state.recipe
 * のように state を取得することができます。
 */

import { combineReducers } from 'redux'
import originList from './originList'
import recipe from './recipe'

export default combineReducers({
  originList,
  recipe,
})
