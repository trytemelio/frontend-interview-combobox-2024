import { useEffect } from 'react';

export const useClickAway = ({
  ref,
  handler,
}: {
  ref: React.RefObject<HTMLDivElement>;
  handler: (event: MouseEvent | TouchEvent) => void;
}) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};
