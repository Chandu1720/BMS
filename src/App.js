import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
  useLocation,
} from 'react-router-dom';
import Login from './components/Login';
import DueManager from './components/DueManager';
import Dashboard from './components/Dashboard';
import axios from 'axios';
import SupplierForm from './components/SupplierForm';
import SupplierList from './components/Suppliers';
import TopNav from './components/topNav';
import Signup from './components/Signup';
import BillList from './components/Bills';
import BillForm from './components/BillsForm';
import InvoiceForm from './components/InvoiceForm';
import InvoiceList from './components/Invoices';
import UserManagement from './components/UserManagement';

// ✅ SidebarLink — now safe to use useLocation
const SidebarLink = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link to={to} className="block w-full">
      <button
        className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
          isActive
            ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-600'
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
        }`}
      >
        {children}
      </button>
    </Link>
  );
};

// ✅ Authenticated App Shell — only rendered when logged in
const AuthenticatedApp = ({ suppliers, setSuppliers, invoices, setInvoices, bills, setBills, handleLogout }) => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg h-screen fixed left-0 top-0 overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">Business Manager</h1>
        </div>

        <nav className="p-4 space-y-2">
          <SidebarLink to="/">Dashboard</SidebarLink>
          <SidebarLink to="/suppliers">Suppliers</SidebarLink>
          <SidebarLink to="/invoices">Purchase Invoices</SidebarLink>
          <SidebarLink to="/bills">Customer Bills</SidebarLink>
          <SidebarLink to="/dues">Due Management</SidebarLink>
          <SidebarLink to="/users">User Management</SidebarLink>
        </nav>

        <div className="absolute bottom-0 w-64 p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-2 rounded-lg text-left text-red-600 hover:bg-red-50"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-64 min-h-screen bg-gray-50">
        <div className="p-4 border-b bg-white shadow-sm">
          <TopNav />
        </div>

        <main className="p-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route
              path="/suppliers"
              element={<SupplierList suppliers={suppliers} setSuppliers={setSuppliers} />}
            />
            <Route
              path="/suppliers/add"
              element={<SupplierForm suppliers={suppliers} setSuppliers={setSuppliers} />}
            />
            <Route
              path="/suppliers/edit/:id"
              element={<SupplierForm suppliers={suppliers} setSuppliers={setSuppliers} />}
            />
            <Route
              path="/invoices"
              element={<InvoiceList suppliers={suppliers} invoices={invoices} setInvoices={setInvoices} />}
            />
            <Route
              path="/invoices/add"
              element={<InvoiceForm suppliers={suppliers} invoices={invoices} setInvoices={setInvoices} />}
            />
            <Route
              path="/invoices/edit/:id"
              element={<InvoiceForm suppliers={suppliers} invoices={invoices} setInvoices={setInvoices} />}
            />
            <Route
              path="/bills"
              element={<BillList bills={bills} setBills={setBills} />}
            />
            <Route
              path="/bills/add"
              element={<BillForm bills={bills} setBills={setBills} />}
            />
            <Route
              path="/bills/edit/:id"
              element={<BillForm bills={bills} setBills={setBills} />}
            />
            <Route path="/dues" element={<DueManager />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

// ✅ Main App
const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [suppliers, setSuppliers] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [bills, setBills] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/suppliers')
      .then(response => {
        setSuppliers(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the suppliers!', error);
      });
  }, []);

  const handleSetToken = (token) => {
    localStorage.setItem('token', token);
    setToken(token);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <Router>
      {token ? (
        <AuthenticatedApp
          suppliers={suppliers}
          setSuppliers={setSuppliers}
          invoices={invoices}
          setInvoices={setInvoices}
          bills={bills}
          setBills={setBills}
          handleLogout={handleLogout}
        />
      ) : (
        <Routes>
          <Route path="/login" element={<Login setToken={handleSetToken} />} />
          <Route path="/signup" element={<Signup setToken={handleSetToken} />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </Router>
  );
};

export default App;