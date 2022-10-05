import { CoreBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class TokenPo extends CoreBaseComponentPo {
    url = '/token';

    defaultExample = 'fd-token-example ';
    selectedExample = 'fd-token-selected-example ';
    readOnlyExample = 'fd-token-readonly-example ';
    compactExample = 'fd-token-compact-example ';
    tokenizerExample = 'fd-tokenizer-example ';
    compactTokenizer = 'fd-tokenizer-compact-example ';

    token = '.fd-token';
    closeBtn = '.fd-token__close';
    input = '.fd-tokenizer__input';

    async open(): Promise<void> {
        await super.open(this.url);
        await waitForPresent(this.root);
        await waitForElDisplayed(this.title);
    }
}
