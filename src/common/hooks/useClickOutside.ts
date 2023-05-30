import { useCallback, useEffect } from 'react';

type Element = HTMLElement | null;

export const useClickOutside = (elements: Element[], handler: any) => {
  const listener = useCallback(
    (e: any): void => {
      const target = e.target as HTMLElement;
      if (
        elements.every((element) => {
          return element && !element.contains(target);
        })
      ) {
        handler(e);
      }
    },
    [handler, elements]
  );

  useEffect(() => {
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [listener]);
};
