import React, { useState, useEffect, useCallback } from 'react';
import { X, Pen } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { closeStaffData } from '../../redux/staffDataSlice';
import { useFunctions } from '../../useFunctions';
import { toast } from 'react-toastify';

function EmployeeDataPopUp({ mode = 'Add', initialData = {} }) {
  const dispatch = useDispatch();
  const { createStaff, updateStaff } = useFunctions();

  const allPermissions = [
    'Manage Staff',
    'Manage Projects',
    'Schedule Meetings',
    'Manage Contracts',
    'Manage Support Requests',
    'Manage Users',
    'Manage Web & App',
    'Manage Advertisements',
  ];

  const roleOptions = ['Admin', 'Auditor', 'Cs', 'Employee'];

  const [formData, setFormData] = useState({
    fullName: initialData.fullName || '',
    userName: initialData.userName || '',
    email: initialData.email || '',
    phone: initialData.phone || '',
    role: initialData.role || 'Employee',
    password: '',
    confirmPassword: '',
    permissions: initialData.permissions || [],
  });
  const [status, setStatus] = useState(initialData.status || 'Inactive');
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    console.log('initialData received:', initialData); // Debug log
    if (mode === 'Edit' && initialData._id) {
      setFormData({
        fullName: initialData.fullName || '',
        userName: initialData.userName || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        role: initialData.role || 'Employee',
        password: '',
        confirmPassword: '',
        permissions: Array.isArray(initialData.permissions) ? initialData.permissions : [],
      });
      setStatus(initialData.status || 'Inactive');
    }
  }, [mode, initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePermissionChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      if (checked) {
        return { ...prev, permissions: [...prev.permissions, value] };
      } else {
        return { ...prev, permissions: prev.permissions.filter((perm) => perm !== value) };
      }
    });
  };

  const handleSelectAllChange = (e) => {
    const { checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      permissions: checked ? [...allPermissions] : [],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    const updatedData = {
      fullName: formData.fullName,
      username: formData.userName, // Map to backend field
      email: formData.email,
      phone: formData.phone,
      role: formData.role,
      ...(formData.password && { password: formData.password }),
      permissions: formData.permissions,
      status,
    };

    try {
      if (mode === 'Edit' && initialData._id) {
        await updateStaff(initialData._id, updatedData);
      } else {
        await createStaff(updatedData);
      }
      handleClose();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error(error.message || 'An error occurred while submitting the form.');
    }
  };

  const allPermissionsSelected = allPermissions.every((perm) =>
    formData.permissions.includes(perm)
  );

  const handleStatusToggle = () => {
    setStatus((prevStatus) => (prevStatus === 'Active' ? 'Inactive' : 'Active'));
  };

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setFormData({
        fullName: '',
        userName: '',
        email: '',
        phone: '',
        role: 'Employee',
        password: '',
        confirmPassword: '',
        permissions: [],
      });
      setStatus('Inactive');
      dispatch(closeStaffData());
      setIsClosing(false);
    }, 300);
  }, [dispatch]);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [handleClose]);

  return (
    <div className={`employee-popup ${isClosing ? 'closing' : ''}`} onClick={handleClose}>
      <form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
        <div className="employee-popup-body">
          <div className="employee-popup-header">
            <h2>{mode === 'Add' ? 'Add user' : 'Edit user'}</h2>
            <span className="close-btn" onClick={handleClose}>
              <X size={18} />
            </span>
          </div>
          <div className="employee-popup-content">
            <div className="employee-popup-left">
              <div className="employee-popup-avatar">
                <button className="employee-popup-avatar-edit">
                  <Pen size={15} />
                </button>
              </div>
              <div className="toggleStatusContainer" onClick={handleStatusToggle}>
                <div className={`toggleStatus ${status === 'Active' ? '' : 'active'}`}>
                  <span className="toggleCircle"></span>
                  <span className="toggleText">{status === 'Active' ? 'Active' : 'Inactive'}</span>
                </div>
              </div>
              <div className="form-grid">
                <label>
                  Full name:
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <label>
                  User name:
                  <input
                    type="text"
                    name="userName"
                    value={formData.userName}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <label>
                  Email:
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <label>
                  Phone:
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <label>
                  Password:
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required={mode === 'Add'}
                  />
                </label>
                <label>
                  Confirm Password:
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required={mode === 'Add'}
                  />
                </label>
                <label>
                  Role:
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    required
                  >
                    {roleOptions.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="employee-popup-actions">
                <button type="submit" className="btn btn-primary">
                  {mode === 'Add' ? 'Add' : 'Edit'}
                </button>
              </div>
            </div>
            <div className="employee-popup-right">
              <div className="permissions">
                <h3>Permissions</h3>
                <label className="permission-item">
                  <input
                    type="checkbox"
                    checked={allPermissionsSelected}
                    onChange={handleSelectAllChange}
                  />
                  All Permissions
                </label>
                {allPermissions.map((permission) => (
                  <label key={permission} className="permission-item">
                    <input
                      type="checkbox"
                      value={permission}
                      checked={formData.permissions.includes(permission)}
                      onChange={handlePermissionChange}
                    />
                    {permission}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EmployeeDataPopUp;