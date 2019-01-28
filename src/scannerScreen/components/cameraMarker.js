// React Native imports
import React, {Component} from 'react';
import {ActivityIndicator, Dimensions, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const green = '#00FF00';
const red = '#FF0000';

export default class CameraMarker extends Component
{
	renderIdle(size)
	{
		return (
			<View style = 
			{{
				width: size,
				height: size,
				borderColor: 'white',
				borderWidth: 2,
				borderRadius: 10
			}}/>
		);
	}

	renderLoading(size)
	{
		return (
			<View style = 
			{{
				height: '100%',
				width: '100%',
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: '#000000DD'
			}}>
				<View style = 
				{{
					width: size,
					height: size,
					justifyContent: 'center',
					alignItems: 'center',
					borderColor: 'white',
					borderWidth: 2,
					borderRadius: 10
				}}>
					<ActivityIndicator size = 'large' color = 'white'/>
				</View>
			</View>
		);
	}

	renderSuccess(size)
	{
		return (
			<View style = 
			{{
				height: '100%',
				width: '100%',
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: '#000000DD'
			}}>
				<View style = 
				{{
					width: size,
					height: size,
					justifyContent: 'center',
					alignItems: 'center',
					borderColor: green,
					borderWidth: 2,
					borderRadius: 10
				}}>
					<Icon
						name = 'check'
						size = {100}
						color = {green}
					/>
				</View>
			</View>
		);
	}

	renderFailure(size)
	{
		return (
			<View style = 
			{{
				height: '100%',
				width: '100%',
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: '#000000DD'
			}}>
				<View style = 
				{{
					width: size,
					height: size,
					justifyContent: 'center',
					alignItems: 'center',
					borderColor: red,
					borderWidth: 2,
					borderRadius: 10
				}}>
					<Icon
						name = 'clear'
						size = {80}
						color = {red}
					/>
				</View>
			</View>
		);
	}

	render()
	{
		var {width} = Dimensions.get('screen');
		var boxSize = width * 0.75;

		switch (this.props.mode)
		{
			case "LOADING":
				return this.renderLoading(boxSize);

			case "SUCCESS":
				return this.renderSuccess(boxSize);

			case "FAILURE":
				return this.renderFailure(boxSize);

			default:
				return this.renderIdle(boxSize);
		}
	}
}