export type UserRole = 'public' | 'student' | 'trainer' | 'admin' | 'enterprise';

export type MainNavId =
  | 'home'
  | 'about'
  | 'industry'
  | 'technology'
  | 'engineering-services'
  | 'training'
  | 'students'
  | 'resources'
  | 'projects-internship'
  | 'contact';

export interface NavItemConfig {
  id: MainNavId;
  label: string;
  badge?: string;
  allowedRoles: UserRole[];
  backendEndpoint?: string;
  subItems?: {
    id: string;
    label: string;
    description: string;
    allowedRoles?: UserRole[];
    apiEndpoint?: string;
  }[];
}

export interface Course {
  id: string;
  title: string;
  category: 'VLSI' | 'Embedded' | 'PCB' | 'Semiconductor' | 'Power Electronics';
  duration: string;
  mode: 'Online Live' | 'Classroom Lab' | 'Hybrid';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  tagline: string;
  overview: string;
  tools: string[];
  modules: {
    week: string;
    title: string;
    topics: string[];
  }[];
  fee: number;
  featured?: boolean;
  upcomingBatches: {
    id: string;
    name: string;
    startDate: string;
    schedule: string;
    seatsTotal: number;
    seatsFilled: number;
    trainer: string;
  }[];
}

export interface VendorPartner {
  id: string;
  name: string;
  category: 'EDA Software' | 'FPGA & Silicon' | 'Test & Measurement' | 'Embedded Platforms' | 'Power Semiconductors';
  country: string;
  description: string;
  products: string[];
  partnershipType: 'Global Authorized Distributor' | 'Technology Solution Partner' | 'Academic Partner';
  website: string;
}

export interface IndustrialProduct {
  id: string;
  name: string;
  vendorId: string;
  vendorName: string;
  category: string;
  summary: string;
  specs: Record<string, string>;
  datasheetAvailable: boolean;
  leadTime: string;
  stockStatus: 'In Stock' | 'Custom Order' | 'Evaluation Unit';
}

export interface EngineerRequirement {
  id: string;
  companyName: string;
  domain: 'VLSI Design' | 'Embedded Systems' | 'Power Electronics' | 'Semiconductor Device' | 'PCB Hardware';
  roleTitle: string;
  positionsCount: number;
  experienceRequired: string;
  requiredSkills: string[];
  location: string;
  status: 'Open' | 'Reviewing' | 'Fulfilled';
  dateSubmitted: string;
}

export interface StudentRegistration {
  id: string;
  applicationNumber: string;
  fullName: string;
  email: string;
  mobile: string;
  collegeOrCompany: string;
  courseId: string;
  courseTitle: string;
  batchId: string;
  batchName: string;
  status: 'Application Received' | 'Document Verified' | 'Admitted' | 'Completed';
  paymentStatus: 'Paid' | 'Partial' | 'Pending';
  amountPaid: number;
  totalFee: number;
  documentsUploaded: string[];
  registrationDate: string;
  otpVerified: boolean;
}

export interface PaymentTransaction {
  id: string;
  transactionId: string;
  applicationNumber: string;
  studentName: string;
  courseTitle: string;
  amount: number;
  gateway: 'Razorpay' | 'Cashfree' | 'PayU' | 'PhonePe';
  paymentMode: 'UPI' | 'Credit/Debit Card' | 'Net Banking' | 'Corporate Wire';
  status: 'Success' | 'Failed' | 'Refunded';
  invoiceNumber: string;
  discountApplied?: number;
  promoCode?: string;
  date: string;
}

export interface CertificateRecord {
  certificateNumber: string;
  studentName: string;
  courseTitle: string;
  issueDate: string;
  validUntil: string;
  grade: 'Distinction' | 'A+ Grade' | 'A Grade';
  verificationCode: string;
  authorizedSignatory: string;
  skillsVerified: string[];
}

export interface NotificationLog {
  id: string;
  type: 'Email' | 'SMS';
  recipient: string;
  subjectOrPreview: string;
  eventTrigger: 'Registration' | 'Payment Receipt' | 'Batch Commencement' | 'Class Reminder' | 'Certificate';
  status: 'Delivered' | 'Queued' | 'Sent';
  timestamp: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'Training' | 'Industrial Solutions' | 'Certifications' | 'Placements';
}
