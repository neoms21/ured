import { connect } from 'react-redux'
import FormComponent from '../forms/form'

const mapStateToProps = (state, ownProps) => {
    return {
        //initialValues: { field1: state.fields.field1, field2: state.fields.field2 }
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dispatch1: () => {
            dispatch()
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(FormComponent)