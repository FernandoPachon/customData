import { useProduct } from "vtex.product-context"

export const X_VTEX_API_AppKey ='x-vtex-api-appkey:VtexIdclientAutCookie'
export const X_VTEX_API_AppToken ='x-vtex-api-apptoken:eyJhbGciOiJFUzI1NiIsImtpZCI6IkY1MDk2QTE2NEEzRENGRDQ5ODIwODhGRjRDOTdFODMyRkUwMUQwRDAiLCJ0eXAiOiJqd3QifQ.eyJzdWIiOiJqb3NlLnBhY2hvbkBpdGdsb2JlcnMuY29tIiwiYWNjb3VudCI6Iml0Z2xvYmVyc3BhcnRuZXJjbCIsImF1ZGllbmNlIjoid2Vic3RvcmUiLCJzZXNzIjoiMzg1MzAyMmYtNmMxNy00ZDE1LWFkZGItMmJiZTY1ZDAyOTk2IiwiZXhwIjoxNjc1Nzg3MjIyLCJ1c2VySWQiOiI3YmM0OTcwZi01ODNhLTQ1YmYtYmEyYi03NmE1NGM0ZmE2YzciLCJpYXQiOjE2NzU3MDA4MjIsImlzcyI6InRva2VuLWVtaXR0ZXIiLCJqdGkiOiJlNTg0YjMzNy04ZTdlLTRjZjItOWM3My1mMGRhOTM5ZDIxMzkifQ.XzXGZlG2s1CnvzrKn8JVO_KrU4kFL6zZ-MRCqICKwyG6ZbUnggtUMWMfG2LZcxydhZRMC9w3H3DCyUr3jpHBEQ'
const productContextValue = useProduct()
const productId = productContextValue?.product?.items[0]?.itemId

const url=`/api/checkout/pub/orderForms/simulation/${productId}`
export const options={
  method:'POST',
  header:{
    'Content-Type': 'application/json',
    'Accept':'application/json'
  },
  body:JSON.stringify({
    "items":[
      {
        "id":`${productId}`,
        "quantity":1,
        "seller":1
      }
    ],
    "county":"COL",
    "postalCode":"361"
  })
}


console.log('url:',url);
console.log('options:',options);

console.log('==>', { productId })
