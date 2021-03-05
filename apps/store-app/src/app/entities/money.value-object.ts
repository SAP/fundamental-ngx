import { BaseValue } from '@fundamental-ngx/store';

interface MoneyDTO {
    amount: number;
    currency: string
}

export class Money extends BaseValue<MoneyDTO> implements MoneyDTO {
    constructor(value: MoneyDTO) {
        super(value);
    }

    get amount(): number {
        return this.dto.amount;
    }

    get currency(): string {
        return this.dto.currency;
    }

    static create(dto: MoneyDTO) {
        return new Money(dto);
    }
}
