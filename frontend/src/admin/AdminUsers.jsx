import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const AdminUsers = () => {
  const { user } = useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // =============================
  // Fetch Users
  // =============================
  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await fetch('/api/auth/users', {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || 'Failed to load users');
        return;
      }

      setUsers(Array.isArray(data) ? data : []);

    } catch (error) {
      console.error(error);
      alert('Server error while loading users');
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (user?.token) {
      fetchUsers();
    }
  }, [user]);


  // =============================
  // Make User Admin
  // =============================
  const makeAdmin = async (userId) => {

    const confirmAdmin = window.confirm(
      'Are you sure you want to make this user an admin?'
    );

    if (!confirmAdmin) {
      return;
    }

    try {

      const res = await fetch(
        `/api/auth/users/${userId}/make-admin`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${user.token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || 'Failed to make user admin');
        return;
      }

      alert('User is now an admin!');

      fetchUsers();

    } catch (error) {
      console.error(error);
      alert('Server error while updating role');
    }
  };


  // =============================
  // Remove Admin
  // =============================
  const removeAdmin = async (userId) => {

    const confirmRemove = window.confirm(
      'Are you sure you want to remove admin access from this user?'
    );

    if (!confirmRemove) {
      return;
    }

    try {

      const res = await fetch(
        `/api/auth/users/${userId}/remove-admin`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${user.token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || 'Failed to remove admin');
        return;
      }

      alert('Admin role removed successfully!');

      fetchUsers();

    } catch (error) {
      console.error(error);
      alert('Server error while removing admin');
    }
  };


  return (
    <div style={containerStyle}>

      <h2
        style={{
          color: '#f97316',
          marginBottom: '20px'
        }}
      >
        User Directory
      </h2>

      {loading ? (

        <p>Loading users...</p>

      ) : (

        <div style={{ overflowX: 'auto' }}>

          <table style={tableStyle}>

            <thead>
              <tr style={rowStyle}>

                <th style={thStyle}>
                  ID
                </th>

                <th style={thStyle}>
                  NAME
                </th>

                <th style={thStyle}>
                  EMAIL
                </th>

                <th style={thStyle}>
                  ROLE
                </th>

                <th style={thStyle}>
                  JOINED
                </th>

                <th style={thStyle}>
                  ACTION
                </th>

              </tr>
            </thead>

            <tbody>

              {users.map((u) => (

                <tr
                  key={u._id}
                  style={rowStyle}
                >

                  {/* ID */}
                  <td style={tdStyle}>
                    {u._id.substring(0, 8)}...
                  </td>


                  {/* NAME */}
                  <td style={tdStyle}>
                    {u.name}
                  </td>


                  {/* EMAIL */}
                  <td style={tdStyle}>
                    {u.email}
                  </td>


                  {/* ROLE */}
                  <td style={tdStyle}>

                    <span
                      style={{
                        background:
                          u.role === 'admin'
                            ? 'rgba(234,88,12,0.2)'
                            : 'rgba(16,185,129,0.2)',

                        color:
                          u.role === 'admin'
                            ? '#f97316'
                            : '#10b981',

                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '0.85rem',
                        fontWeight: 'bold'
                      }}
                    >
                      {u.role?.toUpperCase()}
                    </span>

                  </td>


                  {/* JOINED */}
                  <td style={tdStyle}>

                    {u.createdAt
                      ? new Date(
                          u.createdAt
                        ).toLocaleDateString()
                      : '-'}

                  </td>


                  {/* ACTION */}
                  <td style={tdStyle}>

                    {u.role === 'admin' ? (

                      <button
                        onClick={() =>
                          removeAdmin(u._id)
                        }
                        style={removeAdminButtonStyle}
                      >
                        Remove Admin
                      </button>

                    ) : (

                      <button
                        onClick={() =>
                          makeAdmin(u._id)
                        }
                        style={adminButtonStyle}
                      >
                        Make Admin
                      </button>

                    )}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>
  );
};


// =============================
// Styles
// =============================

const containerStyle = {
  maxWidth: '1200px',
  margin: '40px auto',
  padding: '30px',
  background: '#18181b',
  borderRadius: '12px',
  border: '1px solid rgba(255,255,255,0.05)',
  color: '#fafafa'
};


const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse'
};


const rowStyle = {
  borderBottom: '1px solid rgba(255,255,255,0.1)'
};


const thStyle = {
  padding: '15px',
  textAlign: 'left',
  color: '#a1a1aa',
  fontSize: '0.9rem'
};


const tdStyle = {
  padding: '15px',
  textAlign: 'left'
};


const adminButtonStyle = {
  background: '#f97316',
  color: '#fff',
  border: 'none',
  padding: '9px 14px',
  borderRadius: '7px',
  cursor: 'pointer',
  fontWeight: '600'
};


const removeAdminButtonStyle = {
  background: '#dc2626',
  color: '#fff',
  border: 'none',
  padding: '9px 14px',
  borderRadius: '7px',
  cursor: 'pointer',
  fontWeight: '600'
};


export default AdminUsers;