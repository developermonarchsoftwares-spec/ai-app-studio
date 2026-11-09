/**
 * Error reporting utilities.
 * Logs errors to the console and can be extended to forward to any
 * monitoring service (e.g. Sentry) by replacing the body of `reportError`.
 */

/** Describe any thrown value as a human-readable string. */
function describeThrown(error: unknown): string {
  if (error instanceof Response) {
    return `Response ${error.status}${error.url ? ` at ${error.url}` : ""}`;
  }
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  const { message } = (error ?? {}) as { message?: unknown };
  if (typeof message === "string" && message.length > 0) return message;
  try {
    return JSON.stringify(error)?.slice(0, 2000) ?? String(error);
  } catch {
    return String(error);
  }
}

/**
 * Report an error caught by an error boundary.
 * Extend this function to forward errors to your preferred monitoring service.
 */
export function reportError(
  error: unknown,
  context: Record<string, unknown> = {},
): void {
  const message = describeThrown(error);
  const stack = error instanceof Error ? error.stack : undefined;
  console.error("[ErrorBoundary]", message, { stack, ...context });
}
