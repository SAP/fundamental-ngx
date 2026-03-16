import { generateComment, generateCommentDescription, inferCommentType } from './comment-generator';

describe('CommentGenerator', () => {
    describe('inferCommentType', () => {
        describe('XBUT - Button labels', () => {
            it('should detect button keywords', () => {
                expect(inferCommentType('coreDialog.closeButton', 'Close')).toBe('XBUT');
                expect(inferCommentType('coreButton.save', 'Save')).toBe('XBUT');
                expect(inferCommentType('coreTable.filterBtn', 'Filter')).toBe('XBUT');
            });

            it('should be case insensitive', () => {
                expect(inferCommentType('coreDialog.closeButton', 'Close')).toBe('XBUT');
                expect(inferCommentType('coreDialog.CloseButton', 'Close')).toBe('XBUT');
                expect(inferCommentType('coreDialog.CLOSEBUTTON', 'Close')).toBe('XBUT');
            });
        });

        describe('XACT - ARIA labels', () => {
            it('should detect aria keywords', () => {
                expect(inferCommentType('coreDialog.closeButtonAriaLabel', 'Close dialog')).toBe('XACT');
                expect(inferCommentType('coreTable.sortAriaLabel', 'Sort by column')).toBe('XACT');
                expect(inferCommentType('coreDatePicker.accessibleLabel', 'Select date')).toBe('XACT');
            });

            it('should detect accessibility keywords', () => {
                expect(inferCommentType('coreButton.screenReaderText', 'Hidden text')).toBe('XACT');
                expect(inferCommentType('coreInput.a11yLabel', 'Input field')).toBe('XACT');
            });
        });

        describe('XTIT - Titles', () => {
            it('should detect title keywords', () => {
                expect(inferCommentType('coreDialog.title', 'Confirmation')).toBe('XTIT');
                expect(inferCommentType('corePage.heading', 'Welcome')).toBe('XTIT');
                expect(inferCommentType('corePanel.header', 'Settings')).toBe('XTIT');
            });
        });

        describe('XMSG - Messages', () => {
            it('should detect message keywords', () => {
                expect(inferCommentType('coreForm.errorMessage', 'Invalid input')).toBe('XMSG');
                expect(inferCommentType('coreTable.warningMsg', 'No data')).toBe('XMSG');
                expect(inferCommentType('coreUpload.successNotification', 'Upload complete')).toBe('XMSG');
            });

            it('should detect error/warning keywords', () => {
                expect(inferCommentType('coreInput.errorText', 'Required field')).toBe('XMSG');
                expect(inferCommentType('coreForm.warningText', 'Unsaved changes')).toBe('XMSG');
                expect(inferCommentType('coreDialog.alertText', 'Confirm action')).toBe('XMSG');
            });
        });

        describe('XFLD - Default', () => {
            it('should default to XFLD for generic labels', () => {
                expect(inferCommentType('coreInput.label', 'Name')).toBe('XFLD');
                expect(inferCommentType('coreTable.columnName', 'Status')).toBe('XFLD');
                expect(inferCommentType('coreForm.placeholder', 'Enter text')).toBe('XFLD');
            });

            it('should default to XFLD when no keywords match', () => {
                expect(inferCommentType('coreComponent.someText', 'Text')).toBe('XFLD');
                expect(inferCommentType('coreWidget.value', 'Value')).toBe('XFLD');
            });
        });
    });

    describe('generateCommentDescription', () => {
        it('should convert camelCase to readable text', () => {
            expect(generateCommentDescription('coreButton.submitButtonLabel')).toBe('Submit button label');
            expect(generateCommentDescription('coreDialog.closeButton')).toBe('Close button');
            expect(generateCommentDescription('coreTable.sortAriaLabel')).toBe('Sort aria label');
        });

        it('should handle single word keys', () => {
            expect(generateCommentDescription('coreButton.save')).toBe('Save');
            expect(generateCommentDescription('coreDialog.close')).toBe('Close');
        });

        it('should handle all lowercase keys', () => {
            expect(generateCommentDescription('coreInput.placeholder')).toBe('Placeholder');
            expect(generateCommentDescription('coreTable.header')).toBe('Header');
        });

        it('should handle multiple capital letters', () => {
            expect(generateCommentDescription('coreButton.saveHTMLContent')).toBe('Save h t m l content');
            expect(generateCommentDescription('coreInput.URLLabel')).toBe('U r l label');
        });

        it('should only use last part of key', () => {
            expect(generateCommentDescription('coreButton.save')).toBe('Save');
            expect(generateCommentDescription('very.deeply.nested.component.label')).toBe('Label');
        });
    });

    describe('generateComment', () => {
        it('should generate comment with auto-detected type and description', () => {
            const result = generateComment('coreButton.save', 'Save');

            expect(result.type).toBe('XBUT');
            expect(result.description).toBe('Save');
            expect(result.fullComment).toBe('#XBUT: Save');
        });

        it('should use custom description when provided', () => {
            const result = generateComment('coreButton.save', 'Save', 'Save button for form submission');

            expect(result.type).toBe('XBUT');
            expect(result.description).toBe('Save button for form submission');
            expect(result.fullComment).toBe('#XBUT: Save button for form submission');
        });

        it('should use custom type when provided', () => {
            const result = generateComment('coreComponent.text', 'Text', undefined, 'XTIT');

            expect(result.type).toBe('XTIT');
            expect(result.description).toBe('Text');
            expect(result.fullComment).toBe('#XTIT: Text');
        });

        it('should use both custom type and description', () => {
            const result = generateComment('coreComponent.something', 'Value', 'Custom description', 'XMSG');

            expect(result.type).toBe('XMSG');
            expect(result.description).toBe('Custom description');
            expect(result.fullComment).toBe('#XMSG: Custom description');
        });

        it('should handle complex keys with correct type inference', () => {
            const result = generateComment('coreTable.sortColumnAriaLabel', 'Sort by {columnName}');

            expect(result.type).toBe('XACT'); // ARIA takes precedence
            expect(result.description).toBe('Sort column aria label');
            expect(result.fullComment).toBe('#XACT: Sort column aria label');
        });
    });

    describe('real-world examples', () => {
        it('should handle typical button scenario', () => {
            const result = generateComment('coreButton.submit', 'Submit');

            expect(result.fullComment).toBe('#XBUT: Submit');
        });

        it('should handle ARIA label scenario', () => {
            const result = generateComment(
                'coreDatePicker.openCalendarAriaLabel',
                'Open calendar picker',
                'ARIA label for button that opens calendar picker'
            );

            expect(result.fullComment).toBe('#XACT: ARIA label for button that opens calendar picker');
        });

        it('should handle error message scenario', () => {
            const result = generateComment('coreInput.requiredErrorMessage', 'This field is required');

            expect(result.fullComment).toBe('#XMSG: Required error message');
        });

        it('should handle dialog title scenario', () => {
            const result = generateComment('coreDialog.confirmationTitle', 'Confirm Action');

            expect(result.fullComment).toBe('#XTIT: Confirmation title');
        });

        it('should handle generic label scenario', () => {
            const result = generateComment('coreInput.emailLabel', 'Email Address');

            expect(result.fullComment).toBe('#XFLD: Email label');
        });
    });
});
