import React,{useEffect, useState} from 'react'
import { products } from './mockData'
import './Product.css'

const Products = () => {
  const  [productList,setProductList] = useState(products);
  const [searchTearm,setSearchTearm] = useState("");
  const [productName,setProductName] = useState("")
  const [productPrice,setProductPrice] = useState("")


  // delete button mate function banavyu
  const handleDelete = (itemid) =>{
    if(window.confirm("are you sure to delete")){
    const filteredList = productList.filter(item => item.id !== itemid);
    setProductList(filteredList)
    }
  }

  // search mate hooks no upyog kari ne banavyu
  useEffect(()=>{
    if(searchTearm){
      const filteredList = products.filter(item => item.title.toLowerCase().includes(searchTearm.toLowerCase()))
      setProductList(filteredList)
    }
    else {
      setProductList(products)
    }
  },[searchTearm])

  const handleAdd = () => {
    if(!productName||!productPrice){
      return alert("product name and price both are mandatory.")
    };
    const productExists = productList.some(item=>item.title === productName)
    if(!productExists){
      const newProduct = {
        id:new Date().getTime(),
        title:productName,
        price:parseFloat(productPrice)
      };
      setProductList([...productList,newProduct]);
      setProductName("");
      setProductPrice("");
    }
    else {
      alert ("product allready exists...")
    }
  }
 
  return (
    <>
    <div className='addProduct'>
      <input type='text' placeholder='Enter Title...' value={productName} onChange={(e)=>setProductName(e.target.value)}/>
      <input type='text' placeholder='Enter Price...' value={productPrice} onChange={(e)=>setProductPrice(e.target.value)}/>
      <button onClick={handleAdd}>Add-product</button>

    </div>
    <div className='searchBar'>
      <input type='text' placeholder='search product...' value={searchTearm} onChange={(e)=>setSearchTearm(e.target.value)}/>
    </div>
    <div className='grid-container'>
      {
        productList.map((item,index)=>(
          <div className='card' key={index}>
            <img src={`https://placehold.co/600x400?text=${item.title}`} alt='name'/>
            <h1>{item.title}</h1>
            <p>${item.price.toFixed(2)}</p>
            <button className='delete-btn' onClick={()=> handleDelete(item.id)}>
              remove
            </button>
          </div>
        ))
      }
    </div>
    </>
  )
}

export default Products
