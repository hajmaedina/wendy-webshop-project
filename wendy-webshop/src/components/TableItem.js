const TableItem = ({name, type, description, price, quantityOfStock}) => {
    return (
  
      <tr >
        <td>{name}</td>
        <td>{type}</td>
        <td>{description}</td>
        <td>{price}</td>
        <td>{quantityOfStock}</td>
      </tr>
    )
  
  }
  
  export default TableItem