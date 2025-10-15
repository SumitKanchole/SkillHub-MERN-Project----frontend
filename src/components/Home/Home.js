import { Link } from 'react-router-dom';
import Footer from '../footer/footer';
import Header from '../Header/header';
import './Home.css';
import { isUserExist } from '../Auth/Auth';

function Home() {


  return <>
    
      <Header />
      
      <div className="home-wrapper">
        <main className="hero-section" style={{ backgroundImage: `url("assets/home-page.jpg")` }}>
          <section className="hero-content">
            <h2 className="hero-heading">
              Welcome to SKILLHUB<span className="dot-highlight">.</span><span className="com-text">com</span>
            </h2>
            <p className="hero-subtext">Learn What You Love. Teach What You Know.</p>
            <div className="d-flex justify-content-center gap-3 my-4">
              <button className="hero-button"><Link className='nav-link text-white' to={isUserExist ? "/connect" : "/Login"}>Start Learning</Link></button>
            </div>
          </section>
        </main>

    
        <section className="info-section container py-5 ">
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


        <section className="info-section container py-5 ">
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

        <section className="how-section py-5 ">
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
            <p className="core-text" style={{ backgroundImage: `url("/assets/coreValue.jpeg")` }}>
              At SkillHub.com, we believe in mutual growth over money, enabling people to share and exchange skills freely.
              Our platform thrives on community-based learning, where everyone has the chance to be both a teacher and a
              learner. To build trust and ensure quality, we offer skill verification, making it easy for users to connect
              with confidence and credibility.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
}

export default Home;


























// import { Link } from 'react-router-dom';
// import Footer from '../footer/footer';
// import Header from '../Header/header';
// import './Home.css';
// import { isUserExist } from '../Auth/Auth';

// function Home() {
//   return <>
//     <Header />
    
//     <div className="home-wrapper">
//       {/* Enhanced Hero Section */}
//       <main className="hero-section" style={{ backgroundImage: `url("assets/home-page.jpg")` }}>
//         <div className="hero-overlay"></div>
//         <section className="hero-content">
//           <div className="hero-badge">
//             <span className="badge-text">🚀 Learn & Teach for Free</span>
//           </div>
//           <h1 className="hero-heading">
//             Welcome to 
//             <span className="brand-name">
//               SKILL<span className="hub-text">HUB</span>
//             </span>
//             <span className="dot-highlight">.</span>
//             <span className="com-text">com</span>
//           </h1>
//           <p className="hero-subtext">
//             <span className="highlight-text">Learn What You Love.</span>
//             <span className="secondary-text">Teach What You Know.</span>
//           </p>
//           <div className="hero-stats">
//             <div className="stat-item">
//               <span className="stat-number">10K+</span>
//               <span className="stat-label">Active Learners</span>
//             </div>
//             <div className="stat-divider"></div>
//             <div className="stat-item">
//               <span className="stat-number">500+</span>
//               <span className="stat-label">Skills Shared</span>
//             </div>
//             <div className="stat-divider"></div>
//             <div className="stat-item">
//               <span className="stat-number">Free</span>
//               <span className="stat-label">Always</span>
//             </div>
//           </div>
//           <div className="hero-buttons">
//             <button className="hero-button primary">
//               <Link className='nav-link text-white' to={isUserExist ? "/connect" : "/Login"}>
//                 <span className="button-icon">🎯</span>
//                 Start Learning
//               </Link>
//             </button>
//             <button className="hero-button secondary">
//               <Link className='nav-link' to="/about">
//                 Learn More
//               </Link>
//             </button>
//           </div>
//         </section>
        
//         {/* Floating Elements */}
//         <div className="floating-elements">
//           <div className="float-element float-1">💡</div>
//           <div className="float-element float-2">🎨</div>
//           <div className="float-element float-3">🎵</div>
//           <div className="float-element float-4">💻</div>
//           <div className="float-element float-5">📚</div>
//         </div>
//       </main>

//       {/* Enhanced What Section */}
//       <section className="info-section container-fluid py-5">
//         <div className="container">
//           <div className="row align-items-center">
//             <div className="col-lg-6 col-md-12">
//               <div className="content-card">
//                 <div className="section-badge">
//                   <span>💚 About Platform</span>
//                 </div>
//                 <h2 className='section-heading what-section'>
//                   What is 
//                   <span className="gradient-text">SKILLHUB</span>
//                   <span className="dot-accent">.</span>com?
//                 </h2>
//                 <p className='info-text enhanced-text'>
//                   SkillHub.com is a revolutionary <strong>free skill exchange platform</strong> where people can teach what they know and
//                   learn what they need — without paying money. Instead of trading products or services,
//                   you're trading <span className="highlight-span">knowledge and skills</span>.
//                 </p>
//                 <div className="feature-list">
//                   <div className="feature-item">
//                     <span className="feature-icon">✨</span>
//                     <span>100% Free Platform</span>
//                   </div>
//                   <div className="feature-item">
//                     <span className="feature-icon">🤝</span>
//                     <span>Skill-based Exchange</span>
//                   </div>
//                   <div className="feature-item">
//                     <span className="feature-icon">🌍</span>
//                     <span>Global Community</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-lg-6 col-md-12 text-center">
//               <div className="image-container">
//                 <img
//                   src="assets/What-skillhub.jpg"
//                   className="info-img img-fluid rounded-custom shadow-custom"
//                   alt="What is SkillHub"
//                 />
//                 <div className="image-overlay">
//                   <div className="overlay-content">
//                     <span className="overlay-icon">🎯</span>
//                     <p>Learn Anything</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Enhanced Why Section */}
//       <section className="info-section container-fluid py-5 why-bg">
//         <div className="container">
//           <div className="row align-items-center flex-md-row-reverse">
//             <div className="col-lg-6 col-md-12">
//               <div className="content-card">
//                 <div className="section-badge why-badge">
//                   <span>🎯 Our Mission</span>
//                 </div>
//                 <h2 className='section-heading why-section'>
//                   Why <span className="gradient-text">SkillHub</span> Exists?
//                 </h2>
//                 <p className='info-text enhanced-text'>
//                   Many people want to learn new things — <strong>coding, music, photography, cooking</strong> — but can't
//                   afford expensive courses. Others have valuable skills and want to teach or learn something new themselves.
//                   <span className="highlight-span">SkillHub bridges this gap</span>.
//                 </p>
//                 <div className="stats-mini">
//                   <div className="mini-stat">
//                     <span className="mini-number">0$</span>
//                     <span className="mini-label">Cost to Join</span>
//                   </div>
//                   <div className="mini-stat">
//                     <span className="mini-number">∞</span>
//                     <span className="mini-label">Skills to Learn</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-lg-6 col-md-12 text-center">
//               <div className="image-container">
//                 <img
//                   src="assets/why-SkillHub.jpg"
//                   className="info-img img-fluid rounded-custom shadow-custom"
//                   alt="Why SkillHub"
//                 />
//                 <div className="image-overlay">
//                   <div className="overlay-content">
//                     <span className="overlay-icon">💚</span>
//                     <p>Share Knowledge</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Enhanced How It Works Section */}
//       <section className="how-section py-5">
//         <div className="container">
//           <div className="text-center mb-5">
//             <div className="section-badge center-badge">
//               <span>🔄 Process</span>
//             </div>
//             <h2 className='section-heading what-section'>
//               How It <span className="gradient-text">Works</span>?
//             </h2>
//             <p className="section-subtitle">Simple steps to start your learning journey</p>
//           </div>
          
//           <div className="row mt-4">
//             {[
//               { 
//                 img: 'assets/How-1.jpg', 
//                 text: 'Register and build your comprehensive profile.',
//                 icon: '👤',
//                 step: '01'
//               },
//               {
//                 img: 'assets/How-2.jpg',
//                 text: 'List the skills you can teach and the ones you want to learn.',
//                 icon: '📝',
//                 step: '02'
//               },
//               {
//                 img: 'assets/How-3.jpg',
//                 text: 'Find perfect matches — users who want to learn what you teach.',
//                 icon: '🎯',
//                 step: '03'
//               },
//               { 
//                 img: 'assets/How-4.jpg', 
//                 text: 'Exchange knowledge through chat, video calls, or meetups.',
//                 icon: '💬',
//                 step: '04'
//               }
//             ].map((item, i) => (
//               <div key={i} className="col-lg-3 col-md-6 col-sm-12 mb-4">
//                 <div className="how-card enhanced-card">
//                   <div className="card-header-custom">
//                     <div className="step-number">{item.step}</div>
//                     <div className="step-icon">{item.icon}</div>
//                   </div>
//                   <div className="card-image-container">
//                     <img src={item.img} className="card-img-top how-img" alt={`Step ${i + 1}`} />
//                     <div className="card-overlay"></div>
//                   </div>
//                   <div className="card-body enhanced-body">
//                     <p className="card-text enhanced-card-text">{item.text}</p>
//                     <div className="card-arrow">→</div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
          
//           {/* Process Flow Connector */}
//           <div className="process-connector">
//             <div className="connector-line"></div>
//             <div className="connector-dots">
//               <div className="dot active"></div>
//               <div className="dot active"></div>
//               <div className="dot active"></div>
//               <div className="dot active"></div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Enhanced Core Values Section */}
//       <section className="core-section-wrapper py-5">
//         <div className="container">
//           <div className="core-content">
//             <div className="row align-items-center">
//               <div className="col-lg-6 col-md-12">
//                 <div className="core-text-content">
//                   <div className="section-badge">
//                     <span>💎 Our Values</span>
//                   </div>
//                   <h2 className="section-heading">
//                     Core <span className="gradient-text">Values</span>
//                   </h2>
//                   <div className="core-text enhanced-core-text">
//                     <p>
//                       At <strong>SkillHub.com</strong>, we believe in <span className="highlight-span">mutual growth over money</span>, 
//                       enabling people to share and exchange skills freely.
//                     </p>
//                     <p>
//                       Our platform thrives on <span className="highlight-span">community-based learning</span>, where everyone has the 
//                       chance to be both a teacher and a learner.
//                     </p>
//                     <p>
//                       To build trust and ensure quality, we offer <span className="highlight-span">skill verification</span>, making it 
//                       easy for users to connect with confidence and credibility.
//                     </p>
//                   </div>
                  
//                   <div className="value-cards">
//                     <div className="value-card">
//                       <div className="value-icon">🤝</div>
//                       <h4>Community First</h4>
//                       <p>Building connections through shared learning</p>
//                     </div>
//                     <div className="value-card">
//                       <div className="value-icon">✅</div>
//                       <h4>Trust & Quality</h4>
//                       <p>Verified skills and reliable connections</p>
//                     </div>
//                     <div className="value-card">
//                       <div className="value-icon">🆓</div>
//                       <h4>Always Free</h4>
//                       <p>Knowledge exchange without financial barriers</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="col-lg-6 col-md-12">
//                 <div className="core-visual">
//                   <div className="visual-bg" style={{ backgroundImage: `url("/assets/coreValue.jpeg")` }}></div>
//                   <div className="visual-overlay">
//                     <div className="visual-content">
//                       <div className="visual-stats">
//                         <div className="visual-stat">
//                           <span className="visual-number">100%</span>
//                           <span className="visual-label">Free</span>
//                         </div>
//                         <div className="visual-stat">
//                           <span className="visual-number">24/7</span>
//                           <span className="visual-label">Learning</span>
//                         </div>
//                         <div className="visual-stat">
//                           <span className="visual-number">Global</span>
//                           <span className="visual-label">Community</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Call to Action Section */}
//       <section className="cta-section py-5">
//         <div className="container text-center">
//           <div className="cta-content">
//             <h2 className="cta-heading">
//               Ready to Start Your <span className="gradient-text">Learning Journey</span>?
//             </h2>
//             <p className="cta-text">
//               Join thousands of learners and teachers in our growing community
//             </p>
//             <div className="cta-buttons">
//               <button className="cta-button primary">
//                 <Link className='nav-link text-white' to={isUserExist ? "/connect" : "/Login"}>
//                   <span className="button-icon">🚀</span>
//                   Get Started Now
//                 </Link>
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
    
//     <Footer />
//   </>
// }

// export default Home;