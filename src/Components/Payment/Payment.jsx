
// import { useState } from "react"
// import "./Payment.css"

// const PaymentPage = () => {
//   const [formData, setFormData] = useState({
//     cardName: "",
//     cardNumber: "",
//     expMonth: "",
//     expYear: "",
//     cvv: "",
//     promoCode: "",
//   })
//   const [errors, setErrors] = useState({})
//   const [promoApplied, setPromoApplied] = useState(false)

//   const handleInputChange = (e) => {
//     const { name, value } = e.target
//     setFormData({ ...formData, [name]: value })
//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors({ ...errors, [name]: "" })
//     }
//   }

//   const validateForm = () => {
//     const newErrors = {}
//     if (!formData.cardName.trim()) newErrors.cardName = "Name is required"
//     if (!formData.cardNumber.trim()) newErrors.cardNumber = "Card number is required"
//     if (!formData.expMonth) newErrors.expMonth = "Month is required"
//     if (!formData.expYear) newErrors.expYear = "Year is required"
//     if (!formData.cvv.trim()) newErrors.cvv = "CVV is required"
//     return newErrors
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     const formErrors = validateForm()
//     if (Object.keys(formErrors).length === 0) {
//       // Form is valid, proceed with payment processing
//       console.log("Payment form submitted:", formData)
//       // Here you would typically send the data to your payment processor
//     } else {
//       setErrors(formErrors)
//     }
//   }


//   return (
//     <div className="container py-5">
//       <div className="row">
//         <div className="col-md-8 mb-4">
//           <div className="card">
//             <div className="card-header py-3">
//               <h4 className="mb-0">Payment Details</h4>
//             </div>
//             <div className="card-body">
//               <form className="needs-validation" onSubmit={handleSubmit}>
//                 <div className="row g-3">
//                   <div className="col-12">
//                     <label htmlFor="cardName" className="form-label">
//                       Name on card
//                     </label>
//                     <input
//                       type="text"
//                       className={`form-control ${errors.cardName ? "is-invalid" : ""}`}
//                       id="cardName"
//                       name="cardName"
//                       value={formData.cardName}
//                       onChange={handleInputChange}
//                       required
//                     />
//                     {errors.cardName && <div className="invalid-feedback">{errors.cardName}</div>}
//                   </div>

//                   <div className="col-12">
//                     <label htmlFor="cardNumber" className="form-label">
//                       Card number
//                     </label>
//                     <input
//                       type="text"
//                       className={`form-control ${errors.cardNumber ? "is-invalid" : ""}`}
//                       id="cardNumber"
//                       name="cardNumber"
//                       value={formData.cardNumber}
//                       onChange={handleInputChange}
//                       required
//                     />
//                     {errors.cardNumber && <div className="invalid-feedback">{errors.cardNumber}</div>}
//                   </div>

//                   <div className="col-md-4">
//                     <label htmlFor="expMonth" className="form-label">
//                       Expiration Month
//                     </label>
//                     <select
//                       className={`form-select ${errors.expMonth ? "is-invalid" : ""}`}
//                       id="expMonth"
//                       name="expMonth"
//                       value={formData.expMonth}
//                       onChange={handleInputChange}
//                       required
//                     >
//                       <option value="">Choose...</option>
//                       {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
//                         <option key={month} value={month}>
//                           {month.toString().padStart(2, "0")}
//                         </option>
//                       ))}
//                     </select>
//                     {errors.expMonth && <div className="invalid-feedback">{errors.expMonth}</div>}
//                   </div>

//                   <div className="col-md-4">
//                     <label htmlFor="expYear" className="form-label">
//                       Expiration Year
//                     </label>
//                     <select
//                       className={`form-select ${errors.expYear ? "is-invalid" : ""}`}
//                       id="expYear"
//                       name="expYear"
//                       value={formData.expYear}
//                       onChange={handleInputChange}
//                       required
//                     >
//                       <option value="">Choose...</option>
//                       {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map((year) => (
//                         <option key={year} value={year}>
//                           {year}
//                         </option>
//                       ))}
//                     </select>
//                     {errors.expYear && <div className="invalid-feedback">{errors.expYear}</div>}
//                   </div>

//                   <div className="col-md-4">
//                     <label htmlFor="cvv" className="form-label">
//                       CVV
//                     </label>
//                     <input
//                       type="text"
//                       className={`form-control ${errors.cvv ? "is-invalid" : ""}`}
//                       id="cvv"
//                       name="cvv"
//                       value={formData.cvv}
//                       onChange={handleInputChange}
//                       required
//                     />
//                     {errors.cvv && <div className="invalid-feedback">{errors.cvv}</div>}
//                   </div>
//                 </div>

//                 <hr className="my-4" />

            

//                 <button className="w-100 btn btn-primary btn-lg" type="submit">
//                   Pay Now
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>

//         <div className="col-md-4">
//           <div className="card mb-4">
//             <div className="card-header py-3">
//               <h5 className="mb-0">Order Summary</h5>
//             </div>
//             <div className="card-body">
//               <ul className="list-group list-group-flush">
//                 <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
//                   Product
//                   <span>$100.00</span>
//                 </li>
//                 <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
//                   Shipping
//                   <span>$10.00</span>
//                 </li>
//                 <li className="list-group-item d-flex justify-content-between align-items-center px-0">
//                   Discount
//                   <span>{promoApplied ? "-$10.00" : "$0.00"}</span>
//                 </li>
//                 <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
//                   <div>
//                     <strong>Total amount</strong>
//                   </div>
//                   <span>
//                     <strong>${promoApplied ? "100.00" : "110.00"}</strong>
//                   </span>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default PaymentPage



import React from 'react';
import "./Payment.css"


const PaymentPage = () => {
  return (
    <>
    <div className='text-center mt-5'>
    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 hero-h1">
         Your <span className='subscription-text' >Subscription</span> is All Set!
          </h1>
    </div>
    <div className="success-container my-5">
      <div className="success-card">
        <div className="success-icon">&#10004;</div>
        <h2>Payment Successful!</h2>
        <p>Your payment was processed successfully. Thank you!</p>
        <button onClick={() => window.location.href = '/'}>Go to Home</button>
      </div>
    </div>
    </>
  );
};

export default PaymentPage;
