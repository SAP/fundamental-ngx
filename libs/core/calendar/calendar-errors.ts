/** Create an Error to be thrown when attempting to use an invalid date implementation. */
export function createMissingDateImplementationError(provider: string): Error {
    return Error(
        `Calendar: No provider found for ${provider}. You must import one of the following ` +
            `modules at your application root: FdDatetimeModule, or provide a ` +
            `custom implementation.`
    );
}
