import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Logo from '../assets/idea.png';

function SignInFormFields({ formData, formError, backendError, loading, handleChange, handleSubmit, handleForgotPassword }) {
  return (
    <form className="sign-in-form" onSubmit={handleSubmit} method='post'>
      <Link to='/'><img src={Logo} alt='loading...' width={100} /></Link>
      <h2 className="title">Sign In</h2>
      {backendError && (
        <div className="error-box">
          <p className="error-message">{backendError}</p>
        </div>
      )}
      <div className="input-field">
        <FontAwesomeIcon icon="fa-solid fa-envelope" />
        <input
          type="email"
          placeholder="Email"
          name='email'
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      {formError.email && <span className='inputErrorMessage'>{formError.email}</span>}
      <div className="input-field">
        <FontAwesomeIcon icon="fa-solid fa-lock" />
        <input
          type="password"
          placeholder="Password"
          name='password'
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      {formError.password && <span className='inputErrorMessage'>{formError.password}</span>}
      <button type="submit" className="btn solid" disabled={loading}>
        {loading ? 'Signing in...' : 'Login'}
      </button>
      <p className="forgot-pass">
        <Link to="#" onClick={handleForgotPassword}>Forgot Password?</Link>
      </p>
      <p className="social-text">Or Sign in with social platforms</p>
      <div className="social-media">
        <Link to="#" className="social-icon">
          <FontAwesomeIcon icon={['fab', 'google']} />
        </Link>
        <Link to="#" className="social-icon">
          <FontAwesomeIcon icon={['fab', 'linkedin-in']} />
        </Link>
      </div>
    </form>
  );
}

export default SignInFormFields;
