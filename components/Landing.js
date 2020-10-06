import React, { Component } from 'react';
import { View, Text, Button } from 'react-native'
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

function Landing({navigation}) {
        return (
            <View>
                <Text> hey everyone</Text>
                <Button 
                    title="Let's Chomp!"
                    onPress={() => navigation.navigate('ChoosieProcess')}
                />
            </View>
        );
    
}

export default Landing;
