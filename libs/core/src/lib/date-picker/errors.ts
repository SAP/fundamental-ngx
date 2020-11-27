export function createMissingDateImplementationError(provider: string): Error {
    return Error(
        `FdDatePicker: No provider found for ${provider}. You must import one of the following ` +
            `modules at your application root: FdDatetimeModule, or provide a ` +
            `custom implementation.`
    );
}
