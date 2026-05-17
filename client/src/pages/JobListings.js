import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const JobListings = () => {
  const { t } = useTranslation();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState('');
  const [category, setCategory] = useState('');
  const [radius, setRadius] = useState(10000);
  const [coords, setCoords] = useState(null);
  const [useLocation, setUseLocation] = useState(false);
  const [locationStatus, setLocationStatus] = useState('');

  const fetchJobs = async (lat, lng) => {
    try {
      setLoading(true);
      let url = 'http://localhost:5000/api/jobs?';
      if (lat && lng) url += `lat=${lat}&lng=${lng}&radius=${radius}&`;
      if (city) url += `city=${city}&`;
      if (category) url += `category=${category}&`;
      const res = await axios.get(url);
      setJobs(res.data);
    } catch (err) {
      console.error('Error fetching jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleLocationSearch = () => {
    if (!navigator.geolocation) {
      setLocationStatus('Geolocation not supported');
      return;
    }
    setLocationStatus('Getting your location...');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setCoords({ lat: latitude, lng: longitude });
        setUseLocation(true);
        setLocationStatus(`Showing jobs within ${radius / 1000}km of your location`);
        fetchJobs(latitude, longitude);
      },
      () => setLocationStatus('Could not get location. Please allow location access.')
    );
  };

  const handleFilter = () => {
    if (useLocation && coords) {
      fetchJobs(coords.lat, coords.lng);
    } else {
      fetchJobs();
    }
  };

  const cities = ['Kochi', 'Thiruvananthapuram', 'Thrissur', 'Kozhikode', 'Kollam', 'Kannur', 'Palakkad'];
  const categories = ['Retail', 'Food & Hospitality', 'Delivery', 'Tutoring', 'Tech', 'Events', 'Other'];

  return (
    <div>
      {/* Page Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: '700', color: '#1a1a2e', marginBottom: '6px' }}>
          {t('findJobs')}
        </h1>
        <p style={{ color: '#888', fontSize: '14px' }}>
          {jobs.length} jobs available across Kerala
        </p>
      </div>

      {/* Filters */}
      <div className="filters">
        <select value={city} onChange={e => setCity(e.target.value)}>
          <option value="">🏙️ All Cities</option>
          {cities.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        <select value={category} onChange={e => setCategory(e.target.value)}>
          <option value="">📁 All Categories</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        <select value={radius} onChange={e => setRadius(e.target.value)}>
          <option value={5000}>📍 5 km</option>
          <option value={10000}>📍 10 km</option>
          <option value={20000}>📍 20 km</option>
          <option value={50000}>📍 50 km</option>
        </select>

        <button className="filter-btn" onClick={handleFilter}>
          Search
        </button>

        <button
          className="filter-btn"
          onClick={handleLocationSearch}
          style={{ background: '#1565C0' }}
        >
          📍 {t('nearMe')}
        </button>
      </div>

      {locationStatus && (
        <div style={{
          padding: '10px 16px',
          background: '#E3F2FD',
          borderRadius: '10px',
          marginBottom: '16px',
          fontSize: '13px',
          color: '#1565C0',
          fontWeight: '500'
        }}>
          📍 {locationStatus}
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '80px' }}>
          <div style={{ fontSize: '40px', marginBottom: '16px' }}>⏳</div>
          <p style={{ color: '#888' }}>Loading jobs...</p>
        </div>
      ) : jobs.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '60px' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
          <h3 style={{ marginBottom: '8px' }}>No jobs found</h3>
          <p style={{ color: '#888', fontSize: '14px' }}>Try changing your filters or search radius</p>
        </div>
      ) : (
        <div className="jobs-grid">
          {jobs.map(job => (
            <Link to={`/jobs/${job._id}`} key={job._id} className="job-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: '#E1F5EE',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  flexShrink: 0
                }}>
                  {job.category === 'Tech' ? '💻' :
                   job.category === 'Retail' ? '🛍️' :
                   job.category === 'Delivery' ? '🚚' :
                   job.category === 'Tutoring' ? '📚' :
                   job.category === 'Food & Hospitality' ? '🍽️' :
                   job.category === 'Events' ? '🎉' : '💼'}
                </div>
                <span className={`badge ${job.jobType === 'Gig' ? 'badge-orange' : 'badge-green'}`}>
                  {job.jobType}
                </span>
              </div>

              <h3 style={{ marginBottom: '4px' }}>{job.title}</h3>
              <p className="company">{job.company}</p>

              <div className="job-meta">
                <span>📍 {job.city}</span>
                <span>⏰ {job.hoursPerWeek} hrs/wk</span>
                <span>📁 {job.category}</span>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderTop: '1px solid #f0f4f8',
                paddingTop: '12px',
                marginTop: '4px'
              }}>
                <span style={{ fontWeight: '700', color: '#1D9E75', fontSize: '16px' }}>
                  ₹{job.salary}
                </span>
                {job.employer && (
                  <span style={{ fontSize: '12px', color: '#888', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ color: '#F5A623' }}>⭐</span>
                    {job.employer.avgRating > 0 ? job.employer.avgRating : 'New'}
                    {' · '}{job.employer.name}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobListings;