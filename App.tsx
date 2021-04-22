import React, { ReactNode } from 'react'

import { useColorScheme, View } from 'react-native'
import { Welcome } from './src/pages/Welcome'

const App: () => ReactNode = () => {
	const isDarkMode = useColorScheme() === 'dark';

	return (
		<Welcome/>
	)
}

export default App;
