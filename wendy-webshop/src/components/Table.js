import TableItem from './TableItem';

function Table({ products }) {
  return (
    <>
      <header className={'container mt-4 mb-4'}></header>
      <main className={'container-md'}>
        <section>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Description</th>
                <th>Price</th>
                <th>Quantity of stock</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <TableItem
                  key={product.id}
                  name={product.name}
                  type={product.type}
                  description={product.description}
                  price={product.price}
                  quantityOfStock={product.quantityOfStock}
                />
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </>
  );
}

export default Table;
