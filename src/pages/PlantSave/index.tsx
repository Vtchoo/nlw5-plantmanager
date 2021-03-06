import { useNavigation, useRoute } from '@react-navigation/core'
import React, { useState } from 'react'
import { Alert, Image, Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SvgFromUri } from 'react-native-svg'
import waterDrop from '../../assets/waterdrop.png'
import { Button } from '../../components/Button'
import colors from '../../styles/colors'
import DateTimePicker, { Event } from '@react-native-community/datetimepicker'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Plant, savePlant, loadPlants } from '../../libs/storage'
import PushNotification from 'react-native-push-notification'
import NotificationService from '../../services/notifications'


interface RouteParams {
    plant: Plant
}

function PlantSave() {

    const navigation = useNavigation()

    const route = useRoute()
    const { plant } = route.params as RouteParams

    const [selectedDateTime, setSelectedDateTime] = useState(new Date())
    const [showDatePicker, setShowDatePicker] = useState(false)

    function handleChangeTime(e: Event, dateTime?: Date) {
        if (Platform.OS === 'android')
            setShowDatePicker(oldState => !oldState)
        
        if (dateTime && dateTime < new Date()) {
            setSelectedDateTime(new Date())
            return Alert.alert('De volta pro futuro', 'Escolha uma data no futuro')
        }

        if (dateTime)
            setSelectedDateTime(dateTime)

    }
    
    function handleOpenDateTimePicker() {
        setShowDatePicker(true)
    }

    async function handleSave() {

        try {
            await savePlant({
                ...plant,
                dateTimeNotification: selectedDateTime
            })

            NotificationService.fire({ channelId: 'plantmanager-default', message: 'Planta salva' })

            navigation.navigate('Confirmation', {
                title: 'Tudo certo!',
                subtitle: 'Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com muito cuidado',
                buttonTitle: 'Muito obrigado!',
                icon: 'hug',
                nextScreen: 'MyPlants'
            })

        } catch (error) {
            Alert.alert('Ah não', 'Aconteceu algo errado ao salvar sua planta 😥')
        }
    }

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }}
        >
            <View style={styles.container}>
                <View style={styles.plantInfo}>
                    <SvgFromUri
                        uri={plant.photo}
                        width={150}
                        height={150}
                    />

                    <Text style={styles.plantName}>{plant.name}</Text>

                    <Text style={styles.plantAbout}>
                        {plant.about}
                    </Text>
                </View>

                <View style={styles.controller}>
                    <View style={styles.tipContainer}>
                        <Image
                            source={waterDrop}
                            style={styles.tipImage}
                        />
                        <Text style={styles.tipText}>
                            {plant.water_tips}
                        </Text>
                    </View>
                
                    <Text style={styles.alertLabel}>
                        Escolha o melhor horário para ser lembrado
                </Text>

                    {showDatePicker && <DateTimePicker
                        value={selectedDateTime}
                        mode='time'
                        display='spinner'
                        onChange={handleChangeTime}
                    />}

                    {Platform.OS === 'android' &&
                        <TouchableOpacity
                            style={styles.dateTimePickerButton}
                            onPress={handleOpenDateTimePicker}
                        >
                            <Text style={styles.dateTimePickerText}>
                                {`Mudar ${selectedDateTime.getHours()}:${selectedDateTime.getMinutes()}`}
                            </Text>
                        </TouchableOpacity>
                    }

                    <Button
                        text='Cadastrar planta'
                        onPress={handleSave}
                    />
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: colors.shape
    },
    plantInfo: {
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.shape
    },
    plantName: {
        fontWeight: 'bold',
        fontSize: 24,
        color: colors.heading,
        marginTop: 15
    },
    plantAbout: {
        textAlign: 'center',
        color: colors.heading,
        fontSize: 17,
        marginTop: 10
    },
    controller: {
        backgroundColor: colors.white,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 20
    },
    tipContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.blue_light,
        padding: 20,
        borderRadius: 20,
        position: 'relative',
        bottom: 60,
    },
    tipImage: {
        width: 56,
        aspectRatio: 1,
    },
    tipText: {
        flex: 1,
        marginLeft: 20,
        color: colors.blue,
        fontSize: 17,
        textAlign: 'justify',
    },
    alertLabel: {
        textAlign: 'center',
        color: colors.heading,
        fontSize: 12,
        marginBottom: 5
    },
    dateTimePickerButton: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 40,
        color: colors.heading,
        fontSize: 24,
        
    },
    dateTimePickerText: {

    }
})

export { PlantSave }