import { useEffect, useState } from "react";
import "./shoppingstyle.css"

export default function Shop(){
const[products,updateproduts]=useState([]);
async function getproducts(){
    try{
    let request=new Request('https://fakestoreapi.com/products/')
    let promise= await fetch(request)
    console.log(promise)
    if (!promise.ok) {
        throw new Error(`Network response was not ok: ${promise.status}`);
      }
    let response= await promise.json();
   
    let arr=Object.keys(response);
    console.log(arr)
    updateproduts(response)}
    catch(error){
        console.log(error)
    }
    }
    useEffect(
        ()=>{
            getproducts();
   
   },[]);
   if(products.length===0){
    return <p>fetching data....</p>
   }
    
     return(<>

      
 <div className="storage">{products.map((item)=>{
    return(
    
        <div className="product">
            <div className="product-card">
            <img src={item.image}></img>
            </div>
            <div className="description">
            <p> {item.title}</p>
            <p><span>Price: </span>${item.price}</p>
            </div>
           
            
        </div>)
   

 })} </div>
 </>)

}