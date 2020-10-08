import React, { Component } from 'react';
import { ScrollView, FlatList, View, Button, Text, TextInput, Switch, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';

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
        return (
            <View>
                <Text>we did it</Text>
                <Text>{this.state.name}</Text>
                <Text>{this.state.location}</Text>
            </View>
        );
    }
}

export default ChoosieFinish;
