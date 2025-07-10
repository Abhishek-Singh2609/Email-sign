import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./Common/Footer/Footer";
import Home from "./Components/Home/Home";
import Demo from "./Common/DemoForm/Demo";
import Login from "./Common/Login/Login";
import BlocksPage from "./Components/Blocks-Page/BlocksPage";
import Navbar from "./Common/Navbar/Navbar";
import Trial from "./Components/TrialPage/Trial";
import EmailSignatureCreator from "./Components/EditTemplate/EmailSignature";
import SignaturePreview from "./Components/PreviewPage/SignaturePreview";
import SubscriptionPage from "./Components/Subscription/SubscriptionPage";
import Payment from "./Components/Payment/Payment";
import Employees from "./Components/Employees/Employees";
import OAuthCallback from "./Common/Login/OAuthCallback";
import UserGuide from "./Components/UserGuide/UserGuide";
import Dashboard from "./Components/Dasboard/Dashboard";
import SignatureAction from "./Components/SignatureActions/SignatureAction";
function App() {
  const location = useLocation();
  const hideLayout =
    location.pathname === "/login" || location.pathname === "/blockspage"; // Hide navbar & footer for preview page too

  return (
    <>
      {<Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/login" element={<Login />} />
        <Route path="/blockspage" element={<BlocksPage />} />
        <Route path="/trial" element={<Trial />} />
        <Route path="employees" element={<Employees />} />
        <Route path="/edittemplate" element={<EmailSignatureCreator />} />
        <Route path="/preview" element={<SignaturePreview />} />
        <Route path="/subscription" element={<SubscriptionPage />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/userguide" element={<UserGuide />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/oauth/callback" element={<OAuthCallback />} />
        <Route path="/signatureaction" element={<SignatureAction />} />
      </Routes>

      {!hideLayout && <Footer />}
      <ToastContainer />
    </>
  );
}

export default App;
