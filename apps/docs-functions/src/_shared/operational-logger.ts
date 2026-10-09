import { randomUUID } from 'node:crypto';

export type OperationalOutcome = 'cancelled' | 'failure';

export type OperationalLogger = {
    record: (stage: string, error: unknown, outcome: OperationalOutcome) => void;
};

export function createOperationalLogger(): OperationalLogger {
    const traceId = randomUUID().slice(0, 8);
    const startedAt = Date.now();

    return {
        record: (stage, error, outcome) => {
            console.error({
                traceId,
                stage,
                errorType: safeErrorType(error, outcome),
                durationMs: Date.now() - startedAt,
                outcome
            });
        }
    };
}

function safeErrorType(error: unknown, outcome: OperationalOutcome): string {
    if (outcome === 'cancelled') {
        return 'AbortError';
    }
    if (error instanceof TypeError) {
        return 'TypeError';
    }
    if (error instanceof RangeError) {
        return 'RangeError';
    }
    if (error instanceof SyntaxError) {
        return 'SyntaxError';
    }
    if (error instanceof Error) {
        return 'Error';
    }
    return typeof error;
}
