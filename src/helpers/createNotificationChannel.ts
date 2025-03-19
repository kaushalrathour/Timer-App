import notifee, {AndroidImportance } from "@notifee/react-native"
export default async function createNotificationChannel() {
    await notifee.createChannel({
          id: 'default',
          name: 'Default Channel',
          importance: AndroidImportance.HIGH,
        });
}