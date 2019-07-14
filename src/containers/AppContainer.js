// Redux
import { connect } from 'react-redux'
import { setList, setOriginalList } from '../actions'

import App from '../components/App'

const mapDispatchToProps = (dispatch, ownProps) => ({
  setOriginalList: list => dispatch(setOriginalList(list)),
  setList: list => dispatch(setList(list)),
})

export default connect(null, mapDispatchToProps)(App)
