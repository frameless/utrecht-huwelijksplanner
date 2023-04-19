import Router from 'next/router';

// Remote procedure call (RPC) for tracking events with Matomo
type MatomoRPC = string[];

declare global {
  interface Window {
    _paq?: MatomoRPC[];
  }
}

interface MatomoConfig {
  url: string;
  siteId?: string | number;
}

// Documentation for Next.js Router:
// https://nextjs.org/docs/api-reference/next/router
export const matomo = ({ url, siteId }: MatomoConfig): void => {
  const _paq = (window['_paq'] = window['_paq'] || []);
  let currentPath = location.pathname;
  const rpc = (...args: MatomoRPC) => {
    _paq.push([...args]);
  };

  rpc('setTrackerUrl', `${url}matomo.php`);
  rpc('setSiteId', String(siteId));

  rpc('trackPageView');
  rpc('enableLinkTracking');

  const script = document.createElement('script'),
    head = document.getElementsByTagName('head')[0];
  script.async = true;
  script.src = `${url}matomo.js`;
  head.insertBefore(script, head.firstChild);

  Router.events.on('routeChangeError', (err): void => {
    if (!err.cancelled) {
      rpc('setDocumentTitle', document.title);
      rpc('trackPageView');
    }
  });

  Router.events.on('routeChangeStart', (path: string): void => {
    const pathname = path.replace(/\?.+/, '');

    if (currentPath) {
      rpc('setReferrerUrl', `${currentPath}`);
    }
    currentPath = pathname;
    rpc('setCustomUrl', pathname);
    rpc('deleteCustomVariables', 'page');
  });

  Router.events.on('routeChangeComplete', (): void => {
    // Wait until rendering of new <title> is complete
    setTimeout(() => {
      rpc('setDocumentTitle', document.title);
      rpc('trackPageView');
    }, 0);
  });
};

export default matomo;
