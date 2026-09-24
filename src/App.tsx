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
import { DynamicMenuGuideModal } from './components/DynamicMenuGuideModal';
import { CertificateVerificationModal } from './components/CertificateVerificationModal';
import { MainNavId, UserRole, StudentRegistration, PaymentTransaction } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<MainNavId | 'admin-panel' | 'registration'>('home');
  const [activeRole, setActiveRole] = useState<UserRole>('public');
  const [guideModalOpen, setGuideModalOpen] = useState(false);
  const [certModalOpen, setCertModalOpen] = useState(false);
  const [preselectedCourseId, setPreselectedCourseId] = useState<string | undefined>();

  // Scroll to top upon tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const handleStartRegistration = (courseId?: string) => {
    setPreselectedCourseId(courseId);
    setActiveTab('registration');
  };

  const handleRegistrationCompleted = (reg: StudentRegistration, payment: PaymentTransaction) => {
    // Automatically transition to students portal or show confirmed state
    setActiveRole('student');
    setActiveTab('students');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-800">
      {/* Top Dynamic Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeRole={activeRole}
        setActiveRole={setActiveRole}
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

        {activeTab === 'registration' && (
          <RegistrationView
            initialCourseId={preselectedCourseId}
            onComplete={handleRegistrationCompleted}
            onCancel={() => setActiveTab('training')}
          />
        )}

        {activeTab === 'admin-panel' && (
          <AdminView />
        )}
      </main>

      {/* Dynamic Navigation Architecture Guide Modal */}
      <DynamicMenuGuideModal
        isOpen={guideModalOpen}
        onClose={() => setGuideModalOpen(false)}
        activeRole={activeRole}
        onSelectRole={setActiveRole}
      />

      {/* Certificate Verification Modal */}
      <CertificateVerificationModal
        isOpen={certModalOpen}
        onClose={() => setCertModalOpen(false)}
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
