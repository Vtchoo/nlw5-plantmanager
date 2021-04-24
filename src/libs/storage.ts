import AsyncStorage from "@react-native-async-storage/async-storage"
import DateUtils from "../utils/DateTimeUtils"



interface Plant {
    id: number
    name: string
    about: string
    water_tips: string
    photo: string
    environments: string[]
    frequency: {
        times: number
        repeat_every: string
    },
    dateTimeNotification: Date
    hour: string
}

interface StoredPlants {
    [id: string]: {
        data: Plant
    }
}

async function getStoredPlants() {

    const data = await AsyncStorage.getItem('@plantmanager:plants')
    const storedPlants = data ? JSON.parse(data) as StoredPlants : {}

    return storedPlants
}

async function savePlant(plant: Plant) {
    try {

        const oldPlants = await getStoredPlants()

        const newPlant = {
            [plant.id]: {
                data: plant
            }
        }

        await AsyncStorage.setItem('@plantmanager:plants',
            JSON.stringify({
                ...newPlant,
                ...oldPlants
            })
        )

    } catch (error) {
        throw error
    }
}

async function loadPlants(): Promise<Plant[]> {
    try {
        
        const plants = await getStoredPlants()

        const sorted = Object.keys(plants)
            .map(plant => ({
                ...plants[plant].data,
                dateTimeNotification: new Date(plants[plant].data.dateTimeNotification),
                hour: DateUtils.formatHour(new Date(plants[plant].data.dateTimeNotification))
            }))
            .sort((a, b) => new Date(a.dateTimeNotification).getTime() - new Date(b.dateTimeNotification).getTime())
        
        return sorted

    } catch (error) {
        throw error
    }
}

async function removePlant(plant: Plant): Promise<void> {

    try {
        
        const plants = await getStoredPlants()
        delete plants[plant.id]

        await AsyncStorage.setItem('@plantmanager:plants', JSON.stringify(plants))

    } catch (error) {
        throw error
    }
}

export { savePlant, loadPlants, removePlant }
export type { Plant, StoredPlants }