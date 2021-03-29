import { BaseValue } from '@fundamental-ngx/store';

interface MoneyDTO {
    amount: number;
    currency: string
}

export class Money extends BaseValue<MoneyDTO> {
    constructor(value?: MoneyDTO) {
        super(value);
    }
}
