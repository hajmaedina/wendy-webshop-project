const TableItem = ({name, type, description, price, quantityOfStock}) => {
    return (
     <>
        <td>{name}</td>
        <td>{type}</td>
        <td>{description}</td>
        <td className="huf">{price}</td>
        <td>{quantityOfStock}</td>
     </>
    )
  
  }
  
  export default TableItem