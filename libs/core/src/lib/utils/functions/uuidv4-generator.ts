/** Generate a UUID v4 */
export function uuidv4(): string {
    const modifier = 16;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        // eslint-disable-next-line no-bitwise
        const r = (Math.random() * modifier) | 0,
            // eslint-disable-next-line no-bitwise
            v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(modifier);
    });
}
