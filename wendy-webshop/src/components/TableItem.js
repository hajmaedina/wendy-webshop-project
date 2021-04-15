const TableItem = ({name, type, description, price, quantityOfStock}) => {
    return (
     <>
        <td>{name}</td>
        <td>{type}</td>
        <td>{description}</td>
        <td>{price}</td>
        <td>{quantityOfStock}</td>
     </>
    )
  
  }
  
  export default TableItem