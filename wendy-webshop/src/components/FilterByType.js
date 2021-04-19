import { useParams } from 'react-router-dom';
import Table from './Table';


export default function FilterByType({products}) {
    const { type } = useParams();

    const filteredProduct = products.filter(
        (product) =>
          product.type.includes(type) 
      );

    return (
        <Table products={filteredProduct} />
    )
}