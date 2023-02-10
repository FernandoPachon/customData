import React, { useState, useEffect } from 'react'
import { useOrderForm } from 'vtex.order-manager/OrderForm'
import { useProduct } from 'vtex.product-context'
import { useCssHandles } from 'vtex.css-handles'
import './styles.css'

const InfoDataCart = () => {
  const CSS_HANDLES = ['styles_title', 'styles_container', 'styles_text']
  const handles = useCssHandles(CSS_HANDLES)
  const [data, setData] = useState({})
  const {
    orderForm: { items },
  } = useOrderForm()
  const productContextValue = useProduct()
  console.log(data)

  const productId = productContextValue?.product?.items?.[0]?.itemId
  const description = productContextValue?.product?.description
  const categories = productContextValue?.product?.categories
  const quantity = productContextValue?.selectedQuantity
  console.log('producto', productId, items)

  async function Context() {
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        "items": [
          {
            "id": `${productId}`,
            "quantity": 1,
            "seller": "1"
          }
        ],
        "country": "COL",
        "postalCode": "854030"
      }),
    }
    const res = fetch(`/api/checkout/pub/orderForms/simulation`, config)
    const resp = await (await res).json()
    console.log(resp, 'aqui', resp.items[0].availability)
    var available = resp.items[0].availability
    if (available==='cannotBeDelivered'){
      available="Producto no disponible para tu región"
    }else{
      available="Producto disponible para tu región"
    }
    console.log(available)
    setData(available)
  }
  useEffect(() => {
    Context()
  }, [productId])

  return (
    <>
      <div className={handles.styles_container}>
        {/* <h2 className={handles.styles_title}>Context component</h2> */}
        <h4 className={handles.styles_text}>Id: {productId}</h4>
        <h4 className={handles.styles_text}>
          Availability: {JSON.stringify(data, null, 4)}
        </h4>
        <h4 className={handles.styles_text}>Description: {description}</h4>
        <h4 className={handles.styles_text}>Categories: {categories}</h4>
        <h4 className={handles.styles_text}>Quantity: {quantity}</h4>
      </div>
    </>
  )
}
export default InfoDataCart
