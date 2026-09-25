import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './views/HomeView';
import { AboutView } from './views/AboutView';
import { IndustryView } from './views/IndustryView';
import { TechnologyView } from './views/TechnologyView';
import { EngineeringServicesView } from './views/EngineeringServicesView';
import { TrainingView } from './views/TrainingView';
import { StudentsView } from './views/StudentsView';
import { ResourcesView } from './views/ResourcesView';
import { ProjectsInternshipView } from './views/ProjectsInternshipView';
import { ContactView } from './views/ContactView';
import { RegistrationView } from './views/RegistrationView';
import { AdminView } from './views/AdminView';
import { AdminLoginView } from './views/AdminLoginView';
import { TermsOfServiceView } from './views/TermsOfServiceView';
import { PrivacyPolicyView } from './views/PrivacyPolicyView';
import { DynamicMenuGuideModal } from './components/DynamicMenuGuideModal';
import { CertificateVerificationModal } from './components/CertificateVerificationModal';
import { FloatingSupportWidgets } from './components/FloatingSupportWidgets';
import { updatePageSEO } from './utils/seoConfig';
import { pathToTab, getTabPath, AppNavTarget } from './utils/navigation';
import { UserRole, StudentRegistration, PaymentTransaction } from './types';

export default function App() {
  // Initialize tab directly from the browser URL (e.g. /about-us loads the About view directly)
  const [activeTab, setActiveTabState] = useState<AppNavTarget>(() => {
    return pathToTab(window.location.pathname);
  });
  const [activeRole, setActiveRole] = useState<UserRole>('public');
  const [adminUser, setAdminUser] = useState<{ name: string; email: string; role: string } | null>(null);
  const [guideModalOpen, setGuideModalOpen] = useState(false);
  const [certModalOpen, setCertModalOpen] = useState(false);
  const [preselectedCourseId, setPreselectedCourseId] = useState<string | undefined>();

  // Centralized navigation function that updates both state and URL in the address bar
  const handleNavigate = useCallback((target: AppNavTarget, pushState = true) => {
    setActiveTabState(target);
    const targetPath = getTabPath(target);
    if (pushState && window.location.pathname !== targetPath) {
      window.history.pushState({ tab: target }, '', targetPath);
    }
  }, []);

  // Listen to browser Back/Forward navigation buttons
  useEffect(() => {
    const handlePopState = () => {
      const tabFromUrl = pathToTab(window.location.pathname);
      setActiveTabState(tabFromUrl);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Sync initial URL if landing on normalized path (e.g. /about redirects to /about-us cleanly)
  useEffect(() => {
    const canonicalPath = getTabPath(activeTab);
    if (window.location.pathname !== canonicalPath && (window.location.pathname === '/' || window.location.pathname === '/home')) {
      // Keep root as is
    } else if (window.location.pathname !== canonicalPath && pathToTab(window.location.pathname) === activeTab) {
      window.history.replaceState({ tab: activeTab }, '', canonicalPath);
    }
  }, [activeTab]);

  // Scroll to top and update dynamic SEO / OpenGraph / Schema metadata upon tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    updatePageSEO(activeTab);
  }, [activeTab]);

  const handleStartRegistration = (courseId?: string) => {
    setPreselectedCourseId(courseId);
    handleNavigate('registration');
  };

  const handleRegistrationCompleted = (reg: StudentRegistration, payment: PaymentTransaction) => {
    setActiveRole('student');
    handleNavigate('students');
  };

  const handleAdminLoginSuccess = (user: { name: string; email: string; role: string }) => {
    setAdminUser(user);
    setActiveRole('admin');
    handleNavigate('admin-panel');
  };

  const handleAdminLogout = () => {
    setAdminUser(null);
    setActiveRole('public');
    handleNavigate('admin-login');
  };

  // If currently on admin-login, render the dedicated standalone responsive login screen
  if (activeTab === 'admin-login') {
    return (
      <AdminLoginView
        onLoginSuccess={handleAdminLoginSuccess}
        onBackToHome={() => handleNavigate('home')}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-800 antialiased selection:bg-teal-500/20 selection:text-[#0B2545]">
      {/* Top Dynamic Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleNavigate}
        activeRole={activeRole}
        setActiveRole={(role) => {
          setActiveRole(role);
          if (role === 'admin' && !adminUser) {
            handleNavigate('admin-login');
          } else if (role === 'admin') {
            handleNavigate('admin-panel');
          }
        }}
        adminSession={adminUser}
        onAdminLoginClick={() => handleNavigate('admin-login')}
        onAdminLogout={handleAdminLogout}
        onOpenGuide={() => setGuideModalOpen(true)}
        onOpenCertificateModal={() => setCertModalOpen(true)}
        onStartRegistration={handleStartRegistration}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomeView
            onNavigate={handleNavigate}
            onRegisterCourse={handleStartRegistration}
            onOpenGuide={() => setGuideModalOpen(true)}
            onVerifyCert={() => setCertModalOpen(true)}
          />
        )}

        {activeTab === 'about' && (
          <AboutView
            onNavigate={handleNavigate}
            onRegisterCourse={() => handleStartRegistration()}
          />
        )}

        {activeTab === 'industry' && (
          <IndustryView
            onRegisterTraining={handleStartRegistration}
            onNavigate={handleNavigate}
          />
        )}

        {activeTab === 'technology' && (
          <TechnologyView
            onRegisterCourse={() => handleStartRegistration()}
            onNavigate={handleNavigate}
          />
        )}

        {activeTab === 'engineering-services' && (
          <EngineeringServicesView />
        )}

        {activeTab === 'training' && (
          <TrainingView
            onRegisterCourse={handleStartRegistration}
            onNavigate={handleNavigate}
          />
        )}

        {activeTab === 'students' && (
          <StudentsView
            onVerifyCert={() => setCertModalOpen(true)}
            onOpenRegister={() => handleStartRegistration()}
          />
        )}

        {activeTab === 'resources' && (
          <ResourcesView />
        )}

        {activeTab === 'projects-internship' && (
          <ProjectsInternshipView />
        )}

        {activeTab === 'contact' && (
          <ContactView />
        )}

        {activeTab === 'terms-of-service' && (
          <TermsOfServiceView onNavigate={handleNavigate} />
        )}

        {activeTab === 'privacy-policy' && (
          <PrivacyPolicyView onNavigate={handleNavigate} />
        )}

        {activeTab === 'registration' && (
          <RegistrationView
            initialCourseId={preselectedCourseId}
            onComplete={handleRegistrationCompleted}
            onCancel={() => handleNavigate('training')}
          />
        )}

        {activeTab === 'admin-panel' && (
          adminUser ? (
            <AdminView
              adminUser={adminUser}
              onLogout={handleAdminLogout}
              onNavigateHome={() => handleNavigate('home')}
            />
          ) : (
            <AdminLoginView
              onLoginSuccess={handleAdminLoginSuccess}
              onBackToHome={() => handleNavigate('home')}
            />
          )
        )}
      </main>

      {/* Dynamic Navigation Architecture Guide Modal */}
      <DynamicMenuGuideModal
        isOpen={guideModalOpen}
        onClose={() => setGuideModalOpen(false)}
        activeRole={activeRole}
        onSelectRole={(r) => {
          setActiveRole(r);
          if (r === 'admin' && !adminUser) {
            handleNavigate('admin-login');
          }
        }}
      />

      {/* Certificate Verification Modal */}
      <CertificateVerificationModal
        isOpen={certModalOpen}
        onClose={() => setCertModalOpen(false)}
      />

      {/* Global Floating Actions: Direct Helpline (+91 9876543210) & Virtual Chatbot */}
      <FloatingSupportWidgets
        onNavigate={handleNavigate}
        onOpenCertificateModal={() => setCertModalOpen(true)}
        onStartRegistration={handleStartRegistration}
      />

      {/* Global Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenGuide={() => setGuideModalOpen(true)}
        onVerifyCert={() => setCertModalOpen(true)}
      />
    </div>
  );
}
