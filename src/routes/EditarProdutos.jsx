import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom'
import { ListaProdutos } from '../components/ListaProdutos';
import styles from './Produtos.module.css'
 
export default function EditarProduto() {
  const { id } = useParams();
  const [produto, setProduto] = useState({
    id: id,
    nome: "",
    desc: "",
    preco: "",
    img: "",
  });

  useEffect(() => {
    // Buscar o produto com o ID especificado da API
    fetch(`http://localhost:5000/produtos/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setProduto(data); // Preenche o estado com os dados do produto
      })
      .catch((error) => console.log(error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduto({ ...produto, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Enviar a solicitação PUT para atualizar o produto
    fetch(`http://localhost:5000/produtos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(produto),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response); // Exibe a resposta da API
        // Redireciona para a página de produtos após a edição
        window.location = "/produtos";
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className={styles.container}>
      <h1>EDITAR PRODUTO</h1>

      <div className={styles.formGroup}>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Editar Produto</legend>
            <div>
              <label htmlFor="idNome">Nome</label>
              <input
                type="text"
                name="nome"
                id="idNome"
                placeholder="Digite o nome do produto."
                value={produto.nome}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="idDesc">Descrição</label>
              <input
                type="text"
                name="desc"
                id="idDesc"
                placeholder="Digite a descrição do produto."
                value={produto.desc}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="idPreco">Preço</label>
              <input
                type="number"
                name="preco"
                id="idPreco"
                placeholder="Digite o valor do produto."
                value={produto.preco}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="idImg">Imagem</label>
              <input
                type="url"
                name="img"
                id="idImg"
                placeholder="Digite a url da imagem do produto."
                value={produto.img}
                onChange={handleChange}
              />
            </div>
            <div>
              <button>EDITAR</button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
}