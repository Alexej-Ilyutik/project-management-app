import { useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface ReactPortalInterface {
  children: JSX.Element;
  wrapperId: string;
}

export function ReactPortal({ children, wrapperId }: ReactPortalInterface) {
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  useLayoutEffect(() => {
    setPortalRoot(document.getElementById(wrapperId) as HTMLElement);
    //remove after componentUnmount
  }, [wrapperId]);

  if (portalRoot === null) return null;

  return createPortal(children, portalRoot);
}
