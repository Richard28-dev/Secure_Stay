import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export type AppRoute =
  | '/'
  | '/buy'
  | '/rent'
  | '/search'
  | '/property'
  | '/saved'
  | '/list-property'
  | '/about'
  | '/contact'
  | '/signin'
  | '/signup'
  | '/dashboard'
  | '/agent-dashboard'
  | '/privacy'
  | '/terms';

interface RouterContextType {
  currentPath: string;
  queryParams: Record<string, string>;
  propertyIdParam: string | null;
  navigate: (path: string, params?: Record<string, string | number | boolean>) => void;
  setQueryParam: (key: string, value: string | null) => void;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

export const RouterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return '/';
    return hash.split('?')[0] || '/';
  });

  const [queryParams, setQueryParams] = useState<Record<string, string>>(() => {
    const hash = window.location.hash.slice(1);
    const queryString = hash.includes('?') ? hash.split('?')[1] : '';
    const params = new URLSearchParams(queryString);
    const result: Record<string, string> = {};
    params.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  });

  const [propertyIdParam, setPropertyIdParam] = useState<string | null>(() => {
    const hash = window.location.hash.slice(1);
    const path = hash.split('?')[0] || '';
    if (path.startsWith('/property/')) {
      return path.replace('/property/', '');
    }
    return null;
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || '/';
      const pathPart = hash.split('?')[0] || '/';
      const queryString = hash.includes('?') ? hash.split('?')[1] : '';
      
      setCurrentPath(pathPart.startsWith('/property/') ? '/property' : pathPart);
      
      if (pathPart.startsWith('/property/')) {
        setPropertyIdParam(pathPart.replace('/property/', ''));
      } else {
        setPropertyIdParam(null);
      }

      const params = new URLSearchParams(queryString);
      const parsedParams: Record<string, string> = {};
      params.forEach((value, key) => {
        parsedParams[key] = value;
      });
      setQueryParams(parsedParams);

      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (path: string, params?: Record<string, string | number | boolean>) => {
    let fullHash = path;
    if (params && Object.keys(params).length > 0) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, val]) => {
        if (val !== undefined && val !== null && val !== '') {
          searchParams.set(key, String(val));
        }
      });
      const q = searchParams.toString();
      if (q) fullHash += `?${q}`;
    }
    window.location.hash = fullHash;
  };

  const setQueryParam = (key: string, value: string | null) => {
    const newParams = { ...queryParams };
    if (value === null || value === '') {
      delete newParams[key];
    } else {
      newParams[key] = value;
    }
    setQueryParams(newParams);

    const searchParams = new URLSearchParams();
    Object.entries(newParams).forEach(([k, v]) => {
      if (v) searchParams.set(k, v);
    });

    const basePath = propertyIdParam ? `/property/${propertyIdParam}` : currentPath;
    const qString = searchParams.toString();
    window.location.hash = qString ? `${basePath}?${qString}` : basePath;
  };

  return (
    <RouterContext.Provider
      value={{
        currentPath,
        queryParams,
        propertyIdParam,
        navigate,
        setQueryParam,
      }}
    >
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = (): RouterContextType => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
};
