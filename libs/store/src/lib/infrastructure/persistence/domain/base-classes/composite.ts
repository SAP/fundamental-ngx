export abstract class Composite<T> {
    value: T;
    hasErrors: boolean;

    protected constructor(dto: T) {
        this.value = dto;
    }
}
