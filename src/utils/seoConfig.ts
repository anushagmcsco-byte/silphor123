export interface PageSEOMetadata {
  title: string;
  description: string;
  keywords: string;
  ogImage: string;
  ogType?: 'website' | 'article';
  canonicalPath: string;
  schemaType?: string;
  jsonLd?: Record<string, any>;
}

export const SEO_CONFIG: Record<string, PageSEOMetadata> = {
  home: {
    title: 'Silphor Technologies | Semiconductor, VLSI & Industrial EDA Solutions',
    description: 'International bridge connecting global EDA tool vendors with Semiconductor, VLSI, Embedded, and Power Electronics engineering across India and worldwide.',
    keywords: 'Semiconductor, VLSI, EDA tools, ASIC design, SystemVerilog, FPGA, PCB design, Silphor Technologies Bangalore',
    ogImage: '/og-feature.png',
    canonicalPath: '/',
    ogType: 'website',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Silphor Technologies',
      url: 'https://silphor123-p8c5.vercel.app',
      logo: 'https://silphor123-p8c5.vercel.app/logo.jpg',
      image: 'https://silphor123-p8c5.vercel.app/og-feature.png',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '#45 East Road, Malleswaram',
        addressLocality: 'Bangalore',
        addressRegion: 'Karnataka',
        postalCode: '560003',
        addressCountry: 'IN',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+91 9876543210',
        contactType: 'customer service',
        availableLanguage: ['English', 'Kannada', 'Hindi'],
      },
    },
  },
  'terms-of-service': {
    title: 'Terms of Service | Silphor Technologies - Enterprise & Academic Licensing',
    description: 'Enterprise terms of service, cloud EDA workstation usage policies, student enrollment guidelines, IP protection, and Bengaluru jurisdiction regulations at Silphor Technologies.',
    keywords: 'Terms of service, EDA software licensing, student workstation policy, IP agreement, Silphor Technologies terms',
    ogImage: '/og/og-terms-of-service.png',
    canonicalPath: '/terms-of-service',
    ogType: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Terms of Service',
      description: 'Enterprise and academic terms of service for Silphor Technologies.',
      publisher: {
        '@type': 'Organization',
        name: 'Silphor Technologies',
      },
    },
  },
  'privacy-policy': {
    title: 'Privacy Policy | Silphor Technologies - DPDP Act 2023 & Security Protocols',
    description: 'Comprehensive data protection policy adhering to the India Digital Personal Data Protection (DPDP) Act 2023, GDPR, credential encryption, and cloud EDA session security.',
    keywords: 'Privacy policy, DPDP Act 2023, student data protection, ISO 27001 compliance, Silphor Technologies privacy',
    ogImage: '/og/og-privacy-policy.png',
    canonicalPath: '/privacy-policy',
    ogType: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Privacy Policy',
      description: 'Data protection and user rights policy of Silphor Technologies.',
      publisher: {
        '@type': 'Organization',
        name: 'Silphor Technologies',
      },
    },
  },
  about: {
    title: 'About Us | Silphor Technologies - Bridging Semiconductor Innovation',
    description: 'Discover Silphor Technologies\' founding mission, executive leadership, high-performance computing labs, and global alliances with semiconductor leaders.',
    keywords: 'About Silphor Technologies, semiconductor training Bangalore, Malleswaram engineering labs, VLSI faculty',
    ogImage: '/og/og-about.png',
    canonicalPath: '/about-us',
    ogType: 'website',
  },
  industry: {
    title: 'Industry Solutions & EDA Tool Distribution | Silphor Technologies',
    description: 'Official corporate partner and distributor for tier-1 Electronic Design Automation (EDA) tools, FPGA boards, and semiconductor verification software in India.',
    keywords: 'EDA tool distributor India, Synopsys Cadence partner, FPGA evaluation boards, silicon IP verification',
    ogImage: '/og/og-industry.png',
    canonicalPath: '/industry',
    ogType: 'website',
  },
  technology: {
    title: 'Silicon Technology & Engineering Stack | Silphor Technologies',
    description: 'Deep dive into 3nm/5nm FinFET designs, RISC-V SoC architectures, high-speed multi-layer PCB design, and mixed-signal verification workflows.',
    keywords: 'FinFET 3nm, RISC-V design, SystemVerilog UVM, PCIe Gen5, high speed PCB layout',
    ogImage: '/og/og-technology.png',
    canonicalPath: '/technology',
    ogType: 'website',
  },
  'engineering-services': {
    title: 'Engineering Staffing & Strategic Talent Services | Silphor Technologies',
    description: 'Pre-vetted, industry-ready VLSI, embedded hardware, and physical design engineers for top semiconductor multinationals and design houses.',
    keywords: 'VLSI staffing, semiconductor recruitment India, contract RTL engineers, embedded firmware developers',
    ogImage: '/og/og-engineering-services.png',
    canonicalPath: '/engineering-services',
    ogType: 'website',
  },
  training: {
    title: 'VLSI & Semiconductor Certification Programs | Silphor Technologies',
    description: 'Intensive hands-on training with cloud EDA workstation access, real silicon tapeout simulation, and guaranteed placement assistance.',
    keywords: 'VLSI course Bangalore, ASIC physical design training, SystemVerilog UVM classes, PCB design course',
    ogImage: '/og/og-training.png',
    canonicalPath: '/training',
    ogType: 'website',
  },
  students: {
    title: 'Student LMS & Cloud EDA Workstations | Silphor Technologies',
    description: 'Access cloud Linux EDA workstation pods, track academic progress, review lab coursework, and inspect certified completion credentials.',
    keywords: 'Student portal, cloud EDA workstation, VLSI LMS, certificate verification, Silphor student',
    ogImage: '/og/og-students.png',
    canonicalPath: '/students',
    ogType: 'website',
  },
  resources: {
    title: 'Semiconductor Resources & EDA Setup Guides | Silphor Technologies',
    description: 'Free technical resources, Linux EDA tool setup walk-throughs, SystemVerilog quick references, and industry whitepapers.',
    keywords: 'EDA tool installation guide, Linux EDA setup, SystemVerilog cheat sheet, VLSI whitepapers',
    ogImage: '/og/og-resources.png',
    canonicalPath: '/resources',
    ogType: 'website',
  },
  'projects-internship': {
    title: 'Industry Projects & VLSI Internships | Silphor Technologies',
    description: 'Hands-on experiential learning on real tapeout chips, PCIe controllers, and AI accelerators under veteran silicon architects.',
    keywords: 'VLSI internship Bangalore, semiconductor project, tapeout internship, FPGA accelerator design',
    ogImage: '/og/og-projects-internship.png',
    canonicalPath: '/projects-internship',
    ogType: 'website',
  },
  contact: {
    title: 'Contact Us | Silphor Technologies - Malleswaram, Bangalore',
    description: 'Get in touch with Silphor Technologies headquarters at #45 East Road, Malleswaram, Bangalore. Phone: +91 9876543210. WhatsApp and official email support available.',
    keywords: 'Silphor contact, Bangalore semiconductor office, Malleswaram East Road, WhatsApp support +919876543210',
    ogImage: '/og/og-contact.png',
    canonicalPath: '/contact-us',
    ogType: 'website',
  },
  registration: {
    title: 'Admissions & Course Enrollment | Silphor Technologies',
    description: 'Apply for upcoming cohorts in Advanced VLSI Design, SystemVerilog/UVM, Embedded Linux, and PCB layout. Instant seat reservation and scholarship evaluations.',
    keywords: 'Enroll VLSI course, register semiconductor batch, Silphor admissions, engineering scholarship',
    ogImage: '/og/og-registration.png',
    canonicalPath: '/registration',
    ogType: 'website',
  },
  admin: {
    title: 'Operations Console & Management Portal | Silphor Technologies',
    description: 'Administrative command center for student registrations, payment reconciliation, course catalog management, and certificate verification registry.',
    keywords: 'Admin console, management portal, student admissions CRUD, operations dashboard',
    ogImage: '/og/og-admin.png',
    canonicalPath: '/admin',
    ogType: 'website',
  },
  'admin-panel': {
    title: 'Operations Console & Management Portal | Silphor Technologies',
    description: 'Administrative command center for student registrations, payment reconciliation, course catalog management, and certificate verification registry.',
    keywords: 'Admin console, management portal, student admissions CRUD, operations dashboard',
    ogImage: '/og/og-admin.png',
    canonicalPath: '/admin-panel',
    ogType: 'website',
  },
  'admin-login': {
    title: 'Administrator Secure Login | Silphor Technologies',
    description: 'Secure TLS 256-bit encrypted authentication gateway for Silphor Technologies academic registrars, system administrators, and finance controllers.',
    keywords: 'Admin login, single sign on, 2FA security, enterprise authentication',
    ogImage: '/og/og-admin.png',
    canonicalPath: '/admin-login',
    ogType: 'website',
  },
};

/**
 * Updates dynamic meta tags, OpenGraph properties, Twitter cards, and Schema.org structured data.
 */
export function updatePageSEO(tabId: string) {
  const meta = SEO_CONFIG[tabId] || SEO_CONFIG.home;

  // 1. Title
  document.title = meta.title;

  // Helper to set or create a meta tag
  const setMetaTag = (attribute: 'name' | 'property', key: string, content: string) => {
    let element = document.querySelector(`meta[${attribute}="${key}"]`);
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(attribute, key);
      document.head.appendChild(element);
    }
    element.setAttribute('content', content);
  };

  // Helper to set link tags
  const setLinkTag = (rel: string, href: string) => {
    let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', rel);
      document.head.appendChild(link);
    }
    link.setAttribute('href', href);
  };

  // 2. Standard Meta
  setMetaTag('name', 'description', meta.description);
  setMetaTag('name', 'keywords', meta.keywords);
  setMetaTag('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
  setMetaTag('name', 'author', 'Silphor Technologies');

  // 3. Open Graph
  const origin = window.location.origin;
  const fullOgImageUrl = meta.ogImage.startsWith('http') ? meta.ogImage : `${origin}${meta.ogImage}`;
  const fullCanonicalUrl = `${origin}${meta.canonicalPath}`;

  setMetaTag('property', 'og:title', meta.title);
  setMetaTag('property', 'og:description', meta.description);
  setMetaTag('property', 'og:image', fullOgImageUrl);
  setMetaTag('property', 'og:image:secure_url', fullOgImageUrl);
  setMetaTag('property', 'og:image:type', 'image/png');
  setMetaTag('property', 'og:image:width', '1200');
  setMetaTag('property', 'og:image:height', '630');
  setMetaTag('property', 'og:image:alt', `${meta.title} - Silphor Technologies`);
  setMetaTag('property', 'og:url', fullCanonicalUrl);
  setMetaTag('property', 'og:type', meta.ogType || 'website');
  setMetaTag('property', 'og:site_name', 'Silphor Technologies');
  setMetaTag('property', 'og:locale', 'en_US');

  // 4. Twitter Cards
  setMetaTag('name', 'twitter:card', 'summary_large_image');
  setMetaTag('name', 'twitter:site', '@SilphorTech');
  setMetaTag('name', 'twitter:creator', '@SilphorTech');
  setMetaTag('name', 'twitter:url', fullCanonicalUrl);
  setMetaTag('name', 'twitter:title', meta.title);
  setMetaTag('name', 'twitter:description', meta.description);
  setMetaTag('name', 'twitter:image', fullOgImageUrl);
  setMetaTag('name', 'twitter:image:alt', `${meta.title} - Silphor Technologies`);

  // 5. Canonical URL
  setLinkTag('canonical', fullCanonicalUrl);

  // 6. Schema.org JSON-LD Structured Data
  let jsonLdScript = document.getElementById('seo-jsonld') as HTMLScriptElement | null;
  if (!jsonLdScript) {
    jsonLdScript = document.createElement('script');
    jsonLdScript.id = 'seo-jsonld';
    jsonLdScript.type = 'application/ld+json';
    document.head.appendChild(jsonLdScript);
  }

  const structuredData = meta.jsonLd || {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: meta.title,
    description: meta.description,
    url: fullCanonicalUrl,
    image: fullOgImageUrl,
    publisher: {
      '@type': 'Organization',
      name: 'Silphor Technologies',
      logo: `${origin}/logo.jpg`,
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${origin}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: meta.title.split('|')[0].trim(),
          item: fullCanonicalUrl,
        },
      ],
    },
  };

  jsonLdScript.textContent = JSON.stringify(structuredData);
}
