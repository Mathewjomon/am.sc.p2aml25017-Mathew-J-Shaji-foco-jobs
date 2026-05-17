import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';

const EmployerDashboard = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingApplicants, setLoadingApplicants] = useState(false);
  const [ratingData, setRatingData] = useState({});
  const [ratingMessage, setRatingMessage] = useState('');

  useEffect(() => {
    fetchMyJobs();
  }, []);

  const fetchMyJobs = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/jobs');
      const myJobs = res.data.filter(job => job.employer?._id === user?.id);
      setJobs(myJobs);
    } catch (err) {
      console.error('Error fetching jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchApplicants = async (jobId) => {
    setLoadingApplicants(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/applications/job/${jobId}`);
      setApplicants(res.data);
      setSelectedJob(jobId);
    } catch (err) {
      console.error('Error fetching applicants:', err);
    } finally {
      setLoadingApplicants(false);
    }
  };

  const updateStatus = async (appId, status) => {
    try {
      await axios.patch(`http://localhost:5000/api/applications/${appId}/status`, { status });
      setApplicants(applicants.map(a => a._id === appId ? { ...a, status } : a));
    } catch (err) {
      console.error('Error updating status:', err);
    }
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
      setRatingMessage('Rating submitted successfully!');
    } catch (err) {
      setRatingMessage(err.response?.data?.message || 'Rating failed');
    }
  };

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
    const icons = { pending: '⏳', accepted: '✅', rejected: '❌', completed: '🎉' };
    return icons[status] || '⏳';
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
        borderRadius: '20px',
        padding: '32px',
        marginBottom: '28px',
        color: '#fff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', marginBottom: '4px' }}>
            Employer Dashboard
          </p>
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#fff', marginBottom: '8px' }}>
            {user?.name} 🏢
          </h2>
          <span style={{
            background: 'rgba(29,158,117,0.3)',
            border: '1px solid rgba(29,158,117,0.5)',
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: '600',
            color: '#1D9E75'
          }}>
            ⭐ {user?.avgRating > 0 ? user.avgRating : 'New Employer'}
          </span>
        </div>
        <Link to="/employer/post-job">
          <button style={{
            background: '#1D9E75',
            color: '#fff',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '10px',
            fontWeight: '700',
            fontSize: '14px',
            cursor: 'pointer',
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            boxShadow: '0 4px 12px rgba(29,158,117,0.4)'
          }}>
            + Post a Job
          </button>
        </Link>
      </div>

      {/* Stats */}
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-value">{jobs.length}</div>
          <div className="stat-label">{t('activeJobs')}</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{applicants.length}</div>
          <div className="stat-label">{t('totalApplicants')}</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: '#F5A623' }}>
            ⭐ {user?.avgRating > 0 ? user.avgRating : 'New'}
          </div>
          <div className="stat-label">{t('rating')}</div>
        </div>
      </div>

      {/* Job Postings */}
      <h3 className="section-title">Your Job Postings</h3>

      {jobs.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '60px' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>📋</div>
          <h3 style={{ marginBottom: '8px' }}>No jobs posted yet</h3>
          <p style={{ color: '#888', fontSize: '14px', marginBottom: '20px' }}>
            Post your first job and find the right candidates
          </p>
          <Link to="/employer/post-job">
            <button className="btn btn-green" style={{ width: 'auto', padding: '12px 28px' }}>
              + Post a Job
            </button>
          </Link>
        </div>
      ) : (
        jobs.map(job => (
          <div key={job._id} className="card" style={{ padding: '22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: '#E1F5EE',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '22px'
                }}>
                  {job.category === 'Tech' ? '💻' :
                   job.category === 'Retail' ? '🛍️' :
                   job.category === 'Delivery' ? '🚚' :
                   job.category === 'Tutoring' ? '📚' :
                   job.category === 'Food & Hospitality' ? '🍽️' :
                   job.category === 'Events' ? '🎉' : '💼'}
                </div>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '4px' }}>
                    {job.title}
                  </h3>
                  <p style={{ fontSize: '13px', color: '#888' }}>
                    📍 {job.city} · 📁 {job.category} · 💰 ₹{job.salary}
                  </p>
                </div>
              </div>
              <button
                className="btn btn-outline"
                style={{ padding: '8px 18px', fontSize: '13px' }}
                onClick={() => selectedJob === job._id ? setSelectedJob(null) : fetchApplicants(job._id)}
              >
                {selectedJob === job._id ? 'Hide' : 'View Applicants'}
              </button>
            </div>

            {selectedJob === job._id && (
              <div style={{ marginTop: '20px', borderTop: '1px solid #f0f4f8', paddingTop: '20px' }}>
                <h4 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '14px' }}>
                  Applicants {applicants.length > 0 && `(${applicants.length})`}
                </h4>

                {loadingApplicants ? (
                  <p style={{ color: '#888', fontSize: '13px' }}>Loading applicants...</p>
                ) : applicants.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '32px', color: '#888' }}>
                    <div style={{ fontSize: '32px', marginBottom: '8px' }}>👥</div>
                    <p style={{ fontSize: '14px' }}>No applicants yet</p>
                  </div>
                ) : (
                  applicants.map(app => (
                    <div key={app._id} className="applicant-card">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                          <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #1D9E75, #0d7a5a)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#fff',
                            fontSize: '16px',
                            fontWeight: '700',
                            flexShrink: 0
                          }}>
                            {app.applicant?.name?.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p style={{ fontWeight: '700', fontSize: '14px', marginBottom: '2px' }}>
                              {app.applicant?.name}
                            </p>
                            <p style={{ fontSize: '12px', color: '#888' }}>
                              {app.applicant?.email} · {app.applicant?.city}
                            </p>
                            <p style={{ fontSize: '12px', color: '#555', marginTop: '4px' }}>
                              🛠️ {app.applicant?.skills || 'No skills listed'}
                            </p>
                            {app.applicant?.avgRating > 0 && (
                              <p style={{ fontSize: '12px', color: '#F5A623', marginTop: '2px' }}>
                                ⭐ {app.applicant.avgRating} ({app.applicant.ratingCount} reviews)
                              </p>
                            )}
                          </div>
                        </div>
                        <span className={`badge ${getStatusBadge(app.status)}`}>
                          {getStatusIcon(app.status)} {app.status}
                        </span>
                      </div>

                      {app.coverLetter && (
                        <div style={{
                          marginTop: '12px',
                          padding: '10px 14px',
                          background: '#fff',
                          borderRadius: '8px',
                          border: '1px solid #e8f0fe'
                        }}>
                          <p style={{ fontSize: '12px', color: '#666', fontStyle: 'italic' }}>
                            "{app.coverLetter}"
                          </p>
                        </div>
                      )}

                      <div style={{ display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
                        <button
                          className="btn"
                          style={{ background: '#E1F5EE', color: '#0F6E56', padding: '6px 14px', fontSize: '12px' }}
                          onClick={() => updateStatus(app._id, 'accepted')}
                        >
                          ✅ Accept
                        </button>
                        <button
                          className="btn"
                          style={{ background: '#FFEBEE', color: '#C62828', padding: '6px 14px', fontSize: '12px' }}
                          onClick={() => updateStatus(app._id, 'rejected')}
                        >
                          ❌ Reject
                        </button>
                        <button
                          className="btn"
                          style={{ background: '#E3F2FD', color: '#1565C0', padding: '6px 14px', fontSize: '12px' }}
                          onClick={() => updateStatus(app._id, 'completed')}
                        >
                          🎉 Mark Complete
                        </button>
                      </div>

                      {app.status === 'completed' && (
                        <div style={{
                          marginTop: '12px',
                          padding: '14px',
                          background: '#fff',
                          borderRadius: '10px',
                          border: '1px solid #e8f0fe'
                        }}>
                          <p style={{ fontSize: '13px', fontWeight: '700', marginBottom: '10px' }}>
                            ⭐ Rate this worker
                          </p>
                          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                            <select
                              style={{ fontSize: '13px', padding: '6px 10px', borderRadius: '8px', border: '1px solid #e0e0e0' }}
                              onChange={e => setRatingData({
                                ...ratingData,
                                [app.applicant._id]: { ...ratingData[app.applicant._id], score: e.target.value }
                              })}
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
                              style={{ fontSize: '13px', padding: '6px 10px', borderRadius: '8px', border: '1px solid #e0e0e0', flex: 1 }}
                              onChange={e => setRatingData({
                                ...ratingData,
                                [app.applicant._id]: { ...ratingData[app.applicant._id], comment: e.target.value }
                              })}
                            />
                            <button
                              className="btn"
                              style={{ background: '#1D9E75', color: '#fff', padding: '6px 14px', fontSize: '12px' }}
                              onClick={() => submitRating(app.applicant._id, job._id)}
                            >
                              Submit
                            </button>
                          </div>
                          {ratingMessage && (
                            <p className="success" style={{ marginTop: '8px' }}>{ratingMessage}</p>
                          )}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default EmployerDashboard;