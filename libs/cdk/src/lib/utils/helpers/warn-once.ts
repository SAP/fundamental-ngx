const callers = new Set();

/** @hidden */
export function warnOnce(message: string): void {
    if (!callers.has(message)) {
        console.warn(message);
        callers.add(message);
    }
}
