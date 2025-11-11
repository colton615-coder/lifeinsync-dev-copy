import { useEffect, useState } from 'react';

/**
 * iOS Device Detection Hook
 * Detects if the app is running on an iOS device (iPhone, iPad, iPod)
 * Useful for iOS-specific optimizations and feature detection
 */
export function useIsIOS(): boolean {
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if running in browser (not SSR)
    if (typeof window === 'undefined') return;

    // Detect iOS by checking user agent
    const userAgent = navigator.userAgent.toLowerCase();
    const isIOSDevice =
      /iphone|ipad|ipod/.test(userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1); // iPad on iPadOS 13+

    setIsIOS(isIOSDevice);
  }, []);

  return isIOS;
}

/**
 * iOS 16+ Notch Detection Hook
 * Detects if device has a notch (Dynamic Island on iPhone 14+)
 * Returns true if safe-area-inset-top > 0
 */
export function useHasIOSNotch(): boolean {
  const [hasNotch, setHasNotch] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check if CSS env(safe-area-inset-top) is available and > 0
    const checkNotch = () => {
      const style = getComputedStyle(document.documentElement);
      const safeAreaTop = style.getPropertyValue('--safe-area-inset-top');
      setHasNotch(safeAreaTop ? parseInt(safeAreaTop) > 0 : false);
    };

    checkNotch();
    window.addEventListener('resize', checkNotch);
    window.addEventListener('orientationchange', checkNotch);

    return () => {
      window.removeEventListener('resize', checkNotch);
      window.removeEventListener('orientationchange', checkNotch);
    };
  }, []);

  return hasNotch;
}

/**
 * Standalone utility to check if device is iOS
 * Can be called outside of React components
 */
export function isIOSDevice(): boolean {
  if (typeof navigator === 'undefined') return false;

  const userAgent = navigator.userAgent.toLowerCase();
  return (
    /iphone|ipad|ipod/.test(userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  );
}

/**
 * Standalone utility to check if device has notch
 * Can be called outside of React components
 */
export function hasIOSNotch(): boolean {
  if (typeof window === 'undefined' || typeof document === 'undefined') return false;

  // Check for safe-area-inset-top CSS environment variable
  const style = getComputedStyle(document.documentElement);
  const safeAreaTop = style.getPropertyValue('--safe-area-inset-top');
  return safeAreaTop ? parseInt(safeAreaTop) > 0 : false;
}
