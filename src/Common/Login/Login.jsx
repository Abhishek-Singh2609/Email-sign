import "./Login.css";
import Microsoftimg from "../../assets/Login/Microsoft_logo.svg.png";
import Fbimg from "../../assets/Login/fblogo.webp";
import { Link } from "react-router-dom";

function Login() {
  const handleMicrosoftLogin = () => {
    // Redirect to backend auth endpoint
    window.location.href =
      // "https://agile-email-signature-dydmacbfh4e6cmf0.canadacentral-01.azurewebsites.net/auth/login";
      "https://email-signature-ewasbjbvendvfwck.canadacentral-01.azurewebsites.net/auth/login";

    // Note: Removed the navigate("/employees") here as it was premature
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row login-container">
          <div className="col-md-12 d-flex justify-content-center align-items-center">
            <div className="login-box">
              <div className="login-left">
                <h1 className="login-title">Sign in to Agile Signature</h1>

                <button
                  onClick={handleMicrosoftLogin}
                  className="social-btn btn-google"
                >
                  <img
                    src={Microsoftimg}
                    alt="Microsoft logo"
                    className="me-2"
                    width="20"
                  />
                  Continue with Microsoft
                </button>

                <a href="#" className="social-btn btn-facebook">
                  <img src={Fbimg} alt="" className="me-2 fb-logo" width="20" />
                  Continue with Facebook
                </a>
                <a href="#" className="social-btn btn-sso">
                  Continue with SSO
                </a>

                <div className="divider">OR</div>

                <form>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                  />
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                  />
                  <Link to="/blockspage">
                    <button type="submit" className="btn btn-signin">
                      Sign in
                    </button>
                  </Link>
                </form>

                <div className="links">
                  <a href="#" className="text-color">
                    Forgot password?
                  </a>
                  <a href="#" className="text-color">
                    Create an account
                  </a>
                </div>

                <div className="terms">
                  By signing up you agree with our &nbsp;
                  <a href="#" className="text-color">
                    terms of service
                  </a>{" "}
                  & &nbsp;
                  <a href="#" className="text-color">
                    privacy policy
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
