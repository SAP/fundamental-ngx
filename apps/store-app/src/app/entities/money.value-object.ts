import { BaseValue } from '../../../../../libs/store/src/lib/infrastructure/persistence/domain/base-classes/base-value';

interface MoneyDTO {
    amount: number;
    currency: string
}

export class Money extends BaseValue<MoneyDTO> {
    constructor(value?: MoneyDTO) {
        super(value);
    }
}
