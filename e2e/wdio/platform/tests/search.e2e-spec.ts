import { CheckboxGroupPO } from '../pages/checkbox-group.po';
import { refreshPage } from '../../driver/wdio';

describe('Search field', () => {
    const checkboxGroupPage = new CheckboxGroupPO();

    beforeAll(() => {
        checkboxGroupPage.open();
    });

    afterEach(() => {
        refreshPage();
    });
});
