export type RequestDeadline = {
    signal: AbortSignal;
    abort: () => void;
    dispose: () => void;
};

export function createRequestDeadline(requestSignal: AbortSignal, milliseconds: number): RequestDeadline {
    const controller = new AbortController();
    const abort = (): void => controller.abort();
    const timer = setTimeout(abort, milliseconds);

    if (requestSignal.aborted) {
        abort();
    } else {
        requestSignal.addEventListener('abort', abort, { once: true });
    }

    return {
        signal: controller.signal,
        abort,
        dispose: () => {
            clearTimeout(timer);
            requestSignal.removeEventListener('abort', abort);
        }
    };
}

export function withDeadline<T>(
    operation: (signal: AbortSignal) => PromiseLike<T>,
    milliseconds: number,
    parentSignal: AbortSignal
): Promise<T> {
    const result = new Promise<T>((resolve, reject) => {
        const controller = new AbortController();
        const abort = (): void => controller.abort();
        const timer = setTimeout(abort, milliseconds);

        const cleanup = (): void => {
            clearTimeout(timer);
            parentSignal.removeEventListener('abort', abort);
        };

        controller.signal.addEventListener(
            'abort',
            () => {
                cleanup();
                reject(new Error('Operation cancelled'));
            },
            { once: true }
        );

        if (parentSignal.aborted) {
            abort();
        } else {
            parentSignal.addEventListener('abort', abort, { once: true });
        }

        if (controller.signal.aborted) {
            return;
        }

        let operationResult: PromiseLike<T>;
        try {
            operationResult = operation(controller.signal);
        } catch (cause) {
            cleanup();
            reject(new Error('Operation failed', { cause }));
            return;
        }

        Promise.resolve(operationResult).then(
            (value) => {
                cleanup();
                resolve(value);
            },
            (cause) => {
                cleanup();
                reject(new Error('Operation failed', { cause }));
            }
        );
    });
    void result.catch(() => undefined);
    return result;
}
