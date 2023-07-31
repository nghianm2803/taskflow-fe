importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyDGbJ21epkXWrEpbGyWTW4aUDZYZJ-x3UA",
  authDomain: "taskflow-c850c.firebaseapp.com",
  projectId: "taskflow-c850c",
  storageBucket: "taskflow-c850c.appspot.com",
  messagingSenderId: "817711422333",
  appId: "1:817711422333:web:5179e64ac7239bdf42ca14",
  measurementId: "G-CFQ650CCZ0",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

self.addEventListener("push", function (e) {
  const data = e.data.json();
  const options = {
    body: data.notification.body,
    icon: data.notification.icon,
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: "2",
    },
  };
  e.waitUntil(self.registration.showNotification(data.notification.title, options));
});
