import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const VerifyOTP = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleVerify = async () => {
    if (otp.length !== 6) {
      setError('Please enter a valid 6 digit OTP');
      return;
    }
    setLoading(true);
    setError('');
    setMessage('');
    try {
      await axios.post('http://localhost:5000/api/auth/verify-otp', { otp });
      setMessage('Email verified successfully!');
      setTimeout(() => navigate('/seeker/dashboard'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    setError('');
    setMessage('');
    try {
      await axios.post('http://localhost:5000/api/auth/resend-otp');
      setMessage('New OTP sent to your email!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to resend OTP.');
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="form-container">
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{
          width: '80px',
          height: '80px',
          background: 'linear-gradient(135deg, #1D9E75, #0d7a5a)',
          borderRadius: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px',
          fontSize: '36px'
        }}>
          📧
        </div>
        <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>
          Verify your email
        </h2>
        <p style={{ fontSize: '14px', color: '#888', marginBottom: '4px' }}>
          We sent a 6 digit OTP to
        </p>
        <p style={{ fontSize: '15px', color: '#1D9E75', fontWeight: '700' }}>
          {user?.email}
        </p>
      </div>

      <div className="card" style={{ padding: '32px' }}>
        <div className="form-group">
          <label style={{ textAlign: 'center', display: 'block' }}>
            Enter 6 digit OTP
          </label>
          <input
            type="text"
            placeholder="● ● ● ● ● ●"
            value={otp}
            onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
            className="otp-input"
            maxLength={6}
            style={{
              fontSize: '32px',
              textAlign: 'center',
              letterSpacing: '16px',
              fontWeight: '700',
              color: '#1D9E75',
              padding: '16px',
              background: '#F0F4F8',
              border: '2px solid #e0e0e0'
            }}
          />
        </div>

        {message && (
          <div style={{
            background: '#E1F5EE',
            borderRadius: '10px',
            padding: '14px',
            marginBottom: '16px',
            textAlign: 'center',
            border: '1px solid #1D9E75'
          }}>
            <p style={{ color: '#0F6E56', fontSize: '14px', fontWeight: '600' }}>
              ✅ {message}
            </p>
          </div>
        )}

        {error && <p className="error">{error}</p>}

        <button
          className="btn btn-green"
          onClick={handleVerify}
          disabled={loading || otp.length !== 6}
          style={{ marginBottom: '16px' }}
        >
          {loading ? 'Verifying...' : '✅ Verify Email'}
        </button>

        <div style={{
          textAlign: 'center',
          paddingTop: '16px',
          borderTop: '1px solid #f0f0f0'
        }}>
          <p style={{ fontSize: '13px', color: '#888', marginBottom: '10px' }}>
            Did not receive the OTP?
          </p>
          <button
            onClick={handleResend}
            disabled={resending}
            style={{
              background: 'none',
              border: '1.5px solid #1D9E75',
              color: '#1D9E75',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '700',
              padding: '8px 20px',
              borderRadius: '8px',
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              transition: 'all 0.2s'
            }}
          >
            {resending ? 'Sending...' : '🔄 Resend OTP'}
          </button>
        </div>
      </div>

      <div style={{
        marginTop: '16px',
        padding: '16px',
        background: '#FFF3E0',
        borderRadius: '12px',
        textAlign: 'center',
        border: '1px solid #FFE0B2'
      }}>
        <p style={{ fontSize: '13px', color: '#E65100', fontWeight: '600' }}>
          ⚠️ You must verify your email before applying for jobs
        </p>
      </div>

      <div style={{
        marginTop: '12px',
        padding: '14px',
        background: '#E3F2FD',
        borderRadius: '10px',
        textAlign: 'center'
      }}>
        <p style={{ fontSize: '12px', color: '#1565C0', fontWeight: '500' }}>
          💡 Check your spam folder if you don't see the email
        </p>
      </div>
    </div>
  );
};

export default VerifyOTP;