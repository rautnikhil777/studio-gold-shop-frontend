import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="navbar navbar-dark bg-primary shadow-sm fixed-top">
      <div className="container d-flex justify-content-between align-items-center">
        <Link className="navbar-brand fw-bold fs-4 ms-5" to="/">
          MYShopppp
        </Link>
        <div>
          <Link to="/" className="nav-link d-inline-block fw-semibold text-white px-2" style={{ fontSize: '0.9rem' }}>
            Home
          </Link>
          <Link to="/contact" className="nav-link d-inline-block fw-semibold text-white px-2" style={{ fontSize: '0.9rem' }}>
            Contact
          </Link>
          <Link to="/offers" className="nav-link d-inline-block fw-semibold text-white px-2" style={{ fontSize: '0.9rem' }}>
            Offers
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Header;
