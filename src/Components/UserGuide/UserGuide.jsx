import React from "react";
import { Container, Row, Col, Card, Accordion, Button } from "react-bootstrap";
import {
  FaDownload,
  FaCopy,
  FaCog,
  FaQuestionCircle,
  FaPalette,
  FaUserEdit,
} from "react-icons/fa";
import "./UserGuide.css";

const UserGuide = () => {
  return (
    <div className="user-guide-page">
      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h1 className="hero-title">Email Signature User Guide</h1>
              <p className="hero-subtitle">
                Create professional email signatures in minutes with our
                easy-to-use tool
              </p>
              <div className="cta-buttons">
                <Button variant="primary" size="lg" className="me-3">
                  <FaCog className="me-2" /> Get Started
                </Button>
                <Button variant="outline-light" size="lg">
                  <FaQuestionCircle className="me-2" /> Watch Tutorial
                </Button>
              </div>
            </Col>
            <Col md={6}>
              <img
                src="https://via.placeholder.com/600x400"
                alt="Email Signature Example"
                className="img-fluid rounded shadow"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Quick Start Section */}
      <section className="quick-start-section py-5">
        <Container>
          <h2 className="section-title text-center mb-5">Quick Start Guide</h2>
          <Row className="g-4">
            <Col md={4}>
              <Card className="h-100 feature-card">
                <Card.Body className="text-center">
                  <div className="feature-icon mb-3">
                    <FaUserEdit size={48} />
                  </div>
                  <h3>1. Enter Your Details</h3>
                  <p>
                    Fill in your personal and professional information in the
                    form fields.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 feature-card">
                <Card.Body className="text-center">
                  <div className="feature-icon mb-3">
                    <FaPalette size={48} />
                  </div>
                  <h3>2. Customize Design</h3>
                  <p>
                    Choose colors, layout, and styling options to match your
                    brand.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 feature-card">
                <Card.Body className="text-center">
                  <div className="feature-icon mb-3">
                    <FaDownload size={48} />
                  </div>
                  <h3>3. Save & Install</h3>
                  <p>
                    Copy the HTML code or download the image to use in your
                    email client.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Detailed Instructions */}
      <section className="detailed-instructions py-5 bg-light">
        <Container>
          <h2 className="section-title text-center mb-5">
            Detailed Instructions
          </h2>
          <Row>
            <Col lg={8} className="mx-auto">
              <Accordion defaultActiveKey="0" flush>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Setting Up Your Profile</Accordion.Header>
                  <Accordion.Body>
                    <ol>
                      <li>Click on the "Profile" tab in the application</li>
                      <li>
                        Enter your full name, job title, and company information
                      </li>
                      <li>Add your contact details (phone, email, website)</li>
                      <li>
                        Upload a professional profile photo (recommended size:
                        200x200px)
                      </li>
                      <li>Click "Save Profile" to store your information</li>
                    </ol>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Customizing the Design</Accordion.Header>
                  <Accordion.Body>
                    <ul>
                      <li>
                        Choose from pre-designed templates or create your own
                        layout
                      </li>
                      <li>
                        Select colors that match your brand using the color
                        picker
                      </li>
                      <li>
                        Adjust font styles and sizes for optimal readability
                      </li>
                      <li>Add social media icons and links to your profiles</li>
                      <li>Preview changes in real-time before saving</li>
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>Installing Your Signature</Accordion.Header>
                  <Accordion.Body>
                    <h5>For Gmail:</h5>
                    <ol>
                      <li>Click the "Copy HTML" button</li>
                      <li>Go to Gmail Settings → Signature</li>
                      <li>Paste the HTML code in the signature editor</li>
                      <li>Save changes</li>
                    </ol>
                    <h5 className="mt-3">For Outlook:</h5>
                    <ol>
                      <li>Click the "Download Image" button</li>
                      <li>Go to Outlook Options → Mail → Signatures</li>
                      <li>Insert the downloaded image</li>
                      <li>Save your signature</li>
                    </ol>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Tips & Best Practices */}
      <section className="tips-section py-5">
        <Container>
          <h2 className="section-title text-center mb-5">
            Tips & Best Practices
          </h2>
          <Row className="g-4">
            <Col md={6} lg={3}>
              <Card className="h-100 tip-card">
                <Card.Body>
                  <div className="tip-number">01</div>
                  <h4>Keep It Simple</h4>
                  <p>
                    Avoid clutter and excessive information. Stick to essential
                    contact details.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={3}>
              <Card className="h-100 tip-card">
                <Card.Body>
                  <div className="tip-number">02</div>
                  <h4>Mobile-Friendly</h4>
                  <p>
                    Test your signature on mobile devices to ensure proper
                    display.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={3}>
              <Card className="h-100 tip-card">
                <Card.Body>
                  <div className="tip-number">03</div>
                  <h4>Brand Consistency</h4>
                  <p>
                    Use company colors and logos to maintain brand identity.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={3}>
              <Card className="h-100 tip-card">
                <Card.Body>
                  <div className="tip-number">04</div>
                  <h4>Legal Compliance</h4>
                  <p>
                    Include required disclaimers or legal text if applicable.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="faq-section py-5 bg-light">
        <Container>
          <h2 className="section-title text-center mb-5">
            Frequently Asked Questions
          </h2>
          <Row>
            <Col lg={8} className="mx-auto">
              <div className="faq-item mb-4">
                <h4>How do I update my signature later?</h4>
                <p>
                  Simply log back into the application, make your changes, and
                  re-copy the HTML code to your email client. Your updates will
                  appear in all new emails.
                </p>
              </div>
              <div className="faq-item mb-4">
                <h4>Can I create signatures for my entire team?</h4>
                <p>
                  Yes! We offer enterprise plans that allow you to manage
                  signatures for your entire organization with centralized
                  branding controls.
                </p>
              </div>
              <div className="faq-item mb-4">
                <h4>
                  Why does my signature look different in some email clients?
                </h4>
                <p>
                  Different email clients render HTML differently. We recommend
                  testing in multiple clients and using our compatibility
                  checker tool.
                </p>
              </div>
              <div className="faq-item">
                <h4>
                  Can I add a banner or promotional content to my signature?
                </h4>
                <p>
                  Yes, our premium plans include options to add banners,
                  promotional content, or seasonal messages that can be updated
                  easily.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Custom CSS */}
      {/* <style jsx>{`
        .user-guide-page {
          font-family: "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
          color: #333;
        }

        .hero-section {
          background: linear-gradient(135deg, #6e8efb, #a777e3);
          color: white;
          padding: 5rem 0;
        }

        .hero-title {
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
        }

        .hero-subtitle {
          font-size: 1.25rem;
          opacity: 0.9;
          margin-bottom: 2rem;
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 600;
          position: relative;
          padding-bottom: 1rem;
        }

        .section-title:after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 4px;
          background: #6e8efb;
          border-radius: 2px;
        }

        .feature-card {
          border: none;
          border-radius: 12px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        }

        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        .feature-icon {
          color: #6e8efb;
        }

        .tip-card {
          border: none;
          border-radius: 12px;
          background-color: #f8f9fa;
          transition: all 0.3s ease;
        }

        .tip-card:hover {
          background-color: white;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        .tip-number {
          font-size: 2rem;
          font-weight: 700;
          color: rgba(110, 142, 251, 0.2);
          margin-bottom: 1rem;
        }

        .faq-item {
          background: white;
          padding: 1.5rem;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }

        .faq-item h4 {
          color: #6e8efb;
          margin-bottom: 0.75rem;
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.2rem;
          }

          .hero-subtitle {
            font-size: 1.1rem;
          }

          .section-title {
            font-size: 2rem;
          }
        }
      `}</style> */}
    </div>
  );
};

export default UserGuide;
