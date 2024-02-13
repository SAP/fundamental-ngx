import { ButtonType } from '@fundamental-ngx/core/button';

export interface ButtonModel {
    fdType: ButtonType;
    disabled: boolean;
    markForCheck(): void;
}
