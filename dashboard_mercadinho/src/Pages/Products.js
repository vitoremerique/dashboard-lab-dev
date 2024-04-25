import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';

function ProductSearch() {
  const apiUrl = 'https://91da-179-124-25-9.ngrok-free.app/api/products/';
  const categoriesUrl = 'https://91da-179-124-25-9.ngrok-free.app/api/categories/';

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [product, setProduct] = useState({
    name: '',
    category: '',
    categoryId: '', // adicionando campo para armazenar o ID da categoria selecionada
    barcode: ''
  });
  const [categories, setCategories] = useState([]); // estado para armazenar as categorias disponíveis
  const [recentProducts, setRecentProducts] = useState([]);
  const [notification, setNotification] = useState(null);
  const [openEditPopup, setOpenEditPopup] = useState(false);
  const [editedProduct, setEditedProduct] = useState({});

  useEffect(() => {
    fetchRecentProducts();
    fetchCategories(); // buscar categorias disponíveis ao carregar o componente
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(apiUrl, product);
      setProduct({
        name: '',
        category: '',
        categoryId: '',
        barcode: ''
      });
      setNotification('Produto cadastrado com sucesso!');
      fetchRecentProducts();
    } catch (error) {
      console.error('Erro ao cadastrar produto:', error);
      setNotification('Erro ao cadastrar produto. Por favor, tente novamente.');
    }
  };

  const handleEdit = async (productId, newData) => {
    try {
      await axios.put(`${apiUrl}${productId}/`, newData);
      setNotification('Produto editado com sucesso!');
      fetchRecentProducts();
    } catch (error) {
      console.error('Erro ao editar produto:', error);
      setNotification('Erro ao editar produto. Por favor, tente novamente.');
    }
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`${apiUrl}${productId}`);
      setNotification('Produto excluído com sucesso!');
      fetchRecentProducts();
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
      setNotification('Erro ao excluir produto. Por favor, tente novamente.');
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`${apiUrl}?name=${searchQuery}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Erro ao pesquisar produtos:', error);
      setNotification('Erro ao pesquisar produtos. Por favor, tente novamente.');
    }
  };

  const fetchRecentProducts = async () => {
    try {
      const response = await axios.get(apiUrl);
      setRecentProducts(response.data.slice(0, 3));
    } catch (error) {
      console.error('Erro ao buscar produtos recentes:', error);
      setNotification('Erro ao buscar produtos recentes. Por favor, tente novamente.');
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(categoriesUrl);
      setCategories(response.data);
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
      setNotification('Erro ao buscar categorias. Por favor, tente novamente.');
    }
  };

  const handleEditPopupOpen = (product) => {
    setEditedProduct(product);
    setOpenEditPopup(true);
  };

  const handleEditPopupClose = () => {
    setOpenEditPopup(false);
    setEditedProduct({});
  };

  const handleSaveEditedProduct = async () => {
    try {
      await handleEdit(editedProduct.id, editedProduct);
      handleEditPopupClose();
    } catch (error) {
      console.error('Erro ao editar produto:', error);
      setNotification('Erro ao editar produto. Por favor, tente novamente.');
    }
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Pesquisar Produtos
      </Typography>
      <form onSubmit={handleSearchSubmit}>
        <TextField
          fullWidth
          id="search"
          label="Digite o nome do produto"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }}>
          Pesquisar
        </Button>
      </form>
      {searchResults.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <Typography variant="h6">Resultados da Pesquisa:</Typography>
          <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px' }}>
            {searchResults.map((product) => (
              <Card key={product.id} style={{ margin: '10px', minWidth: '200px' }}>
                <CardContent>
                  <Typography variant="h6" component="div">
                   Id - {product.id} | produto {product.name}
                  </Typography>
                  <Typography variant="body1" component="div">
                    Barcode {product.barcode}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button variant="outlined" color="primary" onClick={() => handleEditPopupOpen(product)}>
                    Editar
                  </Button>
                  <Button variant="outlined" color="secondary" onClick={() => handleDelete(product.id)}>
                    Excluir
                  </Button>
                </CardActions>
              </Card>
            ))}
          </div>
        </div>
      )}
      {searchResults.length === 0 && searchQuery && (
        <Typography variant="body1" style={{ marginTop: '20px' }}>
          Nenhum produto encontrado.
        </Typography>
      )}

      <div style={{ marginTop: '30px' }}>
        <form onSubmit={handleSubmit}>
          <Typography variant="h5" gutterBottom>
            Cadastro de Produto
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="name"
                name="name"
                label="Nome do Produto"
                value={product.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                id="category"
                name="category"
                label="Categoria"
                value={product.categoryId} // usar o ID da categoria selecionada
                onChange={handleChange}
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="barcode"
                name="barcode"
                label="Barcode"
                value={product.barcode}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" color="primary" style={{ marginTop: '15px' }}>
            Cadastrar Produto
          </Button>
        </form>
        <Typography variant="h5" gutterBottom style={{marginTop: '30px'}}>
          Últimos Produtos Cadastrados
        </Typography>
        <Grid container spacing={2} style={{marginTop: '10px'}}>
          {recentProducts.map((recentProduct, index) => (
            <Grid key={index} item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  
                  <Typography variant="h6">{recentProduct.name}</Typography>
                  <Typography>Categoria: {recentProduct.category}</Typography>
                  <Typography>Barcode: {recentProduct.barcode}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>

      {notification && (
        <div style={{ marginTop: '20px' }}>
          <Typography variant="body1" style={{ color: notification.includes('Erro') ? 'red' : 'green' }}>{notification}</Typography>
        </div>
      )}

      {/* Popup de edição */}
      <Dialog open={openEditPopup} onClose={handleEditPopupClose}>
        <DialogTitle>Editar Produto</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Nome do Produto"
            value={editedProduct.name}
            onChange={(e) => setEditedProduct({ ...editedProduct, name: e.target.value })}
          />
          <TextField
            fullWidth
            label="Categoria"
            select
            value={editedProduct.categoryId}
            onChange={(e) => setEditedProduct({ ...editedProduct, categoryId: e.target.value })}
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            label="Barcode"
            value={editedProduct.barcode}
            onChange={(e) => setEditedProduct({ ...editedProduct, barcode: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditPopupClose}>Cancelar</Button>
          <Button onClick={handleSaveEditedProduct} color="primary">Salvar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ProductSearch;
