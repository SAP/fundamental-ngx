import { ButtonType } from './base-button';

export interface ButtonModel {
    setDisabled(value: boolean): void;
    isDisabled(): boolean;
    setFdType(value: ButtonType): void;
    getFdType(): ButtonType;
    markForCheck(): void;
}
