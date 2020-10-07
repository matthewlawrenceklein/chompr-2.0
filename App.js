/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Landing from './components/Landing'
import ChoosieProcess from './components/ChoosieProcess'
import ChoosieStart from './components/ChoosieStart'
import ChoosieFinish from './components/ChoosieFinish'
import { ThemeProvider } from 'react-native-elements';



import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const Stack = createStackNavigator();

const App: () => React$Node = () => {
  return (
      <NavigationContainer>
        <ThemeProvider>
        <Stack.Navigator initialRouteName="Landing">
          <Stack.Screen name="Landing" component={Landing} options={{ title: 'choosr' }} />
          <Stack.Screen name="ChoosieProcess" component={ChoosieProcess} options={{title: "Let's Get Started!"}} />
          <Stack.Screen name="ChoosieStart" component={ChoosieStart} options={{title: "CHOMP CHOMP CHOMP"}} />  
          <Stack.Screen name="ChoosieFinish" component={ChoosieFinish} options={{title: "WE DID IT"}} />  
        </Stack.Navigator>
        </ThemeProvider>
      </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  
});

export default App;
