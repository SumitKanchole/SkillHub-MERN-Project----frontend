import { Link } from 'react-router-dom';
import Footer from '../footer/footer';
import Header from '../Header/header';
import './Home.css';
import { isUserExist } from '../Auth/Auth';

function Home() {

 
  return <>
    <Header/>
    <div className="home-wrapper fade-in">
      <main className="hero-section" style={{backgroundImage:`url("assets/home-page.jpg")`}}>
        <section className="hero-content">
          <h2 className="hero-heading">
            Welcome to SKILLHUB<span className="dot-highlight">.</span><span className="com-text">com</span>
          </h2>
          <p className="hero-subtext">Learn What You Love. Teach What You Know.</p>
          <div className="d-flex justify-content-center gap-3 my-4">
            <button className="hero-button"><Link className='nav-link text-white' to={isUserExist ? "/connect":"/Login"}>Start Learning</Link></button>
          </div>
        </section>
      </main>

    
       <section className="info-section container py-5 fade-in delay">
         <div className="row align-items-center">
           <div className="how-section col-md-6">
             <h2 className='what-section'>What is SKILLHUB.com?</h2>
             <p className='info-text'>
               SkillHub.com is a free skill exchange platform where people can teach what they know and
               learn what they need — without paying money. Instead of trading products or services,
               you’re trading skills.
             </p>
          </div>
          
          <div className="col-md-6 text-center">
             <img
               src="assets/What-skillhub.jpg"
               className="info-img img-fluid rounded shadow"
               alt="What is SkillHub"
             />
           </div>
         </div>
       </section>


       <section className="info-section container py-5 fade-in delay">
         <div className="row align-items-center flex-md-row-reverse">
           <div className="col-md-6">
             <h2 className='why-section'>Why SkillHub Exists?</h2>
             <p className='info-text'>
               Many people want to learn new things — coding, music, photography, cooking — but can’t
               afford courses. Others have skills and want to teach or learn something new themselves.
               SkillHub connects these two sides.
             </p>
           </div>
           <div className="col-md-6 text-center">
             <img
               src="assets/why-SkillHub.jpg"
               className="info-img img-fluid rounded shadow"
               alt="Why SkillHub"
             />
           </div>
         </div>
       </section>

      <section className="how-section py-5 fade-in delay">
         <div className="container">
           <h2 className='what-section'>How It Works?</h2>
           <div className="row mt-4">
             {[
              { img: 'assets/How-1.jpg', text: 'Register and build your profile.' },
               {
                 img: 'assets/How-2.jpg',
                 text: 'List the skill you can teach and the one you want to learn.'
               },
               {
                 img: 'assets/How-3.jpg',
                 text: 'Find matches — users who want to learn what you teach, and teach what you want to learn.'
               },
               { img: 'assets/How-4.jpg', text: 'Exchange knowledge through chat, calls, or meetups.' }
             ].map((item, i) => (
               <div key={i} className="col-md-3 col-sm-6 mb-4">
                 <div className="card shadow border-0 h-100 how-card">
                   <img src={item.img} className="card-img-top" alt={`Step ${i + 1}`} />
                   <div className="card-body">
                     <p className="card-text ">{item.text}</p>
                   </div>
                 </div>
               </div>
             ))}
           </div>
         </div>
       </section>

      <div className="container d-flex core-section fade-out delay">
        <div className="mt-3 pt-4">
          <h2>Core Values</h2>
          <p className="core-text" style={{backgroundImage: `url("/assets/coreValue.jpeg")`}}>
            At SkillHub.com, we believe in mutual growth over money, enabling people to share and exchange skills freely.
            Our platform thrives on community-based learning, where everyone has the chance to be both a teacher and a
            learner. To build trust and ensure quality, we offer skill verification, making it easy for users to connect
            with confidence and credibility.
          </p>
        </div>
      </div>
    </div>
    <Footer/>
  </>
}

export default Home;


