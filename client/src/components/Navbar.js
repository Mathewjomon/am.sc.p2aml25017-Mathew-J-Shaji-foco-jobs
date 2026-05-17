import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ml' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  return (
    <div>
      <nav className="navbar">
        <Link to="/" className="navbar-logo">
          <div style={{
            width: '44px',
            height: '44px',
            background: '#fff',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '900',
            fontSize: '20px',
            color: '#C62828'
          }}>
            F
          </div>
          <div>
            <div style={{ fontSize: '18px', fontWeight: '700', lineHeight: '1.2' }}>
              Foco Jobs
            </div>
            <div style={{ fontSize: '11px', color: '#FFD700', fontWeight: '700', fontStyle: 'italic' }}>
              "The Spark of a Single Shift, The Fire of Worker's Independence."
            </div>
          </div>
        </Link>

        <div className="navbar-links">
          {(!user || user.role === 'seeker') && (
            <Link to="/jobs">{t('findJobs')}</Link>
          )}

          {!user && (
            <>
              <Link to="/login">{t('login')}</Link>
              <Link to="/register" className="btn-primary">{t('register')}</Link>
            </>
          )}

          {user && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(255,255,255,0.15)',
              padding: '5px 10px',
              borderRadius: '10px',
              marginRight: '4px'
            }}>
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#C62828',
                fontSize: '13px',
                fontWeight: '700'
              }}>
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#fff' }}>
                {user.name?.split(' ')[0]}
              </span>
            </div>
          )}

          {user && user.role === 'seeker' && (
            <>
              <Link to="/seeker/dashboard">{t('dashboard')}</Link>
              {!user.isVerified && (
                <Link to="/verify-otp" style={{
                  background: '#fff',
                  color: '#C62828',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: '700'
                }}>
                  ⚠️ Verify Email
                </Link>
              )}
            </>
          )}

          {user && user.role === 'employer' && (
            <>
              <Link to="/employer/dashboard">{t('dashboard')}</Link>
              <Link to="/employer/post-job" className="btn-primary">
                + {t('postJob')}
              </Link>
            </>
          )}

          {user && (
            <button
              onClick={handleLogout}
              style={{
                background: 'rgba(255,255,255,0.15)',
                border: '1px solid rgba(255,255,255,0.3)',
                padding: '7px 14px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: '600',
                color: '#fff',
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                transition: 'all 0.2s'
              }}
            >
              {t('logout')}
            </button>
          )}

          <button className="lang-toggle" onClick={toggleLanguage}>
            {i18n.language === 'en' ? 'മലയാളം' : 'English'}
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;