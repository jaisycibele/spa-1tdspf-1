import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import style from './ExcluirProdutos.module.css'
import './ExcluirProduto.scss'

export default function ExcluirProdutos() {
  document.title = 'EXCLUIR PRODUTO';

  const navigate = useNavigate();
  const { id } = useParams();
  const [produto, setProduto] = useState({
    id: '',
    nome: '',
    desc: '',
    img: '',
    preco: '',
  });

  useEffect(() => {
    // Carregue os detalhes do produto pelo ID
    fetch(`http://localhost:5000/produtos/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Produto não encontrado');
        }
        return response.json();
      })
      .then((data) => {
        setProduto(data);
      })
      .catch((error) => {
        console.log(error);
        navigate('/produtos'); // Redirecionar em caso de erro
      });
  }, [id, navigate]);

  const handleDelete = () => {
    // Enviar solicitação DELETE para excluir o produto
    fetch(`http://localhost:5000/produtos/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Ocorreu um erro ao excluir o produto');
        }
        // Produto excluído com sucesso
        alert('Produto excluído com sucesso!');
        navigate('/produtos');
      })
      .catch((error) => {
        console.log(error);
        alert('Ocorreu um erro ao excluir o produto');
      });
  };

  return (
    <>
      <div>
        <h1 className={style.tit}>Excluir Produto</h1>
       
        <div className={style.card}>
          <h2>Produto Selecionado</h2>
          <h3 className={style.alert}>Deseja realmente excluir esse produto?</h3>
          <p>ID: {produto.id}</p>
          <figure>
            <img src={produto.img} alt={produto.desc} />
            <figcaption>{produto.nome} - <span>R$ {produto.preco}</span></figcaption>
          </figure>
          <div className={style.btn}>
            <button onClick={handleDelete}>EXCLUIR</button>
            <button onClick={() => navigate('/produtos')}>CANCELAR</button>
          </div>
        </div>
  </div>
    </>
  );
}