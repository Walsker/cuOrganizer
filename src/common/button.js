// --------------------------------------------------------------------------------------
// Template:
//	<Button
//		label = <string>
//		color = <color>
//		labelColor = <color>
//		inverted = <bool>
//		action = <method>
//	/>
// --------------------------------------------------------------------------------------
// React Native imports
import React, {Component} from 'react';
import {Animated, Platform, TouchableNativeFeedback, TouchableWithoutFeedback, Text, View} from 'react-native';

// Custom imports
import {containerStyle, textStyle, colors} from './appStyles';

export default class Button extends Component
{
	constructor(props)
	{
		super(props);

		this.state =
		{
			pressValue: new Animated.Value(0),
			INACTIVE_VALUE: 0,
			ACTIVE_VALUE: 1,
			duration: 75,
			buttonStyle: this.props.inverted ? 
			{
				backgroundColor: colors.spaceColor,
				borderColor: this.props.color,
				borderRadius: 30,
				borderWidth: 1.5,
				paddingVertical: 5,
				paddingHorizontal: 35
			}
			:
			{
				backgroundColor: this.props.color,
				borderRadius: 30,
				paddingVertical: 5,
				paddingHorizontal: 35
			}
		};
	}

	onPressIn()
	{
		Animated.timing(this.state.pressValue,
		{
			toValue: this.state.ACTIVE_VALUE,
			duration: this.state.duration
		}).start();
	}

	onRelease()
	{
		Animated.timing(this.state.pressValue,
		{
			toValue: this.state.INACTIVE_VALUE,
			duration: this.state.duration,
			delay: 150
		}).start();
		this.props.action()
	}

	renderAndroid()
	{
		var rippleColor = this.props.inverted ?
			TouchableNativeFeedback.Ripple(this.props.color, true) : TouchableNativeFeedback.Ripple(this.props.color, true);

		return (
			<View style = {containerStyle.rowBox}>
				<View style = {{borderRadius: 30}}>
					<TouchableNativeFeedback
						background = {rippleColor}
						onPress = {this.props.action}
					>
						<View style = {this.state.buttonStyle}>
							<Text style = {textStyle.bold(20, 'center', this.props.inverted ? this.props.color : this.props.labelColor)}>
								{this.props.label}
							</Text>
						</View>
					</TouchableNativeFeedback>
				</View>
			</View>
		);
	}

	renderiOS()
	{
		return (
			<View style = {containerStyle.rowBox}>
				<Animated.View style = {{transform: [{scale: 
					this.state.pressValue.interpolate({
						inputRange: [this.state.INACTIVE_VALUE, this.state.ACTIVE_VALUE],
						outputRange: [1, 0.85]
					})
				}]}}>
					<TouchableWithoutFeedback
						style = {{alignItems: 'center', alignSelf: 'stretch', flex: 1, paddingVertical: 5}}
						onPressIn = {this.onPressIn.bind(this)}
						onPressOut = {this.onRelease.bind(this)}
					>
						<View style = {this.state.buttonStyle}>
							<Text style = {textStyle.bold(20, 'center', this.props.inverted ? this.props.color : this.props.labelColor)}>
								{this.props.label}	
							</Text>
						</View>
					</TouchableWithoutFeedback>
				</Animated.View>
			</View>
		);
	}

	render()
	{
		if (Platform.OS === 'ios')
			return this.renderiOS();
		else
			return this.renderAndroid();
	}
}