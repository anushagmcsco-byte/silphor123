import React, { useState, useEffect, useMemo } from 'react';
import {
  Inbox,
  Filter,
  Search,
  Download,
  Trash2,
  Eye,
  Phone,
  Mail,
  MessageSquare,
  ExternalLink,
  CheckCircle2,
  Clock,
  AlertCircle,
  Building2,
  User,
  Globe,
  Check,
  X,
  RefreshCw,
  Smartphone,
  Monitor,
  Tablet,
  Plus,
  Copy,
  ChevronRight,
  Send,
  Layers,
  Sparkles,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { FormSubmission, FormPageSource } from '../types';
import {
  getStoredFormSubmissions,
  updateFormSubmission,
  deleteStoredFormSubmission,
  saveFormSubmission,
  resetStoredFormSubmissions,
  exportFormSubmissionsCSV
} from '../utils/formStorage';

interface AdminFormsManagerProps {
  onNotify?: (message: string) => void;
}

export const AdminFormsManager: React.FC<AdminFormsManagerProps> = ({ onNotify }) => {
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [selectedPageFilter, setSelectedPageFilter] = useState<string>('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('all');
  const [selectedPriorityFilter, setSelectedPriorityFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  // Device Layout Mode: auto (responsive based on screen), mobile (compact cards), desktop (dense table)
  const [deviceViewMode, setDeviceViewMode] = useState<'auto' | 'mobile' | 'desktop'>('auto');

  // Inspection Modal State
  const [activeSubmission, setActiveSubmission] = useState<FormSubmission | null>(null);
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [internalNotes, setInternalNotes] = useState('');
  const [assignedStaff, setAssignedStaff] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<FormSubmission['status']>('New');
  const [selectedPriority, setSelectedPriority] = useState<FormSubmission['priority']>('Medium');

  // Simulator / Test Modal
  const [simulatorOpen, setSimulatorOpen] = useState(false);
  const [simPage, setSimPage] = useState<FormPageSource>('contact');
  const [simName, setSimName] = useState('Dr. Arvind Swaminathan');
  const [simEmail, setSimEmail] = useState('arvind.swamy@iiitb.ac.in');
  const [simPhone, setSimPhone] = useState('+91 98450 77112');
  const [simOrg, setSimOrg] = useState('IIIT Bangalore Semiconductor Lab');
  const [simSubject, setSimSubject] = useState('Requisition for Synopsys Custom Compiler & IC Validator');
  const [simMessage, setSimMessage] = useState('Requesting university bundle pricing and floating licenses for our postgraduate analog IC research center.');

  // Delete Confirmation Modal
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  // Load and subscribe to storage changes
  const refreshList = () => {
    setSubmissions(getStoredFormSubmissions());
  };

  useEffect(() => {
    refreshList();

    const handleUpdate = () => refreshList();
    window.addEventListener('silphor-form-submissions-updated', handleUpdate);
    window.addEventListener('silphor-new-form-submission', handleUpdate);

    return () => {
      window.removeEventListener('silphor-form-submissions-updated', handleUpdate);
      window.removeEventListener('silphor-new-form-submission', handleUpdate);
    };
  }, []);

  // Update inspection modal state when active submission changes
  useEffect(() => {
    if (activeSubmission) {
      setInternalNotes(activeSubmission.notes || '');
      setAssignedStaff(activeSubmission.assignedStaff || 'Unassigned');
      setSelectedStatus(activeSubmission.status);
      setSelectedPriority(activeSubmission.priority);
      setIsEditingNotes(false);
    }
  }, [activeSubmission]);

  // Page source labels & color mapping
  const pageSourceMeta: Record<
    FormPageSource,
    { label: string; route: string; bg: string; text: string; border: string; icon: any }
  > = {
    contact: {
      label: 'Contact Us',
      route: '/contact-us',
      bg: 'bg-sky-50',
      text: 'text-sky-700',
      border: 'border-sky-200',
      icon: Mail,
    },
    industry: {
      label: 'Industry Solutions',
      route: '/industry',
      bg: 'bg-indigo-50',
      text: 'text-indigo-700',
      border: 'border-indigo-200',
      icon: Building2,
    },
    'engineering-services': {
      label: 'Engineering Staffing',
      route: '/engineering-services',
      bg: 'bg-teal-50',
      text: 'text-teal-700',
      border: 'border-teal-200',
      icon: Layers,
    },
    'projects-internship': {
      label: 'Projects & Internships',
      route: '/projects-internship',
      bg: 'bg-amber-50',
      text: 'text-amber-800',
      border: 'border-amber-200',
      icon: Sparkles,
    },
    registration: {
      label: 'Course Registration',
      route: '/registration',
      bg: 'bg-emerald-50',
      text: 'text-emerald-700',
      border: 'border-emerald-200',
      icon: User,
    },
    training: {
      label: 'Training Programs',
      route: '/training',
      bg: 'bg-purple-50',
      text: 'text-purple-700',
      border: 'border-purple-200',
      icon: FileText,
    },
    students: {
      label: 'Student Portal & Placement',
      route: '/students',
      bg: 'bg-cyan-50',
      text: 'text-cyan-700',
      border: 'border-cyan-200',
      icon: User,
    },
    resources: {
      label: 'Resources & Technical Guides',
      route: '/resources',
      bg: 'bg-blue-50',
      text: 'text-blue-700',
      border: 'border-blue-200',
      icon: FileText,
    },
    about: {
      label: 'About Us & MoUs',
      route: '/about-us',
      bg: 'bg-violet-50',
      text: 'text-violet-700',
      border: 'border-violet-200',
      icon: Globe,
    },
    'privacy-policy': {
      label: 'Privacy Policy & DPDP',
      route: '/privacy-policy',
      bg: 'bg-rose-50',
      text: 'text-rose-700',
      border: 'border-rose-200',
      icon: ShieldCheck,
    },
    'terms-of-service': {
      label: 'Terms & Compliance',
      route: '/terms-of-service',
      bg: 'bg-slate-100',
      text: 'text-slate-700',
      border: 'border-slate-300',
      icon: ShieldCheck,
    },
    'support-widget': {
      label: 'Live Support & Callback',
      route: '/contact-us',
      bg: 'bg-orange-50',
      text: 'text-orange-700',
      border: 'border-orange-200',
      icon: Phone,
    },
  };

  // Page source filter options with counts
  const pageCounts = useMemo(() => {
    const counts: Record<string, number> = { all: submissions.length };
    submissions.forEach((s) => {
      counts[s.pageSource] = (counts[s.pageSource] || 0) + 1;
    });
    return counts;
  }, [submissions]);

  // Filtered and sorted submissions
  const filteredSubmissions = useMemo(() => {
    return submissions
      .filter((s) => {
        // Page filter
        if (selectedPageFilter !== 'all' && s.pageSource !== selectedPageFilter) {
          return false;
        }
        // Status filter
        if (selectedStatusFilter !== 'all' && s.status !== selectedStatusFilter) {
          return false;
        }
        // Priority filter
        if (selectedPriorityFilter !== 'all' && s.priority !== selectedPriorityFilter) {
          return false;
        }
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = s.senderName.toLowerCase().includes(q);
          const matchEmail = s.senderEmail.toLowerCase().includes(q);
          const matchPhone = (s.senderPhone || '').toLowerCase().includes(q);
          const matchOrg = (s.organizationOrCollege || '').toLowerCase().includes(q);
          const matchSubj = (s.subject || '').toLowerCase().includes(q);
          const matchMsg = (s.message || '').toLowerCase().includes(q);
          const matchId = s.id.toLowerCase().includes(q);
          const matchFormTitle = s.formTitle.toLowerCase().includes(q);
          return (
            matchName ||
            matchEmail ||
            matchPhone ||
            matchOrg ||
            matchSubj ||
            matchMsg ||
            matchId ||
            matchFormTitle
          );
        }
        return true;
      })
      .sort((a, b) => {
        const timeA = new Date(a.submissionDate).getTime();
        const timeB = new Date(b.submissionDate).getTime();
        return sortOrder === 'newest' ? timeB - timeA : timeA - timeB;
      });
  }, [
    submissions,
    selectedPageFilter,
    selectedStatusFilter,
    selectedPriorityFilter,
    searchQuery,
    sortOrder,
  ]);

  // Derived metrics
  const totalCount = submissions.length;
  const newCount = submissions.filter((s) => s.status === 'New').length;
  const inReviewCount = submissions.filter((s) => s.status === 'In Review').length;
  const contactedCount = submissions.filter((s) => s.status === 'Contacted').length;
  const actionTakenCount = submissions.filter((s) => s.status === 'Action Taken').length;

  // Status badge styling
  const getStatusBadge = (status: FormSubmission['status']) => {
    switch (status) {
      case 'New':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300 font-bold';
      case 'In Review':
        return 'bg-amber-100 text-amber-800 border-amber-300 font-medium';
      case 'Contacted':
        return 'bg-sky-100 text-sky-800 border-sky-300 font-medium';
      case 'Action Taken':
        return 'bg-purple-100 text-purple-800 border-purple-300 font-bold';
      case 'Archived':
        return 'bg-slate-100 text-slate-600 border-slate-300 font-normal';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  // Priority badge styling
  const getPriorityBadge = (priority: FormSubmission['priority']) => {
    switch (priority) {
      case 'High':
        return 'text-rose-700 bg-rose-50 border-rose-200';
      case 'Medium':
        return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'Low':
        return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  // Format relative or friendly date
  const formatDateTime = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return {
        date: d.toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
        time: d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      };
    } catch {
      return { date: dateStr, time: '' };
    }
  };

  // Quick status update
  const handleQuickStatusChange = (id: string, newStatus: FormSubmission['status']) => {
    updateFormSubmission(id, { status: newStatus });
    if (activeSubmission && activeSubmission.id === id) {
      setActiveSubmission({ ...activeSubmission, status: newStatus });
    }
    onNotify?.(`Updated submission ${id} status to "${newStatus}"`);
  };

  // Save changes in the inspection modal
  const handleSaveModalChanges = () => {
    if (!activeSubmission) return;
    updateFormSubmission(activeSubmission.id, {
      status: selectedStatus,
      priority: selectedPriority,
      notes: internalNotes,
      assignedStaff,
    });
    setActiveSubmission({
      ...activeSubmission,
      status: selectedStatus,
      priority: selectedPriority,
      notes: internalNotes,
      assignedStaff,
    });
    setIsEditingNotes(false);
    onNotify?.(`Saved administrative notes and status for ${activeSubmission.id}`);
  };

  // Delete submission
  const handleDeleteSubmission = (id: string) => {
    deleteStoredFormSubmission(id);
    if (activeSubmission && activeSubmission.id === id) {
      setActiveSubmission(null);
    }
    setDeleteTargetId(null);
    onNotify?.(`Deleted submission ${id}`);
  };

  // Simulator submit handler
  const handleCreateTestSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    const meta = pageSourceMeta[simPage];
    const newEntry = saveFormSubmission({
      pageSource: simPage,
      pageLabel: meta?.label || 'Direct Portal Form',
      formTitle: `${meta?.label || 'General'} Submission`,
      senderName: simName,
      senderEmail: simEmail,
      senderPhone: simPhone,
      organizationOrCollege: simOrg,
      subject: simSubject,
      message: simMessage,
      formData: {
        submittedFrom: meta?.label,
        category: 'Test & Verification',
        simulatedAt: new Date().toISOString(),
      },
      status: 'New',
      priority: 'High',
      notes: `Verified test submission created from Admin Console for [${meta?.label}].`,
    });

    setSimulatorOpen(false);
    onNotify?.(`Generated test form submission ${newEntry.id} from ${meta?.label}!`);
  };

  return (
    <div className="space-y-6">
      {/* SECTION HEADER & CONTROL BAR */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800 text-[11px] font-bold uppercase tracking-wider">
                Multi-Page Form Engine
              </span>
              {newCount > 0 && (
                <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[11px] font-bold animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
                  {newCount} New Inquiries
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B2545] font-display mt-1">
              Form Inquiries & Requisitions by Particular Page
            </h2>
            <p className="text-xs text-slate-500 max-w-2xl mt-0.5 leading-relaxed">
              Consolidated, responsive administrative capture of submissions from Contact, Industry EDA,
              Engineering Staffing, Projects, Admissions, Training, and Privacy pages across all devices.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Device Mode Switcher */}
            <div className="hidden sm:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
              <button
                onClick={() => setDeviceViewMode('auto')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                  deviceViewMode === 'auto'
                    ? 'bg-white text-slate-900 shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Adaptive layout (Cards on mobile, Table on desktop)"
              >
                Auto Layout
              </button>
              <button
                onClick={() => setDeviceViewMode('mobile')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-medium transition-all ${
                  deviceViewMode === 'mobile'
                    ? 'bg-white text-slate-900 shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Mobile Cards Mode for small screens and phones"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobile Cards</span>
              </button>
              <button
                onClick={() => setDeviceViewMode('desktop')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-medium transition-all ${
                  deviceViewMode === 'desktop'
                    ? 'bg-white text-slate-900 shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Dense Data Table Mode for widescreen devices"
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Desktop Table</span>
              </button>
            </div>

            {/* Test Submission Button */}
            <button
              onClick={() => setSimulatorOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 bg-[#0B2545] hover:bg-[#00828A] text-white text-xs font-semibold rounded-xl shadow-xs transition-all cursor-pointer"
              title="Test a simulated form submission from any page"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Simulate Form</span>
            </button>

            {/* Export CSV Button */}
            <button
              onClick={() => exportFormSubmissionsCSV(filteredSubmissions)}
              className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 transition-all cursor-pointer"
              title="Download CSV spreadsheet of current submissions"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>

            {/* Reset / Refresh */}
            <button
              onClick={() => {
                if (window.confirm('Reset all form submissions to default realistic seed records?')) {
                  resetStoredFormSubmissions();
                  refreshList();
                  onNotify?.('Reset form submissions to realistic sample state.');
                }
              }}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-all"
              title="Reset sample data"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* METRICS STRIP: Responsive across all devices */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-100">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Total Submissions
            </span>
            <div className="text-2xl font-black text-[#0B2545] font-display mt-0.5">
              {totalCount}
            </div>
            <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
              <Inbox className="w-3 h-3 text-[#00828A]" />
              <span>Across all pages</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
              New / Unread
            </span>
            <div className="text-2xl font-black text-emerald-700 font-display mt-0.5">
              {newCount}
            </div>
            <div className="text-[11px] text-emerald-700 flex items-center gap-1 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Requires outreach</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-sky-50/80 border border-sky-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-sky-800">
              In Review / Contacted
            </span>
            <div className="text-2xl font-black text-sky-700 font-display mt-0.5">
              {inReviewCount + contactedCount}
            </div>
            <div className="text-[11px] text-sky-700 flex items-center gap-1 mt-0.5">
              <Clock className="w-3 h-3 text-sky-600" />
              <span>In active dialogue</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-purple-50/80 border border-purple-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-800">
              Action Taken / Closed
            </span>
            <div className="text-2xl font-black text-purple-700 font-display mt-0.5">
              {actionTakenCount}
            </div>
            <div className="text-[11px] text-purple-700 flex items-center gap-1 mt-0.5">
              <CheckCircle2 className="w-3 h-3 text-purple-600" />
              <span>Proposals dispatched</span>
            </div>
          </div>
        </div>

        {/* SEARCH & FILTERS STRIP */}
        <div className="space-y-3 pt-2">
          {/* Row 1: Search Bar and Quick Sort */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search sender, email, mobile, organization, subject, tracking ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#00828A] bg-white"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <select
                value={selectedStatusFilter}
                onChange={(e) => setSelectedStatusFilter(e.target.value)}
                className="px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white focus:outline-hidden focus:ring-2 focus:ring-[#00828A] font-medium"
              >
                <option value="all">All Statuses</option>
                <option value="New">Status: New</option>
                <option value="In Review">Status: In Review</option>
                <option value="Contacted">Status: Contacted</option>
                <option value="Action Taken">Status: Action Taken</option>
                <option value="Archived">Status: Archived</option>
              </select>

              <select
                value={selectedPriorityFilter}
                onChange={(e) => setSelectedPriorityFilter(e.target.value)}
                className="px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white focus:outline-hidden focus:ring-2 focus:ring-[#00828A] font-medium"
              >
                <option value="all">All Priorities</option>
                <option value="High">Priority: High</option>
                <option value="Medium">Priority: Medium</option>
                <option value="Low">Priority: Low</option>
              </select>

              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as any)}
                className="px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white focus:outline-hidden focus:ring-2 focus:ring-[#00828A] font-medium"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>

          {/* Row 2: PARTICULAR PAGE PILL SELECTOR (Horizontally scrollable on all devices) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 scrollbar-none">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3" />
              <span>Particular Page:</span>
            </span>

            <button
              onClick={() => setSelectedPageFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                selectedPageFilter === 'all'
                  ? 'bg-[#0B2545] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Pages ({pageCounts['all'] || 0})
            </button>

            {(
              [
                'contact',
                'industry',
                'engineering-services',
                'projects-internship',
                'registration',
                'training',
                'students',
                'resources',
                'about',
                'privacy-policy',
                'support-widget',
              ] as FormPageSource[]
            ).map((pageKey) => {
              const meta = pageSourceMeta[pageKey];
              const count = pageCounts[pageKey] || 0;
              const isSelected = selectedPageFilter === pageKey;

              return (
                <button
                  key={pageKey}
                  onClick={() => setSelectedPageFilter(pageKey)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all shrink-0 cursor-pointer border ${
                    isSelected
                      ? `${meta.bg} ${meta.text} ${meta.border} font-bold ring-2 ring-[#00828A]/40`
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <span>{meta.label}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                      isSelected
                        ? 'bg-white/80 font-bold'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Particular Page Section Banner */}
          {selectedPageFilter !== 'all' && pageSourceMeta[selectedPageFilter as FormPageSource] && (
            <div className="p-3.5 rounded-xl bg-teal-50 border border-teal-200 flex flex-wrap items-center justify-between gap-3 text-xs animate-in fade-in duration-150">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00828A] animate-pulse shrink-0" />
                <span className="text-slate-600">Originating Page Section:</span>
                <strong className="text-[#0B2545] font-bold">
                  {pageSourceMeta[selectedPageFilter as FormPageSource].label}
                </strong>
                <code className="px-2 py-0.5 rounded bg-white text-[#00828A] font-mono text-[11px] font-bold border border-teal-200">
                  {pageSourceMeta[selectedPageFilter as FormPageSource].route}
                </code>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-slate-500 font-medium">
                  {filteredSubmissions.length} submission{filteredSubmissions.length === 1 ? '' : 's'} logged
                </span>
                <button
                  onClick={() => setSelectedPageFilter('all')}
                  className="px-2 py-0.5 text-xs font-bold text-[#00828A] hover:underline cursor-pointer"
                >
                  Show All Pages &rarr;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* SUBMISSIONS LISTING: ADAPTIVE / MOBILE CARDS / DESKTOP TABLE */}
      {filteredSubmissions.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Inbox className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-800 font-display">
            No Form Submissions Matching Filters
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            No submissions were found for the selected page or search criteria. Reset filters or create
            a simulated test submission to verify the pipeline.
          </p>
          <div className="flex items-center justify-center gap-2 pt-2">
            <button
              onClick={() => {
                setSelectedPageFilter('all');
                setSelectedStatusFilter('all');
                setSelectedPriorityFilter('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl"
            >
              Reset Filters
            </button>
            <button
              onClick={() => setSimulatorOpen(true)}
              className="px-4 py-2 bg-[#00828A] hover:bg-[#007077] text-white text-xs font-bold rounded-xl"
            >
              Create Test Submission
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* ======================================================== */}
          {/* VIEW MODE 1: MOBILE CARDS VIEW (Always on mobile screens, or if mode is 'mobile') */}
          {/* ======================================================== */}
          <div
            className={`space-y-3 ${
              deviceViewMode === 'desktop' ? 'hidden' : deviceViewMode === 'mobile' ? 'block' : 'block lg:hidden'
            }`}
          >
            {filteredSubmissions.map((sub) => {
              const meta = pageSourceMeta[sub.pageSource] || {
                label: sub.pageLabel,
                bg: 'bg-slate-100',
                text: 'text-slate-700',
                border: 'border-slate-200',
                icon: Inbox,
              };
              const PageIcon = meta.icon;
              const dt = formatDateTime(sub.submissionDate);

              return (
                <div
                  key={sub.id}
                  className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-3 hover:border-slate-300 transition-all"
                >
                  {/* Top Bar: Particular Page Badge & Status & Time */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-[11px] font-bold border ${meta.bg} ${meta.text} ${meta.border}`}
                        >
                          <PageIcon className="w-3 h-3" />
                          <span>{meta.label}</span>
                          {meta.route && (
                            <span className="opacity-75 font-mono text-[9.5px]">({meta.route})</span>
                          )}
                        </span>

                        <span className="text-[10px] font-mono text-slate-400">
                          {sub.id}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-[#0B2545] font-display">
                        {sub.subject || sub.formTitle}
                      </h4>
                    </div>

                    {/* Status Pill with quick change */}
                    <div className="shrink-0 text-right">
                      <select
                        value={sub.status}
                        onChange={(e) => handleQuickStatusChange(sub.id, e.target.value as any)}
                        className={`text-[11px] px-2.5 py-1 rounded-lg border focus:outline-hidden cursor-pointer ${getStatusBadge(
                          sub.status
                        )}`}
                      >
                        <option value="New">● New</option>
                        <option value="In Review">● In Review</option>
                        <option value="Contacted">● Contacted</option>
                        <option value="Action Taken">● Action Taken</option>
                        <option value="Archived">● Archived</option>
                      </select>
                      <div className="text-[10px] text-slate-400 mt-1 font-mono">
                        {dt.date} {dt.time}
                      </div>
                    </div>
                  </div>

                  {/* Sender Contact Strip */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                    <div className="font-bold text-slate-900 flex items-center justify-between">
                      <span>{sub.senderName}</span>
                      {sub.organizationOrCollege && (
                        <span className="text-[11px] font-normal text-slate-500 truncate max-w-[180px]">
                          {sub.organizationOrCollege}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-slate-600 text-[11px]">
                      <span className="text-slate-500">{sub.senderEmail}</span>
                      {sub.senderPhone && (
                        <span className="font-mono text-teal-700">{sub.senderPhone}</span>
                      )}
                    </div>
                  </div>

                  {/* Message Preview */}
                  {sub.message && (
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      &quot;{sub.message}&quot;
                    </p>
                  )}

                  {/* Mobile Action Dock: 1-Tap Dial, WhatsApp, Email, View Details */}
                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-1.5">
                      {sub.senderPhone && (
                        <>
                          <a
                            href={`tel:${sub.senderPhone.replace(/\s+/g, '')}`}
                            className="p-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
                            title={`Call ${sub.senderName}`}
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </a>
                          <a
                            href={`https://wa.me/${sub.senderPhone.replace(/[^\d]/g, '')}?text=Hello%20${encodeURIComponent(
                              sub.senderName
                            )},%20regarding%20your%20inquiry%20to%20Silphor%20Technologies`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
                            title="Chat on WhatsApp"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                          </a>
                        </>
                      )}
                      <a
                        href={`mailto:${sub.senderEmail}?subject=Re:%20${encodeURIComponent(
                          sub.subject || 'Silphor Technologies Inquiry'
                        )}`}
                        className="p-2 rounded-xl bg-sky-50 text-sky-700 hover:bg-sky-100 transition-colors"
                        title={`Email ${sub.senderName}`}
                      >
                        <Mail className="w-3.5 h-3.5" />
                      </a>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setDeleteTargetId(sub.id)}
                        className="p-2 text-slate-400 hover:text-rose-600 rounded-xl hover:bg-rose-50 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => setActiveSubmission(sub)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-[#00828A] hover:bg-[#007077] text-white text-xs font-bold rounded-xl shadow-2xs transition-all"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect Payload</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ======================================================== */}
          {/* VIEW MODE 2: DESKTOP DATA TABLE (Visible on larger screens, or if mode is 'desktop') */}
          {/* ======================================================== */}
          <div
            className={`bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs ${
              deviceViewMode === 'mobile' ? 'hidden' : deviceViewMode === 'desktop' ? 'block' : 'hidden lg:block'
            }`}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Tracking ID & Date</th>
                    <th className="py-3 px-4">Particular Page Source</th>
                    <th className="py-3 px-4">Sender & Organization</th>
                    <th className="py-3 px-4">Subject & Requirements</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Priority</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredSubmissions.map((sub) => {
                    const meta = pageSourceMeta[sub.pageSource] || {
                      label: sub.pageLabel,
                      bg: 'bg-slate-100',
                      text: 'text-slate-700',
                      border: 'border-slate-200',
                      icon: Inbox,
                    };
                    const PageIcon = meta.icon;
                    const dt = formatDateTime(sub.submissionDate);

                    return (
                      <tr key={sub.id} className="hover:bg-slate-50/60 transition-colors">
                        {/* ID & Date */}
                        <td className="py-3.5 px-4 font-mono whitespace-nowrap">
                          <div className="font-bold text-[#0B2545]">{sub.id}</div>
                          <div className="text-[10px] text-slate-400">
                            {dt.date} &bull; {dt.time}
                          </div>
                        </td>

                        {/* Particular Page Source */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold border ${meta.bg} ${meta.text} ${meta.border}`}
                          >
                            <PageIcon className="w-3 h-3" />
                            <span>{meta.label}</span>
                            {meta.route && (
                              <span className="opacity-75 font-mono text-[9.5px]">({meta.route})</span>
                            )}
                          </span>
                        </td>

                        {/* Sender & Organization */}
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-slate-900">{sub.senderName}</div>
                          <div className="text-slate-500 text-[11px] truncate max-w-[200px]">
                            {sub.organizationOrCollege || sub.senderEmail}
                          </div>
                          {sub.senderPhone && (
                            <div className="text-[10px] font-mono text-teal-700 mt-0.5">
                              {sub.senderPhone}
                            </div>
                          )}
                        </td>

                        {/* Subject & Preview */}
                        <td className="py-3.5 px-4 max-w-xs">
                          <div className="font-semibold text-slate-800 truncate">
                            {sub.subject || sub.formTitle}
                          </div>
                          {sub.message && (
                            <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                              {sub.message}
                            </p>
                          )}
                        </td>

                        {/* Status Dropdown */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <select
                            value={sub.status}
                            onChange={(e) => handleQuickStatusChange(sub.id, e.target.value as any)}
                            className={`text-[11px] px-2.5 py-1 rounded-lg border focus:outline-hidden cursor-pointer ${getStatusBadge(
                              sub.status
                            )}`}
                          >
                            <option value="New">● New</option>
                            <option value="In Review">● In Review</option>
                            <option value="Contacted">● Contacted</option>
                            <option value="Action Taken">● Action Taken</option>
                            <option value="Archived">● Archived</option>
                          </select>
                        </td>

                        {/* Priority */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-full border font-bold ${getPriorityBadge(
                              sub.priority
                            )}`}
                          >
                            {sub.priority}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            {sub.senderPhone && (
                              <a
                                href={`tel:${sub.senderPhone.replace(/\s+/g, '')}`}
                                className="p-1.5 text-slate-400 hover:text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors"
                                title="Call"
                              >
                                <Phone className="w-3.5 h-3.5" />
                              </a>
                            )}
                            <a
                              href={`mailto:${sub.senderEmail}`}
                              className="p-1.5 text-slate-400 hover:text-sky-600 rounded-lg hover:bg-sky-50 transition-colors"
                              title="Email"
                            >
                              <Mail className="w-3.5 h-3.5" />
                            </a>
                            <button
                              onClick={() => setActiveSubmission(sub)}
                              className="px-2.5 py-1 bg-slate-100 hover:bg-[#00828A] hover:text-white text-slate-700 rounded-lg font-semibold transition-all flex items-center gap-1 cursor-pointer"
                              title="Inspect full form payload"
                            >
                              <Eye className="w-3 h-3" />
                              <span>View</span>
                            </button>
                            <button
                              onClick={() => setDeleteTargetId(sub.id)}
                              className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Table Footer Summary */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between text-xs text-slate-500">
              <div>
                Showing <strong>{filteredSubmissions.length}</strong> of{' '}
                <strong>{totalCount}</strong> total stored form submissions
              </div>
              <div className="flex items-center gap-2">
                <span>Filter: <strong>{selectedPageFilter === 'all' ? 'All Pages' : pageSourceMeta[selectedPageFilter as FormPageSource]?.label || selectedPageFilter}</strong></span>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ======================================================== */}
      {/* MODAL 1: FULL SUBMISSION PAYLOAD & ADMINISTRATIVE NOTES */}
      {/* ======================================================== */}
      {activeSubmission && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
            {/* Modal Header */}
            <div className="p-5 sm:p-6 bg-[#0B2545] text-white flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full bg-teal-500/20 text-[#38BDF8] border border-teal-500/30 text-[11px] font-mono font-bold">
                    {activeSubmission.id}
                  </span>
                  <span className="text-xs text-slate-300">
                    Received on {new Date(activeSubmission.submissionDate).toLocaleString()}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold font-display text-white">
                  {activeSubmission.formTitle}
                </h3>
                <div className="flex flex-wrap items-center gap-2 text-xs text-teal-300">
                  <div className="flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5" />
                    <span>Particular Page Section: <strong>{pageSourceMeta[activeSubmission.pageSource]?.label || activeSubmission.pageLabel}</strong></span>
                  </div>
                  {pageSourceMeta[activeSubmission.pageSource]?.route && (
                    <span className="px-2 py-0.5 rounded bg-white/10 text-teal-200 border border-teal-500/30 font-mono text-[10px]">
                      {pageSourceMeta[activeSubmission.pageSource].route}
                    </span>
                  )}
                </div>
              </div>

              <button
                onClick={() => setActiveSubmission(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-xl bg-white/10 hover:bg-white/20 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 space-y-6 overflow-y-auto flex-1 text-xs">
              {/* 1. SENDER CONTACT CARD */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Lead & Contact Profile
                  </span>
                  <div className="flex items-center gap-2">
                    {activeSubmission.senderPhone && (
                      <a
                        href={`tel:${activeSubmission.senderPhone.replace(/\s+/g, '')}`}
                        className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-semibold flex items-center gap-1 hover:bg-emerald-700 transition-colors"
                      >
                        <Phone className="w-3 h-3" />
                        <span>Dial</span>
                      </a>
                    )}
                    {activeSubmission.senderPhone && (
                      <a
                        href={`https://wa.me/${activeSubmission.senderPhone.replace(/[^\d]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 font-semibold flex items-center gap-1 hover:bg-emerald-200 transition-colors"
                      >
                        <MessageSquare className="w-3 h-3" />
                        <span>WhatsApp</span>
                      </a>
                    )}
                    <a
                      href={`mailto:${activeSubmission.senderEmail}`}
                      className="px-2.5 py-1 rounded-lg bg-sky-100 text-sky-800 font-semibold flex items-center gap-1 hover:bg-sky-200 transition-colors"
                    >
                      <Mail className="w-3 h-3" />
                      <span>Email</span>
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Sender Legal Name</span>
                    <strong className="text-slate-900 text-sm">{activeSubmission.senderName}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Organization / College</span>
                    <span className="text-slate-800 font-medium">
                      {activeSubmission.organizationOrCollege || 'Not Provided'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Email Address</span>
                    <span className="text-slate-800 font-mono">{activeSubmission.senderEmail}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Mobile / WhatsApp</span>
                    <span className="text-slate-800 font-mono">
                      {activeSubmission.senderPhone || 'Not Provided'}
                    </span>
                  </div>
                </div>
              </div>

              {/* 2. SUBJECT & MESSAGE PAYLOAD */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Subject & Requisition Inquiry
                </span>
                <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
                  <h4 className="font-bold text-slate-900 text-sm">
                    {activeSubmission.subject || activeSubmission.formTitle}
                  </h4>
                  {activeSubmission.message ? (
                    <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                      {activeSubmission.message}
                    </p>
                  ) : (
                    <p className="text-slate-400 italic">No custom message body attached.</p>
                  )}
                </div>
              </div>

              {/* 3. STRUCTURED SUBMISSION PAYLOAD (All specific fields from that page) */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Form Specific Data Fields ({Object.keys(activeSubmission.formData || {}).length} Fields)
                </span>
                <div className="p-4 rounded-2xl bg-slate-900 text-slate-200 border border-slate-800 font-mono text-xs overflow-x-auto space-y-1.5">
                  {Object.keys(activeSubmission.formData || {}).length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {Object.entries(activeSubmission.formData).map(([k, v]) => (
                        <div key={k} className="p-2 rounded-lg bg-slate-800/80 border border-slate-700">
                          <span className="text-teal-400 text-[10px] uppercase block">{k}:</span>
                          <span className="text-white text-xs break-all">
                            {Array.isArray(v)
                              ? v.join(', ')
                              : typeof v === 'object' && v !== null
                              ? JSON.stringify(v)
                              : String(v)}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span className="text-slate-500 italic">Standard form payload stored.</span>
                  )}
                </div>
              </div>

              {/* 4. GOVERNANCE STATUS & ASSIGNED STAFF & NOTES */}
              <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal-900">
                    Administrative Governance & Next Action
                  </span>
                  <span className="text-[11px] text-teal-800">Operational Log</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[10px] font-semibold text-slate-600 block mb-1">
                      Current Status:
                    </label>
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value as any)}
                      className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg bg-white font-bold"
                    >
                      <option value="New">New</option>
                      <option value="In Review">In Review</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Action Taken">Action Taken</option>
                      <option value="Archived">Archived</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-semibold text-slate-600 block mb-1">
                      Priority Level:
                    </label>
                    <select
                      value={selectedPriority}
                      onChange={(e) => setSelectedPriority(e.target.value as any)}
                      className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg bg-white font-medium"
                    >
                      <option value="High">High Priority</option>
                      <option value="Medium">Medium Priority</option>
                      <option value="Low">Low Priority</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-semibold text-slate-600 block mb-1">
                      Assigned Staff:
                    </label>
                    <input
                      type="text"
                      value={assignedStaff}
                      onChange={(e) => setAssignedStaff(e.target.value)}
                      placeholder="e.g. FAE Desk / Placement Cell"
                      className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-semibold text-slate-600 block mb-1">
                    Internal Admin Notes & Follow-up Log:
                  </label>
                  <textarea
                    rows={3}
                    value={internalNotes}
                    onChange={(e) => setInternalNotes(e.target.value)}
                    placeholder="Record caller remarks, proposal dispatch date, NDA status, or next milestones..."
                    className="w-full p-2.5 text-xs border border-slate-300 rounded-lg bg-white focus:outline-hidden focus:ring-2 focus:ring-[#00828A]"
                  />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-100 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(JSON.stringify(activeSubmission, null, 2));
                  onNotify?.('Copied full submission JSON payload to clipboard!');
                }}
                className="flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-300 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-50 transition-all cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Raw JSON</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setDeleteTargetId(activeSubmission.id)}
                  className="px-3 py-1.5 text-rose-700 hover:bg-rose-100 text-xs font-semibold rounded-xl transition-all cursor-pointer"
                >
                  Delete
                </button>
                <button
                  onClick={handleSaveModalChanges}
                  className="px-5 py-2 bg-[#00828A] hover:bg-[#007077] text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer"
                >
                  Save Governance Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 2: SIMULATE / TEST FORM SUBMISSION FROM ANY PAGE */}
      {/* ======================================================== */}
      {simulatorOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700">
                  Verification Simulator
                </span>
                <h3 className="text-lg font-bold text-[#0B2545] font-display mt-0.5">
                  Simulate Form Submission from Any Particular Page
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Test and verify immediate real-time ingestion into the Administrative Portal.
                </p>
              </div>
              <button
                onClick={() => setSimulatorOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateTestSubmission} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Target Particular Page *
                </label>
                <select
                  value={simPage}
                  onChange={(e) => setSimPage(e.target.value as any)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-white font-bold text-slate-800"
                >
                  <option value="contact">Contact Us Page (/contact-us)</option>
                  <option value="industry">Industry & EDA Solutions (/industry)</option>
                  <option value="engineering-services">Engineering Services (/engineering-services)</option>
                  <option value="projects-internship">Projects & Internships (/projects-internship)</option>
                  <option value="registration">Course Registration (/registration)</option>
                  <option value="training">Training & Syllabus (/training)</option>
                  <option value="students">Student Portal & Placement (/students)</option>
                  <option value="resources">Resources & Technical Guides (/resources)</option>
                  <option value="about">About Us & Academic MoUs (/about-us)</option>
                  <option value="privacy-policy">Privacy & DPDP Data Rights (/privacy-policy)</option>
                  <option value="support-widget">Live Support Helpline Widget</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Sender Name *</label>
                  <input
                    type="text"
                    required
                    value={simName}
                    onChange={(e) => setSimName(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Sender Email *</label>
                  <input
                    type="email"
                    required
                    value={simEmail}
                    onChange={(e) => setSimEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Phone / Mobile</label>
                  <input
                    type="tel"
                    value={simPhone}
                    onChange={(e) => setSimPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Organization / College</label>
                  <input
                    type="text"
                    value={simOrg}
                    onChange={(e) => setSimOrg(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Subject / Requirement *</label>
                <input
                  type="text"
                  required
                  value={simSubject}
                  onChange={(e) => setSimSubject(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Message Body *</label>
                <textarea
                  rows={3}
                  required
                  value={simMessage}
                  onChange={(e) => setSimMessage(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSimulatorOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-800 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#00828A] hover:bg-[#007077] text-white font-bold rounded-xl shadow-xs"
                >
                  Inject Simulated Submission
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 3: DELETE CONFIRMATION */}
      {/* ======================================================== */}
      {deleteTargetId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 space-y-4 shadow-xl border border-slate-200">
            <div className="flex items-center gap-3 text-rose-600">
              <AlertCircle className="w-6 h-6 shrink-0" />
              <h4 className="font-bold text-slate-900 text-sm">Delete Form Submission?</h4>
            </div>
            <p className="text-xs text-slate-600">
              Are you sure you want to permanently delete submission{' '}
              <strong className="font-mono text-slate-900">{deleteTargetId}</strong>? This action cannot
              be undone.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setDeleteTargetId(null)}
                className="px-3.5 py-1.5 text-xs text-slate-600 hover:text-slate-800 font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteSubmission(deleteTargetId)}
                className="px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl"
              >
                Delete Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
