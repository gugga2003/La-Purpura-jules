import React from 'react';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-surface-dark text-white p-4">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <nav>
          <ul>
            <li className="mb-2"><a href="#" className="hover:text-primary">Dashboard</a></li>
            <li className="mb-2"><a href="#" className="hover:text-primary">Users</a></li>
            <li className="mb-2"><a href="#" className="hover:text-primary">Settings</a></li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-6 bg-background-light dark:bg-background-dark">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
