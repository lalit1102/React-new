import { useState } from "react";
import "./Registration.css";

const Registration = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    course: "",
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmited, setIsSubmitted] = useState(false);
  const [registrations, setRegistrations] = useState([]);

  const handleChange = (e) => {
    const { name, value,type,checked } = e.target;
   setFormData((prev) => ({
     ...prev,
     [name]: type === "checkbox" ? checked : value,
     
    }))
    
    console.log("New formData:", { ...formData, [name]: type === "checkbox" ? checked : value });
   
  };

    const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm password";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!formData.course) newErrors.course = "Course is required";
    if (!formData.agreeToTerms) newErrors.agreeToTerms = "You must agree to terms";
    return newErrors;
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setIsSubmitted(true);

    // Save registration
    setRegistrations((prev) => [
      ...prev,
      {
        ...formData,
        id: prev.length + 1,
        date: new Date().toLocaleString(),
      }
    ]);

    // Reset form fields after submit (optional)
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      course: "",
      agreeToTerms: false,
    });

    // Hide success message after 1 sec (optional)
    setTimeout(() => setIsSubmitted(false), 1000);
  };


  

  return (
    <>
    <div className="page-container">

      <section className="registration-hero">
        <div className="container">
          <h1 className="page-title">Registration</h1>
          <p className="page-subtitle"> Join KTech and start your learning journey today  </p>
        </div>
      </section>

      <section className="registration-section">

        <div className="container">
          <div className="registration-form-container">

            {isSubmited ? (

              <div className="success-message">
                <div className="success-icon"> ✓ </div>
                <h2>Registration Successfull</h2>
                <p>Thank you for registering. We'll contact you soon.</p>
              </div>

            ) : (
              <form className="registration-form" onSubmit={handlesubmit}>
                {/* 1st row firstname and lastName */}
                <div className="form-row">
                  {/* // first name */}
                  <div className="form-group">
                    <label htmlFor="firstname">First name *</label>
                    <input type="text" name="firstName" id="firstName" value={formData.firstName} onChange={handleChange} className={errors.firstName ? "errors" : ""} placeholder="Enter your first name "/>
                    {errors.firstName && (<span className="error-message">{errors.firstName}</span> )}
                  </div>
                  {/* lastName */}
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name *</label>
                    <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} className={errors.lastName ? "error" : ""} placeholder="Enter your last name" />
                    {errors.lastName && (<span className="error-message">{errors.lastName}</span>)}
                  </div>
                  </div>
                {/* 2nd row phone Number */}
                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input  type="tel"  id="phone"  name="phone"  value={formData.phone}  onChange={handleChange}  className={errors.phone ? "error" : ""}  placeholder="Enter your phone number" />
                  {errors.phone && (  <span className="error-message">{errors.phone}</span>)}
                </div>

                {/* 3rd row email  */}
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input  type="email"  id="email"  name="email"  value={formData.email}  onChange={handleChange}  className={errors.email ? "error" : ""} 
                    placeholder="Enter your email" />
                  {errors.email && (  <span className="error-message">{errors.email}</span> )}
                </div>

                {/* 4th row password and conform password */}

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="password">Password *</label>
                    <input  type="password"  id="password"  name="password"  value={formData.password}  onChange={handleChange}  className={errors.password ? "error" : ""}  placeholder="Create a password"/>
                    {errors.password && (  <span className="error-message">{errors.password}</span>)}
                  </div>


                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password *</label>
                    <input  type="password"  id="confirmPassword"  name="confirmPassword"  value={formData.confirmPassword}  onChange={handleChange}  className={errors.confirmPassword ? "error" : ""}  placeholder="Confirm your password"/>
                    {errors.confirmPassword && (<span className="error-message">  {errors.confirmPassword}</span>  )}
                  </div>
                </div>

                {/* 5th row in course */}
                <div className="form-group">
                  <label htmlFor="course">Select Course *</label>
                    <select  id="course"  name="course"  value={formData.course}  onChange={handleChange}  className={errors.course ? "error" : ""}>

                      <option value="">Choose a course</option>
                      <option value="react-fundamentals">React Fundamentals </option>
                      <option value="advanced-javascript">Advanced JavaScript</option>
                      <option value="full-stack">Full Stack Development</option>
                      <option value="ui-ux">UI/UX Design</option>
                      <option value="vuejs">Vue.js Mastery</option>
                      <option value="devops">DevOps & Deployment</option>

                    </select>
                  {errors.course && ( <span className="error-message">{errors.course}</span>  )}
                </div>
                {/* 6th row checkbox */}
                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input  type="checkbox"  name="agreeToTerms"  checked={formData.agreeToTerms}  onChange={handleChange}  className={errors.agreeToTerms ? "error" : ""}/>
                    <span>  I agree to the <a href="#">Terms and Conditions</a> and{" "}  <a href="#">Privacy Policy</a> * </span>
                  </label>
                  {errors.agreeToTerms && (  <span className="error-message">{errors.agreeToTerms}</span>)}
                </div>  
                
                <button type="submit" className="btn btn-primary btn-submit">Register Now</button>

              </form>
            )}
          </div>
        </div>
      </section>
    </div>

    <div>
              <table border={2}>
                <thead>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Course</th>
                  <th>Date</th>
                  <th>Actions</th>  
                </thead>
                <tbody>
                 {registrations.map((reg) => (
              <tr key={reg.id}>
                <td>{reg.id}</td>
                <td>{reg.firstName} {reg.lastName}</td>
                <td>{reg.email}</td>
                <td>{reg.phone}</td>
                <td>{reg.course}</td>
                <td>{reg.date}</td>
                <td>
                  {/* Example for future: Edit/Delete buttons */}
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
            ))}
            {registrations.length === 0 && (
              <tr>
                <td colSpan={7} style={{ textAlign: "center" }}>No registrations yet.</td>
              </tr>
            )}

                 
                </tbody>
              </table>
    </div>
    </>
  );
};


export default Registration;
