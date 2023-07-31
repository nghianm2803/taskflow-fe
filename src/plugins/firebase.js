import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDGbJ21epkXWrEpbGyWTW4aUDZYZJ-x3UA",
  authDomain: "taskflow-c850c.firebaseapp.com",
  projectId: "taskflow-c850c",
  storageBucket: "taskflow-c850c.appspot.com",
  messagingSenderId: "817711422333",
  appId: "1:817711422333:web:5179e64ac7239bdf42ca14",
  measurementId: "G-CFQ650CCZ0",
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const requestNotificationPermission = async () => {
  try {
    await Notification.requestPermission();
    console.log("Notification permission granted.");
    return true;
  } catch (error) {
    console.log("Error while requesting notification permission:", error);
    return false;
  }
};

export const getToken = async () => {
  try {
    const currentToken = await messaging.getToken({
      vapidKey: "BHMcAEBiKx4r6zs9LigrStBYlFEZfKenFNVpGlKOLklQcEUAYD6ZlmKLFtd7A3KqfqEquMblSNSijHG8UjJfIzQ",
    });

    if (currentToken) {
      console.log("Current token for client:", currentToken);
      return currentToken;
    } else {
      console.log("No registration token available. Request permission to generate one.");
      return null;
    }
  } catch (error) {
    console.log("An error occurred while retrieving token:", error);
    return null;
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
  });

export default messaging;
