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

    beforeAll(async () => {
        await tokenPage.open();
    }, 1);

    beforeEach(async () => {
        await refreshPage();
        await waitForPresent(tokenPage.root);
        await waitForElDisplayed(tokenPage.title);
    }, 2);

    describe('default example', () => {
        it('should check tokens clickable in default example', async () => {
            await checkElArrIsClickable(defaultExample + token);
        });
    });

    describe('compact example', () => {
        it('should check tokens clickable in compact example', async () => {
            await checkElArrIsClickable(compactExample + token);
        });

        it('should check size of tokens in compact example', async () => {
            const tokensLength = await getElementArrayLength(compactExample + token);
            for (let i = 0; i < tokensLength; i++) {
                await expect(await getElementClass(compactExample + token, i)).toContain(
                    'compact',
                    `token with index ${i} is not compact`
                );
            }
        });
    });

    describe('selected example', () => {
        it('should check tokens clickable in selected example', async () => {
            await checkElArrIsClickable(selectedExample + token);
        });

        it('should check selected example', async () => {
            const tokensLength = await getElementArrayLength(selectedExample + token);
            for (let i = 0; i < tokensLength; i++) {
                await expect(await getElementClass(selectedExample + token, i)).toContain(
                    'selected',
                    `token with index ${i} is not selected by default but should`
                );
            }
        });
    });

    describe('read only example', () => {
        it('should check tokens clickable in read only example', async () => {
            await checkElArrIsClickable(readOnlyExample + token);
        });

        it('should check that impossible to select token in read only example', async () => {
            const tokensLength = await getElementArrayLength(readOnlyExample + token);
            for (let i = 0; i < tokensLength; i++) {
                await click(readOnlyExample + token, i);
                await expect(await getElementClass(readOnlyExample + token, i)).not.toContain(
                    'selected',
                    `token with index ${i} selected but should not`
                );
            }
        });

        it('should check that no ability to remove token in read only example', async () => {
            await expect(await doesItExist(readOnlyExample + closeBtn)).toBe(false);
        });
    });

    describe('tokenizer example', () => {
        it('should check tokens clickable in tokenizer example', async () => {
            await checkElArrIsClickable(tokenizerExample + token);
        });

        it('should check closing tokens in tokenizer example', async () => {
            await checkClosingTokens(tokenizerExample);
        });

        it('should check selecting tokens in tokenizer example', async () => {
            await checkSelectingTokens(tokenizerExample);
        });

        it('should check adding tokens to tokenizer example', async () => {
            await checkAddingTokens(tokenizerExample);
        });
    });

    describe('compact tokenizer example', () => {
        it('should check tokens clickable in compact tokenizer example', async () => {
            await checkElArrIsClickable(compactTokenizer + token);
        });

        it('should check closing tokens in compact tokenizer example', async () => {
            await checkClosingTokens(compactTokenizer);
        });

        it('should check selecting tokens in tokenizer example', async () => {
            await checkSelectingTokens(compactTokenizer);
        });

        it('should check adding tokens to compact tokenizer example', async () => {
            await checkAddingTokens(compactTokenizer);
        });
    });

    it('should check orientations', async () => {
        await tokenPage.checkRtlSwitch();
    });

    async function checkAddingTokens(section: string): Promise<void> {
        const tokensLengthBefore = await getElementArrayLength(section + token);
        await click(section + input);
        await setValue(section + input, 'asd');
        await sendKeys('Enter');
        const tokensLengthAfter = await getElementArrayLength(section + token);
        await expect(tokensLengthAfter).toEqual(tokensLengthBefore + 1, `new token is not created`);
        await expect(await getText(section + token, tokensLengthAfter - 1)).toEqual(
            'asd',
            `token value is not equal entered value`
        );
    }

    async function checkSelectingTokens(section: string): Promise<void> {
        const tokensLength = (await getElementArrayLength(section + token)) - 1;
        for (let i = tokensLength; i !== -1; i--) {
            await scrollIntoView(section + token, i);
            await click(section + token, i);
            await expect(await getElementClass(section + token, i)).toContain(
                'selected',
                `token with index ${i} is not selected`
            );
        }
    }

    async function checkClosingTokens(section: string): Promise<void> {
        const tokensLength = (await getElementArrayLength(section + closeBtn)) - 1;
        for (let i = tokensLength; i !== -1; i--) {
            await scrollIntoView(section + closeBtn, i);
            await click(section + closeBtn, i);
        }
        await expect(await doesItExist(section + token)).toBe(false, 'tokens are not closed');
    }
});
