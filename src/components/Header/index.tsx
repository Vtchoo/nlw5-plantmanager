import React from 'react'
import { Image, Text, View } from 'react-native'
import styles from './styles'
import profileImg from '../../assets/profile.png'

function Header() {

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.greeting}>Olá,</Text>
                <Text style={styles.username}>Victor</Text>
            </View>
            <Image style={styles.image} source={profileImg}/>
        </View>
    )
}

export { Header }