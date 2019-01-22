// React imports
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

// Custom imports
import {colors, textStyle} from 'cuOrganizer/src/common/appStyles';

export default class ScannerPage extends Component
{
    render()
    {
        return (
            <View style = {localStyle.default}>
                <Text style = {textStyle.light(21, 'center')}>QR Code scanner page</Text>
            </View>
        );
    }
}

const localStyle = StyleSheet.create(
{
    default:
    {
        flex: 1,
        backgroundColor: colors.primaryColor
    }
});