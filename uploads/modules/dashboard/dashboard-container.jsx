import {connect} from 'react-redux';
import Dashboard from "./dashboard";
import {fetchDashboardData} from "./actions/dashboard-actions";
import {setSubHeader} from "../../actions/actions";
import {fetchPages, hideTracker, showTracker, broadcastWindowSize} from "../tracker/tracker-actions";


const mapStateToProps = state => ({
    sections: state.dashboard.sections,
    groups: state.dashboard.groups,
});

const mapDispatchToProps = (dispatch) => {
    return {
        fetchDashboardData: () => dispatch(fetchDashboardData()),
        setSubHeader: () => dispatch(setSubHeader('Dashboard', true)),
        fetchPages: (key) => dispatch(fetchPages(key)),
        showTracker: (width) => dispatch(showTracker(width)),
        hideTracker: () => dispatch(hideTracker()),
        broadcastWindowSize: size => dispatch(broadcastWindowSize(size))

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
