const messages = new Set<string>();

/** @ignore */
export function warnOnce(message: string): void {
    if (!messages.has(message)) {
        console.warn(message);
        messages.add(message);
    }
}
