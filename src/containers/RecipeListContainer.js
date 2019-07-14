// Redux
import { connect } from 'react-redux'

import RecipeList from '../components/RecipeList'

const mapStateToProps = state => ({
  list: state.recipe, // reducers/recipe.js key is recipe
})

export default connect(mapStateToProps, null)(RecipeList)
