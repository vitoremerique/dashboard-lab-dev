import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Alert } from '@mui/material';
import URLs from './config';
function Dashboard() {
  const [produtos, setProdutos] = useState([]);
  const [produtosBaixoEstoque, setProdutosBaixoEstoque] = useState([]);
  const [EstoqueTotalAtivo, setEstoqueTotalAtivo] = useState();
  const [TotalVendidoNoMes, setTotalVendidoNoMes] = useState();
  const url = URLs.apiUrl
 
  const fetchProdutos = async () => {
    try {
      const response = await fetch(url+'api/inventories');
      const data = await response.json();
      setProdutos(data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };


  const SomaProdutosEstoque = async () => {
    try {
      const response = await fetch(url+'/api/vitor-2');
      const data = await response.json();
      setEstoqueTotalAtivo(data);
    } catch (error) {
      console.error('Erro ao buscar total de estoques:', error);
    }
  };


  const TotalvendasMES = async () => {
    try {
      const response = await fetch(url+'/api/vitor-3');
      const data = await response.json();
      setTotalVendidoNoMes(data);
    } catch (error) {
      console.error('Erro ao buscar o total vendido no mes:', error);
    }
  };


 
  const fetchNomeProduto = async (produtoId) => {
    try {
      const response = await fetch(url+`api/products/${produtoId}`);
      const data = await response.json();
      return data.name;
    } catch (error) {
      console.error(`Erro ao buscar nome do produto com ID ${produtoId}:`, error);
      return null;
    }
  };

  
  const checkEstoqueBaixo = async () => {
    const produtosBaixoEstoqueIds = produtos.filter(produto => produto.current_quantity <= 5).map(produto => produto.id);
    const nomesProdutosBaixoEstoque = await Promise.all(produtosBaixoEstoqueIds.map(id => fetchNomeProduto(id)));
    const produtosBaixoEstoqueComNome = nomesProdutosBaixoEstoque.map((nome, index) => ({ id: produtosBaixoEstoqueIds[index], nome }));
    setProdutosBaixoEstoque(produtosBaixoEstoqueComNome);
  };


  useEffect(() => {
    fetchProdutos();
     
  }, []); 
  
  useEffect(() => {
    SomaProdutosEstoque()
     
  }, [EstoqueTotalAtivo]); 

  useEffect(() => {
    TotalvendasMES();
     
  }, [TotalVendidoNoMes]); 

  useEffect(() => {
    if (produtos.length > 0) {
      checkEstoqueBaixo();
    }
  }, [produtos]); 





  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="div">
              Vendas do Dia
            </Typography>
            <Typography variant="h4" component="div">
              R$ 40.00
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="div">
              Produtos em Estoque
            </Typography>
            <Typography variant="h4" component="div">
              5
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="div">
              Faturamento Mensal
            </Typography>
            <Typography variant="h4" component="div">
              R$ 1000,00
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      {produtosBaixoEstoque.length > 0 && (
        <Grid item xs={12}>
          <Alert severity="warning">
            <Typography variant="h6">Alerta de Estoque Baixo</Typography>
            <ul>
              {produtosBaixoEstoque.map(produto => (
                <li key={produto.id}>{produto.nome}</li>
              ))}
            </ul>
          </Alert>
        </Grid>
      )}
    </Grid>
  );
}

export default Dashboard;
