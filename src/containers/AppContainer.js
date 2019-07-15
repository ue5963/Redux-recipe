// Redux
import { connect } from 'react-redux'
import { setList, setOriginalList } from '../actions'

import App from '../components/App'

const mapDispatchToProps = (dispatch, ownProps) => ({
  setOriginalList: list => dispatch(setOriginalList(list)),
  setList: list => setList(list, dispatch),
})

export default connect(null, mapDispatchToProps)(App)
