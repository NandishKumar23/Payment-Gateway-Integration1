import React from 'react'
import logo from './logo.svg'
import './App.css';
function loadScript(src){
  return new Promise(resolve=>{
 const script=document.createElement('script')
  script.src=src
  
 script.onload=()=>{
     resolve(true)
 }
 script.onerror=()=>{
     resolve(false)
 }
 document.body.appendChild(script)
})
}

const __DEV__= document.domain==='localhost'
function App() {
  async function displayRazorpay(){
    const res =await loadScript("https://checkout.razorpay.com/v1/checkout.js")
    if(!res){
        alert('Razorpay sdk failed to load')
        return
    }
    
    const resp = await  fetch("http://localhost:3001/razorpay",{method:"POST"});
    const data = await resp.json();
    console.log(data)
     const options = {
        key_id: __DEV__? "rzp_test_ZykJuQmVB3bIVF" :'API_NOT_AVALIABLE',
       key_secret: "kncgpHgUcEpuBZOOCR3UckTu",
        amount: data.amount,
        currency: data.currency,
        name: "Product",
        description: "ThankYou",
        image: "http://localhost:3001/logo.svg ",
        order_id: data.id, 
        handler: function (response){
            alert(response.razorpay_payment_id);
            alert(response.razorpay_order_id);
            alert(response.razorpay_signature)
        },
       
  
    };
    
    const PaymentObject = new window.Razorpay(options);
        PaymentObject.open();
       
}
  return (
    <div className="App">
    <header className="AppHeader">
    <img src={logo} className="App-logo" alt="logo"/>
    <p>
    Edit <code>src/App.js</code> and save to reload
    </p>
    <a
     className='App-link'
     onClick={displayRazorpay}
     target="_blank"
     rel="noopener noreferrer"
     >
       Donate $5
     </a>
    </header>
    </div>
  );
}

export default App;
