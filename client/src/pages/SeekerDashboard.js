import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';

const SeekerDashboard = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ratingData, setRatingData] = useState({});
  const [ratingMessages, setRatingMessages] = useState({});

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/applications/my/applications');
        setApplications(res.data);
      } catch (err) {
        console.error('Error fetching applications:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  const getStatusBadge = (status) => {
    const badges = {
      pending: 'badge-orange',
      accepted: 'badge-green',
      rejected: 'badge-red',
      completed: 'badge-blue'
    };
    return badges[status] || 'badge-orange';
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: '⏳',
      accepted: '✅',
      rejected: '❌',
      completed: '🎉'
    };
    return icons[status] || '⏳';
  };

  const submitRating = async (toUserId, jobId) => {
    const data = ratingData[toUserId];
    if (!data?.score) return;
    try {
      await axios.post(`http://localhost:5000/api/ratings/${toUserId}`, {
        score: parseInt(data.score),
        comment: data.comment || '',
        jobId
      });
      setRatingMessages(prev => ({
        ...prev,
        [toUserId]: 'Rating submitted successfully!'
      }));
    } catch (err) {
      setRatingMessages(prev => ({
        ...prev,
        [toUserId]: err.response?.data?.message || 'Rating failed. Try again.'
      }));
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1D9E75, #0d7a5a)',
        borderRadius: '20px',
        padding: '32px',
        marginBottom: '28px',
        color: '#fff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.75)', marginBottom: '4px' }}>
            Welcome back
          </p>
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#fff', marginBottom: '8px' }}>
            {user?.name} 👋
          </h2>
          {!user?.isVerified && (
            <Link to="/verify-otp" style={{
              display: 'inline-block',
              background: '#FFF3E0',
              color: '#E65100',
              padding: '6px 14px',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: '600',
              textDecoration: 'none'
            }}>
              ⚠️ Verify your email to apply for jobs
            </Link>
          )}
          {user?.isVerified && (
            <span style={{
              background: 'rgba(255,255,255,0.2)',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '600'
            }}>
              ✅ Verified Account
            </span>
          )}
        </div>
        <Link to="/jobs">
          <button style={{
            background: '#fff',
            color: '#1D9E75',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '10px',
            fontWeight: '700',
            fontSize: '14px',
            cursor: 'pointer',
            fontFamily: 'Plus Jakarta Sans, sans-serif'
          }}>
            Find Jobs →
          </button>
        </Link>
      </div>

      {/* Stats */}
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-value">{applications.length}</div>
          <div className="stat-label">Total Applied</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: '#E65100' }}>
            {applications.filter(a => a.status === 'pending').length}
          </div>
          <div className="stat-label">Pending</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: '#1D9E75' }}>
            {applications.filter(a => a.status === 'accepted').length}
          </div>
          <div className="stat-label">Accepted</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: '#1565C0' }}>
            {applications.filter(a => a.status === 'completed').length}
          </div>
          <div className="stat-label">Completed</div>
        </div>
      </div>

      {/* Applications */}
      <h3 className="section-title">{t('myApplications')}</h3>

      {applications.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '60px' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>📋</div>
          <h3 style={{ marginBottom: '8px', color: '#1a1a2e' }}>No applications yet</h3>
          <p style={{ color: '#888', fontSize: '14px', marginBottom: '20px' }}>
            Start applying for part-time jobs near you
          </p>
          <Link to="/jobs">
            <button className="btn btn-green" style={{ width: 'auto', padding: '12px 28px' }}>
              Browse Jobs →
            </button>
          </Link>
        </div>
      ) : (
        applications.map(app => (
          <div key={app._id} className="card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
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
                  💼
                </div>
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '3px' }}>
                    {app.job?.title}
                  </h3>
                  <p style={{ fontSize: '13px', color: '#888' }}>
                    {app.job?.company} · {app.job?.city}
                  </p>
                  <p style={{ fontSize: '13px', color: '#1D9E75', fontWeight: '600', marginTop: '4px' }}>
                    ₹{app.job?.salary}
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                <span className={`badge ${getStatusBadge(app.status)}`}>
                  {getStatusIcon(app.status)} {t(app.status)}
                </span>
                <span style={{ fontSize: '11px', color: '#aaa' }}>
                  {new Date(app.appliedAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Skill Gap Box */}
            {app.missingSkills && app.missingSkills.length > 0 && (
              <div className="skill-gap-box">
                <h4>💡 {t('skillGap')}: {app.skillGapScore}% match</h4>
                <p>{t('missingSkills')}: {app.missingSkills.join(', ')}</p>
              </div>
            )}

            {/* Rate Employer — only shown when job is completed */}
            {app.status === 'completed' && app.job?.employer && (
              <div style={{
                marginTop: '14px',
                padding: '16px',
                background: '#f5f7fa',
                borderRadius: '10px',
                border: '1px solid #e8f0fe'
              }}>
                <p style={{ fontSize: '13px', fontWeight: '700', marginBottom: '10px', color: '#1a1a2e' }}>
                  ⭐ Rate your employer — {app.job?.company}
                </p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                  <select
                    style={{
                      fontSize: '13px',
                      padding: '7px 10px',
                      borderRadius: '8px',
                      border: '1px solid #ddd',
                      background: '#fff'
                    }}
                    onChange={e => setRatingData(prev => ({
                      ...prev,
                      [app.job.employer]: {
                        ...prev[app.job.employer],
                        score: e.target.value
                      }
                    }))}
                  >
                    <option value="">Select rating</option>
                    <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
                    <option value="4">⭐⭐⭐⭐ Good</option>
                    <option value="3">⭐⭐⭐ Average</option>
                    <option value="2">⭐⭐ Below Average</option>
                    <option value="1">⭐ Poor</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Comment (optional)"
                    style={{
                      fontSize: '13px',
                      padding: '7px 10px',
                      borderRadius: '8px',
                      border: '1px solid #ddd',
                      flex: 1,
                      minWidth: '160px',
                      background: '#fff'
                    }}
                    onChange={e => setRatingData(prev => ({
                      ...prev,
                      [app.job.employer]: {
                        ...prev[app.job.employer],
                        comment: e.target.value
                      }
                    }))}
                  />
                  <button
                    className="btn btn-green"
                    style={{ width: 'auto', padding: '7px 16px', fontSize: '13px' }}
                    onClick={() => submitRating(app.job.employer, app.job._id)}
                  >
                    {t('submitRating')}
                  </button>
                </div>
                {ratingMessages[app.job.employer] && (
                  <p style={{
                    marginTop: '8px',
                    fontSize: '13px',
                    color: ratingMessages[app.job.employer].includes('success') ? '#1D9E75' : '#C62828',
                    fontWeight: '600'
                  }}>
                    {ratingMessages[app.job.employer]}
                  </p>
                )}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default SeekerDashboard;