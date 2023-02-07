import React,{useState,useEffect} from 'react'
import { useOrderForm } from 'vtex.order-manager/OrderForm';
import { useProduct } from 'vtex.product-context';

const InfoDataCart=()=>{

  const[getAval,setGetAval]=useState({})
  const {orderForm:{items}}=useOrderForm()
  const productContextValue=useProduct()

  const productId = productContextValue?.product?.items?.[0]?.itemId
  console.log("producto",productId,items);

  async function getAvaliable(){
    const config={
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body:JSON.stringify({
        'items':[
          {
            "id":{productId},
            "quantity":1,
            "seller":1
          }
        ],
        "country":"BRA",
        "postalCode":"12345-000",
        "geoCoordinates":[
          -47.924747467041016
        ]
      })
    }
    const res=fetch(`/api/checkout/pub/orderForms/simulation`,config)
    const aval=await(await res).json()
    console.log(aval,"aqui",aval.items[0].availability);
    const available=aval.items[0].availability
    console.log(available);
    setGetAval(available)

  }
  useEffect(()=>{
    getAvaliable()
  },[])

  return (
    <>
      <div>
        <h2>Context component</h2>
          <h4>Id:{productId}</h4>
          <h4>Available:{JSON.stringify(getAval,null,4)}</h4>
      </div>
    </>
  )
  }
export default InfoDataCart
