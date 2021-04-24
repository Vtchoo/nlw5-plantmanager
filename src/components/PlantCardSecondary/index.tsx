import React from 'react'
import { Animated, Text, View } from 'react-native'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'
import styles from './styles'
import { SvgFromUri } from 'react-native-svg'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { Plant } from '../../libs/storage'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import colors from '../../styles/colors'

interface PlantCardProps extends RectButtonProps {
    data: {
        name: string
        photo: string
        hour: string
    },
    onRemove?(): void
}

function PlantCardSecondary({ data, onRemove, ...props }: PlantCardProps) {



    return (
        <Swipeable
            overshootRight={false}
            renderRightActions={() => (
                <Animated.View>
                    <RectButton
                        style={styles.buttonRemove}
                        onPress={onRemove}
                    >
                        <Icon name='delete-outline' size={25} color={colors.white}/>
                    </RectButton>
                </Animated.View>)
            }
        >
        <RectButton style={styles.container} {...props}>
            <SvgFromUri uri={data.photo} width={50} height={50} />
            <Text style={styles.title}>{data.name}</Text>
            <View style={styles.details}>
                <Text style={styles.timeLabel}>Regar às</Text>
                <Text style={styles.time}>{data.hour}</Text>
            </View>
        </RectButton>
        </Swipeable>
    )
}

export { PlantCardSecondary }