import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Grid from '@mui/material/Grid';
import axios from 'axios';

function Categories() {
  
  const apiUrl = 'https://91da-179-124-25-9.ngrok-free.app/api/categories/';
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [categorie, setCategorie] = useState({ name: '' });
  const [openEditPopup, setOpenEditPopup] = useState(false);
  const [editedCategorieName, setEditedCategorieName] = useState('');
  const [selectedCategorie, setSelectedCategorie] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(apiUrl);
      setCategories(response.data);
    } catch (error) {
      console.error(error);
      setErrorMessage('Erro ao buscar categorias');
    }
  };

  const handleCreateCategorie = async () => {
    try {
      await axios.post(apiUrl, categorie);
      setCategorie({ name: '' });
      fetchCategories();
      setSuccessMessage('Categoria criada com sucesso');
    } catch (error) {
      console.error(error);
      setErrorMessage('Erro ao criar categoria');
    }
  };

  const handleDeleteCategorie = async (id) => {
    try {
      await axios.delete(`${apiUrl}${id}`);
      fetchCategories();
      setSuccessMessage('Categoria deletada com sucesso');
    } catch (error) {
      console.error(error);
      setErrorMessage('Erro ao deletar categoria');
    }
  };

  const handleEditPopupOpen = (categorie) => {
    setSelectedCategorie(categorie);
    setEditedCategorieName(categorie.name);
    setOpenEditPopup(true);
  };

  const handleEditPopupClose = () => {
    setOpenEditPopup(false);
    setSelectedCategorie(null);
    setEditedCategorieName('');
  };

  const handleEditedCategorieNameChange = (event) => {
    setEditedCategorieName(event.target.value);
  };

  const handleSaveEditedCategorie = async () => {
    try {
      await axios.put(`${apiUrl}${selectedCategorie.id}/`, { name: editedCategorieName });
      handleEditPopupClose();
      fetchCategories();
      window.location.reload();
      setSuccessMessage('Categoria editada com sucesso');
    } catch (error) {
      console.error(error);
      setErrorMessage('Erro ao salvar categoria editada');
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setSearchResults(categories.filter(categorie =>
      categorie.name.toLowerCase().includes(searchQuery.toLowerCase())
    ));
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Pesquisar Categorias
      </Typography>
      <form onSubmit={handleSearchSubmit}>
        <TextField
          fullWidth
          id="search"
          label="Digite o nome da categoria"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }}>
          Pesquisar
        </Button>
      </form>
      <div style={{ marginTop: '20px' }}>
        <Typography variant="h6">Categorias:</Typography>
        <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px' }}>
          {searchResults.map((categorie) => (
            <Card key={categorie.id} style={{ margin: '10px', minWidth: '200px' }}>
              <CardContent>
                <Typography variant="h6" component="div">
                  Nome: {categorie.name}
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="outlined" color="primary" onClick={() => handleEditPopupOpen(categorie)}>Editar</Button>
                <Button variant="outlined" color="secondary" onClick={() => handleDeleteCategorie(categorie.id)}>Deletar</Button>
              </CardActions>
            </Card>
          ))}
        </div>
      </div>

      <div style={{ marginTop: '30px' }}>
        <Typography variant="h5" gutterBottom>
          Cadastro de Categoria
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="name"
              name="name"
              label="Nome da categoria"
              value={categorie.name}
              onChange={(e) => setCategorie({ name: e.target.value })}
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '15px' }} onClick={handleCreateCategorie}>
          Cadastrar Categoria
        </Button>
      </div>

      <Dialog open={openEditPopup} onClose={handleEditPopupClose}>
        <DialogTitle>Editar Categoria</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Nome da categoria"
            variant="outlined"
            value={editedCategorieName}
            onChange={handleEditedCategorieNameChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditPopupClose}>Cancelar</Button>
          <Button onClick={handleSaveEditedCategorie} color="primary">Salvar</Button>
        </DialogActions>
      </Dialog>

      {successMessage && <Typography variant="body1" style={{ marginTop: '20px', color: 'green' }}>{successMessage}</Typography>}
      {errorMessage && <Typography variant="body1" style={{ marginTop: '20px', color: 'red' }}>{errorMessage}</Typography>}
    </div>
  );
}

export default Categories;
