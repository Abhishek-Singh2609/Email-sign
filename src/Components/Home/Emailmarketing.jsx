import "./EmailMarketing.css"
import Marketingimg from "../../assets/HomePage/marketing.jpg"

function EmailMarketingLanding() {
  return (
    <div className="email-marketing-container">
      <div className="content-wrapper">
        <h1 className="main-heading mb-4">
          Extend Your Email <br /><span className="gradient-text">Marketing</span> Campaigns
        </h1>

        <p className="subheading mb-8">
          Take advantage of this untapped marketing channel by turning every email into a marketing opportunity.
        </p>

        <div className="image-container">
          <img
            src={Marketingimg}
            alt="Email marketing platform showing email signature with call to action"
            className="laptop-image"
          />
        </div>
      </div>
    </div>
  )
}

export default EmailMarketingLanding

