/**
 * Base class for BaseEntity and BaseValue
 *
 */
export abstract class Composite<T> {
    value: T;
    hasErrors: boolean;

    constructor(dto: T) {
        this.value = dto;
    }
}
