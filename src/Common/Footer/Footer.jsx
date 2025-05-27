import React from 'react';
import "./Footer.css";

const Footer = () => {
  return (
    
    <footer className="footer">
        <div className="container">
            <div className="row">
                {/* <!-- JOIN EXCLAIMER Column --> */}
                <div className="col-md-6 col-lg-2 footer-column">
                    <h3>JOIN AGILE</h3>
                    <ul>
                        <li><a href="#">Start a free trial</a></li>
                        <li><a href="#">Get a demo</a></li>
                        <li><a href="#">Join Partner Network</a></li>
                        <li><a href="#">Sign up to newsletter</a></li>
                    </ul>
                    
                    <h3 className="mt-4">COMPARISONS</h3>
                    <ul>
                        <li><a href="#">Agile vs Wisestamp</a></li>
                        <li><a href="#">Agile vs Codetwo</a></li>
                        <li><a href="#">Agile vs Letsignit</a></li>
                        <li><a href="#">Agile vs Opensense</a></li>
                    </ul>
                </div>

                {/* <!-- PRODUCT Column --> */}
                <div className="col-md-6 col-lg-2 footer-column">
                    <h3>PRODUCT</h3>
                    <ul>
                        <li><a href="#">Overview</a></li>
                        <li><a href="#">Pricing</a></li>
                        <li><a href="#">Integrations</a></li>
                        <li><a href="#">Outlook365</a></li>
                        <li><a href="#">Google Workspace</a></li>
                        <li><a href="#">Microsoft Exchange</a></li>
                        <li><a href="#">Security</a></li>
                        <li><a href="#">Product tour</a></li>
                    </ul>
                </div>

                 {/* SOLUTIONS Column  */}
                <div className="col-md-6 col-lg-2 footer-column">
                    <h3>SOLUTIONS</h3>
                    <ul>
                        <li><a href="#">Automate email signatures</a></li>
                        <li><a href="#">Enhance brand consistency</a></li>
                        <li><a href="#">Connect with customers</a></li>
                        <li><a href="#">Generate demand</a></li>
                        <li><a href="#">Achieve email compliance</a></li>
                        <li><a href="#">Drive sales velocity</a></li>
                        <li><a href="#">Amplify social media</a></li>
                        <li><a href="#">Engage key accounts</a></li>
                        <li><a href="#">Industries</a></li>
                    </ul>
                </div>

             {/* RESOURCES Column  */}
                <div className="col-md-6 col-lg-2 footer-column">
                    <h3>RESOURCES</h3>
                    <ul>
                        <li><a href="#">All resources</a></li>
                        <li><a href="#">Blog</a></li>
                        <li><a href="#">Guides</a></li>
                        <li><a href="#">Videos</a></li>
                        <li><a href="#">Events & webinars</a></li>
                        <li><a href="#">Case studies</a></li>
                        <li><a href="#">Reports</a></li>
                        <li><a href="#">ROI calculator</a></li>
                        <li><a href="#">IT research</a></li>
                        <li><a href="#">Marketing research</a></li>
                    </ul>
                </div>

                 {/* COMPANY Column  */}
                <div className="col-md-6 col-lg-2 footer-column">
                    <h3>COMPANY</h3>
                    <ul>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Press</a></li>
                        <li><a href="#">Careers</a></li>
                        <li><a href="#">Awards</a></li>
                        <li><a href="/subscription">Subscription Plans</a></li>
                    </ul>
                </div>

                {/* SUPPORT Column  */}
                <div className="col-md-6 col-lg-2 footer-column">
                    <h3>SUPPORT</h3>
                    <ul>
                        <li><a href="#">Support</a></li>
                        <li><a href="#">Contact us</a></li>
                        <li><a href="#">Legal</a></li>
                        <li><a href="#">Help center</a></li>
                        <li><a href="#">Pay invoice</a></li>
                        <li><a href="#">Raise a ticket</a></li>
                        <li><a href="#">Sitemap</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div className='footer-bottom'>
        <div className="bottom-container">
            <div className="footer-wrapper">
                <div className="top-row">
                    <select className="language-select">
                        <option>English</option>
                    </select>
                    <div className="social-icons">
                        <a href="https://www.instagram.com" target='blank'  aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                        <a href="https://www.twitter.com" target='blank' aria-label="Twitter"><i className="fab fa-x-twitter"></i></a>
                        <a href="https://www.youtube.com" target='blank' aria-label="YouTube"><i className="fab fa-youtube"></i></a>
                        <a href="https://www.linkedin.com" target='blank' aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
                        <a href="https://www.facebook.com" target='blank' aria-label="Facebook"><i className="fab fa-facebook"></i></a>
                    </div>
                </div>
                <div className="bottom-row">
                    <div className="copyright">
                        {/* <img src="" alt="Logo" className="logo"> */}
                        <span>© 2025 Agile. All rights reserved.</span>
                    </div>
                    <div className="legal-links">
                        <a href="#">Terms of service</a>
                        <a href="#">Privacy policy</a>
                        <a href="#">Cookie policy</a>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </footer>

  );
};

export default Footer;