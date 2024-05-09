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
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import URLs from './config';
function Inventories() {
  const url = URLs.apiUrl
  const apiUrlProduct = url+'api/products/';
  const apiUrlInventory = url+'api/products/{}/inventories/';

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchResultsInventory, setSearchResultsInventory] = useState([]);
  const [product, setProduct] = useState({

    product: '',
    buy_price: '',
    sell_price: '',
    initial_quantity: '',
    
  });
  const [recentProducts, setRecentProducts] = useState([]);
  const [notification, setNotification] = useState(null);
  const [openEditPopup, setOpenEditPopup] = useState(false);
  const [editedProduct, setEditedProduct] = useState({});
 

  useEffect(() => {
    fetchRecentProduct();
    fetchproduct();
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
      await axios.post(apiUrlInventory, product);
      setProduct({
        product: '',
        buy_price: '',
        sell_price: '',
        initial_quantity: ''
      });
      setNotification('Estoque cadastrado com sucesso!');
      fetchRecentProduct();
    } catch (error) {
      console.error('Erro ao cadastrar estoque:', error);
      setNotification('Erro ao cadastrar estoque. Por favor, tente novamente.');
    }
  };

  const handleEdit = async (productId, newData) => {
    try {
      await axios.put(`${apiUrlInventory}${productId}/`, newData);
      setNotification('Estoque editado com sucesso!');
      fetchRecentProduct();
    } catch (error) {
      console.error('Erro ao editar estoque:', error);
      setNotification('Erro ao editar estoque. Por favor, tente novamente.');
    }
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`${apiUrlInventory}${productId}`);
      setNotification('Produto excluído com sucesso!');
      fetchRecentProduct();
    } catch (error) {
      console.error('Erro ao excluir estoque:', error);
      setNotification('Erro ao excluir estoque. Por favor, tente novamente.');
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`${apiUrlInventory}?search=${searchQuery}`);
      setSearchResultsInventory(response.data);
    } catch (error) {
      console.error('Erro ao pesquisar produtos:', error);
      setNotification('Erro ao pesquisar produtos. Por favor, tente novamente.');
    }
  };

  const fetchRecentProduct = async () => {
    try {
      const response = await axios.get(apiUrlInventory);
      const products = await Promise.all(response.data.map(async (item) => {
        const productResponse = await axios.get(`${apiUrlProduct}${item.product}`);
        return { ...item, productName: productResponse.data.name };
      }));
      setRecentProducts(products.slice(0, 3));
    } catch (error) {
      console.error('Erro ao buscar estoque recentes:', error);
      setNotification('Erro ao buscar estoque recentes. Por favor, tente novamente.');
    }
  };

  const fetchproduct = async () => {
    try {
      const response = await axios.get(apiUrlProduct);
      setSearchResults(response.data.map((product) => ({ id: product.id, name: product.name })));
    } catch (error) {
      console.error('Erro ao buscar nomes de produtos:', error);
      setNotification('Erro ao buscar nomes de produtos. Por favor, tente novamente.');
    }
  };


  const fetchInvetory = async () => {
    try {
      const response = await axios.get(apiUrlProduct);
      setSearchResultsInventory(response.data.map((product) => ({ id: product.id, name: product.name })));
    } catch (error) {
      console.error('Erro ao buscar nomes de produtos:', error);
      setNotification('Erro ao buscar nomes de produtos. Por favor, tente novamente.');
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
      console.error('Erro ao editar Estoque:', error);
      setNotification('Erro ao editar Estoque. Por favor, tente novamente.');
    }
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Pesquisar Estoque
      </Typography>
      <form onSubmit={handleSearchSubmit}>
        <TextField
          fullWidth
          id="search"
          label="Digite o nome do Produto"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }}>
          Pesquisar
        </Button>
      </form>
      {searchResultsInventory.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <Typography variant="h6">Estoques:</Typography>
          <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px' }}>
            {searchResultsInventory.map((inventory) => ( 
              <Card key={inventory.id} style={{ margin: '10px', minWidth: '200px' }}>
                <CardContent>
                  <Typography variant="body1" component="div">
                   {inventory.product}
                  </Typography>
                  <Typography variant="body1" component="div">
                    {inventory.in_inventory_at}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button variant="outlined" color="primary" onClick={() => handleEditPopupOpen(inventory)}>
                    Editar
                  </Button>
                  <Button variant="outlined" color="secondary" onClick={() => handleDelete(inventory.id)}>
                    Excluir
                  </Button>
                </CardActions>
              </Card>
            ))}
          </div>
        </div>
      )}


      
      <div style={{ marginTop: '30px' }}>
        <form onSubmit={handleSubmit}>
            
          <Typography variant="h5" gutterBottom>
            Cadastro de Estoque
          </Typography>
          
        <Autocomplete
          fullWidth
          options={searchResults}
          value={selectedProduct}
          onChange={(event, newValue) => {
            setSelectedProduct(newValue);
            setProduct({ ...product, product: newValue ? newValue.id : '' });
          }}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => <TextField {...params} label="Produto" />}
        />
          <TextField
            required
            fullWidth
            id="buy_price"
            name="buy_price"
            label="Preço de Compra"
            type="number"
            value={product.buy_price}
            onChange={handleChange}
          />
          <TextField
            required
            fullWidth
            id="sell_price"
            name="sell_price"
            label="Preço de Venda"
            type="number"
            value={product.sell_price}
            onChange={handleChange}
          />
          <TextField
            required
            fullWidth
            id="quantity"
            name="initial_quantity"
            label="Quantidade"
            type="number"
            value={product.initial_quantity}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained" color="primary" style={{ marginTop: '15px' }}>
            Cadastrar Estoque
          </Button>
        </form>
        <Typography variant="h5" gutterBottom style={{ marginTop: '30px' }}>
          Últimos Estoques Cadastrados
        </Typography>
        <Grid container spacing={2} style={{ marginTop: '10px' }}>
          {recentProducts.map((recentProduct, index) => (
            <Grid key={index} item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Nome do produto: {recentProduct.productName}</Typography>
                  <Typography>Preço de Compra: R${recentProduct.buy_price}</Typography>
                  <Typography>Preço de Venda: R${recentProduct.sell_price}</Typography>
                  <Typography>Quantidade: {recentProduct.initial_quantity}</Typography>
                </CardContent>
                <CardActions>
                  <Button variant="outlined" color="primary" onClick={() => handleEditPopupOpen(recentProduct)}>
                    Editar
                  </Button>
                  <Button variant="outlined" color="secondary" onClick={() => handleDelete(recentProduct.id)}>
                    Excluir
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
      
      <Dialog open={openEditPopup} onClose={handleEditPopupClose}>
        <DialogTitle>Editar Estoque</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Nome do Estoque"
            value={editedProduct.product}
            onChange={(e) => setEditedProduct({ ...editedProduct, product: e.target.value })}
          />
          <TextField
            fullWidth
            label="Preço de Compra"
            type="number"
            value={editedProduct.buy_price}
            onChange={(e) => setEditedProduct({ ...editedProduct, buy_price: e.target.value })}
          />
          <TextField
            fullWidth
            label="Preço de Venda"
            type="number"
            value={editedProduct.sell_price}
            onChange={(e) => setEditedProduct({ ...editedProduct, sell_price: e.target.value })}
          />
          <TextField
            fullWidth
            label="Quantidade"
            type="number"
            value={editedProduct.quantity}
            onChange={(e) => setEditedProduct({ ...editedProduct, initial_quantity: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditPopupClose}>Cancelar</Button>
          <Button onClick={handleSaveEditedProduct} color="primary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Inventories;
