import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListaProdutos } from '../components/ListaProdutos';
import styles from './AdicionarProduto.module.css';

export default function AdicionarProduto() {
  document.title = "ADICIONAR PRODUTO";

  const navigate = useNavigate();

  const [produto, setProduto] = useState({
    nome: '',
    desc: '',
    preco: '',
    img: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduto({ ...produto, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (produto.nome && produto.desc && produto.preco && produto.img) {
      const novoId = ListaProdutos.length + 1;
      const novoProduto = { id: novoId, ...produto };
      ListaProdutos.push(novoProduto); 
      console.log('Lista de Produtos:', ListaProdutos); 
      navigate('/produtos');
    } else {
      alert('Preencha todos os campos.');
    }
  };

  return (
    <>
      <div className={styles['adicionar-produto']}>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Adicionar Produto</legend>
            <div>
              <label htmlFor="idNome">Nome:</label>
              <input type="text" name="nome" id="idNome" value={produto.nome} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="idDesc">Descrição:</label>
              <input type="text" name="desc" id="idDesc" value={produto.desc} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="idPreco">Preço:</label>
              <input type="text" name="preco" id="idPreco" value={produto.preco} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="idImg">URL da Imagem:</label>
              <input type="text" name="img" id="idImg" value={produto.img} onChange={handleChange} />
            </div>
            <div>
              <button>ADICIONAR PRODUTO</button>
            </div>
          </fieldset>
        </form>
      </div>
    </>
  );
}
