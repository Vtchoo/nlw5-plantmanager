import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import styles from './styles'
import wateringImg from '../../assets/watering.png'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import colors from '../../styles/colors'

function Welcome() {

    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>

                <Text style={styles.title}>{'Gerencie\nsuas plantas de\nforma fácil'}</Text>

                <Image style={styles.image} source={wateringImg} resizeMode='contain' />
            
                <Text style={styles.subtitle}>
                    Não esqueça mais de regar suas plantas.
                    Nós cuidamos de lembrar você sempre que precisar
            </Text>

                <TouchableOpacity style={styles.button}>
                    <Icon name='chevron-right' size={25} color={colors.white} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export { Welcome }