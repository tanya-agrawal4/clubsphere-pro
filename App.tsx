
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import ApplyPage from './pages/ApplyPage';
import AdminPanel from './pages/AdminPanel';
import { User, UserRole } from './types';
import { CLUBS } from './constants';

type Page = 'landing' | 'login' | 'dashboard' | 'apply' | 'admin';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [selectedClubId, setSelectedClubId] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Session checks
    const savedEnrollment = localStorage.getItem('clubsphere_enrollment');
    if (savedEnrollment) {
      setUser({ enrollmentNo: savedEnrollment, isLoggedIn: true, role: 'student' });
    }

    const adminSession = sessionStorage.getItem('clubsphere_admin_token');
    if (adminSession === 'active_admin_session') {
      setUser({ isLoggedIn: true, role: 'admin' });
    }
  }, []);

  const handleStudentLogin = (enrollmentNo: string) => {
    localStorage.setItem('clubsphere_enrollment', enrollmentNo);
    setUser({ enrollmentNo, isLoggedIn: true, role: 'student' });
    setCurrentPage('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminLogin = () => {
    sessionStorage.setItem('clubsphere_admin_token', 'active_admin_session');
    setUser({ isLoggedIn: true, role: 'admin' });
    setCurrentPage('admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    localStorage.removeItem('clubsphere_enrollment');
    sessionStorage.removeItem('clubsphere_admin_token');
    setUser(null);
    setCurrentPage('landing');
  };

  const handleNavigate = (page: Page, clubId?: string) => {
    if (page === 'dashboard' && (!user || user.role !== 'student')) {
      setCurrentPage('login');
    } else if (page === 'admin' && (!user || user.role !== 'admin')) {
      setCurrentPage('login'); // Allow them to login as admin if not authorized
    } else if (page === 'apply') {
      if (!user || user.role !== 'student') {
        setCurrentPage('login');
      } else {
        setSelectedClubId(clubId || null);
        setCurrentPage('apply');
      }
    } else {
      setCurrentPage(page);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onGetStarted={() => handleNavigate('dashboard')} />;
      case 'login':
        return (
          <LoginPage 
            onStudentLogin={handleStudentLogin} 
            onAdminLogin={handleAdminLogin}
            onNavigateBack={() => setCurrentPage('landing')} 
          />
        );
      case 'dashboard':
        return <Dashboard onApply={(clubId) => handleNavigate('apply', clubId)} />;
      case 'apply':
        const club = CLUBS.find(c => c.id === selectedClubId);
        return club ? (
          <ApplyPage 
            club={club} 
            userEnrollment={user?.enrollmentNo || ''} 
            onSuccess={() => handleNavigate('dashboard')}
            onBack={() => handleNavigate('dashboard')}
          />
        ) : <Dashboard onApply={(clubId) => handleNavigate('apply', clubId)} />;
      case 'admin':
        return user?.role === 'admin' ? <AdminPanel /> : <LandingPage onGetStarted={() => handleNavigate('dashboard')} />;
      default:
        return <LandingPage onGetStarted={() => handleNavigate('dashboard')} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-indigo-500/30">
      {currentPage !== 'login' && (
        <Navbar 
          userEnrollment={user?.role === 'student' ? user.enrollmentNo : undefined} 
          onLogout={handleLogout} 
          onNavigate={handleNavigate}
        />
      )}
      
      <main className="flex-grow">
        {renderContent()}
      </main>

      {currentPage !== 'login' && currentPage !== 'admin' && (
        <Footer onSecretAdminTrigger={() => setCurrentPage('login')} />
      )}
    </div>
  );
};

export default App;
