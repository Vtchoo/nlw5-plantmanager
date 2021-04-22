import React, { ReactNode } from 'react'

import { useColorScheme, View } from 'react-native'
import Routes from './src/routes'

const App: () => ReactNode = () => {
	const isDarkMode = useColorScheme() === 'dark';

	return (
		<Routes />
	)
}

export default App;
