class DateUtils {

    static formatHour(date: Date) {
        return `${date.getHours()}:${date.getMinutes()}`
    }
}

export default DateUtils