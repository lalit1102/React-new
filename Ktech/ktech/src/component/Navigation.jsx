import { Link,useLocation} from "react-router-dom";
import "./Navigation.css";
const Navigation = () => {
  const location = useLocation()

 function isActive(path) {
  if (location.pathname === path) {
    return 'active';
  } else {
    return '';
  }
}  
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <Link to="/">KTech</Link>
        </div>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className={`nav-link ${isActive('/')}`}>Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className={`nav-link ${isActive('/about')}`}>About Us</Link>
          </li>
          <li className="nav-item">
            <Link to="/course" className={`nav-link ${isActive('/course')}`}>Course</Link>
          </li>
          <li className="nav-item">
            <Link to="/project" className={`nav-link ${isActive('/project')}`}>Project</Link>
          </li>
          <li className="nav-item">
            <Link to="/registration" className={`nav-link ${isActive('/registration')}`}>Registration</Link>
          </li>
          <li className="nav-item">
            <Link to="/reviews" className={`nav-link ${isActive('/reviews')}`}>Reviews</Link>
          </li>
          <li className="nav-item">
            <Link to="/ai-tools" className={`nav-link ${isActive('/ai-tools')}`}>AI Tools</Link>
          </li>
          <li className="nav-item">
            <Link to="/database" className={`nav-link ${isActive('/database')}`}>Database</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
