// React Native imports
import React, {Component} from 'react';
import {Animated, Platform, TouchableNativeFeedback, TouchableWithoutFeedback, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class IconButton extends Component
{
	constructor(props)
	{
		super(props);
		this.state =
		{
			pressValue: new Animated.Value(0),
			INACTIVE_VALUE: 0,
			ACTIVE_VALUE: 1,
			duration: 75
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
		return (
			<TouchableNativeFeedback
				background = {TouchableNativeFeedback.Ripple(this.props.color, true)}
				onPress = {this.props.action}
				hitSlop = {{top: 12, bottom: 12, right: 12, left: 12}}
			>
				<View style = {{
					margin: 12
				}}>
					<Icon
						name = {this.props.type}
						size = {this.props.size}
						color = {this.props.color}
					/>
				</View>
			</TouchableNativeFeedback>
		);
	}

	renderiOS()
	{
		return (
			<Animated.View style = {{transform: [{scale: 
				this.state.pressValue.interpolate({
					inputRange: [this.state.INACTIVE_VALUE, this.state.ACTIVE_VALUE],
					outputRange: [1, 0.75]
				})
			}]}}>
				<TouchableWithoutFeedback
					onPressIn = {this.onPressIn.bind(this)}
					onPressOut = {this.onRelease.bind(this)}
				>
					<View style = {{
						margin: 12,
						backgroundColor: 'red'
					}}>
						<Icon
							name = {this.props.type}
							size = {this.props.size}
							color = {'red'}
						/>
					</View>
				</TouchableWithoutFeedback>
			</Animated.View>
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