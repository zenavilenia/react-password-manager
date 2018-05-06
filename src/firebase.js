import Firebase from 'firebase'

const firebaseApp = Firebase.initializeApp({
  apiKey: "AIzaSyB0vpvGPKyMmT7qUvGlsnInUqahQQqpvN8",
  authDomain: "password-manager21.firebaseapp.com",
  databaseURL: "https://password-manager21.firebaseio.com",
  projectId: "password-manager21",
  storageBucket: "password-manager21.appspot.com",
  messagingSenderId: "819257218574"
})

// Export the database for components to use.
// If you want to get fancy, use mixins or provide / inject to avoid redundant imports.
export const db = firebaseApp.database()