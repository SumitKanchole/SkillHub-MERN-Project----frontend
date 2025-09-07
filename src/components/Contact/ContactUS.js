// import Footer from '../footer/footer';
// import Header from '../Header/header';
// import './contact.css';

// function ContactUs() {
//     return <>
//       <Header />
//       <main className='main-container'>

//     <div className="contact-section container my-5  p-4  shadow">
//       <div className="row align-items-center p-4">
        
//         <div className="col-md-5 text-center mb-4 mb-md-0">
//           <img src="assets/contact-us.jpg" alt="Contact" className="img-fluid rounded contact-img" />
//           <div className="mt-4">
//             <p className=''><i className="bi bi-envelope-fill me-2 icon-br"></i><strong>Email:</strong><a href='#' className='text-decoration-none'>  SkillHub@gmail.com</a></p>
//             <p className=''><i className="bi bi-telephone-fill me-2 icon-br"></i><strong>Phone:</strong><a href='#' className='text-decoration-none'>  (02532) 8324 9231</a></p>
//           </div>
//         </div>

//         <div className="col-md-6">
//           <p className="text-color fw-semibold">Get in touch</p>
//           <h1 className="fw-bold">Let's Chat, Reach Out to Us</h1>
//           <p className="text-muted text-desc">Have questions or feedback? We're here to help. Send us a message, and we'll respond within 24 hours.</p>
          
//           <form>
//             <div className="row mb-3">
//               <div className="col">
//                 <input type="text" className="form-control" placeholder="First Name" required />
//               </div>
//               <div className="col">
//                 <input type="text" className="form-control" placeholder="Last Name" required />
//               </div>
//             </div>

//             <div className="mb-3">
//               <input type="email" className="form-control" placeholder="Email Address" required />
//             </div>

//             <div className="mb-3">
//               <textarea className="form-control" rows="4" placeholder="Message" required></textarea>
//             </div>

//             <div className="form-check mb-3">
//               <input className="form-check-input" type="checkbox" id="privacyCheck" required />
//               <label className="form-check-label" htmlFor="privacyCheck">
//                 I agree to our friendly privacy policy
//               </label>
//             </div>

//             <button type="submit" className="btn btn-bg-color px-4">Send Message</button>
//           </form>
//         </div>
//       </div>
//       </div>
//       </main>
//       <Footer/>
//   </>

// };

// export default ContactUs;



import { useState } from 'react';
import axios from 'axios';
import Footer from '../footer/footer';
import Header from '../Header/header';
import { toast, ToastContainer } from 'react-toastify';
import './contact.css';
// import EndPoint from '../../Apis/EndPoint';
import EndPoint from '../../Apis/EndPoint';


function ContactUs() {

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
    agreedToPrivacyPolicy: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(EndPoint.ContactUs, formData); // 👈 Update this URL if needed
      toast.success("Message Send Successfully...");

      console.log(res);
      
      // Optional: reset form
      // setFormData({
      //   firstName: "",
      //   lastName: "",
      //   email: "",
      //   message: "",
      //   agreedToPrivacyPolicy: false,
      // });
    } catch (error) {
      toast.error("Oops! Something went wrong");
    }
  };

  return <>
    <ToastContainer/>
      <Header />
    <main className='main-container'>
      <div className="contact-section container my-5  p-4  shadow">
        <div className="row align-items-center p-4">
          <div className="col-md-5 text-center mb-4 mb-md-0">
            <img src="assets/contact-us.jpg" alt="Contact" className="img-fluid rounded contact-img" />
            <div className="mt-4">
              <p className=''><i className="bi bi-envelope-fill me-2 icon-br"></i><strong>Email:</strong><a href='#' className='text-decoration-none'>  SkillHub@gmail.com</a></p>
              <p className=''><i className="bi bi-telephone-fill me-2 icon-br"></i><strong>Phone:</strong><a href='#' className='text-decoration-none'>  (02532) 8324 9231</a></p>
            </div>
          </div>

          <div className="col-md-6">
            <p className="text-color fw-semibold">Get in touch</p>
            <h1 className="fw-bold">Let's Chat, Reach Out to Us</h1>
            <p className="text-muted text-desc">Have questions or feedback? We're here to help. Send us a message, and we'll respond within 24 hours.</p>

            <form onSubmit={handleSubmit}>
              <div className="row mb-3">
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email Address"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <textarea
                  className="form-control"
                  rows="4"
                  placeholder="Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="privacyCheck"
                  name="agreedToPrivacyPolicy"
                  checked={formData.agreedToPrivacyPolicy}
                  onChange={handleChange}
                  required
                />
                <label className="form-check-label" htmlFor="privacyCheck">
                  I agree to our friendly privacy policy
                </label>
              </div>

              <button type="submit" className="btn btn-bg-color px-4">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </>
};

export default ContactUs;
