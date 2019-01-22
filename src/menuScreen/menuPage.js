// React Native imports
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

// Custom imports
import {colors, containerStyle, textStyle} from 'cuOrganizer/src/common/appStyles';
import {AndroidBar, PagePadding, Button} from 'cuOrganizer/src/common';

export default class MenuPage extends Component
{
	render()
	{
		return (
			<View style = {containerStyle.page}>
				<PagePadding/>
				<View style = {containerStyle.pageSection}>
					<Text style = {textStyle.regular(21, 'center')}>Main Menu</Text>
				</View>
			</View>
		);
	}
}