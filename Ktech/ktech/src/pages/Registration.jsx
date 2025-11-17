import { useState } from "react";
import "./Registration.css";

const Registration = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmited, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="page-container">
      <section className="registration-hero">
        <div className="container">
          <h1 className="page-title">Registration</h1>
          <p className="page-subtitle">
            Join KTech and start your learning journey today
          </p>
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
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstname">First name *</label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      value={FormData.firstName}
                      onChange={handleChange}
                      className={errors.firstName ? "errors" : ""}
                      placeholder="Enter your first name "
                    />
                    {errors.firstName && (
                      <span className="error-message">{errors.firstName}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="lastName">Last Name *</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={errors.lastName ? "error" : ""}
                      placeholder="Enter your last name"
                    />
                    {errors.lastName && (
                      <span className="error-message">{errors.lastName}</span>
                    )}
                  </div>

                  

                  <div className="form-group checkbox-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onChange={handleChange}
                        className={errors.agreeToTerms ? "error" : ""}
                      />
                      <span>
                        I agree to the <a href="#">Terms and Conditions</a> and{" "}
                        <a href="#">Privacy Policy</a> *
                      </span>
                    </label>
                    {errors.agreeToTerms && (
                      <span className="error-message">
                        {errors.agreeToTerms}
                      </span>
                    )}
                  </div>
                </div>
                <button type="submit" className="btn btn-primary btn-submit">
                  Register Now
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Registration;
