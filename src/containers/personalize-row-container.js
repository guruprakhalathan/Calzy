import PersonalizeRow from '../components/result/personalize-row';
import { connect } from 'react-redux';
import { setResultTab } from '../actions/nav-actions';
import { showPrintPage } from '../actions/result-actions';
import { setPreparedFor, setPreparedBy } from '../actions/personalize-actions';

function mapStateToProps(state, props) {
    return props;
}

export default connect(mapStateToProps, { setPreparedBy, setPreparedFor, setResultTab, showPrintPage })(PersonalizeRow);