import { StyleSheet } from "react-native";
import colors from "../../styles/colors";

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // backgroundColor: colors.red
        paddingVertical: 20
    },
    greeting: {
        fontSize: 32,
        color: colors.heading
    },
    username: {
        fontSize: 32,
        color: colors.heading,
        lineHeight: 40
    },
    image: {
        width: 70,
        aspectRatio: 1,
        borderRadius: 40
    }
})

export default styles