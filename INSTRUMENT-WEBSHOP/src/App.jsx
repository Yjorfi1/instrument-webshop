import { useState } from 'react'
import './App.css'
import { products } from './data/productData';


const App = () => {
  return (
   <>
   <section className="container">
    {products.map((product) => (
      <div key={product.id}>
        <h3>{product.title}</h3>
        <p>Price: €{product.price}</p>
        <img src={product.image} alt={product.title} />
        <p>Category: {product.category}</p>
      </div>
    ))}
   </section>
   </>
  )
}

export default App

