import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const { t } = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await login(formData.email, formData.password);
      if (user.role === 'seeker') {
        navigate('/seeker/dashboard');
      } else {
        navigate('/employer/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <img
          src="/logo.png"
          alt="Foco Jobs"
          style={{
            width: '100px',
            height: '100px',
            objectFit: 'contain',
            margin: '0 auto 16px',
            display: 'block'
          }}
        />
        <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '6px' }}>
          Welcome back
        </h2>
        <p style={{ fontSize: '14px', color: '#888' }}>
          Log in to your Foco Jobs account
        </p>
      </div>

      <div className="card" style={{ padding: '32px' }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>{t('email')}</label>
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>{t('password')}</label>
            <input
              type="password"
              name="password"
              placeholder="Your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {error && <p className="error">{error}</p>}

          <button
            type="submit"
            className="btn btn-green"
            disabled={loading}
            style={{ marginTop: '8px' }}
          >
            {loading ? 'Logging in...' : t('login')}
          </button>
        </form>

        <div style={{
          textAlign: 'center',
          marginTop: '24px',
          paddingTop: '24px',
          borderTop: '1px solid #f0f0f0'
        }}>
          <p style={{ fontSize: '13px', color: '#888' }}>
            New here?{' '}
            <Link to="/register" style={{ color: '#C62828', fontWeight: '600' }}>
              Create an account
            </Link>
          </p>
        </div>
      </div>

      <div style={{
        marginTop: '16px',
        padding: '14px',
        background: '#FFEBEE',
        borderRadius: '10px',
        textAlign: 'center',
        border: '1px solid #FFCDD2'
      }}>
        <p style={{ fontSize: '12px', color: '#C62828', fontWeight: '500' }}>
          🔒 Your data is secure and encrypted
        </p>
      </div>
    </div>
  );
};

export default Login;