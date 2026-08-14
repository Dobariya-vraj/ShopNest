import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import '../styles/auth.css';

const VerifyEmail = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [email, setEmail] = useState(
        location.state?.email || ''
    );

    const [otp, setOtp] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('/api/auth/verify-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    otp
                })
            });

            const data = await res.json();

            if (res.ok) {
                alert('Email verified successfully!');
                navigate('/login');
            } else {
                alert(data.message);
            }

        } catch (error) {
            console.error(error);
            alert('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit} className="auth-form">

                <h2>Verify Email</h2>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength="6"
                    required
                />

                <button type="submit" className="btn">
                    Verify Email
                </button>

                <p>
                    Already verified?{' '}
                    <Link to="/login">Login</Link>
                </p>

            </form>
        </div>
    );
};

export default VerifyEmail;