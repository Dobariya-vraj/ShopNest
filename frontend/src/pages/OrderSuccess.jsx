import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const OrderSuccess = () => {
  const location = useLocation();

  const paymentMethod =
    location.state?.paymentMethod || 'ONLINE';

  const isCOD = paymentMethod === 'COD';

  const containerStyle = {
    maxWidth: '600px',
    margin: '50px auto',
    padding: '50px 30px',
    background: '#18181b',
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
    textAlign: 'center'
  };

  return (
    <div style={containerStyle}>

      <div
        style={{
          fontSize: '60px',
          marginBottom: '20px'
        }}
      >
        {isCOD ? '📦' : '✅'}
      </div>

      <h2
        style={{
          fontSize: '2.5rem',
          marginBottom: '20px',
          color: '#10b981'
        }}
      >
        {isCOD
          ? 'Order Placed Successfully!'
          : 'Payment Successful!'}
      </h2>

      <p
        style={{
          color: '#a1a1aa',
          fontSize: '1.2rem',
          marginBottom: '20px'
        }}
      >
        {isCOD
          ? 'Thank you for your order. Please pay the amount when your order is delivered.'
          : 'Thank you for your order. Your online payment has been successfully received.'}
      </p>

      <p
        style={{
          color: '#d4d4d8',
          marginBottom: '35px'
        }}
      >
        <strong>Payment Method:</strong>{' '}
        {isCOD
          ? 'Cash on Delivery'
          : 'Online Payment'}
      </p>

      <Link
        to="/shop"
        className="btn"
      >
        Continue Shopping
      </Link>

    </div>
  );
};

export default OrderSuccess;