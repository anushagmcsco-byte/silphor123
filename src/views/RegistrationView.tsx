import React, { useEffect, useState } from 'react';
import { 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  FileText, 
  CreditCard, 
  QrCode, 
  Upload, 
  Sparkles, 
  Printer, 
  Receipt, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  Clock,
  Send,
  GraduationCap,
  Users,
  Copy,
  KeyRound,
  ExternalLink,
  Briefcase
} from 'lucide-react';
import { Course, StudentRegistration, PaymentTransaction } from '../types';
import { MOCK_COURSES } from '../data/mockDatabase';
import { SilphorLogo } from '../components/SilphorLogo';
import { saveFormSubmission } from '../utils/formStorage';
import { sendRegistrationEmail } from '../utils/emailDelivery';
import { openRazorpayPayment, verifyRazorpayPayment } from '../utils/paymentService';
import {
  completeRegistrationEmailLink,
  hasRegistrationEmailLink,
  sendRegistrationEmailLink,
} from '../utils/firebaseAuth';
import { 
  dispatchStudentRegistrationEmail, 
  dispatchTrainerRegistrationEmail 
} from '../utils/emailService';

interface RegistrationViewProps {
  initialCourseId?: string;
  onComplete: (reg: StudentRegistration, payment: PaymentTransaction) => void;
  onCancel: () => void;
  onGoToRoleLogin?: (role: string, username?: string, password?: string) => void;
}

export const RegistrationView: React.FC<RegistrationViewProps> = ({
  initialCourseId,
  onComplete,
  onCancel,
  onGoToRoleLogin,
}) => {
  // Registration Type: Student Course Enrollment vs Industry Trainer Onboarding
  const [registrationType, setRegistrationType] = useState<'student' | 'trainer'>('student');
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Student credentials generated upon registration
  const [studentCreds, setStudentCreds] = useState<{ username: string; password: string } | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Trainer Registration Form State
  const [trainerName, setTrainerName] = useState('Dr. Rajesh Varma');
  const [trainerEmail, setTrainerEmail] = useState('rajesh.varma@cadence-alumni.com');
  const [trainerPhone, setTrainerPhone] = useState('+91 98451 98765');
  const [trainerDomain, setTrainerDomain] = useState('VLSI Physical Design & Cadence Innovus Flow');
  const [trainerExperience, setTrainerExperience] = useState('12+ Years (Lead / Staff Physical Design Engineer)');
  const [trainerOrg, setTrainerOrg] = useState('Cadence Design Systems / Ex-Qualcomm');
  const [trainerDegree, setTrainerDegree] = useState('M.Tech / MS in Microelectronics & VLSI');
  const [trainerMode, setTrainerMode] = useState('Weekend Hybrid Masterclasses');
  const [trainerBio, setTrainerBio] = useState('Expertise in 7nm FinFET physical synthesis, CTS skew optimization, and signoff timing closure.');
  const [trainerSubmitted, setTrainerSubmitted] = useState(false);
  const [trainerCreds, setTrainerCreds] = useState<{ username: string; password: string; facultyId: string } | null>(null);
  const [trainerSubmitting, setTrainerSubmitting] = useState(false);

  // Step 1: Course & Batch Selection
  const [selectedCourseId, setSelectedCourseId] = useState<string>(
    initialCourseId || MOCK_COURSES[0].id
  );
  const selectedCourse = MOCK_COURSES.find((c) => c.id === selectedCourseId) || MOCK_COURSES[0];
  const [selectedBatchId, setSelectedBatchId] = useState<string>(
    selectedCourse.upcomingBatches[0]?.id || ''
  );

  // Step 2: Personal & Academic Details
  const [fullName, setFullName] = useState('Ananya Sharma');
  const [email, setEmail] = useState('ananya.sharma@example.com');
  const [mobile, setMobile] = useState('+91 98450 12345');
  const [collegeOrCompany, setCollegeOrCompany] = useState('BMS College of Engineering, Bengaluru');
  const [highestDegree, setHighestDegree] = useState('B.E / B.Tech in ECE / EEE');
  const [graduationYear, setGraduationYear] = useState('2025');

  // Step 3: Verification & Document Upload
  const [emailLinkRecipient, setEmailLinkRecipient] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpSending, setOtpSending] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([
    'BTech_Provisional_Degree.pdf',
    'Aadhaar_National_ID.pdf'
  ]);

  // Step 4: Payment Gateway Configuration
  const [paymentOption, setPaymentOption] = useState<'full' | 'partial'>('full');
  const [promoCode, setPromoCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');
  const selectedGateway = 'Razorpay' as const;
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState(false);

  // Final Output
  const [finalRegistration, setFinalRegistration] = useState<StudentRegistration | null>(null);
  const [finalPayment, setFinalPayment] = useState<PaymentTransaction | null>(null);
  const [emailDeliveryError, setEmailDeliveryError] = useState('');

  useEffect(() => {
    if (!hasRegistrationEmailLink()) return;

    completeRegistrationEmailLink()
      .then((verifiedEmail) => {
        setEmailLinkRecipient(verifiedEmail);
        setOtpVerified(true);
        setOtpError('');
      })
      .catch((error) => {
        setOtpError(error instanceof Error ? error.message : 'Unable to verify the Firebase email link.');
      });
  }, []);

  const baseFee = selectedCourse.fee;
  const initialPayAmount = paymentOption === 'full' ? baseFee - discountAmount : Math.round(baseFee / 2);

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'VLSI2026') {
      setDiscountAmount(5000);
      setPromoMessage('Promo code VLSI2026 applied! ₹5,000 instant scholarship granted.');
    } else if (promoCode.trim().toUpperCase() === 'SEMICON50') {
      setDiscountAmount(4000);
      setPromoMessage('Promo code SEMICON50 applied! ₹4,000 instant discount granted.');
    } else {
      setDiscountAmount(0);
      setPromoMessage('Invalid or expired coupon code. Try "VLSI2026"');
    }
  };

  const handleSendOtp = async () => {
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setOtpError('Enter a valid student email address before requesting verification.');
      return false;
    }

    setOtpSending(true);
    setOtpError('');

    try {
      await sendRegistrationEmailLink(email.trim());
      setEmailLinkRecipient(email.trim());
      setOtpSent(true);
      setOtpVerified(false);
      return true;
    } catch (error) {
      setOtpSent(false);
      setOtpError(error instanceof Error ? error.message : 'Unable to send the Firebase verification link.');
      return false;
    } finally {
      setOtpSending(false);
    }
  };

  const handleExecutePayment = async () => {
    setPaymentProcessing(true);
    setPaymentError(false);

    try {
      const appNum = `SIL-2026-REG-${Math.floor(1000 + Math.random() * 9000)}`;
      const invNo = `INV-SIL-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const paymentResponse = await openRazorpayPayment({
        amount: initialPayAmount,
        receipt: appNum,
        name: fullName,
        email,
        phone: mobile,
        description: selectedCourse.title,
      });
      await verifyRazorpayPayment(paymentResponse);

      const newRegistration: StudentRegistration = {
        id: `reg-${Date.now()}`,
        applicationNumber: appNum,
        fullName,
        email,
        mobile,
        collegeOrCompany,
        courseId: selectedCourse.id,
        courseTitle: selectedCourse.title,
        batchId: selectedBatchId,
        batchName: selectedCourse.upcomingBatches.find(b => b.id === selectedBatchId)?.name || 'Standard Batch',
        status: 'Admitted',
        paymentStatus: paymentOption === 'full' ? 'Paid' : 'Partial',
        amountPaid: initialPayAmount,
        totalFee: baseFee - discountAmount,
        documentsUploaded: uploadedFiles,
        registrationDate: new Date().toISOString().split('T')[0],
        otpVerified: true,
      };

      const newPayment: PaymentTransaction = {
        id: `pay-${Date.now()}`,
        transactionId: paymentResponse.razorpay_payment_id,
        applicationNumber: appNum,
        studentName: fullName,
        courseTitle: selectedCourse.title,
        amount: initialPayAmount,
        gateway: selectedGateway,
        paymentMode: 'UPI',
        status: 'Success',
        invoiceNumber: invNo,
        discountApplied: discountAmount,
        promoCode: promoCode ? promoCode.toUpperCase() : undefined,
        date: new Date().toLocaleString(),
      };

      setFinalRegistration(newRegistration);
      setFinalPayment(newPayment);

      saveFormSubmission({
        id: appNum,
        pageSource: 'registration',
        pageLabel: 'Registration & Admissions',
        formTitle: 'Course Enrolment Application',
        senderName: fullName,
        senderEmail: email,
        senderPhone: mobile,
        organizationOrCollege: collegeOrCompany,
        subject: `Enrolment: ${selectedCourse.title} (${selectedCourse.upcomingBatches.find(b => b.id === selectedBatchId)?.name || 'Standard Batch'})`,
        message: `Student enrolled in ${selectedCourse.title}. Highest qualification: ${highestDegree} (${graduationYear}). Deposit paid: ₹${initialPayAmount.toLocaleString()}.`,
        formData: {
          applicationNumber: appNum,
          courseId: selectedCourse.id,
          courseTitle: selectedCourse.title,
          batchId: selectedBatchId,
          batchName: selectedCourse.upcomingBatches.find(b => b.id === selectedBatchId)?.name || 'Standard Batch',
          degree: highestDegree,
          graduationYear,
          collegeOrCompany,
          initialPayAmount,
          totalFee: baseFee - discountAmount,
          paymentStatus: paymentOption === 'full' ? 'Paid' : 'Partial',
          transactionId: paymentResponse.razorpay_payment_id,
          gateway: selectedGateway,
          documentsUploaded: uploadedFiles,
          submittedAt: new Date().toISOString(),
        },
        status: 'In Review',
        priority: 'High',
        notes: `Admissions application verified with OTP. Advance ₹${initialPayAmount} confirmed via ${selectedGateway}.`,
      });

      // Credentials are dispatched only after the payment is confirmed successful.
      const batchObj = selectedCourse.upcomingBatches.find(b => b.id === selectedBatchId);
      const batchName = batchObj?.name || 'Standard Batch';

      const { username, password, emailPayload } = dispatchStudentRegistrationEmail({
        fullName,
        email,
        courseTitle: selectedCourse.title,
        batchName,
        applicationNumber: appNum,
        amountPaid: initialPayAmount,
        totalFee: baseFee - discountAmount,
      });

      setEmailDeliveryError('');
      try {
        await sendRegistrationEmail(emailPayload);
      } catch (error) {
        console.error('Student registration email failed:', error);
        setEmailDeliveryError(error instanceof Error ? error.message : 'The student email could not be sent.');
      }

      setStudentCreds({ username, password });
      setStep(5);
    } catch (error) {
      setPaymentError(true);
      console.error('Payment failed:', error);
    } finally {
      setPaymentProcessing(false);
    }
  };

  const handleTrainerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTrainerSubmitting(true);

    setTimeout(() => {
      setTrainerSubmitting(false);
      const { username, password, emailPayload } = dispatchTrainerRegistrationEmail({
        fullName: trainerName,
        email: trainerEmail,
        phone: trainerPhone,
        domain: trainerDomain,
        experienceYears: trainerExperience,
        organization: trainerOrg,
      });

      const facultyId = (emailPayload.metadata?.facultyId as string) || `SIL-FAC-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      setTrainerCreds({ username, password, facultyId });
      setTrainerSubmitted(true);

      saveFormSubmission({
        id: facultyId,
        pageSource: 'registration',
        pageLabel: 'Faculty & Trainer Onboarding',
        formTitle: 'Industry Trainer Registration Application',
        senderName: trainerName,
        senderEmail: trainerEmail,
        senderPhone: trainerPhone,
        organizationOrCollege: trainerOrg,
        subject: `Trainer Application: ${trainerName} - ${trainerDomain}`,
        message: `Trainer registered for domain: ${trainerDomain}. Experience: ${trainerExperience}. Affiliation: ${trainerOrg}. Teaching mode: ${trainerMode}.`,
        formData: {
          facultyId,
          domain: trainerDomain,
          experience: trainerExperience,
          organization: trainerOrg,
          degree: trainerDegree,
          teachingMode: trainerMode,
          bio: trainerBio,
          submittedAt: new Date().toISOString()
        },
        status: 'In Review',
        priority: 'High',
        notes: `Faculty onboarding registered. Credentials dispatched via email to ${trainerEmail}.`
      });
    }, 1200);
  };

  const handleCopyText = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto my-8 px-4">
      {/* Header card */}
      <div className="bg-[#0B2545] rounded-2xl p-6 md:p-8 text-white mb-6 border border-[#00828A]/40 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#38BDF8] uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#00828A]" />
              <span>Official Academic & Faculty Directorate</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight font-display text-white">
              {registrationType === 'student'
                ? 'Online Student Registration & Course Enrollment'
                : 'Industry Trainer & Faculty Onboarding'}
            </h1>
            <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-2xl">
              {registrationType === 'student'
                ? 'Apply for tier-1 industrial semiconductor and VLSI engineering training with instant automated credentials delivery.'
                : 'Join our faculty roster to mentor emerging chip designers, conduct tapeout workshops, and deliver corporate bootcamps.'}
            </p>
          </div>
          <button
            onClick={onCancel}
            className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 rounded-lg border border-slate-700 cursor-pointer"
          >
            Back to Catalog
          </button>
        </div>

        {/* Role Mode Switcher: Student vs Trainer */}
        <div className="flex bg-slate-900/80 p-1.5 rounded-xl border border-slate-700/80 mt-6 max-w-md">
          <button
            type="button"
            onClick={() => setRegistrationType('student')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              registrationType === 'student'
                ? 'bg-[#00828A] text-white shadow-xs'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Student Enrollment</span>
          </button>
          <button
            type="button"
            onClick={() => setRegistrationType('trainer')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              registrationType === 'trainer'
                ? 'bg-[#00828A] text-white shadow-xs'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Trainer / Faculty Registration</span>
          </button>
        </div>

        {/* Student Step Indicator (Only when student mode) */}
        {registrationType === 'student' && (
          <div className="grid grid-cols-5 gap-2 mt-6 pt-6 border-t border-slate-700/60">
            {[
              { num: 1, label: 'Course' },
              { num: 2, label: 'Profile' },
              { num: 3, label: 'Docs & Email' },
              { num: 4, label: 'Payment' },
              { num: 5, label: 'Receipt' },
            ].map((s) => (
              <div key={s.num} className="text-center">
                <div
                  className={`w-7 h-7 mx-auto rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    step === s.num
                      ? 'bg-[#00828A] text-white ring-4 ring-teal-500/20'
                      : step > s.num
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {step > s.num ? <Check className="w-3.5 h-3.5" /> : s.num}
                </div>
                <span className="text-[11px] font-medium text-slate-300 block mt-1">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
        {/* ===================== TRAINER REGISTRATION FLOW ===================== */}
        {registrationType === 'trainer' && (
          <div>
            {!trainerSubmitted ? (
              <form onSubmit={handleTrainerSubmit} className="space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-[#0B2545] flex items-center gap-2">
                    <Users className="w-5 h-5 text-[#00828A]" />
                    <span>Industry Trainer & Faculty Onboarding Application</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Upon submission, your faculty profile will be registered and an automated credentials email with your username and initial password will be sent to your inbox.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Full Legal Name & Title
                    </label>
                    <input
                      type="text"
                      required
                      value={trainerName}
                      onChange={(e) => setTrainerName(e.target.value)}
                      placeholder="e.g. Dr. Rajesh Varma / Prof. Anita Sen"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#00828A]"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Professional Email Address (Credentials will be sent here)
                    </label>
                    <input
                      type="email"
                      required
                      value={trainerEmail}
                      onChange={(e) => setTrainerEmail(e.target.value)}
                      placeholder="e.g. rajesh.varma@cadence.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#00828A]"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Contact / WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={trainerPhone}
                      onChange={(e) => setTrainerPhone(e.target.value)}
                      placeholder="+91 98451 98765"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#00828A]"
                    />
                  </div>

                  {/* Specialization Domain */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Instruction Domain / Primary Subject
                    </label>
                    <select
                      value={trainerDomain}
                      onChange={(e) => setTrainerDomain(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#00828A] bg-white"
                    >
                      <option value="VLSI Physical Design & Cadence Innovus Flow">VLSI Physical Design & Innovus Flow</option>
                      <option value="RTL Design, Verilog & UVM Verification">RTL Design, Verilog & UVM Verification</option>
                      <option value="Semiconductor Fabrication, Cleanroom & PDKs">Semiconductor Fabrication & PDKs</option>
                      <option value="High-Speed Multi-Layer PCB Design">High-Speed Multi-Layer PCB Design</option>
                      <option value="Embedded Systems, RTOS & ARM Cortex">Embedded Systems, RTOS & ARM Cortex</option>
                      <option value="Power Electronics, GaN/SiC Inverters">Power Electronics, GaN/SiC Inverters</option>
                    </select>
                  </div>

                  {/* Years of Experience */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Industry / Academic Experience
                    </label>
                    <select
                      value={trainerExperience}
                      onChange={(e) => setTrainerExperience(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#00828A] bg-white"
                    >
                      <option value="3-5 Years (Senior Engineer)">3-5 Years (Senior Engineer)</option>
                      <option value="5-8 Years (Lead Design Engineer)">5-8 Years (Lead Design Engineer)</option>
                      <option value="8-12 Years (Staff Engineer / Architect)">8-12 Years (Staff Engineer / Architect)</option>
                      <option value="12+ Years (Lead / Staff Physical Design Engineer)">12+ Years (Principal / Fellow)</option>
                      <option value="Academic Professor (10+ Yrs Ph.D)">Academic Professor (10+ Yrs Ph.D)</option>
                    </select>
                  </div>

                  {/* Current Organization */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Current Company or University
                    </label>
                    <input
                      type="text"
                      required
                      value={trainerOrg}
                      onChange={(e) => setTrainerOrg(e.target.value)}
                      placeholder="e.g. Synopsys, Qualcomm, IISc Bengaluru"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#00828A]"
                    />
                  </div>

                  {/* Highest Degree */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Highest Degree
                    </label>
                    <input
                      type="text"
                      required
                      value={trainerDegree}
                      onChange={(e) => setTrainerDegree(e.target.value)}
                      placeholder="e.g. Ph.D / M.Tech in Microelectronics"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#00828A]"
                    />
                  </div>

                  {/* Preferred Teaching Mode */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Preferred Mode of Engagement
                    </label>
                    <select
                      value={trainerMode}
                      onChange={(e) => setTrainerMode(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#00828A] bg-white"
                    >
                      <option value="Weekend Hybrid Masterclasses">Weekend Hybrid Masterclasses</option>
                      <option value="Online Evening Batches">Online Evening Batches</option>
                      <option value="Full-Time Corporate Deputation Bootcamps">Full-Time Corporate Bootcamps</option>
                      <option value="Capstone Project Mentorship Only">Capstone Project Mentorship Only</option>
                    </select>
                  </div>
                </div>

                {/* Brief Profile Bio */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Technical Bio & Semiconductor Toolchain Competence
                  </label>
                  <textarea
                    rows={3}
                    value={trainerBio}
                    onChange={(e) => setTrainerBio(e.target.value)}
                    placeholder="List specific tapeout nodes (e.g. TSMC 7nm, GF 22FDX), EDA tools used (Innovus, Design Compiler, Calibre, Vivado), and prior mentoring."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#00828A]"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                  <span className="text-xs text-slate-500">
                    Your credentials will be generated and dispatched automatically via TLS email service.
                  </span>
                  <button
                    type="submit"
                    disabled={trainerSubmitting}
                    className="px-6 py-3 bg-[#00828A] hover:bg-[#007077] text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {trainerSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Registering Faculty & Dispatching Mail...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Trainer Registration</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              /* TRAINER REGISTRATION CONFIRMED */
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="p-6 rounded-2xl bg-sky-50 border border-sky-200 text-center">
                  <div className="w-12 h-12 rounded-full bg-sky-600 text-white flex items-center justify-center mx-auto mb-3 shadow-xs">
                    <Check className="w-6 h-6 stroke-[3]" />
                  </div>
                  <h2 className="text-xl font-extrabold text-sky-950 font-display">
                    Trainer & Faculty Onboarding Confirmed!
                  </h2>
                  <p className="text-xs text-sky-800 mt-1 max-w-md mx-auto">
                    Welcome to the Silphor Faculty Directorate. An onboarding email with your credentials has been dispatched to <strong>{trainerEmail}</strong>.
                  </p>
                  <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-sky-300 text-xs font-mono font-bold text-sky-900">
                    Faculty ID: {trainerCreds?.facultyId}
                  </div>
                </div>

                {/* Trainer Credentials Box */}
                {trainerCreds && (
                  <div className="p-5 rounded-2xl bg-teal-50 border-2 border-[#00828A]/40 shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#00828A] uppercase tracking-wider flex items-center gap-2">
                        <KeyRound className="w-4 h-4" />
                        <span>Your Faculty Console Access Credentials:</span>
                      </span>
                      <span className="text-[10px] bg-teal-100 text-teal-800 px-2.5 py-0.5 rounded-full font-bold">
                        Email Dispatched ✓
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div className="bg-white p-3 rounded-xl border border-teal-200 flex items-center justify-between">
                        <div>
                          <div className="text-[10px] font-semibold text-slate-400 uppercase">Trainer Username</div>
                          <div className="font-mono font-bold text-xs text-slate-900">{trainerCreds.username}</div>
                        </div>
                        <button
                          onClick={() => handleCopyText(trainerCreds.username, 'trn_user')}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-[#00828A] hover:bg-teal-50 transition-colors"
                          title="Copy Username"
                        >
                          {copiedField === 'trn_user' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>

                      <div className="bg-white p-3 rounded-xl border border-teal-200 flex items-center justify-between">
                        <div>
                          <div className="text-[10px] font-semibold text-slate-400 uppercase">Initial Password</div>
                          <div className="font-mono font-bold text-xs text-[#00828A]">{trainerCreds.password}</div>
                        </div>
                        <button
                          onClick={() => handleCopyText(trainerCreds.password, 'trn_pass')}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-[#00828A] hover:bg-teal-50 transition-colors"
                          title="Copy Password"
                        >
                          {copiedField === 'trn_pass' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="pt-3 flex flex-wrap items-center justify-between gap-2 border-t border-teal-200/60">
                      <span className="text-[11px] text-slate-500">
                        Check your inbox for syllabus schedule and EDA lab environment allocation.
                      </span>
                      <button
                        onClick={() => {
                          if (onGoToRoleLogin) {
                            onGoToRoleLogin('trainer', trainerCreds.username, trainerCreds.password);
                          }
                        }}
                        className="px-4 py-2 bg-[#00828A] hover:bg-[#007077] text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>Sign In to Trainer Console</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ===================== STUDENT COURSE ENROLLMENT FLOW ===================== */}
        {registrationType === 'student' && (
          <div>
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-[#0B2545]">Step 1: Choose Your Specialization & Cohort</h2>
              <p className="text-xs text-slate-500">Select an industry-aligned curriculum and your preferred timing.</p>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-semibold text-slate-700">Select Training Program:</label>
              <div className="grid grid-cols-1 gap-3">
                {MOCK_COURSES.map((course) => (
                  <div
                    key={course.id}
                    onClick={() => {
                      setSelectedCourseId(course.id);
                      setSelectedBatchId(course.upcomingBatches[0]?.id || '');
                    }}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      selectedCourseId === course.id
                        ? 'border-[#00828A] bg-teal-50/30 ring-2 ring-[#00828A]/20'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 font-bold text-slate-700">
                          {course.category}
                        </span>
                        <h3 className="text-sm font-bold text-slate-900">{course.title}</h3>
                      </div>
                      <div className="text-right">
                        <div className="text-base font-extrabold text-[#0B2545]">
                          ₹{course.fee.toLocaleString()}
                        </div>
                        <div className="text-[10px] text-slate-500">{course.duration} &bull; {course.mode}</div>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 mt-2">{course.tagline}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Batch Selector */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-semibold text-slate-700">Select Upcoming Batch / Timing:</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedCourse.upcomingBatches.map((batch) => (
                  <div
                    key={batch.id}
                    onClick={() => setSelectedBatchId(batch.id)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      selectedBatchId === batch.id
                        ? 'border-[#00828A] bg-teal-50/40 text-[#0B2545]'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="font-bold text-xs">{batch.name}</div>
                      <div className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                        {batch.seatsTotal - batch.seatsFilled} seats left
                      </div>
                    </div>
                    <div className="text-xs text-slate-600 mt-1">Starts: <strong>{batch.startDate}</strong></div>
                    <div className="text-[11px] text-slate-500">{batch.schedule}</div>
                    <div className="text-[11px] text-[#00828A] font-medium mt-1">Trainer: {batch.trainer}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-2.5 bg-[#00828A] hover:bg-[#007077] text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-2"
              >
                <span>Continue to Profile</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          </div>
        )}

        {/* STEP 2: PERSONAL & ACADEMIC DETAILS */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-[#0B2545]">Step 2: Candidate Information</h2>
              <p className="text-xs text-slate-500">Enter your official identification and contact info for registration.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Full Legal Name *</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#00828A] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Email Address *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#00828A] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Mobile Number (with WhatsApp) *</label>
                <input
                  type="tel"
                  required
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#00828A] focus:outline-hidden"
                />
                {otpError && (
                  <p className="mt-1 text-[11px] text-rose-700 font-semibold">{otpError}</p>
                )}
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">College or Current Employer *</label>
                <input
                  type="text"
                  value={collegeOrCompany}
                  onChange={(e) => setCollegeOrCompany(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#00828A] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Highest Degree / Branch</label>
                <input
                  type="text"
                  value={highestDegree}
                  onChange={(e) => setHighestDegree(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#00828A] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Year of Graduation</label>
                <input
                  type="text"
                  value={graduationYear}
                  onChange={(e) => setGraduationYear(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#00828A] focus:outline-hidden"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={() => {
                  void handleSendOtp().then((sent) => {
                    if (sent) setStep(3);
                  });
                }}
                disabled={otpSending}
                className="px-6 py-2.5 bg-[#00828A] hover:bg-[#007077] text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{otpSending ? 'Sending OTP...' : 'Continue to Verification'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: OTP VERIFICATION & DOCUMENT UPLOAD */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-[#0B2545]">Step 3: Identity Verification & Documents</h2>
              <p className="text-xs text-slate-500">Verify the student email link and upload supporting ID.</p>
            </div>

            {/* OTP Section */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#00828A]" />
                  <span>Firebase Email-Link Verification</span>
                </span>
                {otpSent ? (
                  <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 text-right">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    Verification link sent to {emailLinkRecipient}
                  </span>
                ) : (
                  <span className="text-[11px] text-slate-500 font-semibold">Link not sent</span>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs text-slate-700">
                  Open the link in your email to complete verification. This page will update automatically.
                </span>
                <button
                  type="button"
                  onClick={() => void handleSendOtp()}
                  disabled={otpSending}
                  className="px-3 py-2 text-xs font-semibold text-[#00828A] hover:text-[#007077]"
                >
                  {otpSending ? 'Sending...' : 'Resend link'}
                </button>
                {otpVerified && (
                  <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                    <Check className="w-4 h-4" /> Verified Successfully
                  </span>
                )}
              </div>
              {otpSent && (
                <p className="text-[11px] text-slate-500">
                  Check {emailLinkRecipient} and click the Firebase sign-in link. Payment remains locked until verification completes.
                </p>
              )}
              {otpError && (
                <p className="text-[11px] text-rose-700 font-semibold">{otpError}</p>
              )}
            </div>

            {/* Document Upload Simulation */}
            <div className="space-y-3">
              <label className="text-xs font-semibold text-slate-700">Upload Qualification / ID Documents:</label>
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:border-[#00828A] transition-colors cursor-pointer bg-slate-50/50">
                <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <div className="text-xs font-semibold text-slate-700">Drag and drop student documents here, or browse</div>
                <div className="text-[10px] text-slate-400 mt-1">Accepts PDF, JPG, PNG up to 10MB (Degree, College ID, or Aadhaar)</div>
              </div>

              {/* Uploaded List */}
              <div className="space-y-1.5">
                {uploadedFiles.map((f, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-slate-100 text-xs text-slate-700">
                    <div className="flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 text-[#00828A]" />
                      <span className="font-mono">{f}</span>
                    </div>
                    <span className="text-[10px] font-semibold text-emerald-600">Attached</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => setStep(2)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={() => otpVerified && setStep(4)}
                disabled={!otpVerified}
                className="px-6 py-2.5 bg-[#00828A] hover:bg-[#007077] text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-2"
              >
                <span>Proceed to Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: PAYMENT GATEWAY CHECKOUT */}
        {step === 4 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-[#0B2545]">Step 4: Course Fee Payment & Gateway Selection</h2>
              <p className="text-xs text-slate-500">Configure single or partial payment, apply coupons, and select your gateway.</p>
            </div>

            {/* Fee Breakdown & Discount */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200 text-xs">
                <span className="text-slate-600">Standard Course Fee:</span>
                <span className="font-bold text-slate-900 font-mono">₹{baseFee.toLocaleString()}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between items-center py-2 border-b border-slate-200 text-xs text-emerald-600">
                  <span>Scholarship / Promo Discount:</span>
                  <span className="font-bold font-mono">- ₹{discountAmount.toLocaleString()}</span>
                </div>
              )}

              {/* Promo code input */}
              <div className="flex items-center gap-2 py-3 border-b border-slate-200">
                <input
                  type="text"
                  placeholder="Discount code (try: VLSI2026)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="px-3 py-1.5 text-xs border border-slate-300 rounded-lg flex-1 font-mono uppercase"
                />
                <button
                  type="button"
                  onClick={handleApplyPromo}
                  className="px-3 py-1.5 bg-[#0B2545] text-white text-xs font-semibold rounded-lg hover:bg-slate-800"
                >
                  Apply Code
                </button>
              </div>
              {promoMessage && (
                <div className="text-[11px] text-emerald-700 font-medium pt-1">
                  {promoMessage}
                </div>
              )}

              {/* Payment Mode (Full vs Partial) */}
              <div className="pt-3">
                <label className="text-xs font-semibold text-slate-700 block mb-2">Payment Option:</label>
                <div className="grid grid-cols-2 gap-3">
                  <div
                    onClick={() => setPaymentOption('full')}
                    className={`p-3 rounded-xl border cursor-pointer ${
                      paymentOption === 'full'
                        ? 'border-[#00828A] bg-teal-50 text-[#0B2545] font-bold ring-2 ring-[#00828A]/20'
                        : 'border-slate-200 bg-white'
                    }`}
                  >
                    <div className="text-xs">Full Payment</div>
                    <div className="text-sm font-extrabold font-mono mt-0.5">
                      ₹{(baseFee - discountAmount).toLocaleString()}
                    </div>
                    <div className="text-[10px] text-emerald-600 font-medium">Eligible for certification fast-track</div>
                  </div>

                  <div
                    onClick={() => setPaymentOption('partial')}
                    className={`p-3 rounded-xl border cursor-pointer ${
                      paymentOption === 'partial'
                        ? 'border-[#00828A] bg-teal-50 text-[#0B2545] font-bold ring-2 ring-[#00828A]/20'
                        : 'border-slate-200 bg-white'
                    }`}
                  >
                    <div className="text-xs">Installment (50% Now)</div>
                    <div className="text-sm font-extrabold font-mono mt-0.5">
                      ₹{Math.round((baseFee - discountAmount) / 2).toLocaleString()}
                    </div>
                    <div className="text-[10px] text-slate-500">Remaining 50% due at Week 6</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Gateway selection */}
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-2">
                Select Authorized Payment Gateway:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'Razorpay', label: 'Razorpay', badge: 'Fastest UPI & Cards' },
                ].map((g) => (
                  <div
                    key={g.id}
                    className={`p-3 rounded-xl border cursor-pointer transition-all text-center ${
                      'border-[#00828A] bg-teal-50 text-[#0B2545] font-bold ring-2 ring-[#00828A]/20 shadow-xs'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 mx-auto text-[#00828A] mb-1" />
                    <div className="text-xs font-bold">{g.label}</div>
                    <div className="text-[9px] text-slate-500 mt-0.5">{g.badge}</div>
                  </div>
                ))}
              </div>
              <p className="mt-2 text-[11px] text-slate-500">
                Secure Razorpay Checkout opens after you continue. Other gateways will be added after their merchant accounts are configured.
              </p>
            </div>

            {/* Security Guarantee */}
            <div className="p-3 rounded-lg bg-sky-50 border border-sky-200 text-xs text-sky-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#00828A] shrink-0" />
              <span>
                256-bit SSL encrypted transaction with immediate webhook verification and automated tax receipt delivery.
              </span>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => setStep(3)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                disabled={paymentProcessing}
                onClick={handleExecutePayment}
                className="px-8 py-3 bg-[#00828A] hover:bg-[#007077] text-white text-xs font-extrabold rounded-xl transition-all shadow-md flex items-center gap-2 disabled:opacity-50"
              >
                {paymentProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing Secure Gateway...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Pay ₹{initialPayAmount.toLocaleString()} via {selectedGateway}</span>
                  </>
                )}
              </button>
            </div>
            {paymentError && (
              <p className="text-xs text-rose-700 font-semibold text-right">
                Payment could not be completed. Check your gateway configuration or try again.
              </p>
            )}
          </div>
        )}

        {/* STEP 5: CONFIRMATION & PRINTABLE RECEIPT */}
        {step === 5 && finalRegistration && finalPayment && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto mb-3 shadow-sm">
                <Check className="w-6 h-6 stroke-[3]" />
              </div>
              <h2 className="text-xl font-extrabold text-emerald-950 font-display">
                Registration & Admission Confirmed!
              </h2>
              <p className="text-xs text-emerald-800 mt-1">
                Your admission file has been generated. Confirmation SMS sent to {mobile}.
              </p>
              {emailDeliveryError ? (
                <p className="text-xs text-rose-700 font-semibold mt-2">
                  Credentials email could not be delivered to {email}: {emailDeliveryError}
                </p>
              ) : (
                <p className="text-xs text-emerald-700 font-semibold mt-2">
                  Student username and password sent to {email}.
                </p>
              )}
              <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-emerald-300 text-xs font-mono font-bold text-emerald-900">
                Application Number: {finalRegistration.applicationNumber}
              </div>
            </div>

            {/* Official Tax Invoice / Payment Receipt */}
            <div
              id="payment-receipt-print"
              className="p-6 md:p-8 bg-white border border-slate-300 rounded-xl shadow-xs space-y-6"
            >
              {/* Receipt Header */}
              <div className="flex flex-wrap items-center justify-between pb-6 border-b border-slate-200 gap-4">
                <SilphorLogo variant="horizontal" size="md" />
                <div className="text-right text-xs">
                  <div className="font-bold text-[#0B2545] font-mono text-sm">
                    {finalPayment.invoiceNumber}
                  </div>
                  <div className="text-slate-500">Date: {finalPayment.date}</div>
                  <div className="text-[10px] text-emerald-600 font-bold uppercase">Payment Status: CLEARED</div>
                </div>
              </div>

              {/* Student & Course Details */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Billed To Candidate:
                  </div>
                  <div className="font-bold text-slate-800 text-sm">{finalRegistration.fullName}</div>
                  <div className="text-slate-600">{finalRegistration.collegeOrCompany}</div>
                  <div className="text-slate-600">{finalRegistration.email} &bull; {finalRegistration.mobile}</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Course & Cohort:
                  </div>
                  <div className="font-bold text-[#00828A]">{finalRegistration.courseTitle}</div>
                  <div className="text-slate-600">Batch: {finalRegistration.batchName}</div>
                  <div className="text-slate-500 text-[11px]">Gateway: {finalPayment.gateway} ({finalPayment.transactionId})</div>
                </div>
              </div>

              {/* Financial Table */}
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-50 text-slate-600 border-y border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3">Description</th>
                    <th className="py-2.5 px-3 text-right">Fee</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="py-3 px-3">
                      <div className="font-semibold text-slate-800">{finalRegistration.courseTitle}</div>
                      <div className="text-[11px] text-slate-500">Includes EDA tool cloud access, PDK licenses & lab evaluation</div>
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-medium">₹{baseFee.toLocaleString()}</td>
                  </tr>
                  {finalPayment.discountApplied ? (
                    <tr className="text-emerald-700">
                      <td className="py-2 px-3">Promotional Discount ({finalPayment.promoCode})</td>
                      <td className="py-2 px-3 text-right font-mono">- ₹{finalPayment.discountApplied.toLocaleString()}</td>
                    </tr>
                  ) : null}
                  <tr className="font-bold bg-slate-50 text-slate-900 text-sm">
                    <td className="py-3 px-3">Total Amount Paid Today:</td>
                    <td className="py-3 px-3 text-right font-mono text-[#00828A]">₹{finalPayment.amount.toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>

              <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-3">
                <div>
                  Authorized Signatory: <strong>Silphor Technologies Finance Bureau</strong>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => window.print()}
                    className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 flex items-center gap-1.5 font-semibold"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Receipt</span>
                  </button>
                  <button
                    onClick={onCancel}
                    className="px-4 py-1.5 rounded-lg bg-[#00828A] text-white hover:bg-[#007077] font-semibold"
                  >
                    Enter Student Portal
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
