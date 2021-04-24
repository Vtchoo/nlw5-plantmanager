import React from 'react'
import { Text, View } from 'react-native'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'
import styles from './styles'
import { SvgFromUri } from 'react-native-svg'

interface PlantCardProps extends RectButtonProps {
    data: {
        name: string
        photo: string
        hour: string
    }
}

function PlantCardSecondary({ data, ...props }: PlantCardProps) {

    return (
        <RectButton style={styles.container} {...props}>
            <SvgFromUri uri={data.photo} width={50} height={50} />
            <Text style={styles.title}>{data.name}</Text>
            <View style={styles.details}>
                <Text style={styles.timeLabel}>Regar às</Text>
                <Text style={styles.time}>{data.hour}</Text>
            </View>
        </RectButton>
    )
}

export { PlantCardSecondary }