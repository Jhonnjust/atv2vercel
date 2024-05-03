import React, { useState, useEffect } from 'react';
import Navbar from './Navbar'; // Import Navbar component
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import './perfil.css';

const Perfil = () => {
  const [userData, setUserData] = useState({
    pictureUrl: '',
    name: '',
    email: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = firebase.auth().currentUser;
        if (user) {
          const { photoURL, displayName, email } = user;
          setUserData({ pictureUrl: photoURL, name: displayName, email });
        }
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="container profile-container">
      <Navbar />  {/* Include Navbar for navigation */}
      <div className="profile-info">
        <img src={userData.pictureUrl} alt="Foto de Perfil" className="profile-picture" />
        <h2>{userData.name}</h2>
        <p>{userData.email}</p>
      </div>
    </div>
  );
}

export default Perfil;
