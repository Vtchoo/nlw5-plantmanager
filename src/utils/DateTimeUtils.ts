class DateUtils {

    static formatHour(date: Date) {
        return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
    }
}

export default DateUtils