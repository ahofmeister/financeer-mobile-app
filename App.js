import React from 'react';
import {Platform, SafeAreaView, StatusBar, StyleSheet, View} from "react-native";
import Navigation from "navigation";
import {theme} from "./tailwind.config";

export default () => (
    <>
        <MyStatusBar backgroundColor={theme.colors.neutral} barStyle="light-content"/>
        <Navigation/>
    </>
)


const MyStatusBar = ({backgroundColor, ...props}) => (
    <View style={[styles.statusBar, {backgroundColor}]}>
        <SafeAreaView>
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </SafeAreaView>
    </View>
);

const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    statusBar: {
        height: STATUSBAR_HEIGHT,
    },
    appBar: {
        backgroundColor: '#79B45D',
        height: APPBAR_HEIGHT,
    },
    content: {
        flex: 1,
        backgroundColor: 'red',
    },
});