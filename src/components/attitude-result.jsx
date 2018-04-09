import React, { Component } from 'react';
import styles from './result.css';

export default class AttitudeResult extends Component {
	constructor(props) {
		super(props);
		this.state = {
			background: 'linear-gradient(90deg, rgb(45, 85, 178) 28%, white 62%)'
		};
	}

	render() {
		const { heading, gradients, leftLabel, rightLabel } = this.props;
		return (
			<div className={styles.container}>
				<span>{heading}</span>
				<div style={this.gradientString(gradients)} className={styles.result} />
				<div className={styles.indicators}>
					<span className={styles.left}>{leftLabel}</span>
					<span>{rightLabel}</span>
				</div>
			</div>
		);
    }
    
    gradientString = gradients => {
        return {background: `linear-gradient(90deg, ${gradients.join(',')})`};
    } 
}


