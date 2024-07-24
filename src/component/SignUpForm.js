import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFunctions } from '../useFunctions';
import Logo from '../assets/idea.png';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(fas);

function SignUpForm({ onSignInClick }) {
  const [formData, setFormData] = useState({
    role: '',  // Default role
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { signUp, loading, error } = useFunctions();
  const [formError, setFormError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(formData);
      // Optionally handle additional logic after successful sign-up
    } catch (err) {
      setFormError(err.response?.data || { general: 'An unexpected error occurred.' });
    }
  };

  return (
    <div className='form-wrapper sign-up'>
      <Link to='/' ><img src={Logo} alt='loding...' width={100} /></Link>
      <form onSubmit={handleSubmit}>
        <h2>Sign-Up</h2>
        <div className='switch-container'>
          <label className={`switch-label ${formData.role === 'investor' ? 'active' : ''}`}>
            <input
              type='radio'
              name='role'
              value='investor'
              checked={formData.role === 'investor'}
              onChange={handleChange}
            />
            Investor
          </label>
          <label className={`switch-label ${formData.role === 'entrepreneur' ? 'active' : ''}`}>
            <input
              type='radio'
              name='role'
              value='entrepreneur'
              checked={formData.role === 'entrepreneur'}
              onChange={handleChange}
            />
            Entrepreneur
          </label>
        </div>
        <div className='input-group'>
          <input
            type='text'
            name='fullName'
            id='SignUpFullName'
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <label htmlFor='SignUpFullName'><FontAwesomeIcon icon="fa-solid fa-user" />&nbsp;&nbsp; Full Name</label>
          {formError?.fullName && <span className="error-message">{formError.fullName}</span>}
        </div>
        <div className='input-group'>
          <input
            type='email'
            name='email'
            id='SignUpEmail'
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label htmlFor='SignUpEmail'><FontAwesomeIcon icon="fa-solid fa-envelope" />&nbsp;&nbsp; E-mail</label>
          {formError?.email && <span className="error-message">{formError.email}</span>}
        </div>
        <div className='input-group'>
          <input
            type='password'
            name='password'
            id='SignUpPassword'
            value={formData.password}
            onChange={handleChange}
            required
          />
          <label htmlFor='SignUpPassword'><FontAwesomeIcon icon="fa-solid fa-lock" />&nbsp;&nbsp; Password</label>
          {formError?.password && <span className="error-message">{formError.password}</span>}
        </div>
        <div className='input-group'>
          <input
            type='password'
            name='confirmPassword'
            id='SignUpConfirmPassword'
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <label htmlFor='SignUpConfirmPassword'><FontAwesomeIcon icon="fa-solid fa-lock" />&nbsp;&nbsp; Confirm Password</label>
          {formError?.confirmPassword && <span className="error-message">{formError.confirmPassword}</span>}
        </div>
     
        <button type='submit' className='MainButton' disabled={loading}>
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
        {formError?.general && <p className='error-message'>{formError.general}</p>}
        <div className='sign-link'>
          <p>Already have an account? <Link to='#' className='signIn-link' onClick={onSignInClick}>Sign In</Link></p>
        </div>
      </form>
    </div>
  );
}

export default SignUpForm;
