import React, { Component } from 'react';
import { ScrollView, FlatList, View, Button, Text, TextInput, Switch, StyleSheet, Linking } from 'react-native';
import { Card, Image } from 'react-native-elements';

class ChoosieFinish extends Component {

    state={
        name : '', 
        location : '', 
        featured_image : '', 
        menu : ''
    }

    shuffle = (a) => {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }

    componentDidMount(){
        const { choiceSet, delivery, lat, lng } = this.props.route.params.data 
        const cuisineID = choiceSet[0].id
        const radius = delivery === true ? 3000 : 6000 
        console.log(choiceSet, delivery, lat, lng)

        fetch(`https://developers.zomato.com/api/v2.1/search?count=3&lat=${lat}&lon=${lng}&radius=${radius}&cuisines=${cuisineID}&sort=rating`, {
        headers: {
        Accept: "application/json",
        "User-Key": ''
        }})
        .then(resp => resp.json())
        .then(resp => {
            const restaurants = this.shuffle(resp.restaurants)
            const { name, location, featured_image, menu_url } = restaurants[0].restaurant
            this.setState({
                name : name, 
                location : location.address,
                featured_image : featured_image, 
                menu : menu_url
            })
            console.log(this.state)
        })  
    }

    
    render() {
        const imageLink = this.state.featured_image
        const url = this.state.menu
        return (
            <View style={{width: "100%", height: "100%", backgroundColor: "rgb(45, 48, 71)" }}> 
                <Card containerStyle={{backgroundColor: "#EDD9A3", borderRadius:10, borderColor: "rgb(98, 131, 149)", borderWidth: 5}}>
                    <Card.Title style={{fontSize: 30}}>{this.state.name}</Card.Title>
                </Card>
                <Card containerStyle={{backgroundColor: "#EDD9A3", borderRadius:10, borderColor: "rgb(98, 131, 149)", borderWidth: 5}}>
                    { this.state.featured_image ? <Image  style={{ width: 200, height: 200, left: "20%", margin: 15, borderRadius: 10 }} source={{uri: imageLink }}/> : null }
                    <Card.Title style={{margin: 10 }}>{this.state.location}</Card.Title>
                </Card>
                <Card containerStyle={{backgroundColor: "#EDD9A3", borderRadius:10, borderColor: "rgb(98, 131, 149)", borderWidth: 5}}>
                    <Card.Title onPress={() => Linking.openURL(url)} style={{color: "rgb(98, 131, 149)", fontSize: 24}} >menu</Card.Title>
                </Card>
            </View>
        );
    }
}

export default ChoosieFinish;
