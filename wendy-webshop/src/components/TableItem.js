const TableItem = ({name, type, description, price, quantityOfStock}) => {
    return (
     <>
        <td>{name}</td>
        <td>{type}</td>
        <td>{description}</td>
        <td>{price}</td>
        <td className="huf">{quantityOfStock}</td>
     </>
    )
  
  }
  
  export default TableItem