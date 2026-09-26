import { MainNavId } from '../types';

export type AppNavTarget = 
  | MainNavId 
  | 'admin-panel' 
  | 'admin-login' 
  | 'student-login' 
  | 'trainer-login' 
  | 'enterprise-login' 
  | 'login' 
  | 'registration';

export const TAB_TO_PATH: Record<AppNavTarget, string> = {
  'home': '/',
  'about': '/about-us',
  'industry': '/industry',
  'technology': '/technology',
  'engineering-services': '/engineering-services',
  'training': '/training',
  'students': '/students',
  'resources': '/resources',
  'projects-internship': '/projects-internship',
  'contact': '/contact-us',
  'registration': '/registration',
  'admin-panel': '/admin-panel',
  'admin-login': '/admin-login',
  'student-login': '/student-login',
  'trainer-login': '/trainer-login',
  'enterprise-login': '/enterprise-login',
  'login': '/login',
  'terms-of-service': '/terms-of-service',
  'privacy-policy': '/privacy-policy',
};

/**
 * Parses current URL pathname to corresponding application view tab
 */
export function pathToTab(pathname: string): AppNavTarget {
  // Normalize pathname: remove trailing slash, lowercase, decode
  const cleanPath = decodeURIComponent(pathname || '')
    .toLowerCase()
    .replace(/\/+$/, '') || '/';

  switch (cleanPath) {
    case '':
    case '/':
    case '/home':
    case '/index':
    case '/index.html':
      return 'home';

    case '/about':
    case '/about-us':
    case '/aboutus':
    case '/about_us':
    case '/company':
      return 'about';

    case '/industry':
    case '/industry-solutions':
    case '/vendors':
    case '/distributors':
    case '/partners':
      return 'industry';

    case '/technology':
    case '/tech':
    case '/vlsi':
    case '/semiconductor':
    case '/embedded':
      return 'technology';

    case '/engineering-services':
    case '/engineering':
    case '/services':
    case '/staffing':
      return 'engineering-services';

    case '/training':
    case '/courses':
    case '/programs':
    case '/curriculum':
      return 'training';

    case '/students':
    case '/student':
    case '/student-portal':
    case '/portal':
    case '/lms':
      return 'students';

    case '/resources':
    case '/resource':
    case '/library':
    case '/faqs':
    case '/faq':
    case '/blog':
      return 'resources';

    case '/projects-internship':
    case '/projects':
    case '/internship':
    case '/internships':
      return 'projects-internship';

    case '/contact':
    case '/contact-us':
    case '/contactus':
    case '/reach-us':
    case '/support':
      return 'contact';

    case '/registration':
    case '/register':
    case '/apply':
    case '/enroll':
      return 'registration';

    case '/admin':
    case '/admin-panel':
    case '/admin/panel':
    case '/dashboard':
    case '/console':
      return 'admin-panel';

    case '/admin-login':
    case '/admin/login':
      return 'admin-login';

    case '/student-login':
    case '/student/login':
    case '/lms-login':
      return 'student-login';

    case '/trainer-login':
    case '/trainer/login':
    case '/faculty-login':
      return 'trainer-login';

    case '/enterprise-login':
    case '/partner-login':
    case '/corporate-login':
      return 'enterprise-login';

    case '/login':
    case '/signin':
    case '/auth':
      return 'login';

    case '/terms':
    case '/terms-of-service':
    case '/terms-and-conditions':
      return 'terms-of-service';

    case '/privacy':
    case '/privacy-policy':
      return 'privacy-policy';

    default:
      // Check prefix matching for sub-paths (e.g. /about/leadership, /training/vlsi)
      if (cleanPath.startsWith('/about')) return 'about';
      if (cleanPath.startsWith('/industry')) return 'industry';
      if (cleanPath.startsWith('/tech')) return 'technology';
      if (cleanPath.startsWith('/engineering') || cleanPath.startsWith('/service')) return 'engineering-services';
      if (cleanPath.startsWith('/train') || cleanPath.startsWith('/course')) return 'training';
      if (cleanPath.startsWith('/student')) return 'students';
      if (cleanPath.startsWith('/resource')) return 'resources';
      if (cleanPath.startsWith('/project') || cleanPath.startsWith('/intern')) return 'projects-internship';
      if (cleanPath.startsWith('/contact')) return 'contact';
      if (cleanPath.startsWith('/reg') || cleanPath.startsWith('/apply') || cleanPath.startsWith('/enroll')) return 'registration';
      if (cleanPath.startsWith('/admin-panel') || cleanPath === '/admin') return 'admin-panel';
      if (cleanPath.startsWith('/admin-login') || cleanPath === '/login') return 'admin-login';
      return 'home';
  }
}

/**
 * Returns the canonical URL path for a given tab
 */
export function getTabPath(tab: AppNavTarget): string {
  return TAB_TO_PATH[tab] || '/';
}
