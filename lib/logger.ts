import * as Sentry from "@sentry/nextjs";

export const logger = {
  error(message: string, error?: unknown, context?: Record<string, unknown>) {
    if (context) {
      Sentry.setContext("extra", context);
    }

    if (error instanceof Error) {
      Sentry.captureException(error, {
        extra: { message, ...context },
      });
    } else {
      Sentry.captureMessage(message, {
        level: "error",
        extra: { error, ...context },
      });
    }

    if (process.env.NODE_ENV === "development") {
      console.error(message, error, context);
    }
  },

  warn(message: string, context?: Record<string, unknown>) {
    Sentry.captureMessage(message, {
      level: "warning",
      extra: context,
    });

    if (process.env.NODE_ENV === "development") {
      console.warn(message, context);
    }
  },
};
