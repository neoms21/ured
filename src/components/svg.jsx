import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import faCoffee from '@fortawesome/fontawesome-free-solid/faCoffee'
class Return extends Component {
	constructor(props) {
		super(props);

		this.state = {
			icons: this.getCircleProperties(props.selectedRisk)
		};
	}

	getCircleProperties = (riskId) => {
		let colours = {};
		this.props.items.forEach((i) => {
			colours[i.id.toString()] = { selected: i.id.toString() === riskId.toString() };
		});

		return {
			...colours
		};
	};

	componentDidMount() {
		// if (!this.props.loadComplete) {
		// this.props.fetchTaxInfo(this.props.fieldNames); }
	}

	onClick = (e) => {
		// console.log(this.getCircleProperties(e.target.id));
		this.setState({
			icons: this.getCircleProperties(e.target.id)
		});
	};

	onMouseOver = (e) => {
		if (!e.target.id) return;

		const objs = { ...this.state.icons };
		let x = {};
		Object.keys(objs).forEach((k) => {
			x[k] = { ...this.state.icons[k], hover: k === e.target.id };
		});

		this.setState({ icons: x });
	};

	onMouseOut = (e) => {
		if (!e.target.id) return;

		const objs = { ...this.state.icons };
		let x = {};
		Object.keys(objs).forEach((k) => {
			x[k] = { ...this.state.icons[k], hover: false };
		});

		this.setState({ icons: x });
	};

	// submit = () => {     this         .props
	// .saveClientCategorisation(this.state.category.value); };

	render() {
		return (
			<div>
				<h2>Client Categorisation</h2>
				<FontAwesomeIcon icon="check-square" />
                Favorite beverage: <FontAwesomeIcon icon={faCoffee} />
                <FontAwesomeIcon icon={["fab", "apple"]} />
                <FontAwesomeIcon icon={["fab", "microsoft"]} />
                <FontAwesomeIcon icon={["fab", "google"]} size="5x"/>
				<svg width="501px" height="354px" viewBox="0 0 501 354" version="1.1">
					<defs>
						<rect id="path-1" x="69" y="21" width="432" height="280" />
						<circle id="path-2" cx="18" cy="18" r="18" />
						<circle id="path-3" cx="18" cy="18" r="18" />
						<circle id="path-4" cx="18" cy="18" r="18" />
						<circle id="path-5" cx="18" cy="18" r="18" />
						<circle id="path-6" cx="18" cy="18" r="18" />
						<path
							d="M6,2.27373675e-13 L292,2.06945572e-13 C295.313708,2.06336853e-13 298,2.6862915 298,6 L298,60.7636364 C298,64.0773449 295.313708,66.7636364 292,66.7636364 L277.896484,66.7636364 L272.813965,72 L267.808594,66.7636364 L6,66.7636364 C2.6862915,66.7636364 5.39751466e-14,64.0773449 5.06261699e-14,60.7636364 L0,6 C-1.87739444e-15,2.6862915 2.6862915,2.2442968e-13 6,2.23820962e-13 Z"
							id="path-7"
						/>
						<filter
							x="-6.0%"
							y="-25.0%"
							width="112.1%"
							height="150.0%"
							filterUnits="objectBoundingBox"
							id="filter-8"
						>
							<feOffset dx="0" dy="0" in="SourceAlpha" result="shadowOffsetOuter1" />
							<feGaussianBlur stdDeviation="6" in="shadowOffsetOuter1" result="shadowBlurOuter1" />
							<feColorMatrix
								values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.25 0"
								type="matrix"
								in="shadowBlurOuter1"
							/>
						</filter>
						<path
							d="M6,2.53879436e-13 L292,1.54276592e-12 C295.313708,1.574532e-12 298,2.6862915 298,6 L298,28.9580078 L302.999023,34.4589844 L298,39.6992188 L298,60.7636364 C298,64.0773449 295.313708,66.7636364 292,66.7636364 L6,66.7636364 C2.6862915,66.7636364 1.29399067e-15,64.0773449 8.8817842e-16,60.7636364 L-2.66453526e-14,6 C-2.70511648e-14,2.6862915 2.6862915,2.27982394e-13 6,2.27373675e-13 Z"
							id="path-9"
						/>
						<filter
							x="-5.9%"
							y="-27.0%"
							width="111.9%"
							height="153.9%"
							filterUnits="objectBoundingBox"
							id="filter-10"
						>
							<feOffset dx="0" dy="0" in="SourceAlpha" result="shadowOffsetOuter1" />
							<feGaussianBlur stdDeviation="6" in="shadowOffsetOuter1" result="shadowBlurOuter1" />
							<feColorMatrix
								values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.25 0"
								type="matrix"
								in="shadowBlurOuter1"
							/>
						</filter>
						<path
							d="M6,2.27373675e-13 L292,1.75859327e-13 C295.313708,2.07625417e-13 298,2.6862915 298,6 L298,60.7440306 C298,64.0577391 295.313708,66.7440306 292,66.7440306 C291.993475,66.7440306 291.986951,66.7440199 291.980426,66.7439987 L212.087402,66.4833629 L207.004883,71.7197266 L201.999512,66.4833629 L6.00832497,66.7552998 C2.69461966,66.7598976 0.00460352702,64.0773359 5.77542398e-06,60.7636306 C1.92514182e-06,60.7608556 4.61893147e-14,60.7580806 4.61852778e-14,60.7553056 L-8.8817842e-16,6 C-2.76557286e-15,2.6862915 2.6862915,2.26206037e-13 6,2.25597319e-13 Z"
							id="path-11"
						/>
						<filter
							x="-6.0%"
							y="-25.1%"
							width="112.1%"
							height="150.2%"
							filterUnits="objectBoundingBox"
							id="filter-12"
						>
							<feOffset dx="0" dy="0" in="SourceAlpha" result="shadowOffsetOuter1" />
							<feGaussianBlur stdDeviation="6" in="shadowOffsetOuter1" result="shadowBlurOuter1" />
							<feColorMatrix
								values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.25 0"
								type="matrix"
								in="shadowBlurOuter1"
							/>
						</filter>
						<path
							d="M6,2.27373675e-13 L292,1.8562929e-13 C295.313708,1.85020571e-13 298,2.6862915 298,6 L298,60.7523451 C298,64.0660536 295.313708,66.7523451 292,66.7523451 C291.99624,66.7523451 291.99248,66.7523415 291.988719,66.7523344 L148.927734,66.4833629 L143.845215,71.7197266 L138.839844,66.4833629 L6.01211206,66.7514998 C2.69841032,66.7581891 0.00670153392,64.0773259 1.22251888e-05,60.7636241 C4.07506503e-06,60.7595868 1.7758684e-14,60.7555494 1.77635684e-14,60.751512 L0,6 C-1.87739444e-15,2.6862915 2.6862915,2.25317859e-13 6,2.2470914e-13 Z"
							id="path-13"
						/>
						<filter
							x="-6.0%"
							y="-25.1%"
							width="112.1%"
							height="150.2%"
							filterUnits="objectBoundingBox"
							id="filter-14"
						>
							<feOffset dx="0" dy="0" in="SourceAlpha" result="shadowOffsetOuter1" />
							<feGaussianBlur stdDeviation="6" in="shadowOffsetOuter1" result="shadowBlurOuter1" />
							<feColorMatrix
								values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.25 0"
								type="matrix"
								in="shadowBlurOuter1"
							/>
						</filter>
						<path
							d="M6,-2.84217094e-14 L292,-4.17443857e-14 C295.313708,-4.23531041e-14 298,2.6862915 298,6 L298,45.755493 C298,49.0692015 295.313708,51.755493 292,51.755493 C291.997287,51.755493 291.994575,51.7554912 291.991862,51.7554875 L91.3554688,51.4833629 L86.2729492,56.7197266 L81.2675781,51.4833629 L6.02069252,51.7428724 C2.70700372,51.7543005 0.0114638426,49.0772894 3.56817895e-05,45.7636006 C1.18939475e-05,45.7567031 2.66584498e-14,45.7498056 2.66453526e-14,45.742908 L-8.8817842e-16,6 C-2.76557286e-15,2.6862915 2.6862915,-3.13657047e-14 6,-3.19744231e-14 Z"
							id="path-15"
						/>
						<filter
							x="-6.0%"
							y="-31.7%"
							width="112.1%"
							height="163.5%"
							filterUnits="objectBoundingBox"
							id="filter-16"
						>
							<feOffset dx="0" dy="0" in="SourceAlpha" result="shadowOffsetOuter1" />
							<feGaussianBlur stdDeviation="6" in="shadowOffsetOuter1" result="shadowBlurOuter1" />
							<feColorMatrix
								values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.25 0"
								type="matrix"
								in="shadowBlurOuter1"
							/>
						</filter>
					</defs>
					<g id="Hover" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
						<g id="Rectangle-10-Copy">
							<use fill="#F2F4F7" fillRule="evenodd" xlinkHref="#path-1" />
							<rect stroke="#A6A6A6" strokeWidth="1" x="69.5" y="21.5" width="431" height="279" />
						</g>
						<path d="M69.5,300.5 L500.5,21.5" id="Line-Copy-3" stroke="#A6A6A6" />
						<text
							id="Very-high-High-Moder-Copy"
							fontFamily="NotoSans-Bold, Noto Sans"
							fontSize="12"
							fontWeight="bold"
							line-spacing="19"
							fill="#4A4A4A"
						>
							<tspan x="0.688" y="52">
								Very high
							</tspan>
							<tspan x="29.68" y="108">
								High
							</tspan>
							<tspan x="-0.428" y="164">
								Moderate
							</tspan>
							<tspan x="12.22" y="220">
								Limited
							</tspan>
							<tspan x="33.52" y="276">
								Low
							</tspan>
						</text>
						<path d="M70,49 L459,49 L459,301" id="Path-3-Copy-5" stroke="#A6A6A6" strokeDasharray="1,3" />
						<path d="M70,105 L372,105 L372,301" id="Path-3-Copy-6" stroke="#A6A6A6" strokeDasharray="1,3" />
						<path d="M70,161 L286,161 L286,301" id="Path-3-Copy-7" stroke="#A6A6A6" strokeDasharray="1,3" />
						<path d="M70,217 L200,217 L200,301" id="Path-3-Copy-8" stroke="#A6A6A6" strokeDasharray="1,3" />
						<path d="M70,273 L113,273 L113,301" id="Path-3-Copy-9" stroke="#A6A6A6" strokeDasharray="1,3" />
						<g id="circle/hover" transform="translate(94.000000, 255.000000)">
							<g
								id="Oval-4-Copy-8"
								onClick={this.onClick}
								onMouseOver={this.onMouseOver}
								onMouseOut={this.onMouseOut}
							>
								<use
									id="1"
									fill={this.state.icons['1'].selected ? '#2D55B2' : '#FFF'}
									fillRule="evenodd"
									xlinkHref="#path-4"
								/>
								<circle stroke="#002A5E" strokeWidth="1" cx="18" cy="18" r="17.5" />
							</g>
						</g>

						<g id="circle/hover" transform="translate(182.000000, 199.000000)">
							<g
								onClick={this.onClick}
								onMouseOver={this.onMouseOver}
								onMouseOut={this.onMouseOut}
								id="Oval-4-Copy-8"
							>
								<use
									id="2"
									fill={this.state.icons['2'].selected ? '#2D55B2' : '#FFF'}
									fillRule="evenodd"
									xlinkHref="#path-3"
								/>
								<circle stroke="#002A5E" strokeWidth="1" cx="18" cy="18" r="17.5" />
							</g>
						</g>
						<g id="circle/hover" transform="translate(268.000000, 143.000000)">
							<g
								onClick={this.onClick}
								onMouseOver={this.onMouseOver}
								onMouseOut={this.onMouseOut}
								id="Oval-4-Copy-8"
							>
								<use
									id="3"
									fill={this.state.icons['3'].selected ? '#2D55B2' : '#FFF'}
									fillRule="evenodd"
									xlinkHref="#path-2"
								/>
								<circle stroke="#002A5E" strokeWidth="1" cx="18" cy="18" r="17.5" />
							</g>
						</g>

						<g id="circle/hover" transform="translate(441.000000, 31.000000)">
							<g
								onClick={this.onClick}
								onMouseOver={this.onMouseOver}
								onMouseOut={this.onMouseOut}
								id="Oval-4-Copy-8"
							>
								<use
									id="4"
									fill={this.state.icons['4'].selected ? '#2D55B2' : '#FFF'}
									fillRule="evenodd"
									xlinkHref="#path-5"
								/>
								<circle stroke="#002A5E" strokeWidth="1" cx="18" cy="18" r="17.5" />
							</g>
						</g>
						<g id="circle/hover" transform="translate(354.000000, 87.000000)">
							<g
								onClick={this.onClick}
								onMouseOver={this.onMouseOver}
								onMouseOut={this.onMouseOut}
								id="Oval-4-Copy-8"
							>
								<use
									id="5"
									fill={this.state.icons['5'].selected ? '#2D55B2' : '#FFF'}
									fillRule="evenodd"
									xlinkHref="#path-6"
								/>
								<circle stroke="#002A5E" strokeWidth="1" cx="18" cy="18" r="17.5" />
							</g>
						</g>
						<text
							id="Potential-return"
							fontFamily="SchrodersCircularTT-Bold, Schroders Circular TT"
							fontSize="16"
							fontWeight="bold"
							fill="#002A5E"
						>
							<tspan x="227.188" y="289">
								Potential return
							</tspan>
						</text>
						<text
							id="Risk"
							transform="translate(87.500000, 162.500000) rotate(-90.000000) translate(-87.500000, -162.500000) "
							fontFamily="SchrodersCircularTT-Bold, Schroders Circular TT"
							fontSize="16"
							fontWeight="bold"
							fill="#002A5E"
						>
							<tspan x="72.076" y="168">
								Risk
							</tspan>
						</text>

						{(this.state.icons['5'].selected || this.state.icons['5'].hover) && (
							<g id="tooltip/high" transform="translate(99.000000, 13.000000)">
								<g id="Group-7">
									<g id="Rectangle-7">
										<use fill="black" fillOpacity="1" filter="url(#filter-8)" xlinkHref="#path-7" />
										<use fill="#FFFFFF" fillRule="evenodd" xlinkHref="#path-7" />
									</g>
								</g>
								<text
									id="We-have-pre-filled-s"
									fontFamily="NotoSans-Regular, Noto Sans"
									fontSize="12"
									fontWeight="normal"
									fill="#4A4A4A"
								>
									<tspan x="16" y="20">
										I am willing to accept a high degree of risk in
									</tspan>
									<tspan x="16" y="37">
										order to grow my assets materially ahead of
									</tspan>
									<tspan x="16" y="54">
										inflation over the medium to long term
									</tspan>
								</text>
							</g>
						)}
						{(this.state.icons['4'].selected || this.state.icons['4'].hover) && (
							<g id="tooltip/med-high" transform="translate(137.000000, 14.000000)">
								<g id="Group-7">
									<g id="Rectangle-7">
										<use
											fill="black"
											fillOpacity="1"
											filter="url(#filter-10)"
											xlinkHref="#path-9"
										/>
										<use fill="#FFFFFF" fillRule="evenodd" xlinkHref="#path-9" />
									</g>
								</g>
								<text
									id="I-am-seeking-to-maxi"
									fontFamily="NotoSans-Regular, Noto Sans"
									fontSize="12"
									fontWeight="normal"
									fill="#4A4A4A"
								>
									<tspan x="16" y="20">
										I am seeking to maximise returns and am
									</tspan>
									<tspan x="16" y="37">
										willing to accept a high degree of risk in order
									</tspan>
									<tspan x="16" y="54">
										to target this objective
									</tspan>
								</text>
							</g>
						)}
						{(this.state.icons['3'].selected || this.state.icons['3'].hover) && (
							<g id="tooltip/med" transform="translate(79.000000, 70.000000)">
								<g id="Group-7">
									<g id="Rectangle-7">
										<use
											fill="black"
											fillOpacity="1"
											filter="url(#filter-12)"
											xlinkHref="#path-11"
										/>
										<use fill="#FFFFFF" fillRule="evenodd" xlinkHref="#path-11" />
									</g>
								</g>
								<text
									id="I-am-willing-to-acce"
									fontFamily="NotoSans-Regular, Noto Sans"
									fontSize="12"
									fontWeight="normal"
									fill="#4A4A4A"
								>
									<tspan x="16" y="20">
										I am willing to accept a moderate degree of risk
									</tspan>
									<tspan x="16" y="37">
										in order to grow my assets marginally ahead of
									</tspan>
									<tspan x="16" y="54">
										inflation over the medium to long term
									</tspan>
								</text>
							</g>
						)}
						{(this.state.icons['2'].selected || this.state.icons['2'].hover) && (
							<g id="tooltip/low-med" transform="translate(56.000000, 126.000000)">
								<g id="Group-7">
									<g id="Rectangle-7">
										<use
											fill="black"
											fillOpacity="1"
											filter="url(#filter-14)"
											xlinkHref="#path-13"
										/>
										<use fill="#FFFFFF" fillRule="evenodd" xlinkHref="#path-13" />
									</g>
								</g>
								<text
									id="I-am-willing-to-acce"
									fontFamily="NotoSans-Regular, Noto Sans"
									fontSize="12"
									fontWeight="normal"
									fill="#4A4A4A"
								>
									<tspan x="16" y="20">
										I am willing to accept a limited degree of risk
									</tspan>
									<tspan x="16" y="37">
										in order to grow my assets in line with inflation
									</tspan>
									<tspan x="16" y="54">
										over the medium to long term
									</tspan>
								</text>
							</g>
						)}
						<text
							id="Lower-Copy"
							fontFamily="NotoSans-Bold, Noto Sans"
							fontSize="12"
							fontWeight="bold"
							line-spacing="16"
							fill="#4A4A4A"
						>
							<tspan x="95" y="321">
								Lower
							</tspan>
						</text>
						<text
							id="In-line-with-inflati"
							fontFamily="NotoSans-Bold, Noto Sans"
							fontSize="12"
							fontWeight="bold"
							line-spacing="16"
							fill="#4A4A4A"
						>
							<tspan x="166" y="321">
								In line with
							</tspan>
							<tspan x="174.418" y="337">
								inflation
							</tspan>
						</text>
						<text
							id="Marginally-ahead-of"
							fontFamily="NotoSans-Bold, Noto Sans"
							fontSize="12"
							fontWeight="bold"
							line-spacing="16"
							fill="#4A4A4A"
						>
							<tspan x="253" y="321">
								Marginally
							</tspan>
							<tspan x="259.144" y="337">
								ahead of
							</tspan>
							<tspan x="259.636" y="353">
								inflation
							</tspan>
						</text>
						<text
							id="Materially-ahead-of"
							fontFamily="NotoSans-Bold, Noto Sans"
							fontSize="12"
							fontWeight="bold"
							line-spacing="16"
							fill="#4A4A4A"
						>
							<tspan x="341" y="321">
								Materially
							</tspan>
							<tspan x="345.554" y="337">
								ahead of
							</tspan>
							<tspan x="346.046" y="353">
								inflation
							</tspan>
						</text>
						<text
							id="Maximised-to-target-Copy"
							fontFamily="NotoSans-Bold, Noto Sans"
							fontSize="12"
							fontWeight="bold"
							line-spacing="16"
							fill="#4A4A4A"
						>
							<tspan x="427" y="321">
								Maximised
							</tspan>
							<tspan x="432.85" y="337">
								to target
							</tspan>
						</text>
						{(this.state.icons['1'].selected || this.state.icons['1'].hover) && (
							<g id="tooltip/low" transform="translate(26.000000, 197.000000)">
								<g id="Group-7">
									<g id="Rectangle-7">
										<use
											fill="black"
											fillOpacity="1"
											filter="url(#filter-16)"
											xlinkHref="#path-15"
										/>
										<use fill="#FFFFFF" fillRule="evenodd" xlinkHref="#path-15" />
									</g>
								</g>
								<text
									id="I-am-seeking-to-keep"
									fontFamily="NotoSans-Regular, Noto Sans"
									fontSize="12"
									fontWeight="normal"
									fill="#4A4A4A"
								>
									<tspan x="16" y="22">
										I am seeking to keep my capital safe and will
									</tspan>
									<tspan x="16" y="39">
										accept commensurately lower returns
									</tspan>
								</text>
							</g>
						)}
					</g>
				</svg>
			</div>
		);
	}
}

export default Return;
