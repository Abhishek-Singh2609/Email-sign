import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "bootstrap-icons/font/bootstrap-icons.min.css";
import "./BlocksPage.css";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  PinIcon as Pinterest,
  Github,
} from "lucide-react";
import tempimg from "../../assets/template_Img/user.jpg";

function BlocksPage() {
  // Add state to track which card is being hovered
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate(); 

  // const handleCardClick = (signature) => {
  //   navigate(`/subscription`, { state: { signature } }); 
  // };

  return (
    <>
      <div className="container py-4 mt-2 ">
        <h1 className="text-center mb-5">Choose Professional Email Signatures</h1>

        <div className="row g-4">
          {/* Signature 1 */}
          <div className="col-12 col-md-6 col-lg-4">
            <div
              className="card p-3 position-relative"
              style={{
                background: "linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)",
                border: hoveredCard === 1 ? "3px solid #0d6efd" : "",
                cursor: "pointer",
              }}
              onMouseEnter={() => setHoveredCard(1)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => handleCardClick({ name: "Ryan Mitchell", title: "Lead DevOps Engineer", company: "CloudTech Solutions" })}
            >
              <div className="d-flex align-items-center gap-3">
                <div className="text-white">
                  <h3 className="fs-5 mb-1">Ryan Mitchell</h3>
                  <p className="mb-0 opacity-75">Lead DevOps Engineer</p>
                  <p className="small mb-0">CloudTech Solutions</p>
                </div>
              </div>
              <hr className="border-white opacity-25" />
              <div className="contact-info text-white">
                <div className="row mb-3">
                  <div className="col-6">
                    <p className="mb-1 text-white">
                      <small>📱 888.555.0123</small>
                    </p>
                    <p className="mb-1 text-white">
                      <small>💻 rm@cloudtech.dev</small>
                    </p>
                    <div className="d-flex gap-2">
                      <a
                        href="#"
                        className="text-white opacity-75 hover-opacity-100"
                      >
                        <Github size={16} />
                      </a>
                      <a
                        href="#"
                        className="text-white opacity-75 hover-opacity-100"
                      >
                        <Linkedin size={16} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Signature 2 */}
          <div className="col-12 col-md-6 col-lg-4">
            <div
              className="card p-3 position-relative"
              style={{
                background:
                  "linear-gradient(135deg,rgb(231, 132, 52) 0%,rgb(236, 135, 53) 100%)",
                border: hoveredCard === 2 ? "3px solid #0d6efd" : "",
                cursor: "pointer",
              }}
              onMouseEnter={() => setHoveredCard(2)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => handleCardClick({ name: "Isabella Romano", title: "Executive Chef & Owner", company: "Bella Cucina Ristorante" })}
            >
              <div className="d-flex flex-row align-items-center gap-4">
                <div className="text-center">
                  <h3 className="fs-5 mb-1" style={{ color: "#d32f2f" }}>
                    Isabella Romano
                  </h3>
                  <p className="mb-2 text-muted">Executive Chef & Owner</p>
                  <p
                    className="mb-1"
                    style={{ fontFamily: "Playfair Display, serif" }}
                  >
                    Bella Cucina Ristorante
                  </p>
                </div>
              </div>
              <hr className="border-danger" />
              <div className="contact-info text-start">
                <p className="mb-1 text-white">
                  <small>📍 123 Culinary Avenue, NYC</small>
                </p>
                <p className="mb-1 text-white">
                  <small>📞 (212) 555-8899</small>
                </p>
                <p className="mb-1 text-white">
                  <small>✉️ chef@bellacucina.com</small>
                </p>
              </div>
            </div>
          </div>

          {/* Signature 3 */}
          <div className="col-12 col-md-6 col-lg-4">
            <div
              className="card p-3 position-relative"
              style={{
                background:
                  "linear-gradient(135deg,rgb(250, 7, 153) 0%,rgb(188, 56, 221) 100%)",
                border: hoveredCard === 3 ? "3px solid #0d6efd" : "",
                cursor: "pointer",
              }}
              onMouseEnter={() => setHoveredCard(3)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => handleCardClick({ name: "Dr. Marcus Wei", title: "Psychology", company: "Mental Wellness Center" })}
            >
              <div className="row g-0">
                <div className="col-8 ps-3">
                  <div className="d-flex flex-column">
                    <div>
                      <h3 className="fs-5 mb-1" style={{ color: "#6a1b9a" }}>
                        Dr. Marcus Wei
                      </h3>
                      <p className="mb-2">
                        <span
                          className="badge bg-purple text-white"
                          style={{ backgroundColor: "#6a1b9a" }}
                        >
                          Psychology
                        </span>
                      </p>
                      <p className="small mb-2">Mental Wellness Center</p>
                    </div>
                    <div className="mt-3">
                      <p className="mb-2">
                        <small>📞 (555) 987-6543</small>
                      </p>
                      <p className="mb-2">
                        <small>✉️ dr.wei@mentalwellness.org</small>
                      </p>
                      <p className="mb-1">
                        <small>🌐 www.mentalwellness.org</small>
                      </p>
                      <div className="mt-2"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Signature 4 */}
          <div className="col-12 col-md-6 col-lg-4">
            <div
              className="card p-3 position-relative"
              style={{
                border: hoveredCard === 4 ? "3px solid #0d6efd" : "",
                cursor: "pointer",
              }}
              onMouseEnter={() => setHoveredCard(4)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => handleCardClick({ name: "Jorden Smith", title: "CTO", company: "T&M Corporate Properties" })}
            >
              <div className="d-flex align-items-center gap-3">
                <div className="company-logo" style={{ width: 100 }}>
                  <img
                    src={tempimg}
                    alt="Profile"
                    width={80}
                    height={80}
                    className="img-fluid"
                  />
                </div>
                <div>
                  <h3 className="fs-5 mb-1" style={{ color: "#0d6efd" }}>
                    Jorden Smith
                  </h3>
                  <p className="mb-2">CTO at T&M Corporate Properties</p>
                </div>
              </div>
              <hr />
              <div className="contact-info">
                <p className="mb-1">
                  <small>📱 021.035.0250</small>
                </p>
                <p className="mb-1">
                  <small>📞 512.641.0040</small>
                </p>
                <p className="mb-1">
                  <small>✉️ jorden@tmcorporateproperties.com</small>
                </p>
                <p className="mb-1">
                  <small>🌐 www.tmcorporateproperties.com</small>
                </p>
              </div>
            </div>
          </div>

          {/* Signature 5 */}
          <div className="col-12 col-md-6 col-lg-4">
            <div
              className="card p-3 position-relative"
              style={{ 
                backgroundColor: "#f8f9fa",
                border: hoveredCard === 5 ? "3px solid #0d6efd" : "",
                cursor: "pointer",
              }}
              onMouseEnter={() => setHoveredCard(5)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => handleCardClick({ name: "Alex Perez", title: "Account Executive", company: "Brandity" })}
            >
              <div className="d-flex align-items-center gap-3">
                <div>
                  <h3 className="fs-5 mb-1" style={{ color: "#5F0F40" }}>
                    Alex Perez
                  </h3>
                  <p className="mb-2">Account Executive, Brandity</p>
                </div>
                <div
                  className="company-logo rounded"
                  style={{ width: 100, backgroundColor: "#0d6efd" }}
                >
                  <img
                    src={tempimg}
                    alt="Company Logo"
                    width={100}
                    height={100}
                    className="img-fluid"
                  />
                </div>
              </div>
              <hr />
              <div className="contact-info">
                <p className="mb-1">
                  <small>📞 361-935-2259</small>
                </p>
                <p className="mb-2">
                  <small>📍 2462 Oliver Street Fort Worth, NY 76118</small>
                </p>
                <p className="mb-1">
                  <small>✉️ alex.perez@brandity.com</small>
                </p>
                <p className="mb-1">
                  <small>🌐 www.brandity.com</small>
                </p>
              </div>
            </div>
          </div>

          {/* Signature 6 */}
          <div className="col-12 col-md-6 col-lg-4">
            <div
              className="card p-3 position-relative"
              style={{ 
                backgroundColor: "#f8f9fa",
                border: hoveredCard === 6 ? "3px solid #0d6efd" : "",
                cursor: "pointer",
              }}
              onMouseEnter={() => setHoveredCard(6)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => handleCardClick({ name: "Lauren Ipsum", title: "Accountant", company: "Finance Mile" })}
            >
              <div className="d-flex align-items-center gap-3">
                <div
                  className="rounded-circle overflow-hidden border border-3 border-success tech-logo bg-white rounded-circle p-2"
                  style={{ width: 80, height: 80 }}
                >
                  <img
                    src={tempimg}
                    alt="Profile"
                    width={80}
                    height={80}
                    className="img-fluid"
                  />
                </div>
                <div>
                  <h3 className="fs-5 mb-1" style={{ color: "#2e7d32" }}>
                    Lauren Ipsum
                  </h3>
                  <p className="mb-2">Accountant, Finance Mile</p>
                </div>
              </div>
              <hr />
              <div className="contact-info">
                <p className="mb-1">
                  <small>📍 2462 Oliver Street Fort Worth, NY 76118</small>
                </p>
                <p className="mb-1">
                  <small>📞 8137-263-3422</small>
                </p>
                <p className="mb-1">
                  <small>✉️ laurenhall@finance.com</small>
                </p>
                <p className="mb-2">
                  <small>🌐 www.brandity.com</small>
                </p>
              </div>
            </div>
          </div>

          {/* Signature 7 */}
          <div className="col-12 col-md-6 col-lg-12">
            <div
              className="card p-3 position-relative"
              style={{ 
                border: hoveredCard === 7 ? "3px solid #0d6efd" : "",
                cursor: "pointer",
              }}
              onMouseEnter={() => setHoveredCard(7)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => handleCardClick({ name: "Casie Smith", title: "Head of Marketing", company: "AV Media" })}
            >
              <div className="d-flex align-items-center gap-3">
                <div
                  className="rounded-circle overflow-hidden"
                  style={{ width: 80, height: 80 }}
                >
                  <img
                    src={tempimg}
                    alt="Profile"
                    width={80}
                    height={80}
                    className="img-fluid"
                  />
                </div>
                <div>
                  <h3 className="fs-5 mb-1" style={{ color: "#e83e8c" }}>
                    Casie Smith
                  </h3>
                  <p className="mb-2">Head of Marketing | AV Media</p>
                  <div className="d-flex gap-2">
                    <a href="#" className="text-decoration-none text-secondary">
                      <Facebook size={16} />
                    </a>
                    <a href="#" className="text-decoration-none text-secondary">
                      <Twitter size={16} />
                    </a>
                    <a href="#" className="text-decoration-none text-secondary">
                      <Linkedin size={16} />
                    </a>
                  </div>
                </div>
              </div>
              <hr />
              <div className="contact-info">
                <p className="mb-1">
                  <small>📞 512-232-3492</small>
                </p>
                <p className="mb-1">
                  <small>✉️ casie@avmedia.com</small>
                </p>
                <p className="mb-1">
                  <small>🌐 www.avmedia.com</small>
                </p>
              </div>
            </div>
          </div>

          {/* Signature 8 */}
          <div className="col-12 col-md-6 col-lg-12">
            <div
              className="card p-3 position-relative"
              style={{ 
                backgroundColor: "#f8f9fa",
                border: hoveredCard === 8 ? "3px solid #0d6efd" : "",
                cursor: "pointer",
              }}
              onMouseEnter={() => setHoveredCard(8)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => handleCardClick({ name: "Lauren Ipsum", title: "Accountant", company: "Finance Mile" })}
            >
              <div className="d-flex align-items-center gap-3">
                <div
                  className="rounded-circle overflow-hidden"
                  style={{ width: 80, height: 80 }}
                >
                  <img
                    src={tempimg}
                    alt="Profile"
                    width={80}
                    height={80}
                    className="img-fluid"
                  />
                </div>
                <div>
                  <h3 className="fs-5 mb-1" style={{ color: "#0dcaf0" }}>
                    Lauren Ipsum
                  </h3>
                  <p className="mb-2">Accountant, Finance Mile</p>
                </div>
              </div>
              <hr />
              <div className="contact-info">
                <p className="mb-1">
                  <small>📍 2462 Oliver Street Fort Worth, NY 76118</small>
                </p>
                <p className="mb-1">
                  <small>📞 8137-263-3422</small>
                </p>
                <p className="mb-1">
                  <small>✉️ laurenhall@finance.com</small>
                </p>
              </div>
            </div>
          </div>

          {/* Signature 9 */}
          <div className="col-12 col-md-6 col-lg-12">
            <div
              className="card p-3 d-flex flex-row gap-2 position-relative"
              style={{ 
                border: hoveredCard === 9 ? "3px solid #0d6efd" : "",
                cursor: "pointer",
              }}
              onMouseEnter={() => setHoveredCard(9)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => handleCardClick({ name: "Mona Hinson", title: "Potter", company: "Mona's Cups" })}
            >
              <div className="text-center mb-3">
                <h3 className="signature-script mb-3">Mr. John</h3>
                <div
                  className="rounded-circle overflow-hidden mx-auto"
                  style={{ width: 100, height: 100 }}
                >
                  <img
                    src={tempimg}
                    alt="Profile"
                    width={100}
                    height={100}
                    className="img-fluid"
                  />
                </div>
              </div>
              <div className="text-center">
                <h4 className="fs-3 mb-1" style={{ color: "#dc3545" }}>
                  Mona Hinson
                </h4>
                <p className="mb-2">Potter at Mona's Cups</p>
                <div className="d-flex justify-content-center gap-2 mb-3">
                  <a
                    href="#"
                    className="text-decoration-none"
                    style={{ color: "#3b5998" }}
                  >
                    <Facebook size={16} />
                  </a>
                  <a
                    href="#"
                    className="text-decoration-none"
                    style={{ color: "#e4405f" }}
                  >
                    <Instagram size={16} />
                  </a>
                  <a
                    href="#"
                    className="text-decoration-none"
                    style={{ color: "#bd081c" }}
                  >
                    <Pinterest size={16} />
                  </a>
                </div>
                <div className="contact-info">
                  <p className="mb-1">
                    <small>📞 22-883-1039</small>
                  </p>
                  <p className="mb-1">
                    <small>✉️ info@money.com</small>
                  </p>
                  <p className="mb-1">
                    <small>🌐 www.money.com</small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BlocksPage;