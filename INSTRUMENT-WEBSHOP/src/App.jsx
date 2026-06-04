import { useState } from 'react'
import './App.css'
import { products } from './data/productData';
import Navbar from './components/navbar';


const App = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' 
      ? true 
      : product.category.includes(selectedCategory);
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
   <>
   <Navbar />
   <div className="filter-section">
     <input
       type="text"
       placeholder="Search..."
       value={searchTerm}
       onChange={(e) => setSearchTerm(e.target.value)}
     />
     <select 
       id="category-filter"
       value={selectedCategory}
       onChange={(e) => setSelectedCategory(e.target.value)}
     >
       <option value="all">Categories</option>
       <option value="wind-instrument">Wind</option>
       <option value="percussion-instrument">Percussion</option>
       <option value="string-instrument">String</option>
     </select>
   </div>
   <section className="container">
    {filteredProducts.map((product) => (
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