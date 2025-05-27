import React from 'react'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "./Herosection.css";
import Heroimg from "../assets/HeroPage/heroimg.png";
function HeroSection() {
  return (
    <div>
        
        <div className=" py-5 hero-container">
  <div className="container">
    <div className="text-center">
      <h2 className="mb-4 custom-heading">
      Discover the Benefits of <span className='span-text'>Agile</span> Email <br /> Signature Software Solution
      </h2>
      <p className="lead text-secondary custom-para">
      Agile Email Signature is the premier, centrally managed solution for <br /> email signatures, seamlessly integrated with <span className="para-text">Microsoft 365</span> <br />
      </p>
    </div>
  </div>
</div>

        <section class="hero py-4">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-7 mb-5 mb-lg-0">
                    <h1 class="hero-title mb-4">Powerful Centrally Managed Email Signature Designer</h1>
                    
                    <div class="features mb-5">
                        <div class="feature-item">
                            <div class="feature-icon icon-styles-first">→</div>
                            <div>
                                <h3 class="h5 mb-2">Consistent Branding: Ensure uniform email signatures across <br /> all teams and devices</h3>
                                <p class="text-muted mb-0">Enterprise-Grade Security: Keep communications secure with industry-leading standards</p>
                            </div>
                        </div>
                        
                        <div class="feature-item">
                            <div class="feature-icon icon-styles-second">→</div>
                            <div>
                                <h3 class="h5 mb-2">Compliance Made Easy: Stay aligned with global regulations effortlessly.</h3>
                                <p class="text-muted mb-0">Centralized Management: Update and deploy signatures organization-wide in minutes</p>
                            </div>
                        </div>
                        
                        <div class="feature-item">
                            <div class="feature-icon icon-styles-third">→</div>
                            <div>
                                <h3 class="h5 mb-2">Scalable & Flexible: Designed to grow with your business needs</h3>
                                <p class="text-muted mb-0">Device & Platform Compatibility: Works seamlessly across all email clients and devices</p>
                            </div>
                        </div>
                        <div class="feature-item">
                            <div class="feature-icon icon-styles-fourth">→</div>
                            <div>
                                <h3 class="h5 mb-2">Choose from professionally designed templates for quick and easy setup</h3>
                                <p class="text-muted mb-0">Easy to Use: Intuitive interface for effortless creation and management.</p>
                            </div>
                        </div>
                    </div>

                    <button class="btn btn-dark btn-lg px-4"> Try it for Free for Next 30 days →</button>
                </div>
                <div class="col-lg-5">
                    <img src={Heroimg} alt="Email Signature Designer Interface" class="hero-image" />
                </div>
            </div>
        </div>
    </section>
    </div>
  )
}

export default HeroSection