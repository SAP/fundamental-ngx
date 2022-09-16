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

    open(): void {
        super.open(this.url);
        waitForPresent(this.root);
        waitForElDisplayed(this.title);
    }
}
