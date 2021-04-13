import React from 'react'

export default function NewProduct() {
    return (
        <div>
            <h1>Add new item</h1>
            <form >
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control mb-3" id="name"/>
                <label htmlFor="description" className="form-label">Description</label>
                <textarea id="description" className="form-control mb-3" cols="30" rows="10"></textarea>
                <label htmlFor="price" className="form-label">Price</label>
                <input type="number" className="form-control mb-3" id="price"/>
                <label htmlFor="quantityOfStock" className="form-label">Quantity Of Stock</label>
                <input type="range" className="form-range" id="quantityOfStock" min="0" max="100"/>
            </form>
        </div>
    )
}
