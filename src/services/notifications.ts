import PushNotification, { PushNotificationObject, PushNotificationScheduleObject } from 'react-native-push-notification'

PushNotification.configure({
    
    onRegister: token => {
        console.log('Notification token:', token)
    },

    onNotification: notification => {
        console.log('Notification:', notification)
    },
})

PushNotification.createChannel({
    channelId: 'plant-manager-default',
    channelName: 'Plant Manager default channel',
    soundName: 'default',
    importance: 4,
    vibrate: true,
}, created => console.log(`createChannel 'default-channel-id' returned '${created}'`))

PushNotification.popInitialNotification((notification) => {
    console.log('Initial Notification', notification);
});
  
class NotificationService {

    constructor() {

    }

    static fire(notification: PushNotificationObject) {
        PushNotification.localNotification(notification)
    }
    static schedule(notification: PushNotificationScheduleObject) {
        PushNotification.localNotificationSchedule(notification)
    }
}

export default NotificationService