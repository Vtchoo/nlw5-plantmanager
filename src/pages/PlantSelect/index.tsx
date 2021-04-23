import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import { FlatList } from 'react-native'
import { EnvironmentButton } from '../../components/EnvironmentButton'
import { Header } from '../../components/Header'
import { Load } from '../../components/Load'
import { PlantCardPrimary } from '../../components/PlantCardPrimary'
import api from '../../services/api'
import colors from '../../styles/colors'
import styles from './styles'

interface Environment {
    key: string
    title: string
}

interface Plant {
    id: string
    name: string
    abount: string
    water_tips: string
    photo: string
    environments: string[]
    frequency: {
        times: number
        repeat_every: string
    }
}

function PlantSelect() {

    const [loading, setLoading] = useState(true)
    
    const [environments, setEnvironments] = useState<Environment[]>([])
    const [plants, setPlants] = useState<Plant[]>([])
    const [selectedEnvironment, setSelectedEnvironment] = useState('all')

    const [page, setPage] = useState(1)
    const [loadingMore, setloadingMore] = useState(false)
    const [loadedAll, setLoadedAll] = useState(false)

    useEffect(() => {
        // fetchData()
        fetchEnvironments()
        fetchPlants()
    }, [])
    
    async function fetchEnvironments() {
        const { data: environments } = await api.get<Environment[]>('/plants_environments?_sort=title&_order=ASC')
        setEnvironments([{ key: 'all', title: 'Todos' }, ...environments])
    }
    
    async function fetchPlants() {
        const { data: plants } = await api.get<Plant[]>(`/plants?_sort=name&_order=ASC&_page=${page}&_limit=8`)
        
        if (!plants)
            setLoadedAll(true)
        
        if (page > 1)
            setPlants(oldPlants => [...oldPlants, ...plants])
        else
            setPlants(plants)
        
        setLoading(false)
        setloadingMore(false)
    }

    function handleSelectEnvironment(environment: string) {
        setSelectedEnvironment(environment)
    }

    function handleFetchMore(distance: number) {
        if (distance < 1)
            return
        
        setloadingMore(true)
        setPage(prev => prev + 1)
        fetchPlants()
    }

    const filteredPlants = plants.filter(plant => selectedEnvironment === 'all' || plant.environments.includes(selectedEnvironment))

    if (loading) return <Load />

    return (
        <View style={styles.container}>
            <View style={styles.header}>

                <Header />

                <Text style={styles.title}>
                    Em qual ambiente
                </Text>
                <Text style={styles.subtitle}>
                    você quer colocar sua planta?
                </Text>
            </View>
            <View>
                <FlatList
                    data={environments}
                    renderItem={({ item }) => (
                        <EnvironmentButton
                            key={item.key}
                            title={item.title}
                            active={selectedEnvironment === item.key}
                            onPress={() => handleSelectEnvironment(item.key)}
                            style={{ marginHorizontal: 5 }}
                        />
                    )}
                    keyExtractor={item => item.key}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.environmentList}
                />
            </View>

            <View style={styles.plants}>
                <FlatList
                    data={filteredPlants}
                    renderItem={({ item }) => (
                        <PlantCardPrimary data={item}/>
                    )}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    contentContainerStyle={styles.contentContainerStyle}
                    onEndReachedThreshold={.1}
                    onEndReached={({ distanceFromEnd }) => handleFetchMore(distanceFromEnd)}
                    
                />
            </View>
            {loadingMore && <ActivityIndicator color={colors.green}/>}
        </View>
    )
}

export { PlantSelect }