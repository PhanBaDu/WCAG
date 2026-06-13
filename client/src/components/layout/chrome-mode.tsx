'use client';

import { createContext, useContext, useLayoutEffect, useMemo, useState } from 'react';

type ChromeMode = 'default' | 'minimal';

type ChromeModeContextValue = {
  mode: ChromeMode;
  setMode: (mode: ChromeMode) => void;
};

const ChromeModeContext = createContext<ChromeModeContextValue | null>(null);

export function ChromeModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ChromeMode>('default');
  const value = useMemo(() => ({ mode, setMode }), [mode]);

  return <ChromeModeContext.Provider value={value}>{children}</ChromeModeContext.Provider>;
}

export function useChromeMode() {
  const context = useContext(ChromeModeContext);
  if (!context) {
    throw new Error('useChromeMode must be used within ChromeModeProvider');
  }
  return context;
}

export function SetChromeMode({ mode }: { mode: ChromeMode }) {
  const { setMode } = useChromeMode();

  useLayoutEffect(() => {
    setMode(mode);
    return () => setMode('default');
  }, [mode, setMode]);

  return null;
}
