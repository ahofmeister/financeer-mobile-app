import React, {useEffect} from 'react';
import {Platform, SafeAreaView, StatusBar, StyleSheet, View} from "react-native";
import Navigation from "navigation";
import {theme} from "./tailwind.config";
import {AuthContextProvider} from "auth/AuthContext";

import * as NavigationBar from 'expo-navigation-bar';
import FlashMessage from "react-native-flash-message";
import {BottomSheetModalProvider} from "@gorhom/bottom-sheet";
import {GestureHandlerRootView} from "react-native-gesture-handler";

export default function () {
    useEffect(() => {
        console.log(Platform.OS)
        if (Platform.OS === 'android') {
            NavigationBar.setBackgroundColorAsync('black')
            NavigationBar.setBorderColorAsync('black')
            NavigationBar.setButtonStyleAsync('light')
        }
    }, [])

    return <>
        <GestureHandlerRootView style={{flex: 1}}>
            <AuthContextProvider>
                <BottomSheetModalProvider>
                    <MyStatusBar backgroundColor={theme.extend.colors.neutral}/>
                    <Navigation/>
                    <FlashMessage position="top"/>
                </BottomSheetModalProvider>
            </AuthContextProvider>
        </GestureHandlerRootView>
    </>
}


const MyStatusBar = ({backgroundColor}) => <>
    <View style={[styles.statusBar, {backgroundColor}]}>
        <SafeAreaView>
            <StatusBar
                backgroundColor={theme.extend.colors.neutral}
                barStyle={'light-content'}
            />
        </SafeAreaView>
    </View>
</>;

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
