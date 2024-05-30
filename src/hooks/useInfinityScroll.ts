import { Dispatch, SetStateAction, useCallback, useRef } from 'react';

interface Props {
  hasMore: boolean;
  setPage: Dispatch<SetStateAction<number>>;
}

export const useInfinityScroll = ({ hasMore, setPage }: Props) => {
  const observer = useRef<IntersectionObserver | null>(null);

  const lastProductElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            setPage((prevPage) => prevPage + 1);
          }
        },
        {
          threshold: 0.1,
        },
      );
      if (node) observer.current.observe(node);
    },
    [hasMore, setPage],
  );

  return { lastProductElementRef };
};
