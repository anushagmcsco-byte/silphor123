import React, { useState, useEffect } from 'react';
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
import { MainNavId, UserRole, StudentRegistration, PaymentTransaction } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<MainNavId | 'admin-panel' | 'admin-login' | 'registration'>('home');
  const [activeRole, setActiveRole] = useState<UserRole>('public');
  const [adminUser, setAdminUser] = useState<{ name: string; email: string; role: string } | null>(null);
  const [guideModalOpen, setGuideModalOpen] = useState(false);
  const [certModalOpen, setCertModalOpen] = useState(false);
  const [preselectedCourseId, setPreselectedCourseId] = useState<string | undefined>();

  // Scroll to top and update dynamic SEO / OpenGraph / Schema metadata upon tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    updatePageSEO(activeTab);
  }, [activeTab]);

  const handleStartRegistration = (courseId?: string) => {
    setPreselectedCourseId(courseId);
    setActiveTab('registration');
  };

  const handleRegistrationCompleted = (reg: StudentRegistration, payment: PaymentTransaction) => {
    setActiveRole('student');
    setActiveTab('students');
  };

  const handleAdminLoginSuccess = (user: { name: string; email: string; role: string }) => {
    setAdminUser(user);
    setActiveRole('admin');
    setActiveTab('admin-panel');
  };

  const handleAdminLogout = () => {
    setAdminUser(null);
    setActiveRole('public');
    setActiveTab('admin-login');
  };

  // If currently on admin-login, render the dedicated standalone responsive login screen
  if (activeTab === 'admin-login') {
    return (
      <AdminLoginView
        onLoginSuccess={handleAdminLoginSuccess}
        onBackToHome={() => setActiveTab('home')}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-800 antialiased selection:bg-teal-500/20 selection:text-[#0B2545]">
      {/* Top Dynamic Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeRole={activeRole}
        setActiveRole={(role) => {
          setActiveRole(role);
          if (role === 'admin' && !adminUser) {
            setActiveTab('admin-login');
          } else if (role === 'admin') {
            setActiveTab('admin-panel');
          }
        }}
        adminSession={adminUser}
        onAdminLoginClick={() => setActiveTab('admin-login')}
        onAdminLogout={handleAdminLogout}
        onOpenGuide={() => setGuideModalOpen(true)}
        onOpenCertificateModal={() => setCertModalOpen(true)}
        onStartRegistration={handleStartRegistration}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomeView
            onNavigate={setActiveTab}
            onRegisterCourse={handleStartRegistration}
            onOpenGuide={() => setGuideModalOpen(true)}
            onVerifyCert={() => setCertModalOpen(true)}
          />
        )}

        {activeTab === 'about' && (
          <AboutView
            onNavigate={setActiveTab}
            onRegisterCourse={() => handleStartRegistration()}
          />
        )}

        {activeTab === 'industry' && (
          <IndustryView
            onRegisterTraining={handleStartRegistration}
            onNavigate={setActiveTab}
          />
        )}

        {activeTab === 'technology' && (
          <TechnologyView
            onRegisterCourse={() => handleStartRegistration()}
            onNavigate={setActiveTab}
          />
        )}

        {activeTab === 'engineering-services' && (
          <EngineeringServicesView />
        )}

        {activeTab === 'training' && (
          <TrainingView
            onRegisterCourse={handleStartRegistration}
            onNavigate={setActiveTab}
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
          <TermsOfServiceView onNavigate={setActiveTab} />
        )}

        {activeTab === 'privacy-policy' && (
          <PrivacyPolicyView onNavigate={setActiveTab} />
        )}

        {activeTab === 'registration' && (
          <RegistrationView
            initialCourseId={preselectedCourseId}
            onComplete={handleRegistrationCompleted}
            onCancel={() => setActiveTab('training')}
          />
        )}

        {activeTab === 'admin-panel' && (
          adminUser ? (
            <AdminView
              adminUser={adminUser}
              onLogout={handleAdminLogout}
              onNavigateHome={() => setActiveTab('home')}
            />
          ) : (
            <AdminLoginView
              onLoginSuccess={handleAdminLoginSuccess}
              onBackToHome={() => setActiveTab('home')}
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
            setActiveTab('admin-login');
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
        onNavigate={setActiveTab}
        onOpenCertificateModal={() => setCertModalOpen(true)}
        onStartRegistration={handleStartRegistration}
      />

      {/* Global Footer */}
      <Footer
        onNavigate={setActiveTab}
        onOpenGuide={() => setGuideModalOpen(true)}
        onVerifyCert={() => setCertModalOpen(true)}
      />
    </div>
  );
}
