import React from 'react'
import { Text } from 'react-native'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'
import styles from './styles'
import { SvgFromUri } from 'react-native-svg'

interface PlantCardProps extends RectButtonProps {
    data: {
        name: string
        photo: string
    }
}

function PlantCardPrimary({ data, ...props }: PlantCardProps) {

    return (
        <RectButton style={styles.container} {...props}>
            <SvgFromUri uri={data.photo} width={70} height={70}/>
            <Text style={styles.text}>{data.name}</Text>
        </RectButton>
    )
}

export { PlantCardPrimary }