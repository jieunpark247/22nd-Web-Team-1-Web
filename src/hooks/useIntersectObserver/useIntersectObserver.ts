// reference: https://usehooks-ts.com/react-hook/use-intersection-observer
import { useRef, useEffect, useState, useCallback } from 'react';

interface Args extends IntersectionObserverInit {
  /**
   * 한 번 보여진 이후에 비활성화 할지 여부
   * @default false
   */
  freezeOnceVisible?: boolean;
  /**
   * intersecting인 상태에서 실행할 콜백 (useCallback으로 감싸서 넘겨주는 것이 권장됨)
   */
  onIntersect?: (entry: IntersectionObserverEntry, observer: IntersectionObserver) => void;
}

const useIntersectionObserver = <T extends HTMLElement>(args: Args = {}) => {
  const { threshold = 0, root = null, rootMargin = '0%', freezeOnceVisible = false, onIntersect } = args;

  const ref = useRef<T | null>(null);

  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  const frozen = entry?.isIntersecting && freezeOnceVisible;

  const callback = useCallback(
    ([entry]: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      setEntry(entry);
      if (entry.isIntersecting && !frozen) {
        onIntersect?.(entry, observer);
      }
    },
    [onIntersect, frozen],
  );

  useEffect(() => {
    const node = ref?.current; // DOM Ref

    if (frozen || !node) return;

    const observerParams = { threshold, root, rootMargin };
    const observer = new IntersectionObserver(callback, observerParams);

    observer.observe(node);

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(threshold), root, rootMargin, frozen, callback]);

  return [ref, entry] as const;
};

export default useIntersectionObserver;
