import React from 'react';
import { useAuth } from '../context/AuthContext';

const Admin: React.FC = () => {
  const { user } = useAuth();

  if (user?.role !== 'admin') {
    return <div>Access Denied</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid gap-4">
        {/* Add admin features here */}
        <div className="p-4 bg-white rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Users Management</h2>
          {/* Add user management UI here */}
        </div>
      </div>
    </div>
  );
};

export default Admin; 