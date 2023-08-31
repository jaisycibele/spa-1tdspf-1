import { ListaProdutos } from "../components/ListaProduto"


export default function Produtos() {
  return (
    <>
      <h1>Produtos Informáticos - FIAPO</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>NOME</th>
            <th>DESCRIÇÃO</th>
            <th>PREÇO</th>
          </tr>
        </thead>
          <tbody>
            {ListaProdutos.map((produto, indice) =>(
              <tr key={indice}>
                <td>{produto.id}</td>
                <td>{produto.nome}</td>
                <td>{produto.desc}</td>
                <td>{produto.preco}</td>
              </tr>
            ))}

          </tbody>

          <tfoot>
            <td colSpan={3}>PRODUTOS</td>
          </tfoot>
      </table>

    </>
  )
}
