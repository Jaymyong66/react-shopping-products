import { useCallback, useRef } from 'react';

interface Props {
  onIntersect: () => void;
  threshold?: number;
}

export const useInfinityScroll = ({ onIntersect, threshold = 0.1 }: Props) => {
  const observer = useRef<IntersectionObserver | null>(null);

  const lastProductElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            onIntersect();
          }
        },
        {
          threshold,
        },
      );
      if (node) observer.current.observe(node);
    },
    [onIntersect, threshold],
  );

  return { lastProductElementRef };
};
