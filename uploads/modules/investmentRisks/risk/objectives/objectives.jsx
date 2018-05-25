import React, { Component } from "react";
import FormObjectives from "../../../../components/redux-form-fields/form-objectives";

class Objectives extends Component {
  constructor(props) {
    super(props);

    this.state = {
      objectives: []
    };
  }

  componentDidMount() {
    this.props.setTracker();
    if (!this.props.loadComplete) {
      this.props.fetchObjectives();
    }
  }

  // componentWillReceiveProps(nextState) {
  //   if (!this.state.otherSelected)
  //     this.setState({
  //       otherSelected:
  //         !nextState.otherInvestmentObjective ||
  //         nextState.otherInvestmentObjective.value
  //           ? undefined
  //           : nextState.otherInvestmentObjective.value
  //     });
  // }

  // handleOnClick = id => {
  //   this.props.toggleObjective(id);
  //   this.setState({ dirty: true });
  // };

  // handleOtherClick = () => {
  //   if (this.state.otherSelected && this.props.otherInvestmentObjective.value) {
  //     this.props.clearOtherObjectives();
  //   }
  //   this.setState({ otherSelected: !this.state.otherSelected, dirty: true });
  // };

  // submit = values => {
  //   values.investmentObjective = this.props.objectives
  //     .filter(o => o.selected)
  //     .map(o => o.id)
  //     .join(",");
  //   this.props.saveObjectives(values);
  // };

  render() {
    //
    const { objectives, fields } = this.props;

    return (
      <div>
        <h2>Investment objectives</h2>
        <br />
        {this.props.loadComplete && (
          <div>
            <FormObjectives
              items={objectives}
              fieldName="investmentObjective"
              fields={fields}
              errorText="Please enter wealth objective"
            />
          </div>
        )}
      </div>
    );
  }
}

export default Objectives;
