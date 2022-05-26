import { useEffect } from "react";

export function useListener(
  eventName: string,
  func: ((e: Event) => void) | ((e: CustomEvent<any>) => void),
  targetEl?: HTMLElement
) {
  useEffect(() => {
    const realTarget = targetEl ?? document.body;
    realTarget.addEventListener(
      eventName,
      func as EventListenerOrEventListenerObject
    );
    return () => {
      realTarget.removeEventListener(
        eventName,
        func as EventListenerOrEventListenerObject
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventName]);
}
