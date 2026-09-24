import React, { useState } from 'react';
import { X, Check, Code2, Database, ShieldCheck, Cpu, Layers, ExternalLink, Copy } from 'lucide-react';
import { UserRole } from '../types';
import { DYNAMIC_NAV_CONFIG } from '../data/mockDatabase';

interface DynamicMenuGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeRole: UserRole;
  onSelectRole: (role: UserRole) => void;
}

export const DynamicMenuGuideModal: React.FC<DynamicMenuGuideModalProps> = ({
  isOpen,
  onClose,
  activeRole,
  onSelectRole,
}) => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'database' | 'backend-api' | 'frontend-react' | 'live-json'>('architecture');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const filteredMenuItems = DYNAMIC_NAV_CONFIG.filter((item) =>
    item.allowedRoles.includes(activeRole)
  );

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sampleBackendResponse = {
    status: 'success',
    timestamp: '2026-09-24T08:45:00Z',
    userContext: {
      role: activeRole,
      permissions:
        activeRole === 'admin'
          ? ['READ_ALL', 'WRITE_ALL', 'MANAGE_STUDENTS', 'ISSUE_CERTIFICATES', 'VIEW_FINANCES']
          : activeRole === 'trainer'
          ? ['VIEW_BATCHES', 'GRADE_ASSIGNMENTS', 'MARK_ATTENDANCE']
          : activeRole === 'student'
          ? ['VIEW_REGISTERED_COURSES', 'SUBMIT_ASSIGNMENTS', 'DOWNLOAD_CERTIFICATES']
          : ['PUBLIC_BROWSE', 'REGISTER_COURSE', 'REQUEST_TECH_QUOTE'],
    },
    navigation: filteredMenuItems.map((item) => ({
      id: item.id,
      label: item.label,
      route: `/${item.id}`,
      badge: item.badge || null,
      backendEndpoint: item.backendEndpoint,
      subItems: item.subItems?.map((s) => ({
        id: s.id,
        label: s.label,
        description: s.description,
        apiEndpoint: s.apiEndpoint || `${item.backendEndpoint}/${s.id}`,
      })),
    })),
  };

  const sqlSchema = `-- ============================================================
-- SILPHOR DYNAMIC NAVIGATION & RBAC SCHEMA (PostgreSQL / Cloud SQL)
-- ============================================================

CREATE TABLE roles (
    role_id VARCHAR(32) PRIMARY KEY,
    role_name VARCHAR(64) NOT NULL,
    description TEXT
);

INSERT INTO roles VALUES
('public', 'Anonymous Visitor', 'General public exploring courses & services'),
('student', 'Enrolled Student', 'Access to student LMS portal, video lectures, assignments'),
('trainer', 'Faculty / Trainer', 'Batch instructor with attendance and grading permissions'),
('enterprise', 'Corporate Client', 'Industrial vendor partner, engineering staffing client'),
('admin', 'System Administrator', 'Full administrative governance across all 11 modules');

CREATE TABLE navigation_menus (
    menu_id VARCHAR(64) PRIMARY KEY,
    parent_id VARCHAR(64) REFERENCES navigation_menus(menu_id) ON DELETE CASCADE,
    label VARCHAR(100) NOT NULL,
    route_path VARCHAR(255) NOT NULL,
    badge_label VARCHAR(32),
    sort_order INT NOT NULL DEFAULT 0,
    backend_endpoint VARCHAR(255),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE role_menu_permissions (
    role_id VARCHAR(32) REFERENCES roles(role_id) ON DELETE CASCADE,
    menu_id VARCHAR(64) REFERENCES navigation_menus(menu_id) ON DELETE CASCADE,
    can_view BOOLEAN NOT NULL DEFAULT TRUE,
    can_execute BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (role_id, menu_id)
);

-- Fast Index for real-time menu rendering based on user token role
CREATE INDEX idx_menu_perm_role ON role_menu_permissions(role_id, can_view);
CREATE INDEX idx_menu_parent_order ON navigation_menus(parent_id, sort_order);`;

  const nodeExpressCode = `// ============================================================
// Express / Node.js Dynamic Navigation Route Handler
// ============================================================
import express, { Request, Response } from 'express';
import { verifyAuthToken } from '../middleware/auth';
import { db } from '../db';

const router = express.Router();

/**
 * GET /api/v1/navigation/menu
 * Returns dynamic menu hierarchy tailored to authenticated caller's role
 */
router.get('/api/v1/navigation/menu', async (req: Request, res: Response) => {
  try {
    // 1. Resolve role from JWT token or fallback to 'public'
    const token = req.headers.authorization?.split(' ')[1];
    const user = token ? verifyAuthToken(token) : null;
    const role = user?.role || 'public';

    // 2. Query active menus authorized for this role with parent-child nesting
    const query = \`
      SELECT 
        m.menu_id, m.parent_id, m.label, m.route_path, 
        m.badge_label, m.backend_endpoint, m.sort_order
      FROM navigation_menus m
      JOIN role_menu_permissions rmp ON m.menu_id = rmp.menu_id
      WHERE rmp.role_id = $1 AND rmp.can_view = TRUE AND m.is_active = TRUE
      ORDER BY m.sort_order ASC
    \`;
    const result = await db.query(query, [role]);

    // 3. Assemble nested JSON tree
    const rootMenus = result.rows.filter(r => !r.parent_id);
    const tree = rootMenus.map(parent => ({
      id: parent.menu_id,
      label: parent.label,
      route: parent.route_path,
      badge: parent.badge_label,
      backendEndpoint: parent.backend_endpoint,
      subItems: result.rows
        .filter(child => child.parent_id === parent.menu_id)
        .map(child => ({
          id: child.menu_id,
          label: child.label,
          route: child.route_path,
          apiEndpoint: child.backend_endpoint
        }))
    }));

    // 4. Return with Cache-Control headers (stale-while-revalidate for speed)
    res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=300');
    return res.json({ status: 'success', role, navigation: tree });
  } catch (error) {
    console.error('Failed to resolve dynamic menu:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;`;

  const reactHookCode = `// ============================================================
// React Dynamic Menu Hook & Navigation Renderer
// ============================================================
import React, { createContext, useContext, useEffect, useState } from 'react';

export interface DynamicNavTree {
  id: string;
  label: string;
  route: string;
  badge?: string;
  backendEndpoint?: string;
  subItems?: { id: string; label: string; route: string; apiEndpoint?: string }[];
}

export function useDynamicNavigation(userRole: string) {
  const [navItems, setNavItems] = useState<DynamicNavTree[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchMenu() {
      setLoading(true);
      try {
        const res = await fetch('/api/v1/navigation/menu', {
          headers: {
            'Content-Type': 'application/json',
            ...(localStorage.getItem('token') && {
              Authorization: \`Bearer \${localStorage.getItem('token')}\`
            })
          }
        });
        const data = await res.json();
        setNavItems(data.navigation || []);
      } catch (err) {
        console.error('Fallback to local default nav', err);
      } finally {
        setLoading(false);
      }
    }

    fetchMenu();
  }, [userRole]);

  return { navItems, loading };
}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Header */}
        <div className="bg-[#0B2545] text-white p-6 border-b border-[#00828A]/30">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#00828A]/20 border border-[#00828A]/40 flex items-center justify-center text-[#38BDF8]">
                <Cpu className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                  Dynamic Navigation & Backend Integration Guide
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[#00828A] text-white font-mono">
                    RFC-2026.04
                  </span>
                </h2>
                <p className="text-sm text-slate-300 mt-0.5">
                  Complete technical specification for linking the dynamic menu with all 11 enterprise backend modules
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Role Filter & Simulator Bar */}
          <div className="mt-5 p-3 rounded-xl bg-[#06182C] border border-slate-700/60 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <ShieldCheck className="w-4 h-4 text-[#00828A]" />
              <span className="font-semibold text-white">Live Role Simulator:</span>
              <span>Test how menu adjusts dynamically based on caller identity:</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-900/80 p-1 rounded-lg border border-slate-700">
              {(['public', 'student', 'trainer', 'admin', 'enterprise'] as UserRole[]).map((role) => (
                <button
                  key={role}
                  onClick={() => onSelectRole(role)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded capitalize transition-colors ${
                    activeRole === role
                      ? 'bg-[#00828A] text-white shadow-xs'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-2 overflow-x-auto">
          {[
            { id: 'architecture', label: '1. Architecture & Flow', icon: Layers },
            { id: 'database', label: '2. Database Schema (SQL)', icon: Database },
            { id: 'backend-api', label: '3. Backend API (Express)', icon: Code2 },
            { id: 'frontend-react', label: '4. React Frontend Hook', icon: Cpu },
            { id: 'live-json', label: '5. Live Role Payload (JSON)', icon: ExternalLink },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold border-b-2 transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-[#00828A] text-[#0B2545] bg-white'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content Body */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {activeTab === 'architecture' && (
            <div className="space-y-6 text-sm text-slate-700">
              <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 text-sky-900">
                <h4 className="font-bold text-sky-950 mb-1">How Silphor Dynamic Navigation Connects to Backend Modules:</h4>
                <p>
                  Instead of hardcoding links in the header, navigation items are treated as <strong>dynamic resources</strong> fetched from the server.
                  This ensures that visitors, enrolled students, faculty trainers, enterprise corporate partners, and system admins only see the menus, submenus, and action buttons they are authorized to access.
                </p>
              </div>

              {/* 3 Step Integration Cycle */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
                  <div className="w-8 h-8 rounded-lg bg-[#0B2545] text-white flex items-center justify-center font-bold text-sm mb-3">
                    01
                  </div>
                  <h5 className="font-bold text-slate-900 mb-1">Auth & Role Resolution</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Client passes JWT token in the <code>Authorization: Bearer</code> header. The API gateway extracts <code>role: &apos;student&apos; | &apos;admin&apos; | &apos;trainer&apos;</code>.
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
                  <div className="w-8 h-8 rounded-lg bg-[#00828A] text-white flex items-center justify-center font-bold text-sm mb-3">
                    02
                  </div>
                  <h5 className="font-bold text-slate-900 mb-1">Dynamic Menu Filtering</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    PostgreSQL / Firestore evaluates permissions against <code>role_menu_permissions</code>, assembling authorized route targets and badge counts.
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
                  <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-sm mb-3">
                    03
                  </div>
                  <h5 className="font-bold text-slate-900 mb-1">Frontend Hydration</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    React TopBar renders the exact authorized menu items (Home, About, Industry, Technology, Engineering Services, Training, Students, Resources, Projects & Internship, Contact) with real-time badges.
                  </p>
                </div>
              </div>

              {/* 11 Module Mapping Matrix */}
              <div>
                <h4 className="font-bold text-slate-900 text-base mb-3">
                  Mapping: Top Menu Items &rarr; Backend Requirements Matrix
                </h4>
                <div className="overflow-x-auto border border-slate-200 rounded-xl">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                      <tr>
                        <th className="p-3">Menu Item</th>
                        <th className="p-3">Required Scope Addressed</th>
                        <th className="p-3">Backend Microservice / Route</th>
                        <th className="p-3">Access Control</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      <tr>
                        <td className="p-3 font-semibold text-[#0B2545]">1. Home & 2. About</td>
                        <td className="p-3">Public Website, Vision, Mission, Faculty profiles, Lab facilities</td>
                        <td className="p-3 font-mono text-slate-600">/api/v1/content/home, /api/v1/about</td>
                        <td className="p-3">All Roles</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-[#0B2545]">3. Industry</td>
                        <td className="p-3">Global distributors, Vendor directory, Product catalogue, Request Tech facility</td>
                        <td className="p-3 font-mono text-slate-600">/api/v1/vendors, /api/v1/products, /api/v1/enquiries</td>
                        <td className="p-3">Public, Enterprise, Admin</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-[#0B2545]">4. Technology</td>
                        <td className="p-3">VLSI, Semiconductor, Embedded, Power Electronics & Hardware overview</td>
                        <td className="p-3 font-mono text-slate-600">/api/v1/technology/domains</td>
                        <td className="p-3">All Roles</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-[#0B2545]">5. Engineering Services</td>
                        <td className="p-3">Skilled engineer staffing, FAE, Electronics/Design engineers, Requirement submission</td>
                        <td className="p-3 font-mono text-slate-600">/api/v1/staffing/requirements</td>
                        <td className="p-3">Public, Enterprise, Admin</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-[#0B2545]">6. Training</td>
                        <td className="p-3">Course catalog, detailed syllabus, batch selection, online registration & payment</td>
                        <td className="p-3 font-mono text-slate-600">/api/v1/courses, /api/v1/register, /api/v1/payment</td>
                        <td className="p-3">All Roles</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-[#0B2545]">7. Students</td>
                        <td className="p-3">Student Portal, LMS materials, videos, quizzes, attendance, certificates, FDP/SDP</td>
                        <td className="p-3 font-mono text-slate-600">/api/v1/students/portal, /api/v1/lms</td>
                        <td className="p-3">Student, Trainer, Admin</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-[#0B2545]">8. Resources</td>
                        <td className="p-3">EDA & FPGA setup guides, Blog/Technical articles, FAQs, Downloadable manuals</td>
                        <td className="p-3 font-mono text-slate-600">/api/v1/resources/library, /api/v1/faqs</td>
                        <td className="p-3">All Roles</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-[#0B2545]">9. Projects & Internship</td>
                        <td className="p-3">Capstone tape-out projects, summer/winter internships, project submission</td>
                        <td className="p-3 font-mono text-slate-600">/api/v1/internships, /api/v1/projects</td>
                        <td className="p-3">Students, Public, Admin</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-[#0B2545]">10. Contact</td>
                        <td className="p-3">Inquiry dispatch, Google Maps integration, office contacts, automated notifications</td>
                        <td className="p-3 font-mono text-slate-600">/api/v1/contact/submit</td>
                        <td className="p-3">All Roles</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'database' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 font-mono">schema.sql (PostgreSQL / Relational ORM)</span>
                <button
                  onClick={() => copyToClipboard(sqlSchema)}
                  className="flex items-center gap-1.5 text-xs text-[#00828A] font-semibold hover:underline"
                >
                  <Copy className="w-3.5 h-3.5" />
                  {copied ? 'Copied!' : 'Copy SQL Script'}
                </button>
              </div>
              <pre className="p-4 bg-slate-900 text-emerald-400 font-mono text-xs rounded-xl overflow-x-auto leading-relaxed border border-slate-800">
                {sqlSchema}
              </pre>
            </div>
          )}

          {activeTab === 'backend-api' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 font-mono">routes/navigation.ts (Node.js & Express)</span>
                <button
                  onClick={() => copyToClipboard(nodeExpressCode)}
                  className="flex items-center gap-1.5 text-xs text-[#00828A] font-semibold hover:underline"
                >
                  <Copy className="w-3.5 h-3.5" />
                  {copied ? 'Copied!' : 'Copy Route Handler'}
                </button>
              </div>
              <pre className="p-4 bg-slate-900 text-sky-300 font-mono text-xs rounded-xl overflow-x-auto leading-relaxed border border-slate-800">
                {nodeExpressCode}
              </pre>
            </div>
          )}

          {activeTab === 'frontend-react' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 font-mono">hooks/useDynamicNavigation.ts (React TypeScript)</span>
                <button
                  onClick={() => copyToClipboard(reactHookCode)}
                  className="flex items-center gap-1.5 text-xs text-[#00828A] font-semibold hover:underline"
                >
                  <Copy className="w-3.5 h-3.5" />
                  {copied ? 'Copied!' : 'Copy React Hook'}
                </button>
              </div>
              <pre className="p-4 bg-slate-900 text-amber-300 font-mono text-xs rounded-xl overflow-x-auto leading-relaxed border border-slate-800">
                {reactHookCode}
              </pre>
            </div>
          )}

          {activeTab === 'live-json' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-slate-600">Simulated JSON response for role:</span>
                  <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-[#00828A] text-white uppercase">
                    {activeRole}
                  </span>
                </div>
                <button
                  onClick={() => copyToClipboard(JSON.stringify(sampleBackendResponse, null, 2))}
                  className="flex items-center gap-1.5 text-xs text-[#00828A] font-semibold hover:underline"
                >
                  <Copy className="w-3.5 h-3.5" />
                  {copied ? 'Copied!' : 'Copy JSON'}
                </button>
              </div>
              <pre className="p-4 bg-slate-950 text-emerald-400 font-mono text-xs rounded-xl overflow-x-auto leading-relaxed border border-slate-800">
                {JSON.stringify(sampleBackendResponse, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            Current Active Filter:{' '}
            <strong className="text-slate-800 capitalize">{activeRole} Mode</strong> &bull; Showing{' '}
            <strong className="text-[#00828A]">{filteredMenuItems.length}</strong> dynamic menu items
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold bg-[#0B2545] text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
