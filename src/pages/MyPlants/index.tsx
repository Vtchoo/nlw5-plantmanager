import React, { useEffect, useState } from 'react'
import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import { Header } from '../../components/Header'
import colors from '../../styles/colors'
import waterdrop from '../../assets/waterdrop.png'
import { loadPlants, Plant } from '../../libs/storage'
import DateUtils from '../../utils/DateTimeUtils'
import { PlantCardSecondary } from '../../components/PlantCardSecondary'

function MyPlants() {

    const [plants, setPlants] = useState<Plant[]>([])
    const [loading, setLoading] = useState(true)
    const [nextWatering, setNextWatering] = useState<string>()

    useEffect(() => { loadStoredPlants() }, [])

    async function loadStoredPlants() {
        try {
            const storedPlants = await loadPlants()
            console.log(typeof storedPlants[0].dateTimeNotification)

            const [firstPlant] = storedPlants
            
            const nextTime = new Date(firstPlant.dateTimeNotification.getTime() - new Date().getTime())
            const nextWatering = DateUtils.formatHour(nextTime)

            setNextWatering(`Não esqueca de regar a ${firstPlant.name} em ${nextWatering}`)
            setPlants(storedPlants)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View style={styles.container}>
            <Header />

            <View style={styles.spotlight}>
                <Image
                    source={waterdrop}
                    style={styles.spotlightImage}
                />
                <Text style={styles.spotlightText}>{nextWatering}</Text>
            </View>

            <View style={styles.plants}>
                <Text style={styles.plantsTitle}>Próximas regadas</Text>
                <FlatList
                    data={plants}
                    keyExtractor={plant => plant.id.toString()}
                    renderItem={({ item }) => (
                        <PlantCardSecondary data={item}/>
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{  }}
                    style={{ flex: 1 }}
                />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingTop: 50,
        backgroundColor: colors.background
    },
    spotlight: {
        backgroundColor: colors.blue_light,
        paddingHorizontal: 20,
        borderRadius: 20,
        height: 110,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    spotlightImage: {
        width: 60,
        aspectRatio: 1,
    },
    spotlightText: {
        flex: 1,
        color: colors.blue,
        paddingHorizontal: 20,
        // textAlign: 'justify'
    },
    plants: {
        flex: 1,
        width: '100%',

    },
    plantsTitle: {
        fontSize: 24,
        color: colors.heading,
        marginVertical: 20,
    }
})

export { MyPlants }