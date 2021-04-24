import { StyleSheet } from "react-native";
import colors from "../../styles/colors";

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 25,
        borderRadius: 20,
        alignItems: 'center',
        backgroundColor: colors.shape,
        marginVertical: 5,
    },
    title: {
        flex: 1,
        marginLeft: 10,
        fontWeight: 'bold',
        fontSize: 17,
        color: colors.heading
    },
    details: {
        alignItems: 'flex-end',
    },
    timeLabel: {
        marginTop: 5,
        fontSize: 16,
        color: colors.body_light
    },
    time: {
        marginTop: 5,
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.body_dark
    }
})

export default styles