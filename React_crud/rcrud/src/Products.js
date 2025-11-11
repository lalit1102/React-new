import React,{useState} from 'react'
import { products } from './mockData'
import './Product.css'

const Products = () => {
  const  [productList,setProductList] = useState(products);
  const handleDelete = (itemid) =>{
    if(window.confirm("are you sure to delete")){
    const filteredList = productList.filter(item => item.id !== itemid);
    setProductList(filteredList)
    }
  }
 
  return (
    <div className='grid-container'>
      {
        productList.map((item,index)=>(
          <div className='card' key={index}>
            <img src={`https://placehold.co/600x400?text=${item.title}`}/>
            <h1>{item.title}</h1>
            <p>${item.price.toFixed(2)}</p>
            <button className='delete-btn' onClick={()=> handleDelete(item.id)}>
              remove
            </button>
          </div>
        ))
      }
    </div>
  )
}

export default Products
