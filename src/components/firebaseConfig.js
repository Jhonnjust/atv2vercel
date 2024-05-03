import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/auth'; 


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAV9V6_E47EGHJDZRUtDL7GMWYROvDEiNY",
  authDomain: "projetopw-e2614.firebaseapp.com",
  databaseURL: "https://projetopw-e2614-default-rtdb.firebaseio.com",
  projectId: "projetopw-e2614",
  storageBucket: "projetopw-e2614.appspot.com",
  messagingSenderId: "600645635630",
  appId: "1:600645635630:web:bbf4fd3c535c4b5ab3d9bf",
  measurementId: "G-BRT09JX23B"
};

// Inicialize o Firebase
// Delete o Firebase App existente, se existir
if (firebase.apps.length) {
  firebase.apps[0].delete()
    .then(() => {
      console.log('Firebase App excluído com sucesso');
      // Inicialize o Firebase com a nova configuração
      firebase.initializeApp(firebaseConfig);
    })
    .catch(error => {
      console.error('Erro ao excluir o Firebase App:', error);
    });
} else {
  console.log('Nenhum Firebase App encontrado para excluir');
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
