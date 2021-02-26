import { BaseValue } from '@fundamental-ngx/store';

export class ID extends BaseValue<any> {
    constructor(value: string) {
        super({ value } );
    }

    get value (): string {
        return this.props.value;
    }
}
