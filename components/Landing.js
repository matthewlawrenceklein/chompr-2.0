import React, { Component } from 'react';
import { View, Text, Image, } from 'react-native';
import { Button, Card } from 'react-native-elements';

// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

function Landing({navigation}) {
        return (
            // containerStyle={{justifyContent: "center", alignItem: "center", alignSelf: "center"}}
            <View style={{width: "100%", height: "100%", backgroundColor: "rgb(98, 131, 149)"}}>
                <Card containerStyle={{backgroundColor: "#EDD9A3", top:"25%", borderRadius:10, }}>
                    <Image style={{height: 120, width: 200, marginLeft: 70}} source={{uri:"https://i.ibb.co/QvFgFCh/Screen-Shot-2020-10-07-at-10-55-03-AM.png"}} ></Image>
                    <Card.Title h1>choosr</Card.Title >
                    <Button 
                        buttonStyle={{backgroundColor: "rgb(45, 48, 71)", margin: "1%", padding: "5%", borderRadius: 10}}
                        titleStyle={{fontWeight: 'bold', fontSize: 30}}
                        title="start"
                        onPress={() => navigation.navigate('ChoosieProcess')}
                        />
                </Card>
            </View>
        );
    
}

export default Landing;
