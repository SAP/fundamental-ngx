import { browser } from 'protractor';
import { TextareaPo } from '../pages/textarea.po';

fdescribe('Verify Textarea component', function() {
    const textareaPage = new TextareaPo();
    beforeAll(async () => {
        await textareaPage.open();
    });

    afterEach(async () => {
        await browser.refresh();
    });

    describe('has basic Textareas and', function() {

    });

});
