// Redux
import { connect } from 'react-redux'
import { setFilterList } from '../actions'

import SearchBox from '../components/SearchBox'

const mapStateToProps = state => ({
  originList: state.originList, // reducers/originList.js key is originList
})

const mapDispatchToProps = dispatch => ({
  setFilterList: list => dispatch(setFilterList(list))
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox)
