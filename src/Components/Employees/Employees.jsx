import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Spinner,
  Alert,
  ListGroup,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Employees.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EmployeeSignatureGenerator = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [signatureApplied, setSignatureApplied] = useState(null);
  const [loadingEmployees, setLoadingEmployees] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        alert("No token found. Please login.");
        window.location.href = "/login";
        return;
      }
      // "https://agile-email-signature-dydmacbfh4e6cmf0.canadacentral-01.azurewebsites.net/employees",

      try {
        const response = await axios.get(
          "https://email-signature-ewasbjbvendvfwck.canadacentral-01.azurewebsites.net/employees",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setEmployees(response.data);
        setFilteredEmployees(response.data);
        setLoadingEmployees(false);
        console.log("data", response.data);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          alert("Session expired. Please login again.");
          localStorage.removeItem("accessToken");
          window.location.href = "/login";
        } else {
          setError("Failed to fetch employees. Please try again later.");
          console.error("Error fetching employees:", err);
        }
        setLoadingEmployees(false);
      }
    };

    fetchEmployees();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredEmployees(employees);
    } else {
      const filtered = employees.filter(
        (employee) =>
          employee.displayName
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          employee.mail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          employee.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredEmployees(filtered);
    }
  }, [searchTerm, employees]);

  // const generateSignatureHTML = (emp) => {
  //   return `
  //     <div style="font-family: Arial, sans-serif; color: #ffffff; background-color: #0c0c0c; padding: 20px; max-width: 600px;">
  //       <p style="margin-bottom: 10px;">Thanks & Regards,</p>
  //       <table style="width: 100%; border-spacing: 0; color: #ffffff;">
  //         <tr>
  //           <td style="padding-right: 20px; vertical-align: top;">
  //             <p style="margin: 0; font-size: 16px; font-weight: bold; color: #3db2ff;">
  //               ${emp.displayName || "Employee Name"}
  //             </p>
  //             <p style="margin: 2px 0; font-size: 14px; color: #3db2ff;">
  //               ${emp.jobTitle || "Employee Title"}
  //             </p>
  //             <p style="margin: 4px 0 0 0; font-size: 14px; font-weight: bold; color: #ffffff;">
  //               AgileWorld Technology Ltd.
  //             </p>
  //             <p style="margin: 2px 0 0 0; font-size: 14px;">
  //               Gurgaon, Haryana
  //             </p>
  //           </td>
  //           <td style="border-left: 1px solid #ffffff; padding-left: 20px; vertical-align: top;">
  //             <p style="margin: 0; font-size: 14px;">
  //               📞 ${emp.mobilePhone || "+91 9876543210"}
  //             </p>
  //             <p style="margin: 2px 0; font-size: 14px;">
  //               📧 <a href="mailto:${
  //                 emp.mail
  //               }" style="color: #3db2ff; text-decoration: none;">${
  //     emp.mail || "email@example.com"
  //   }</a>
  //             </p>
  //             <p style="margin: 2px 0; font-size: 14px;">
  //               🌐 <a href="https://agileworldtechnologies.com" style="color: #3db2ff; text-decoration: none;">www.agileworldtechnologies.com</a>
  //             </p>
  //             <p style="margin-top: 8px;">
  //               <a href="https://linkedin.com" style="margin-right: 10px;">
  //                 <img src="https://cdn-icons-png.flaticon.com/24/145/145807.png" alt="LinkedIn" style="vertical-align: middle;">
  //               </a>
  //               <a href="https://youtube.com" style="margin-right: 10px;">
  //                 <img src="https://cdn-icons-png.flaticon.com/24/1384/1384060.png" alt="YouTube" style="vertical-align: middle;">
  //               </a>
  //               <a href="https://instagram.com">
  //                 <img src="https://cdn-icons-png.flaticon.com/24/2111/2111463.png" alt="Instagram" style="vertical-align: middle;">
  //               </a>
  //             </p>
  //           </td>
  //         </tr>
  //       </table>
  //       <div style="margin-top: 20px;">
  //         <img src="https://media-hosting.imagekit.io/8a85a9d5b814448e/Flux_Dev_Create_a_digital_banner_for_an_email_signature_featur_0.jpg?Expires=1840464894&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=qZPGGgbuc3tYYg2Z2sGBwoSPNh-4qXNevNCcjGfvmPL5BZC71nvHPsamk8TU2gLvtHHwjzVlayjB3t6dMh1q7CbhqTvCxRcu6GidoxDzyu8ykyipdpzXbLRlS8O7Aj6rM6A8iwtRolad6ggGpLoIOxa4Fh832wV~Ac6D3EFJeyb0rXUDZstJemCGWYyRtD2j-VrOrHHZqPQ5iWy1m05yw68~BMrmekwAVUPGMuY5xGjwSYlU~ydNP22GVW5xIxkVqWR1NEIDtuG4HaNG9AJicfmd5Rhaef-FHuIv24IANscF5iC0vK9oDsVTuU6bHqUEzJUx6CAimQ8HS9K1XA-XPg__" alt="Certified" style="width: 100%; height: auto; border-radius: 8px;">
  //       </div>

  //       <div style="margin-top: 20px; font-size: 11px; color: #cccccc;">
  //         <p><strong>DISCLAIMER</strong></p>
  //         <p style="margin-top: 5px;">
  //           At Agile World Technologies, we are dedicated to providing innovative and reliable IT services tailored to meet your business needs. Our agile approach ensures that we deliver top-notch solutions with speed, flexibility, and adaptability.
  //         </p>
  //       </div>
  //     </div>
  //   `;
  // };

  const applySignature = (emp) => {
    setIsLoading(true);
    setSignatureApplied(emp.id);

    // Navigate to /edittemplate with state containing the email and organization
    navigate("/edittemplate", {
      state: {
        email: emp.mail,
        organization: "agileworldtechnologies.com",
        businessPhones: emp.businessPhones,
        displayName: emp.displayName,
        jobTitle: emp.jobTitle,
        officeLocation: emp.officeLocation,
      },
    });

    // Reset loading state after a short delay (optional)
    setTimeout(() => {
      setIsLoading(false);
      setSignatureApplied(null);
    }, 1000);
  };

  const handleEmployeeSelect = (employee) => {
    setSelectedEmployees((prev) => {
      const isSelected = prev.some((e) => e.id === employee.id);
      if (isSelected) {
        return prev.filter((e) => e.id !== employee.id);
      } else {
        return [...prev, employee];
      }
    });
  };

  // const applyAllSignatures = async () => {
  //   setIsLoading(true);
  //   try {
  //     for (const employee of selectedEmployees) {
  //       await applySignature(employee);
  //       // Small delay between requests to avoid rate limiting
  //       await new Promise((resolve) => setTimeout(resolve, 500));
  //     }
  //   } catch (err) {
  //     setError("Error applying some signatures. Please check the console.");
  //     console.error(err);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  if (loadingEmployees) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading employees...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className="container-padding pb-5">
      <h1 className="email-heading">
        Apply Email <span className="h1-subtitle">Signature</span>
      </h1>
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-sm">
            <Card.Header className="card-bg text-white">
              <h3 className="mb-0">Email Signature Generator</h3>
              <p className="mb-0 small">
                Search by name & groups and apply employee email signatures
              </p>
            </Card.Header>
            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}

              <Form.Group className="mb-4">
                <Form.Label>Search Employees</Form.Label>
                <div className="position-relative">
                  <Form.Control
                    type="text"
                    placeholder="Type name, email or job title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="py-2 px-3 border-primary"
                  />
                </div>
              </Form.Group>

              {/* {selectedEmployees.length > 0 && (
                <div className="mb-3">
                  <Button
                    variant="success"
                    onClick={applyAllSignatures}
                    disabled={isLoading}
                    className="mb-2"
                  >
                    {isLoading ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          className="me-2"
                        />
                        Applying...
                      </>
                    ) : (
                      `Apply All (${selectedEmployees.length})`
                    )}
                  </Button>
                  <div className="small text-muted">
                    Selected:{" "}
                    {selectedEmployees.map((e) => e.displayName).join(", ")}
                  </div>
                </div>
              )} */}

              {filteredEmployees.length > 0 && (
                <ListGroup style={{ maxHeight: "400px", overflowY: "auto" }}>
                  {filteredEmployees.map((employee) => (
                    <ListGroup.Item
                      key={employee.id}
                      className="d-flex justify-content-between align-items-center"
                    >
                      <div className="d-flex align-items-center flex-grow-1">
                        <Form.Check
                          type="checkbox"
                          checked={selectedEmployees.some(
                            (e) => e.id === employee.id
                          )}
                          onChange={() => handleEmployeeSelect(employee)}
                          className="me-3"
                        />
                        <div>
                          <strong>{employee.displayName}</strong>
                          <div className="small text-muted">
                            {employee.jobTitle}
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => applySignature(employee)}
                        disabled={isLoading || signatureApplied === employee.id}
                      >
                        {signatureApplied === employee.id ? (
                          <>
                            <Spinner
                              as="span"
                              animation="border"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                              className="me-1"
                            />
                            Applied
                          </>
                        ) : (
                          "Apply Signature"
                        )}
                      </Button>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}

              {searchTerm && filteredEmployees.length === 0 && (
                <Alert variant="info">
                  No employees found matching your search.
                </Alert>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EmployeeSignatureGenerator;
