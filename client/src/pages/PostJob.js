import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const PostJob = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    company: '',
    city: '',
    category: '',
    salary: '',
    hoursPerWeek: '',
    jobType: 'Part-time',
    coordinates: [0, 0]
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [locationStatus, setLocationStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus('Geolocation not supported');
      return;
    }
    setLocationStatus('Getting location...');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setFormData({
          ...formData,
          coordinates: [pos.coords.longitude, pos.coords.latitude]
        });
        setLocationStatus('Location captured successfully!');
      },
      () => setLocationStatus('Could not get location. Please allow location access.')
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/jobs', {
        ...formData,
        hoursPerWeek: parseInt(formData.hoursPerWeek)
      });
      navigate('/employer/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to post job. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const cities = ['Kochi', 'Thiruvananthapuram', 'Thrissur', 'Kozhikode', 'Kollam', 'Kannur', 'Palakkad'];
  const categories = ['Retail', 'Food & Hospitality', 'Delivery', 'Tutoring', 'Tech', 'Events', 'Other'];

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      {/* Header */}
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
          📝
        </div>
        <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '6px' }}>
          {t('postJob')}
        </h2>
        <p style={{ fontSize: '14px', color: '#888' }}>
          Reach thousands of part-time job seekers in Kerala
        </p>
      </div>

      <div className="card" style={{ padding: '32px' }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>{t('jobTitle')}</label>
            <input
              type="text"
              name="title"
              placeholder="e.g. Retail Sales Associate"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>{t('company')}</label>
            <input
              type="text"
              name="company"
              placeholder="Your business name"
              value={formData.company}
              onChange={handleChange}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label>{t('city')}</label>
              <select name="city" value={formData.city} onChange={handleChange} required>
                <option value="">Select city</option>
                {cities.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label>{t('category')}</label>
              <select name="category" value={formData.category} onChange={handleChange} required>
                <option value="">Select category</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label>{t('salary')} (₹/month)</label>
              <input
                type="text"
                name="salary"
                placeholder="12000"
                value={formData.salary}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>{t('hoursPerWeek')}</label>
              <input
                type="number"
                name="hoursPerWeek"
                placeholder="20"
                value={formData.hoursPerWeek}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Job Type</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
              {['Part-time', 'Gig', 'Weekend', 'Evening'].map(type => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFormData({ ...formData, jobType: type })}
                  style={{
                    padding: '9px',
                    borderRadius: '8px',
                    border: formData.jobType === type ? '2px solid #1D9E75' : '1.5px solid #e0e0e0',
                    background: formData.jobType === type ? '#E1F5EE' : '#fafafa',
                    color: formData.jobType === type ? '#0F6E56' : '#555',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '12px',
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    transition: 'all 0.2s'
                  }}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>{t('description')}</label>
            <textarea
              name="description"
              placeholder="Describe the role, requirements, responsibilities..."
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Job Location (for proximity search)</label>
            <div style={{
              padding: '16px',
              background: '#F0F4F8',
              borderRadius: '10px',
              display: 'flex',
              gap: '12px',
              alignItems: 'center'
            }}>
              <button
                type="button"
                className="btn btn-outline"
                style={{ padding: '8px 16px', whiteSpace: 'nowrap', fontSize: '13px' }}
                onClick={getLocation}
              >
                📍 Capture Location
              </button>
              <span style={{
                fontSize: '12px',
                color: formData.coordinates[0] !== 0 ? '#1D9E75' : '#888',
                fontWeight: formData.coordinates[0] !== 0 ? '600' : '400'
              }}>
                {locationStatus || 'Click to capture your job location for proximity search'}
              </span>
            </div>
          </div>

          {error && <p className="error">{error}</p>}

          <button
            type="submit"
            className="btn btn-green"
            disabled={loading}
            style={{ marginTop: '8px' }}
          >
            {loading ? 'Publishing...' : '🚀 Publish Job Listing'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostJob;