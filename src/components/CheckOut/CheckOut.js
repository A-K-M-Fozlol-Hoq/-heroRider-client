import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
// import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import ProcessPayment from '../ProcessPayment/ProcessPayment';
import './CheckOut.css';
import UpdateLoggedInUserState from '../Shared/UpdateLoggedInUserState/UpdateLoggedInUserState';

const CheckOut = () => {
    const {loggedInUserData}= useContext(UserContext);
    const [loggedInUser, setLoggedInUser] = loggedInUserData;
    const url = window.location.href;
    const  carType  =url.split('/').slice(-1)[0]
    const email =sessionStorage.getItem('email');
  const { register, handleSubmit, errors } = useForm();
  const [ shippingData, setShippingData] = useState(null)
  const onSubmit = data => {
    console.log(data)
    setShippingData(data)
  };
  const handlePaymentSuccess = paymentId => {
    console.log('form submitted', shippingData)
    const orderDetails = { ...loggedInUser,paymentId,carType, shipment: shippingData, orderTime: new Date() }

    fetch('https://cryptic-ravine-92718.herokuapp.com/addOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderDetails)
    })
      .then(res => res.json())
      .then(data => {
        alert('your order placed successfully')
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="row">
        {
            (email && !loggedInUser.email) &&
            <UpdateLoggedInUserState></UpdateLoggedInUserState>
        }
      <div style={{display:shippingData?'none':'block'}} className="col-md-6 my-5 mx-auto text-center">
        <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
            <input {...register('name', { required: true })} placeholder="Your Name"  /> <br/>
            {errors?.name && <span className="error">name is required</span>} <br/>
            <input {...register('email', { required: true })} placeholder="Your email"  /> <br/>
            {errors?.email && <span className="error">email is required</span>} <br/>
            <input {...register('address', { required: true })} placeholder="Your address"  /> <br/>
            {errors?.address && <span className="error">address is required</span>} <br/>
            <input {...register('phone', { required: true })} placeholder="Your Phone"  /> <br/>
            {errors?.phone && <span className="error">phone is required</span>} <br/>
            <input type="submit" />
            </form>
      </div>
      <div style={{display:shippingData?'block':'none'}} className="col-md-6 mx-auto my-5">
        <h3>Please pay course cost: </h3> <br /> <br />
        <ProcessPayment handlePayment={handlePaymentSuccess}></ProcessPayment>
      </div>
    </div>
  );
};

export default CheckOut;

// import React, { useContext, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { UserContext } from '../../App';
// import UpdateLoggedInUserState from '../Shared/UpdateLoggedInUserState/UpdateLoggedInUserState';
// const CheckOut = () => {
//   const { loggedInUserData } = useContext(UserContext);
//   const [loggedInUser, setLoggedInUser] = loggedInUserData;
//   const [ shippingData, setShippingData] = useState(null)
//     const onSubmit = data => {
//     setShippingData(data)
//   };

//   const { register, handleSubmit, watch, errors } = useForm();
//   const email = sessionStorage.getItem("email");
//   return <div className="row">
//       {
//             (email && !loggedInUser.email) &&
//             <UpdateLoggedInUserState></UpdateLoggedInUserState>
//         }
//         <div style={{display:shippingData?'none':'block'}} className="col-md-6">
//             <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
//             <input {...register('name', { required: true })} placeholder="Your Name"  /> <br/>
//             {errors?.name && <span className="error">name is required</span>} <br/>
//             <input {...register('email', { required: true })} placeholder="Your email"  /> <br/>
//             {errors?.email && <span className="error">email is required</span>} <br/>
//             <input {...register('address', { required: true })} placeholder="Your address"  /> <br/>
//             {errors?.address && <span className="error">address is required</span>} <br/>
//             <input {...register('phone', { required: true })} placeholder="Your Phone"  /> <br/>
//             {errors?.phone && <span className="error">phone is required</span>} <br/>
//             <input type="submit" />
//             </form>
//        </div>
//        <div style={{display:shippingData?'block':'none'}} className="col-md-6">
//                     <h3>Please pay course cost</h3>
//          {/* <ProcessPayment handlePayment={handlePaymentSuccess}></ProcessPayment> */}
//        </div>

//   </div>;
// };

// export default CheckOut;
