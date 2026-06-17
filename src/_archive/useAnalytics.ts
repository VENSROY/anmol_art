import { useEffect } from "react";
import ReactGA from "react-ga4";
import type { AnalyticsEvent } from "../types";

const TRACKING_ID = import.meta.env.VITE_GA_ID;

export function useAnalytics(): void {
  useEffect(() => {
    if (TRACKING_ID) {
      ReactGA.initialize(TRACKING_ID);
    }
  }, []);
}

export function trackEvent(event: AnalyticsEvent): void {
  if (TRACKING_ID) {
    ReactGA.event({
      category: event.category,
      action: event.action,
      label: event.label,
      value: event.value,
    });
  }
}

export function trackPageView(path: string): void {
  if (TRACKING_ID) {
    ReactGA.send({
      hitType: "pageview",
      page: path,
    });
  }
}