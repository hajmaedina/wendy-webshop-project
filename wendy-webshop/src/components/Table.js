import { useState, useEffect } from "react";
//import "./App.scss";
import TableItem from "./TableItem";
import db from "../firebase/db"

function Table() {
  const [products, setproducts] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection("ShopItems")
      .onSnapshot((snapshot) => {
        const data = [];

        snapshot.docs.forEach((product) => {
          const docItem = product.data();
          docItem["docId"] = product.id;

          data.push(docItem);
        });
        setproducts(data);
      });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <header className={"container mt-4 mb-4"}>
      </header>
      <main className={"container-md"}>
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
                <TableItem key={product.name}
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
