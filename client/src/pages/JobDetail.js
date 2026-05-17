import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';

const JobDetail = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [coverLetter, setCoverLetter] = useState('');
  const [applying, setApplying] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/jobs/${id}`);
        setJob(res.data);
      } catch (err) {
        console.error('Error fetching job:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const handleApply = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    setApplying(true);
    setError('');
    setMessage('');
    try {
      const res = await axios.post(
        `http://localhost:5000/api/applications/${id}`,
        { coverLetter }
      );
      setMessage('Application submitted successfully!');
      if (res.data.missingSkills && res.data.missingSkills.length > 0) {
        setMessage(
          `Application submitted! Your skill match score is ${res.data.skillGapScore}%. ` +
          `Consider adding: ${res.data.missingSkills.join(', ')}`
        );
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to apply. Please try again.');
    } finally {
      setApplying(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (!job) return <div className="card">Job not found.</div>;

  const categoryIcon = {
    'Tech': '💻', 'Retail': '🛍️', 'Delivery': '🚚',
    'Tutoring': '📚', 'Food & Hospitality': '🍽️', 'Events': '🎉'
  }[job.category] || '💼';

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto' }}>
      <button
        onClick={() => navigate('/jobs')}
        className="btn btn-outline"
        style={{ marginBottom: '20px', width: 'auto', padding: '8px 18px', fontSize: '13px' }}
      >
        ← {t('back')}
      </button>

      {/* Job Header Card */}
      <div className="card" style={{ padding: '28px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', marginBottom: '20px' }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '16px',
            background: '#E1F5EE',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '28px',
            flexShrink: 0
          }}>
            {categoryIcon}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h2 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '4px' }}>
                  {job.title}
                </h2>
                <p style={{ color: '#888', fontSize: '14px', fontWeight: '500' }}>
                  {job.company}
                </p>
              </div>
              <span className="badge badge-green">{job.jobType}</span>
            </div>
          </div>
        </div>

        {/* Job Meta */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '12px',
          marginBottom: '20px'
        }}>
          {[
            { icon: '📍', label: 'Location', value: job.city },
            { icon: '⏰', label: 'Hours', value: `${job.hoursPerWeek} hrs/week` },
            { icon: '📁', label: 'Category', value: job.category },
            { icon: '💰', label: 'Salary', value: `₹${job.salary}/mo` }
          ].map((item, i) => (
            <div key={i} style={{
              background: '#F0F4F8',
              borderRadius: '10px',
              padding: '12px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '18px', marginBottom: '4px' }}>{item.icon}</div>
              <div style={{ fontSize: '11px', color: '#888', marginBottom: '2px' }}>{item.label}</div>
              <div style={{ fontSize: '13px', fontWeight: '700', color: '#1a1a2e' }}>{item.value}</div>
            </div>
          ))}
        </div>

        {/* Employer Info */}
        {job.employer && (
          <div style={{
            background: '#F0F4F8',
            borderRadius: '12px',
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #1D9E75, #0d7a5a)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '14px',
                fontWeight: '700'
              }}>
                {job.employer.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <p style={{ fontSize: '13px', fontWeight: '700' }}>{job.employer.name}</p>
                <p style={{ fontSize: '11px', color: '#888' }}>{t('postedBy')}</p>
              </div>
            </div>
            {job.employer.avgRating > 0 && (
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '14px', color: '#F5A623', fontWeight: '700' }}>
                  ⭐ {job.employer.avgRating}
                </p>
                <p style={{ fontSize: '11px', color: '#888' }}>
                  {job.employer.ratingCount} reviews
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Description Card */}
      <div className="card" style={{ padding: '28px', marginBottom: '16px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '14px' }}>
          {t('description')}
        </h3>
        <p style={{ fontSize: '14px', color: '#555', lineHeight: '1.8' }}>
          {job.description}
        </p>
      </div>

      {/* Apply Card */}
      {user && user.role === 'seeker' && (
        <div className="card" style={{ padding: '28px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px' }}>
            {t('applyNow')}
          </h3>

          {!user.isVerified && (
            <div style={{
              background: '#FFF3E0',
              borderRadius: '10px',
              padding: '14px',
              marginBottom: '16px',
              border: '1px solid #FFE0B2'
            }}>
              <p style={{ color: '#E65100', fontSize: '13px', fontWeight: '600' }}>
                ⚠️ Please verify your email before applying.{' '}
                <span
                  style={{ textDecoration: 'underline', cursor: 'pointer' }}
                  onClick={() => navigate('/verify-otp')}
                >
                  Verify now →
                </span>
              </p>
            </div>
          )}

          <div className="form-group">
            <label>{t('coverLetter')}</label>
            <textarea
              placeholder="Tell the employer why you are a good fit for this role..."
              value={coverLetter}
              onChange={e => setCoverLetter(e.target.value)}
            />
          </div>

          {message && (
            <div className="skill-gap-box">
              <h4>💡 Application Status</h4>
              <p>{message}</p>
            </div>
          )}

          {error && <p className="error">{error}</p>}

          <button
            className="btn btn-green"
            onClick={handleApply}
            disabled={applying || !user.isVerified}
            style={{ marginTop: '12px' }}
          >
            {applying ? 'Submitting...' : `🚀 ${t('applyNow')}`}
          </button>
        </div>
      )}

      {!user && (
        <div className="card" style={{ padding: '32px', textAlign: 'center' }}>
          <div style={{ fontSize: '40px', marginBottom: '16px' }}>🔐</div>
          <h3 style={{ marginBottom: '8px' }}>Login to Apply</h3>
          <p style={{ color: '#888', fontSize: '14px', marginBottom: '20px' }}>
            Please log in to apply for this job
          </p>
          <button
            className="btn btn-green"
            onClick={() => navigate('/login')}
            style={{ width: 'auto', padding: '12px 32px' }}
          >
            {t('login')} to Apply →
          </button>
        </div>
      )}

      {user && user.role === 'employer' && (
        <div className="card" style={{
          padding: '24px',
          textAlign: 'center',
          background: '#FFF3E0',
          border: '1px solid #FFE0B2'
        }}>
          <p style={{ color: '#E65100', fontSize: '14px', fontWeight: '600' }}>
            🏢 You are logged in as an Employer. Employers cannot apply for jobs.
          </p>
        </div>
      )}
    </div>
  );
};

export default JobDetail;