import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div style={{padding: '2rem'}}>
      <h1>Oh no, this page doesn't exist!</h1>
      <Link to="/" style={{fontWeight: 'bold', color: 'var(--dark-gray)'}}>
        Return home
      </Link>
    </div>
  );
};

export default ErrorPage;