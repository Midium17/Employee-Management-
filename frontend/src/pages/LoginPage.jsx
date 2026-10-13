
import { Link } from "react-router-dom";
import "../App.css";

function LoginPage() {
  return (
    <section>
      <div className="page-heading">
        <div>
          <p className="eyebrow">ACCOUNT</p>
          <h1>Login</h1>
          <p className="subtitle">
            Sign-in functionality will be added in a later phase.
          </p>
        </div>
      </div>

      <div className="panel">
        <h2>Authentication not configured</h2>
        <p className="subtitle">
          This is currently a placeholder page. No credentials
          are being checked and no session is being created.
        </p>

        <Link to="/" className="primary-link">
          Return to dashboard
        </Link>
      </div>
    </section>
  );
}

export default LoginPage;
