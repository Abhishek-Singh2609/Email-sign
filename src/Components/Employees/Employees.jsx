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
  const [removingAll, setRemovingAll] = useState(false);
  const [removingEmployee, setRemovingEmployee] = useState(null);
  const [removingAllBanners, setRemovingAllBanners] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      const token = localStorage.getItem("accessToken");
      // if (!token) {
      //   alert("No token found. Please login.");
      //   window.location.href = "/login";
      //   return;
      // }

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

  const applySignature = (emp) => {
    setIsLoading(true);
    setSignatureApplied(emp.id);

    navigate("/edittemplate", {
      state: {
        email: emp.mail,
        organization: "Agile World Technologies LLC",
        mobilePhone: emp.mobilePhone,
        displayName: emp.displayName,
        jobTitle: emp.jobTitle,
        officeLocation: emp.officeLocation,
        isBulkApply: false, // Flag to indicate single apply
      },
    });

    setTimeout(() => {
      setIsLoading(false);
      setSignatureApplied(null);
    }, 1000);
  };

  const applyAllSignatures = () => {
    if (filteredEmployees.length === 0) {
      setError("No employees available to apply signatures");
      return;
    }

    setIsLoading(true);
    
    // Select all filtered employees
    setSelectedEmployees(filteredEmployees);
    
    // Navigate to edittemplate with bulk apply flag and selected employees
    navigate("/edittemplate", {
      state: {
        isBulkApply: true,
        selectedEmployees: filteredEmployees,
        organization: "Agile World Technologies LLC"
      },
    });

    setTimeout(() => {
      setIsLoading(false);
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

  const removeAllSignatures = async () => {
    setRemovingAll(true);
    try {
      const response = await axios.post(
        'https://email-signature-function-app.azurewebsites.net/api/RemoveSignature',
        {
          organization: "agileworldtechnologies.com"
        },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );
      if (response.status === 200) {
        alert("All signatures removed successfully!");
      }
    } catch (error) {
      console.error("Error removing all signatures:", error);
      setError("Failed to remove all signatures. Please try again later.");
    } finally {
      setRemovingAll(false);
    }
  };

  const removeSignature = async (employee) => {
    setRemovingEmployee(employee.id);
    try {
      const response = await axios.post(
        'https://email-signature-function-app.azurewebsites.net/api/RemoveSignature',
        {
          organization: "agileworldtechnologies.com",
          email: employee.mail
        },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );
      if (response.status === 200) {
        alert(`Signature removed successfully for ${employee.displayName}!`);
      }
    } catch (error) {
      console.error(`Error removing signature for ${employee.displayName}:`, error);
      setError(`Failed to remove signature for ${employee.displayName}. Please try again later.`);
    } finally {
      setRemovingEmployee(null);
    }
  };

  const removeAllBanners = async () => {
  setRemovingAllBanners(true);
  try {
    const response = await fetch(
      "https://email-signature-function-app.azurewebsites.net/api/RemoveBanner",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "removeAll",
          organization: "agileworldtechnologies.com",
        }),
      }
    );

    if (response.ok) {
      alert("All banners removed successfully!");
    } else {
      throw new Error("Failed to remove banners.");
    }
  } catch (error) {
    console.error("Error removing all banners:", error);
    setError("Failed to remove all banners. Please try again later.");
  } finally {
    setRemovingAllBanners(false);
  }
};


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
        <Col md={8} lg={7}>
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

              <div className="mb-3 d-flex justify-content-between align-items-center">
                <div>
                  <Button
                    variant="success"
                    onClick={applyAllSignatures}
                    disabled={isLoading || filteredEmployees.length === 0}
                    className="mb-2 me-2"
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
                      `Apply to All`
                    )}
                  </Button>
                  <Button
                    variant="danger"
                    onClick={removeAllSignatures}
                    disabled={removingAll}
                    className="mb-2 me-2"
                  >
                    {removingAll ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          className="me-2"
                        />
                        Removing...
                      </>
                    ) : (
                      'Remove All'
                    )}
                  </Button>
                   <Button
      variant="warning"
      onClick={removeAllBanners}
      disabled={removingAllBanners}
      className="mb-2"
    >
      {removingAllBanners ? (
        <>
          <Spinner as="span" animation="border" size="sm" role="status" className="me-2" />
          Removing...
        </>
      ) : (
        'Remove All Banner'
      )}
    </Button>
                </div>
                {selectedEmployees.length > 0 && (
                  <div className="small text-muted">
                    Selected:{" "}
                    {selectedEmployees
                      .slice(0, 3)
                      .map((e) => e.displayName)
                      .join(", ")}
                    {selectedEmployees.length > 3 && " and more..."}
                  </div>
                )}
              </div>

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
                      <div className="d-flex">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => applySignature(employee)}
                          disabled={isLoading || signatureApplied === employee.id}
                          className="me-2 signature-btn"
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
                              Applying
                            </>
                          ) : (
                            "Apply Signature"
                          )}
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => removeSignature(employee)}
                          disabled={removingEmployee === employee.id}
                          className="signature-btn"
                        >
                          {removingEmployee === employee.id ? (
                            <>
                              <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                className="me-1"
                              />
                              Removing
                            </>
                          ) : (
                            "Remove Signature"
                          )}
                        </Button>
                      </div>
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