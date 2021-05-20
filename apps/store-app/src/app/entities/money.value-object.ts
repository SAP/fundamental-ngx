import { BaseValue } from '@fundamental-ngx/store';

export interface MoneyDTO {
    title: string;
    amount?: number;
    currency?: string;
}

export class Money extends BaseValue<MoneyDTO> {}
