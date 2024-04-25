
import './App.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';


import {Outlet} from "react-router-dom"

function App() {
 
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
      <Outlet />
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

  // Estilos específicos dos componentes podem ser adicionados aqui
};


