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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProduto({ ...produto, img: e.target.result });
      };
      reader.readAsDataURL(file);
    }
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
              <label htmlFor="idImg">Imagem:</label>
              <input type="file" accept="image/*" name="img" id="idImg" onChange={handleImageChange} />
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
