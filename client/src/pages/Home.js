import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();

  return (
    <div>
      {/* Tagline Banner - Top of page */}
      <div style={{
        background: '#7f0000',
        textAlign: 'center',
        padding: '10px',
        marginBottom: '0',
        marginTop: '-32px',
        marginLeft: '-20px',
        marginRight: '-20px'
      }}>
        <p style={{
          fontWeight: '700',
          fontSize: '13px',
          color: '#FFD700',
          fontStyle: 'italic',
          letterSpacing: '0.5px'
        }}>
          "The Spark of a Single Shift, The Fire of Worker's Independence."
        </p>
      </div>

      {/* Hero Section */}
      <div className="hero" style={{ marginTop: '24px' }}>
        <h1>{t('welcome')}</h1>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
          <Link to="/jobs">
            <button style={{
              background: '#fff',
              color: '#C62828',
              border: 'none',
              padding: '13px 32px',
              borderRadius: '10px',
              fontWeight: '700',
              fontSize: '15px',
              cursor: 'pointer',
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              transition: 'all 0.2s',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}>
              {t('findJobs')} →
            </button>
          </Link>
          <Link to="/register">
            <button style={{
              background: 'rgba(255,255,255,0.15)',
              color: '#fff',
              border: '2px solid rgba(255,255,255,0.5)',
              padding: '13px 32px',
              borderRadius: '10px',
              fontWeight: '700',
              fontSize: '15px',
              cursor: 'pointer',
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              transition: 'all 0.2s'
            }}>
              {t('register')}
            </button>
          </Link>
        </div>

        {/* Stats inside hero */}
        <div style={{
          display: 'flex',
          gap: '32px',
          justifyContent: 'center',
          marginTop: '40px',
          position: 'relative',
          zIndex: 1
        }}>
          {[
            { value: '500+', label: 'Jobs Posted' },
            { value: '1200+', label: 'Job Seekers' },
            { value: '7', label: 'Kerala Cities' },
            { value: '98%', label: 'Verified Users' }
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: '700', color: '#fff' }}>{stat.value}</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.75)', marginTop: '2px' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Cards */}
      <h2 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '20px', color: '#1a1a2e' }}>
        Why Foco Jobs?
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '40px' }}>
        {[
          {
            icon: '📍',
            title: 'Hyperlocal Matching',
            desc: 'Find jobs within kilometers of your exact location — not just city level'
          },
          {
            icon: '🌐',
            title: 'Malayalam Support',
            desc: 'Full Malayalam language interface for local workers across Kerala'
          },
          {
            icon: '🎯',
            title: 'Skill Gap Feedback',
            desc: 'Get tips on exactly which skills you need to improve your chances'
          },
          {
            icon: '⭐',
            title: 'Trust Ratings',
            desc: 'Verified bidirectional ratings between seekers and employers'
          },
          {
            icon: '✉️',
            title: 'Email Verification',
            desc: 'OTP verified accounts ensure only real people apply for jobs'
          },
          {
            icon: '⚡',
            title: 'Instant Apply',
            desc: 'Apply for jobs in seconds with your saved profile and cover letter'
          }
        ].map((feature, i) => (
          <div key={i} className="feature-card">
            <span className="feature-icon">{feature.icon}</span>
            <h3>{feature.title}</h3>
            <p>{feature.desc}</p>
          </div>
        ))}
      </div>

      {/* How it works */}
      <div className="card" style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '24px', color: '#1a1a2e' }}>
          How it works
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
          {[
            { step: '01', title: 'Register', desc: 'Create your account as a job seeker or employer' },
            { step: '02', title: 'Verify', desc: 'Verify your email with OTP for a trusted profile' },
            { step: '03', title: 'Find', desc: 'Browse jobs near you filtered by city and category' },
            { step: '04', title: 'Apply', desc: 'Apply instantly and track your application status' }
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: '#FFEBEE',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '13px',
                fontWeight: '700',
                color: '#C62828',
                flexShrink: 0
              }}>
                {item.step}
              </div>
              <div>
                <h4 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '4px' }}>{item.title}</h4>
                <p style={{ fontSize: '13px', color: '#888', lineHeight: '1.5' }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #7f0000, #B71C1C)',
        borderRadius: '20px',
        padding: '40px',
        textAlign: 'center',
        color: '#fff'
      }}>
        <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '10px' }}>
          Ready to find your next job?
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '24px', fontSize: '15px' }}>
          Join thousands of workers finding flexible part-time work across Kerala
        </p>
        <Link to="/register">
          <button style={{
            background: '#fff',
            color: '#C62828',
            border: 'none',
            padding: '14px 36px',
            borderRadius: '10px',
            fontWeight: '700',
            fontSize: '15px',
            cursor: 'pointer',
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
          }}>
            Get Started Free →
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;