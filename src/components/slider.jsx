import React, { Component } from 'react';
import styles from './slider.css';
import reactLogo from '../assets/images/slider-button.svg';
import AttitudeResult from './attitude-result';

const css = {
	transition: 'left .1s linear',
	top: '-20px'
};

class Volume extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			volume: 0,
			position: 'absolute',
			left: '23px'
		};
	}

	handleOnChange = (e) => {
		console.log(e.target.getBoundingClientRect().left, e.currentTarget.offsetLeft);
		this.setState({
			left: e.currentTarget.offsetLeft - 7
		});
	};
	handleImageClick = () => {
		this.setState({
			left: '40px'
		});
	};

	render() {
		let { volume } = this.state;
		return (
			<div className={styles.container}>
				<img
					style={{ ...css, position: this.state.position, left: this.state.left }}
					src={reactLogo}
					onClick={this.handleImageClick}
					alt="marker"
				/>
				{/* <div className={styles.stepLabels}>
					<div className={`${styles.stepLabel}`}>Low</div>
					<div className={`${styles.stepLabel}`}>Low to Medium </div>
					<div className={`${styles.stepLabel}`}>Medium</div>
					<div className={`${styles.stepLabel}`}>Medium to high </div>
					<div className={`${styles.stepLabel}`}>High </div>
				</div> */}
				<div className={styles.slider}>
					{/* <div id="1" className={`${styles.step}`} onClick={this.handleOnChange} />
					<div id="2" className={`${styles.step}`} onClick={this.handleOnChange} />
					<div id="3" className={`${styles.step}`} onClick={this.handleOnChange} />
					<div id="4" className={`${styles.step}`} onClick={this.handleOnChange} />
                    <div id="5" className={`${styles.step}`} onClick={this.handleOnChange} /> */}

					{step('1', this.handleOnChange, 'Low', styles['first-step'])}
					{step('2', this.handleOnChange, 'Low to medium')}
					{step('3', this.handleOnChange, 'Medium')}
					{step('4', this.handleOnChange, 'Medium to high')}
					{step('5', this.handleOnChange, 'High', styles['last-step'])}
				</div>

				<AttitudeResult
					heading="Investment Risk"
					leftLabel="Left"
					rightLabel="right"
					gradients={[ 'rgb(45, 85, 178) 28%', 'white 62%' ]}
				/>

				<AttitudeResult
					heading="Blah Blah"
					leftLabel="Left"
					rightLabel="right"
					gradients={[ 'red', 'yellow','green' ]}
				/>
			</div>
		);
	}
}

export default Volume;

const step = (id, onChange, label, classNames) => (
	<div id={id} className={`${styles.step}`} onClick={onChange}>
		<div id={styles.left} />
		<div className={styles.divider} />
		<span className={styles['stepLabel']}>{label}</span>
		<div id={styles.right} />
	</div>
);
