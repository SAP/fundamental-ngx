import { TokenPo } from './token.po';
import {
    click,
    doesItExist,
    getElementArrayLength,
    getElementClass,
    getText,
    refreshPage,
    scrollIntoView,
    sendKeys,
    setValue,
    waitForElDisplayed,
    waitForPresent,
    checkElArrIsClickable
} from '../../../../../e2e';

describe('Token component test', () => {
    const tokenPage = new TokenPo();
    const {
        defaultExample,
        tokenizerExample,
        selectedExample,
        readOnlyExample,
        compactExample,
        token,
        closeBtn,
        input,
        compactTokenizer
    } = tokenPage;

    beforeAll(() => {
        tokenPage.open();
    }, 1);

    beforeEach(() => {
        refreshPage();
        waitForPresent(tokenPage.root);
        waitForElDisplayed(tokenPage.title);
    }, 2);

    describe('default example', () => {
        it('should check tokens clickable in default example', () => {
            checkElArrIsClickable(defaultExample + token);
        });
    });

    describe('compact example', () => {
        it('should check tokens clickable in compact example', () => {
            checkElArrIsClickable(compactExample + token);
        });

        it('should check size of tokens in compact example', () => {
            const tokensLength = getElementArrayLength(compactExample + token);
            for (let i = 0; i < tokensLength; i++) {
                expect(getElementClass(compactExample + token, i)).toContain(
                    'compact',
                    `token with index ${i} is not compact`
                );
            }
        });
    });

    describe('selected example', () => {
        it('should check tokens clickable in selected example', () => {
            checkElArrIsClickable(selectedExample + token);
        });

        it('should check selected example', () => {
            const tokensLength = getElementArrayLength(selectedExample + token);
            for (let i = 0; i < tokensLength; i++) {
                expect(getElementClass(selectedExample + token, i)).toContain(
                    'selected',
                    `token with index ${i} is not selected by default but should`
                );
            }
        });
    });

    describe('read only example', () => {
        it('should check tokens clickable in read only example', () => {
            checkElArrIsClickable(readOnlyExample + token);
        });

        it('should check that impossible to select token in read only example', () => {
            const tokensLength = getElementArrayLength(readOnlyExample + token);
            for (let i = 0; i < tokensLength; i++) {
                click(readOnlyExample + token, i);
                expect(getElementClass(readOnlyExample + token, i)).not.toContain(
                    'selected',
                    `token with index ${i} selected but should not`
                );
            }
        });

        it('should check that no ability to remove token in read only example', () => {
            expect(doesItExist(readOnlyExample + closeBtn)).toBe(false);
        });
    });

    describe('tokenizer example', () => {
        it('should check tokens clickable in tokenizer example', () => {
            checkElArrIsClickable(tokenizerExample + token);
        });

        it('should check closing tokens in tokenizer example', () => {
            checkClosingTokens(tokenizerExample);
        });

        it('should check selecting tokens in tokenizer example', () => {
            checkSelectingTokens(tokenizerExample);
        });

        it('should check adding tokens to tokenizer example', () => {
            checkAddingTokens(tokenizerExample);
        });
    });

    describe('compact tokenizer example', () => {
        it('should check tokens clickable in compact tokenizer example', () => {
            checkElArrIsClickable(compactTokenizer + token);
        });

        it('should check closing tokens in compact tokenizer example', () => {
            checkClosingTokens(compactTokenizer);
        });

        it('should check selecting tokens in tokenizer example', () => {
            checkSelectingTokens(compactTokenizer);
        });

        it('should check adding tokens to compact tokenizer example', () => {
            checkAddingTokens(compactTokenizer);
        });
    });

    it('should check orientations', () => {
        tokenPage.checkRtlSwitch();
    });

    function checkAddingTokens(section: string): void {
        const tokensLengthBefore = getElementArrayLength(section + token);
        click(section + input);
        setValue(section + input, 'asd');
        sendKeys('Enter');
        const tokensLengthAfter = getElementArrayLength(section + token);
        expect(tokensLengthAfter).toEqual(tokensLengthBefore + 1, `new token is not created`);
        expect(getText(section + token, tokensLengthAfter - 1)).toEqual(
            'asd',
            `token value is not equal entered value`
        );
    }

    function checkSelectingTokens(section: string): void {
        const tokensLength = getElementArrayLength(section + token) - 1;
        for (let i = tokensLength; i !== -1; i--) {
            scrollIntoView(section + token, i);
            click(section + token, i);
            expect(getElementClass(section + token, i)).toContain('selected', `token with index ${i} is not selected`);
        }
    }

    function checkClosingTokens(section: string): void {
        const tokensLength = getElementArrayLength(section + closeBtn) - 1;
        for (let i = tokensLength; i !== -1; i--) {
            scrollIntoView(section + closeBtn, i);
            click(section + closeBtn, i);
        }
        expect(doesItExist(section + token)).toBe(false, 'tokens are not closed');
    }
});
