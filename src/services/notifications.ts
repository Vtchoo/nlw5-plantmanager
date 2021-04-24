import PushNotification, { PushNotificationObject, PushNotificationScheduleObject } from 'react-native-push-notification'



// PushNotification.popInitialNotification((notification) => {
    //     console.log('Initial Notification', notification);
    // });
    
    class NotificationService {
        
        readonly DEFAULT_CHANNEL_ID = 'plantmanager-default'

        constructor() {
            
            PushNotification.configure({
                onRegister: token => {
                    console.log('Notification token:', token)
                },
                
                onNotification: notification => {
                    console.log('Notification:', notification)
                },
                popInitialNotification: false,
                requestPermissions: false,
            })

            PushNotification.createChannel({
                channelId: this.DEFAULT_CHANNEL_ID,
                channelName: 'Plant Manager default channel',
                soundName: 'default',
                importance: 4,
                vibrate: true,
            }, created => console.log(`createChannel '${this.DEFAULT_CHANNEL_ID}' returned '${created}'`))
        }

        fire = (message: string, options: Partial<PushNotificationObject>) => {
            PushNotification.localNotification({
                message,
                channelId: this.DEFAULT_CHANNEL_ID,
                ...options,
            })
        }

        schedule = (message: string, date: Date, options: Partial<PushNotificationScheduleObject>) => {
            PushNotification.localNotificationSchedule({
                message,
                date,
                channelId: this.DEFAULT_CHANNEL_ID,
                ...options,
            })
        }
}

export default new NotificationService()