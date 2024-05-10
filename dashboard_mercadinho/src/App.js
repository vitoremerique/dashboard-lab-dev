
import './App.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Sighin from './Pages/Sighin';
import { useState } from 'react';
import {Outlet} from "react-router-dom"


function App() {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

  
  const handleLoginSuccess = (isLoginSuccessful) => {
    setIsLoggedIn(isLoginSuccessful);
  };

  return (
    <div style={styles.body}>
    <div style={styles.mainLayout}>
    <div style={styles.header}>
    <Header  />
  
      </div>  

    <div style={styles.contentWrapper}>
      <div style={styles.sidebar}>
      <Sidebar />
      
    </div>
    <main style={styles.content}>
    {isLoggedIn ? (
              <Outlet /> 
            ) : (
              <>
                <h2>Please Login</h2>
                <div style={styles.loginSignupContainer}>
                  <Sighin onLoginSuccess={handleLoginSuccess} />
                 
                </div>
              </>
            )}
    </main>
   </div>
   </div>
   </div>
  );
}

export default App;

const styles = {
  // Estilos gerais
  body: {
    fontFamily: 'Arial, sans-serif',
    margin: 0,
    padding: 0,
  },

  // Layout principal
  mainLayout: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },

  contentWrapper: {
    display: 'flex',
    flex: 1,
  },

  content: {
    flex: 1,
    padding: '20px',
  },

  // Header
  header: {
    backgroundColor: '#333',
    color: '#fff',
    padding: '10px',
  },

  // Sidebar
  sidebar: {
    width: '150px',
    backgroundColor: '#f4f4f4',
    padding: '20px',
     
  },
  loginSignupContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
   
  }

  // Estilos específicos dos componentes podem ser adicionados aqui
};


