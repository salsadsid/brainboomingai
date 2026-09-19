import {
  privateRequestDataIntegration,
  scrubRequest,
} from "@/lib/sentryRequestData";
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  // Request bodies (visitors' text), cookies and IP headers stay out of every
  // event and transaction. See lib/sentryRequestData.ts.
  integrations: [privateRequestDataIntegration()],
  beforeSend: scrubRequest,
  beforeSendTransaction: scrubRequest,
  debug: false,
});
