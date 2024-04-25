import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import DashboardIcon from '@mui/icons-material/Dashboard';
const Header = () => {
  return (
    <AppBar position="static">
    <Toolbar>
      <DashboardIcon />
      <Typography variant="h6" component="div" sx={{ flexGrow: 1, marginLeft: '10px', }}>
        UFOPA mini box
      </Typography>
      {/* Outros componentes de cabeçalho, como botões de navegação ou de usuário */}
    </Toolbar>
  </AppBar>
  );
};

export default Header;


const styles = {
  container:{
   
    backgroundColor: '#d9d9d2a2',
    padding: '10px',
    width: '100%',
    height: '20px',
    borderBottom: '1px solid black'
    
    
  },
  titlem_mid:{
   
    textAlign: 'center'

  }
}