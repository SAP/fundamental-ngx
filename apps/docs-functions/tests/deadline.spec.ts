import { withDeadline } from '../src/_shared/deadline';

type DeadlineOperation<T> = (signal: AbortSignal) => PromiseLike<T>;

const invokeWithDeadline = withDeadline as unknown as <T>(
    operation: DeadlineOperation<T>,
    milliseconds: number,
    parentSignal: AbortSignal
) => Promise<T>;

describe('withDeadline', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('passes a deadline-owned signal to the operation and aborts it exactly at ten seconds', async () => {
        const parent = new AbortController();
        let operationSignal: AbortSignal | undefined;
        let resolveLate!: (value: string) => void;
        const operation = new Promise<string>((resolve) => {
            resolveLate = resolve;
        });

        const settled = invokeWithDeadline(
            (signal) => {
                operationSignal = signal;
                return operation;
            },
            10_000,
            parent.signal
        );

        await Promise.resolve();
        expect(operationSignal).toBeDefined();
        expect(operationSignal?.aborted).toBe(false);

        await jest.advanceTimersByTimeAsync(9_999);
        expect(operationSignal?.aborted).toBe(false);

        await jest.advanceTimersByTimeAsync(1);
        await expect(settled).rejects.toMatchObject({ message: 'Operation cancelled' });
        expect(operationSignal?.aborted).toBe(true);

        resolveLate('late success');
        await Promise.resolve();

        let rejectLate!: (reason: unknown) => void;
        const lateRejection = new Promise<string>((_, reject) => {
            rejectLate = reject;
        });
        const rejected = invokeWithDeadline(() => lateRejection, 10_000, parent.signal);
        await jest.advanceTimersByTimeAsync(10_000);
        await expect(rejected).rejects.toMatchObject({ message: 'Operation cancelled' });
        rejectLate(new Error('late rejection after settlement'));
        await Promise.resolve();
    });

    it('aborts the owned signal when the parent request is cancelled', async () => {
        const parent = new AbortController();
        let operationSignal: AbortSignal | undefined;
        let rejectOperation!: (reason: unknown) => void;
        const operation = new Promise<string>((_, reject) => {
            rejectOperation = reject;
        });

        const settled = invokeWithDeadline(
            (signal) => {
                operationSignal = signal;
                signal.addEventListener('abort', () => rejectOperation(new Error('parent cancellation')), {
                    once: true
                });
                return operation;
            },
            10_000,
            parent.signal
        );

        await Promise.resolve();
        parent.abort();

        await expect(settled).rejects.toMatchObject({ message: 'Operation cancelled' });
        expect(operationSignal?.aborted).toBe(true);
        await jest.advanceTimersByTimeAsync(10_000);
    });

    it('preserves an operation rejection as cause without exposing the original error text', async () => {
        const parent = new AbortController();
        const original = new Error('provider payload and secret must stay internal');

        const settled = invokeWithDeadline(() => Promise.reject(original), 10_000, parent.signal);

        await expect(settled).rejects.toMatchObject({ message: 'Operation failed', cause: original });
        await expect(settled).rejects.not.toThrow(original.message);
    });
});
