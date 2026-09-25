import React, { useState } from 'react';
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
  Send
} from 'lucide-react';
import { Course, StudentRegistration, PaymentTransaction } from '../types';
import { MOCK_COURSES } from '../data/mockDatabase';
import { SilphorLogo } from '../components/SilphorLogo';
import { saveFormSubmission } from '../utils/formStorage';

interface RegistrationViewProps {
  initialCourseId?: string;
  onComplete: (reg: StudentRegistration, payment: PaymentTransaction) => void;
  onCancel: () => void;
}

export const RegistrationView: React.FC<RegistrationViewProps> = ({
  initialCourseId,
  onComplete,
  onCancel,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);

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
  const [otp, setOtp] = useState('8492');
  const [otpSent, setOtpSent] = useState(true);
  const [otpVerified, setOtpVerified] = useState(true);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([
    'BTech_Provisional_Degree.pdf',
    'Aadhaar_National_ID.pdf'
  ]);

  // Step 4: Payment Gateway Configuration
  const [paymentOption, setPaymentOption] = useState<'full' | 'partial'>('full');
  const [promoCode, setPromoCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');
  const [selectedGateway, setSelectedGateway] = useState<'Razorpay' | 'Cashfree' | 'PayU' | 'PhonePe'>('Razorpay');
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState(false);

  // Final Output
  const [finalRegistration, setFinalRegistration] = useState<StudentRegistration | null>(null);
  const [finalPayment, setFinalPayment] = useState<PaymentTransaction | null>(null);

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

  const handleExecutePayment = () => {
    setPaymentProcessing(true);
    setPaymentError(false);

    setTimeout(() => {
      setPaymentProcessing(false);
      const appNum = `SIL-2026-REG-${Math.floor(1000 + Math.random() * 9000)}`;
      const txnId = `TXN-${selectedGateway.substring(0, 3).toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`;
      const invNo = `INV-SIL-2026-${Math.floor(1000 + Math.random() * 9000)}`;

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
        transactionId: txnId,
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
          transactionId: txnId,
          gateway: selectedGateway,
          documentsUploaded: uploadedFiles,
          submittedAt: new Date().toISOString(),
        },
        status: 'In Review',
        priority: 'High',
        notes: `Admissions application verified with OTP. Advance ₹${initialPayAmount} confirmed via ${selectedGateway}.`,
      });

      onComplete(newRegistration, newPayment);
      setStep(5);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto my-8 px-4">
      {/* Header card */}
      <div className="bg-[#0B2545] rounded-2xl p-6 md:p-8 text-white mb-6 border border-[#00828A]/40 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#38BDF8] uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#00828A]" />
              <span>Official Academic Admissions Portal</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight font-display text-white">
              Online Student Registration & Course Enrollment
            </h1>
            <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-2xl">
              Apply for tier-1 industrial semiconductor and VLSI engineering training with instant multi-gateway checkout.
            </p>
          </div>
          <button
            onClick={onCancel}
            className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 rounded-lg border border-slate-700"
          >
            Back to Catalog
          </button>
        </div>

        {/* Step Indicator */}
        <div className="grid grid-cols-5 gap-2 mt-8 pt-6 border-t border-slate-700/60">
          {[
            { num: 1, label: 'Course' },
            { num: 2, label: 'Profile' },
            { num: 3, label: 'Docs & OTP' },
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
      </div>

      {/* Main Multi-Step Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
        {/* STEP 1: COURSE & BATCH SELECTION */}
        {step === 1 && (
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
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#00828A] focus:outline-hidden"
                />
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
                onClick={() => setStep(3)}
                className="px-6 py-2.5 bg-[#00828A] hover:bg-[#007077] text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-2"
              >
                <span>Continue to Verification</span>
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
              <p className="text-xs text-slate-500">Verify your mobile/email via one-time passcode and upload supporting ID.</p>
            </div>

            {/* OTP Section */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#00828A]" />
                  <span>One-Time Passcode (OTP) Verification</span>
                </span>
                <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Code sent to {mobile}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-40 px-3 py-2 text-center text-sm font-mono tracking-widest font-bold border border-slate-300 rounded-lg bg-white"
                />
                <button
                  onClick={() => setOtpVerified(true)}
                  className="px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-lg hover:bg-emerald-700"
                >
                  Verify OTP
                </button>
                {otpVerified && (
                  <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                    <Check className="w-4 h-4" /> Verified Successfully
                  </span>
                )}
              </div>
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
                onClick={() => setStep(4)}
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
                  { id: 'Cashfree', label: 'Cashfree', badge: 'Net Banking & EMI' },
                  { id: 'PayU', label: 'PayU', badge: 'Credit & Debit Cards' },
                  { id: 'PhonePe', label: 'PhonePe', badge: 'Direct PhonePe QR' },
                ].map((g) => (
                  <div
                    key={g.id}
                    onClick={() => setSelectedGateway(g.id as any)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all text-center ${
                      selectedGateway === g.id
                        ? 'border-[#00828A] bg-teal-50 text-[#0B2545] font-bold ring-2 ring-[#00828A]/20 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 mx-auto text-[#00828A] mb-1" />
                    <div className="text-xs font-bold">{g.label}</div>
                    <div className="text-[9px] text-slate-500 mt-0.5">{g.badge}</div>
                  </div>
                ))}
              </div>
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
                Your admission file has been generated. Confirmation SMS and Email sent to {email}.
              </p>
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
