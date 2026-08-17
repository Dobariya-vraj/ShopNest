import React from 'react';

const About = () => {
  const containerStyle = {
    maxWidth: '1100px',
    margin: '40px auto',
    padding: '20px',
    color: '#fff'
  };

  const cardStyle = {
    background: '#18181b',
    borderRadius: '16px',
    padding: '35px',
    marginBottom: '25px',
    border: '1px solid rgba(255,255,255,0.06)',
    boxShadow: '0 10px 35px rgba(0,0,0,0.35)'
  };

  const headingStyle = {
    fontSize: '2rem',
    color: '#f97316',
    marginBottom: '18px'
  };

  const textStyle = {
    color: '#a1a1aa',
    fontSize: '1.05rem',
    lineHeight: '1.8'
  };

  const featureStyle = {
    background: '#27272a',
    padding: '22px',
    borderRadius: '12px',
    border: '1px solid rgba(255,255,255,0.05)'
  };

  const techStyle = {
    display: 'inline-block',
    padding: '10px 18px',
    margin: '7px',
    borderRadius: '8px',
    background: '#27272a',
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#e4e4e7'
  };

  return (
    <div style={containerStyle}>

      {/* HERO */}
      <div
        style={{
          ...cardStyle,
          textAlign: 'center',
          padding: '55px 30px'
        }}
      >
        <div
          style={{
            fontSize: '70px',
            marginBottom: '15px'
          }}
        >
          🛒
        </div>

        <h1
          style={{
            fontSize: '3rem',
            marginBottom: '10px'
          }}
        >
          About ShopNest
        </h1>

        <h3
          style={{
            color: '#f97316',
            fontSize: '1.4rem',
            marginBottom: '20px'
          }}
        >
          Your Complete Online Shopping Platform
        </h3>

        <p
          style={{
            ...textStyle,
            maxWidth: '800px',
            margin: 'auto'
          }}
        >
          ShopNest is a modern full-stack e-commerce platform designed
          to provide a simple, secure and convenient online shopping
          experience. Customers can discover products, manage their
          shopping cart, place orders and choose between online payment
          and Cash on Delivery.
        </p>
      </div>


      {/* ABOUT SHOPNEST */}
      <div style={cardStyle}>
        <h2 style={headingStyle}>
          🛍️ What is ShopNest?
        </h2>

        <p style={textStyle}>
          ShopNest is an e-commerce web application that connects
          customers with a wide range of products through an easy-to-use
          online shopping interface.
        </p>

        <p style={textStyle}>
          The platform provides the complete shopping journey from
          product discovery to checkout and order placement. It includes
          user authentication, product management, shopping cart,
          checkout, payment processing and order management.
        </p>

        <p style={textStyle}>
          ShopNest is built with a focus on usability, security,
          responsive design and a smooth shopping experience.
        </p>
      </div>


      {/* SHOPPING EXPERIENCE */}
      <div style={cardStyle}>
        <h2 style={headingStyle}>
          ✨ Shopping Experience
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '18px'
          }}
        >

          <div style={featureStyle}>
            <h3>🔎 Discover Products</h3>
            <p style={textStyle}>
              Browse products and explore detailed product information
              before making a purchase.
            </p>
          </div>

          <div style={featureStyle}>
            <h3>🛒 Easy Cart Management</h3>
            <p style={textStyle}>
              Add products to your cart, change quantities and remove
              products whenever required.
            </p>
          </div>

          <div style={featureStyle}>
            <h3>📦 Simple Checkout</h3>
            <p style={textStyle}>
              Enter your shipping information and review your order
              before placing it.
            </p>
          </div>

          <div style={featureStyle}>
            <h3>⚡ Fast Ordering</h3>
            <p style={textStyle}>
              Complete the checkout process quickly with multiple
              payment options.
            </p>
          </div>

        </div>
      </div>


      {/* FEATURES */}
      <div style={cardStyle}>
        <h2 style={headingStyle}>
          🚀 ShopNest Features
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '18px'
          }}
        >

          <div style={featureStyle}>
            <h3>🔐 Secure Authentication</h3>
            <p style={textStyle}>
              Secure user registration and login with authentication
              and OTP verification.
            </p>
          </div>

          <div style={featureStyle}>
            <h3>👤 User Account</h3>
            <p style={textStyle}>
              Users can manage their account information and access
              their order history.
            </p>
          </div>

          <div style={featureStyle}>
            <h3>🛍️ Product Management</h3>
            <p style={textStyle}>
              Products can be created, updated, deleted and managed
              through the administration system.
            </p>
          </div>

          <div style={featureStyle}>
            <h3>🛒 Shopping Cart</h3>
            <p style={textStyle}>
              Customers can add products to the cart and manage
              quantities before checkout.
            </p>
          </div>

          <div style={featureStyle}>
            <h3>💳 Online Payment</h3>
            <p style={textStyle}>
              Razorpay integration provides an online payment option
              during checkout.
            </p>
          </div>

          <div style={featureStyle}>
            <h3>💵 Cash on Delivery</h3>
            <p style={textStyle}>
              Customers can choose Cash on Delivery when they do not
              want to pay online.
            </p>
          </div>

          <div style={featureStyle}>
            <h3>📦 Order Management</h3>
            <p style={textStyle}>
              Orders are stored and managed after successful checkout.
            </p>
          </div>

          <div style={featureStyle}>
            <h3>🛡️ Role-Based Access</h3>
            <p style={textStyle}>
              Different access levels are provided for customers and
              administrators.
            </p>
          </div>

        </div>
      </div>


      {/* PAYMENT */}
      <div style={cardStyle}>
        <h2 style={headingStyle}>
          💳 Payment Options
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px'
          }}
        >

          <div style={featureStyle}>
            <h3>💳 Online Payment</h3>

            <p style={textStyle}>
              ShopNest supports online payments through Razorpay.
              Customers can complete their payment securely during
              checkout.
            </p>
          </div>

          <div style={featureStyle}>
            <h3>💵 Cash on Delivery</h3>

            <p style={textStyle}>
              Customers can select Cash on Delivery and pay for their
              order when it is delivered.
            </p>
          </div>

        </div>
      </div>


      {/* SECURITY */}
      <div style={cardStyle}>
        <h2 style={headingStyle}>
          🔒 Security & Authentication
        </h2>

        <p style={textStyle}>
          ShopNest uses authentication mechanisms to protect user
          accounts and restrict access to authorized functionality.
        </p>

        <ul
          style={{
            color: '#a1a1aa',
            lineHeight: '2',
            fontSize: '1.05rem'
          }}
        >
          <li>User registration and login</li>
          <li>OTP verification</li>
          <li>Authenticated API requests</li>
          <li>Role-based access control</li>
          <li>Protected user and order information</li>
        </ul>
      </div>


      {/* TECHNOLOGY */}
      <div style={cardStyle}>
        <h2 style={headingStyle}>
          💻 Technology Behind ShopNest
        </h2>

        <p style={textStyle}>
          ShopNest is developed using modern full-stack web technologies
          to provide a responsive frontend, powerful backend APIs and
          reliable data management.
        </p>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>

          <span style={techStyle}>⚛️ React.js</span>

          <span style={techStyle}>🟢 Node.js</span>

          <span style={techStyle}>🚂 Express.js</span>

          <span style={techStyle}>🍃 MongoDB</span>

          <span style={techStyle}>🟨 JavaScript</span>

          <span style={techStyle}>🔄 Redux</span>

          <span style={techStyle}>🔑 JWT</span>

          <span style={techStyle}>💳 Razorpay</span>

          <span style={techStyle}>🧪 Postman</span>

          <span style={techStyle}>📦 Git</span>

        </div>
      </div>


      {/* ADMIN */}
      <div style={cardStyle}>
        <h2 style={headingStyle}>
          ⚙️ Administration
        </h2>

        <p style={textStyle}>
          ShopNest provides administration functionality for managing
          the e-commerce platform.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fit, minmax(230px, 1fr))',
            gap: '15px',
            marginTop: '20px'
          }}
        >

          <div style={featureStyle}>
            <h3>📦 Product Control</h3>
            <p style={textStyle}>
              Manage products and product information.
            </p>
          </div>

          <div style={featureStyle}>
            <h3>👥 User Management</h3>
            <p style={textStyle}>
              Manage users according to their assigned roles.
            </p>
          </div>

          <div style={featureStyle}>
            <h3>📋 Order Management</h3>
            <p style={textStyle}>
              View and manage customer orders.
            </p>
          </div>

        </div>
      </div>


      {/* ORDER PROCESS */}
      <div style={cardStyle}>
        <h2 style={headingStyle}>
          🔄 How ShopNest Works
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '15px'
          }}
        >

          <div style={featureStyle}>
            <h3>1️⃣ Login</h3>
            <p style={textStyle}>
              Customer creates an account or logs in.
            </p>
          </div>

          <div style={featureStyle}>
            <h3>2️⃣ Browse</h3>
            <p style={textStyle}>
              Customer explores available products.
            </p>
          </div>

          <div style={featureStyle}>
            <h3>3️⃣ Add to Cart</h3>
            <p style={textStyle}>
              Products are added to the shopping cart.
            </p>
          </div>

          <div style={featureStyle}>
            <h3>4️⃣ Checkout</h3>
            <p style={textStyle}>
              Customer provides shipping information.
            </p>
          </div>

          <div style={featureStyle}>
            <h3>5️⃣ Payment</h3>
            <p style={textStyle}>
              Online Payment or Cash on Delivery is selected.
            </p>
          </div>

          <div style={featureStyle}>
            <h3>6️⃣ Order</h3>
            <p style={textStyle}>
              The order is created and stored successfully.
            </p>
          </div>

        </div>
      </div>


      {/* WHY SHOPNEST */}
      <div
        style={{
          ...cardStyle,
          textAlign: 'center'
        }}
      >
        <h2 style={headingStyle}>
          ⭐ Why ShopNest?
        </h2>

        <p
          style={{
            ...textStyle,
            maxWidth: '800px',
            margin: 'auto'
          }}
        >
          ShopNest brings products, shopping cart management, secure
          authentication, flexible payment options and order management
          together in one complete e-commerce platform.
        </p>

        <div
          style={{
            marginTop: '30px',
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '12px'
          }}
        >
          <span style={techStyle}>🔐 Secure</span>
          <span style={techStyle}>⚡ Fast</span>
          <span style={techStyle}>🛒 Easy Shopping</span>
          <span style={techStyle}>💳 Multiple Payments</span>
          <span style={techStyle}>📦 Easy Ordering</span>
          <span style={techStyle}>📱 Responsive</span>
        </div>
      </div>


      {/* FOOTER */}
      <div
        style={{
          textAlign: 'center',
          padding: '20px',
          color: '#71717a'
        }}
      >
        <p>
          © {new Date().getFullYear()} ShopNest
        </p>

        <p>
          Your trusted online shopping platform.
        </p>
      </div>

    </div>
  );
};

export default About;