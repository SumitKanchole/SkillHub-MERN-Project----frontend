import "./Footer.css";

function Footer() {
  return (
    <footer className="footer text-white py-4">
      <div className="container">
        <div className="row mb-3 text-center text-md-start">
          <div className="container d-flex justify-content-between align-items-center">
            <div>
            
              <button className="footer-language-btn">
                <i className="bi bi-globe me-2"></i>
                <span>English</span>
              </button>
            </div>

            <div className="footer-social-icons d-flex gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="mailto:youremail@example.com">
                <i className="bi bi-envelope-fill"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-youtube"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-linkedin"></i>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-github"></i>
              </a>
            </div>
          </div>

        <div className="mt-3 footer-links container">
  <div className="row">
    <div className="col-12">
      <h3 className="mb-3">Quick Links</h3>
    </div>

    <div className="col-12 col-md-10 d-flex flex-column flex-md-row flex-wrap gap-3 ps-md-4 mb-4">
      <p className="mb-2 mb-md-0"><a href="/about" className="text-decoration-none text-white">About Us</a></p>
      <p className="mb-2 ml-5 mb-md-0"><a href="/workshops" className="text-decoration-none text-white">Workshops</a></p>
      <p className="mb-2 ml-5 mb-md-0"><a href="/mentors" className="text-decoration-none text-white">Find a Mentor</a></p>
      <p className="mb-2 ml-5 mb-md-0"><a href="/contact" className="text-decoration-none text-white">Contact</a></p>
      <p className="mb-2 ml-5 mb-md-0"><a href="/privacy" className="text-decoration-none text-white">Privacy Policy</a></p>
    </div>
  </div>
</div>

        </div>

        <p className="text-center mb-0">
          Copyright © 2025 SKILLHUB.com. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
