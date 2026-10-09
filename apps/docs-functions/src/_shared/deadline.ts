export type RequestDeadline = {
    signal: AbortSignal;
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
        dispose: () => {
            clearTimeout(timer);
            requestSignal.removeEventListener('abort', abort);
        }
    };
}

export function withDeadline<T>(
    operation: PromiseLike<T>,
    milliseconds: number,
    parentSignal: AbortSignal
): Promise<T> {
    return new Promise<T>((resolve, reject) => {
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

        Promise.resolve(operation).then(
            (value) => {
                cleanup();
                resolve(value);
            },
            () => {
                cleanup();
                reject(new Error('Operation failed'));
            }
        );
    });
}
