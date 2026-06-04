import { useState } from 'react'
import '../App.css';
import { products } from '../data/productData';


const Home = () => {
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
    {filteredProducts.length > 0 ? (
      filteredProducts.map((product) => (
        <div key={product.id}>
      <img src={product.image} alt={product.title} />
          <h2>{product.title}</h2>
          <p>€{product.price}</p>
        </div>
      ))
    ) : (
      <div>
        <h2>No products found</h2>
      </div>
    )}
   </section>
   </>
  )
}

export default Home