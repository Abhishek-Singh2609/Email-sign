import React from 'react'
import "./Demo.css";
import demoimg from "../../assets/Demo/demo.png";

function Demo() {
  return (
    <>
    <div className="container">
    <div className="form-wrapper d-flex align-items-center justify-content-center mb-2">
    <div className="form-container p-4 shadow-lg rounded bg-white">
        <h1 className="title">Schedule a <span>Demo</span>Today</h1>
        <p className="subtitle">Enter your details, and our Sales Team will contact you to schedule your demo. </p>

        <form>
            <div className="row">
                {/* <!-- First Name & Last Name --> */}
                <div className="col-md-6">
                    <label className="form-label required" htmlFor="firstName">First name</label>
                    <input type="text" className="form-control" id="firstName" placeholder="John" required/>
                </div>
                <div className="col-md-6">
                    <label className="form-label required" htmlFor="lastName">Last name</label>
                    <input type="text" className="form-control" id="lastName" placeholder="Smith" required/>
                </div>

                {/* <!-- Phone & Email --> */}
                <div className="col-md-6">
                    <label className="form-label required" htmlFor="phone">Phone number</label>
                    <input type="tel" className="form-control" id="phone" placeholder="+00 0000 00000" required/>
                </div>
                <div className="col-md-6">
                    <label className="form-label required" htmlFor="email">Email</label>
                    <input type="email" className="form-control" id="email" placeholder="example@email.com" required/>
                </div>

                {/* <!-- Organisation & Job Title --> */}
                <div className="col-md-6">
                    <label className="form-label required" htmlFor="organisation">Organisation</label>
                    <input type="text" className="form-control" id="organisation" placeholder="Enter your organisation" required/>
                </div>
                <div className="col-md-6">
                    <label className="form-label" htmlFor="jobTitle">Job Title</label>
                    <input type="text" className="form-control" id="jobTitle" placeholder="Enter your job title"/>
                </div>

                {/* <!-- Users & Country --> */}
                <div className="col-md-6">
                    <label className="form-label required" htmlFor="users">Number of users</label>
                    <input type="text" className="form-control" id="users" placeholder="Specify how many users" required/>
                </div>
                <div className="col-md-6">
                    <label className="form-label required" htmlFor="country">Your country</label>
                    <select className="form-select" id="country" required>
                        <option value="">Select country</option>
                        <option value="us">United States</option>
                        <option value="uk">United Kingdom</option>
                        <option value="ca">Canada</option>
                    </select>
                </div>

                <div className='col-12 d-flex justify-content-between gap-3'>
                    {/* <!-- Email Platform --> */}
                    <div className="col-6">
                        <label className="form-label required" htmlFor="platform">Email platform</label>
                        <select className="form-select" id="platform" required>
                            <option value="office365">Microsoft Office 365</option>
                            <option value="exchange">Microsoft Exchange</option>
                            <option value="google">Google Workspace</option>
                        </select>
                    </div>

                    {/* <!-- Newsletter Opt-in --> */}
                    <div className="col-6">
                        <label className="form-label required">
                        Would you be interested in receiving occasional emails with updates and news about Agile Mail Signature? You can unsubscribe at any time.
                        </label>
                        <div className="radio-group">
                            <label>
                                <input type="radio" name="newsletter" value="yes" required/>
                                Yes
                            </label>
                            <label>
                                <input type="radio" name="newsletter" value="no" required/>
                                No
                            </label>
                        </div>
                    </div>
                </div>

                {/* <!-- reCAPTCHA --> */}
                <div className="col-12">
                    <div className="g-recaptcha" data-sitekey="your-site-key"></div>
                </div>

                {/* <!-- Submit Button --> */}
                <div className="col-12">
                    <button type="submit" className="btn btns-demo">Schedule Demo</button>
                </div>
            </div>
        </form>
    </div>
</div>

        <div className='container'>
            <img className='demo-img mb-2' src={demoimg}  alt="DemoImg"/>
        </div>
    </div>
    <div class="contact-container">
        <div class="row">
            {/* <!-- Left Column --> */}
            <div class="col-lg-6">
                <h1 class="title">Get in <span>Touch</span></h1>
                <div class="region">
                    <h2 class="region-title">USA & Canada:</h2>
                    <a href="tel:+14077569832" class="phone-number">
                        <span class="phone-icon"></span>
                        +1 407 756 9832
                    </a>
                </div>
            </div>

            {/* <!-- Right Column --> */}
            <div class="col-lg-6">
                <div class="contact-form">
                    <h2 class="form-title">Send us a message!</h2>
                    <form>
                        <input type="text" class="form-control" placeholder="Your name" required/>
                        <input type="email" class="form-control" placeholder="Enter your email" required/>
                        <textarea class="form-control" placeholder="Message" required></textarea>
                        <div class="text-end">
                            <button type="submit" class="btn btn-submit">Please wait...</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    {/* f&Q */}
    <div class="accordion" id="faqAccordion">
        {/* <!-- Item 1 --> */}
        <div class="accordion-item">
            <h2 class="accordion-header">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse1">
                Why do your Organisation Need Agile Email Signature ?  
                </button>
            </h2>
            <div id="collapse1" class="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    <p>Agile Email Signature offers a streamlined and customizable way to manage and standardize email signatures across your organization. It ensures consistency, enhances brand identity, and provides a professional appearance in every email. Additionally, it can include important information like social media links, disclaimers, and promotions, helping your business maintain a cohesive and effective communication strategy.</p>
                    <p>Plus, it can be easily managed from a central platform, saving time and effort for IT and marketing teams.</p>
                </div>
            </div>
        </div>

        {/* <!-- Item 2 --> */}
        <div class="accordion-item">
            <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse2">
                    Why do we need to manage our email signatures?
                </button>
            </h2>
            <div id="collapse2" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    <p>Managing email signatures ensures consistent branding, professional appearance, and compliance across all company communications.</p>
                </div>
            </div>
        </div>

        {/* <!-- Item 3 --> */}
        <div class="accordion-item">
            <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse3">
                    Why use it over the standard client email signature feature?
                </button>
            </h2>
            <div id="collapse3" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    <p>Agile offers centralized management, consistent formatting across devices, and advanced features not available in standard email clients.</p>
                </div>
            </div>
        </div>

        {/* <!-- Item 4 --> */}
        <div class="accordion-item">
            <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse4">
                    How is the software licensed?
                </button>
            </h2>
            <div id="collapse4" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    <p>The software is licensed on a per-user subscription basis with flexible pricing options available.</p>
                </div>
            </div>
        </div>

        {/* <!-- Item 5 --> */}
        <div class="accordion-item">
            <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse5">
                    What support is offered?
                </button>
            </h2>
            <div id="collapse5" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    <p>We offer comprehensive support including documentation, email support, and dedicated customer success managers.</p>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Demo