import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './admin/context/AuthContext';
import ProtectedRoute from './admin/components/ProtectedRoute';
import Layout from './admin/components/Layout';

// Pages
import Login from './admin/pages/Login';
import Dashboard from './admin/pages/Dashboard';
import CustomerList from './admin/pages/customers/CustomerList';
import CustomerDetail from './admin/pages/customers/CustomerDetail';
import ProjectList from './admin/pages/projects/ProjectList';
import ProjectDetail from './admin/pages/projects/ProjectDetail';
import CreateProject from './admin/pages/projects/CreateProject';
import CreateCustomer from './admin/pages/customers/CreateCustomer';
import Settings from './admin/pages/Settings';
import Profile from './admin/pages/Profile';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/" element={
            <ProtectedRoute>
              <Layout>
                <Navigate to="/dashboard" replace />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          } />


          <Route path="/customers" element={
            <ProtectedRoute>
              <Layout>
                <CustomerList />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/customers/new" element={
            <ProtectedRoute>
              <Layout>
                <CreateCustomer />
              </Layout>
            </ProtectedRoute>
          } />


          <Route path="/customers/:customerId" element={
            <ProtectedRoute>
              <Layout>
                <CustomerDetail />
              </Layout>
            </ProtectedRoute>
          } />


          <Route path="/projects" element={
            <ProtectedRoute>
              <Layout>
                <ProjectList />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/projects/new" element={
            <ProtectedRoute>
              <Layout>
                <CreateProject />
              </Layout>
            </ProtectedRoute>
          } />


          <Route path="/projects/:projectId" element={
            <ProtectedRoute>
              <Layout>
                <ProjectDetail />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/settings" element={
            <ProtectedRoute>
              <Layout>
                <Settings />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/profile" element={
            <ProtectedRoute>
              <Layout>
                <Profile />
              </Layout>
            </ProtectedRoute>
          } />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
