import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';

const Register = () => {
  const { t } = useTranslation();
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'seeker',
    city: '',
    phone: '',
    skills: ''
  });
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
      const user = await register(formData);
      if (user.role === 'seeker') {
        navigate('/verify-otp');
      } else {
        navigate('/employer/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container" style={{ maxWidth: '520px' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{
          width: '56px',
          height: '56px',
          background: 'linear-gradient(135deg, #1D9E75, #0d7a5a)',
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px',
          fontSize: '24px'
        }}>
          👤
        </div>
        <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '6px' }}>
          Create an account
        </h2>
        <p style={{ fontSize: '14px', color: '#888' }}>
          Join thousands finding flexible work across Kerala
        </p>
      </div>

      <div className="card" style={{ padding: '32px' }}>
        {/* Role Toggle */}
        <div style={{ marginBottom: '24px' }}>
          <p style={{ fontSize: '13px', fontWeight: '600', color: '#444', marginBottom: '10px' }}>
            I am a...
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {['seeker', 'employer'].map(role => (
              <button
                key={role}
                type="button"
                onClick={() => setFormData({ ...formData, role })}
                style={{
                  padding: '12px',
                  borderRadius: '10px',
                  border: formData.role === role ? '2px solid #1D9E75' : '1.5px solid #e0e0e0',
                  background: formData.role === role ? '#E1F5EE' : '#fafafa',
                  color: formData.role === role ? '#0F6E56' : '#555',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '14px',
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  transition: 'all 0.2s'
                }}
              >
                {role === 'seeker' ? '👷 ' : '🏢 '}
                {role === 'seeker' ? t('seeker') : t('employer')}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group" style={{ marginBottom: '14px' }}>
              <label>{t('name')}</label>
              <input
                type="text"
                name="name"
                placeholder="Arjun Menon"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group" style={{ marginBottom: '14px' }}>
              <label>{t('phone')}</label>
              <input
                type="tel"
                name="phone"
                placeholder="+91 9876543210"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>{t('email')}</label>
            <input
              type="email"
              name="email"
              placeholder="arjun@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>{t('city')}</label>
            <select name="city" value={formData.city} onChange={handleChange} required>
              <option value="">Select your city</option>
              {['Kochi', 'Thiruvananthapuram', 'Thrissur', 'Kozhikode', 'Kollam', 'Kannur', 'Palakkad'].map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {formData.role === 'seeker' && (
            <div className="form-group">
              <label>{t('skills')} (comma separated)</label>
              <input
                type="text"
                name="skills"
                placeholder="React, Customer Service, Driving"
                value={formData.skills}
                onChange={handleChange}
              />
            </div>
          )}

          <div className="form-group">
            <label>{t('password')}</label>
            <input
              type="password"
              name="password"
              placeholder="Min 8 characters"
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
            {loading ? 'Creating account...' : 'Create Account →'}
          </button>
        </form>

        <div style={{
          textAlign: 'center',
          marginTop: '24px',
          paddingTop: '24px',
          borderTop: '1px solid #f0f0f0'
        }}>
          <p style={{ fontSize: '13px', color: '#888' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#1D9E75', fontWeight: '600' }}>
              {t('login')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;