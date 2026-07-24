import { InteractivityChecker } from '@angular/cdk/a11y';
import { TestBed } from '@angular/core/testing';
import { TabbableElementService } from './tabbable-element.service';

describe('TabbableElementService', () => {
    let service: TabbableElementService;
    let checker: InteractivityChecker;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TabbableElementService, InteractivityChecker]
        });
        service = TestBed.inject(TabbableElementService);
        checker = TestBed.inject(InteractivityChecker);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('getTabbableElement', () => {
        it('should return the root element if it is tabbable and not disabled', () => {
            const button = document.createElement('button');
            document.body.appendChild(button);

            jest.spyOn(checker, 'isTabbable').mockReturnValue(true);
            jest.spyOn(checker, 'isFocusable').mockReturnValue(true);

            const result = service.getTabbableElement(button);

            expect(result).toBe(button);

            document.body.removeChild(button);
        });

        it('should skip root element when skipSelf is true', () => {
            const container = document.createElement('div');
            const button = document.createElement('button');
            container.appendChild(button);
            document.body.appendChild(container);

            jest.spyOn(checker, 'isTabbable').mockReturnValue(true);
            jest.spyOn(checker, 'isFocusable').mockReturnValue(true);

            const result = service.getTabbableElement(container, false, true);

            expect(result).toBe(button);

            document.body.removeChild(container);
        });

        it('should return the first tabbable child element', () => {
            const container = document.createElement('div');
            const span = document.createElement('span');
            const button = document.createElement('button');
            container.appendChild(span);
            container.appendChild(button);
            document.body.appendChild(container);

            jest.spyOn(checker, 'isTabbable').mockImplementation((el) => el.tagName === 'BUTTON');
            jest.spyOn(checker, 'isFocusable').mockImplementation((el) => el.tagName === 'BUTTON');

            const result = service.getTabbableElement(container);

            expect(result).toBe(button);

            document.body.removeChild(container);
        });

        it('should return the last tabbable child when focusLastElement is true', () => {
            const container = document.createElement('div');
            const button1 = document.createElement('button');
            const button2 = document.createElement('button');
            container.appendChild(button1);
            container.appendChild(button2);
            document.body.appendChild(container);

            jest.spyOn(checker, 'isTabbable').mockImplementation((el) => el.tagName === 'BUTTON');
            jest.spyOn(checker, 'isFocusable').mockImplementation((el) => el.tagName === 'BUTTON');

            const result = service.getTabbableElement(container, true);

            expect(result).toBe(button2);

            document.body.removeChild(container);
        });

        it('should return null if no tabbable element is found', () => {
            const container = document.createElement('div');
            const span = document.createElement('span');
            container.appendChild(span);
            document.body.appendChild(container);

            jest.spyOn(checker, 'isTabbable').mockReturnValue(false);
            jest.spyOn(checker, 'isFocusable').mockReturnValue(false);

            const result = service.getTabbableElement(container);

            expect(result).toBeNull();

            document.body.removeChild(container);
        });
    });

    describe('disabled element filtering', () => {
        it('should filter out elements with disabled attribute', () => {
            const container = document.createElement('div');
            const disabledButton = document.createElement('button');
            const enabledButton = document.createElement('button');
            disabledButton.setAttribute('disabled', 'true');
            container.appendChild(disabledButton);
            container.appendChild(enabledButton);
            document.body.appendChild(container);

            jest.spyOn(checker, 'isTabbable').mockImplementation((el) => el.tagName === 'BUTTON');
            jest.spyOn(checker, 'isFocusable').mockImplementation((el) => el.tagName === 'BUTTON');

            const result = service.getTabbableElement(container);

            expect(result).toBe(enabledButton);

            document.body.removeChild(container);
        });

        it('should filter out elements with aria-disabled="true"', () => {
            const container = document.createElement('div');
            const ariaDisabledButton = document.createElement('button');
            const enabledButton = document.createElement('button');
            ariaDisabledButton.setAttribute('aria-disabled', 'true');
            container.appendChild(ariaDisabledButton);
            container.appendChild(enabledButton);
            document.body.appendChild(container);

            jest.spyOn(checker, 'isTabbable').mockImplementation((el) => el.tagName === 'BUTTON');
            jest.spyOn(checker, 'isFocusable').mockImplementation((el) => el.tagName === 'BUTTON');

            const result = service.getTabbableElement(container);

            expect(result).toBe(enabledButton);

            document.body.removeChild(container);
        });

        it('should filter out elements with is-disabled class', () => {
            const container = document.createElement('div');
            const disabledButton = document.createElement('button');
            const enabledButton = document.createElement('button');
            disabledButton.classList.add('is-disabled');
            container.appendChild(disabledButton);
            container.appendChild(enabledButton);
            document.body.appendChild(container);

            jest.spyOn(checker, 'isTabbable').mockImplementation((el) => el.tagName === 'BUTTON');
            jest.spyOn(checker, 'isFocusable').mockImplementation((el) => el.tagName === 'BUTTON');

            const result = service.getTabbableElement(container);

            expect(result).toBe(enabledButton);

            document.body.removeChild(container);
        });

        it('should filter out elements that are focusable but not tabbable', () => {
            const container = document.createElement('div');
            const focusableOnly = document.createElement('div');
            focusableOnly.setAttribute('tabindex', '-1');
            const tabbableButton = document.createElement('button');
            container.appendChild(focusableOnly);
            container.appendChild(tabbableButton);
            document.body.appendChild(container);

            jest.spyOn(checker, 'isTabbable').mockImplementation((el) => el.tagName === 'BUTTON');
            jest.spyOn(checker, 'isFocusable').mockReturnValue(true);

            const result = service.getTabbableElement(container);

            expect(result).toBe(tabbableButton);

            document.body.removeChild(container);
        });

        it('should handle multiple disabled conditions on the same element', () => {
            const container = document.createElement('div');
            const disabledButton = document.createElement('button');
            const enabledButton = document.createElement('button');
            disabledButton.setAttribute('disabled', 'true');
            disabledButton.setAttribute('aria-disabled', 'true');
            disabledButton.classList.add('is-disabled');
            container.appendChild(disabledButton);
            container.appendChild(enabledButton);
            document.body.appendChild(container);

            jest.spyOn(checker, 'isTabbable').mockImplementation((el) => el.tagName === 'BUTTON');
            jest.spyOn(checker, 'isFocusable').mockImplementation((el) => el.tagName === 'BUTTON');

            const result = service.getTabbableElement(container);

            expect(result).toBe(enabledButton);

            document.body.removeChild(container);
        });

        it('should allow aria-disabled="false" elements', () => {
            const container = document.createElement('div');
            const button = document.createElement('button');
            button.setAttribute('aria-disabled', 'false');
            container.appendChild(button);
            document.body.appendChild(container);

            jest.spyOn(checker, 'isTabbable').mockImplementation((el) => el.tagName === 'BUTTON');
            jest.spyOn(checker, 'isFocusable').mockImplementation((el) => el.tagName === 'BUTTON');

            const result = service.getTabbableElement(container);

            expect(result).toBe(button);

            document.body.removeChild(container);
        });

        it('should check isTabbable before isFocusable for performance', () => {
            const container = document.createElement('div');
            const button = document.createElement('button');
            container.appendChild(button);
            document.body.appendChild(container);

            const tabbableSpy = jest.spyOn(checker, 'isTabbable').mockReturnValue(false);
            const focusableSpy = jest.spyOn(checker, 'isFocusable').mockReturnValue(true);

            service.getTabbableElement(container);

            expect(tabbableSpy).toHaveBeenCalled();
            // isFocusable should not be called if isTabbable returns false
            expect(focusableSpy).not.toHaveBeenCalled();

            document.body.removeChild(container);
        });
    });

    describe('edge cases', () => {
        it('should handle SVG elements with childNodes instead of children', () => {
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            svg.appendChild(circle);
            document.body.appendChild(svg);

            jest.spyOn(checker, 'isTabbable').mockReturnValue(false);
            jest.spyOn(checker, 'isFocusable').mockReturnValue(false);

            const result = service.getTabbableElement(svg as any);

            expect(result).toBeNull();

            document.body.removeChild(svg);
        });

        it('should handle text nodes and comments gracefully', () => {
            const container = document.createElement('div');
            const textNode = document.createTextNode('text');
            const comment = document.createComment('comment');
            const button = document.createElement('button');
            container.appendChild(textNode);
            container.appendChild(comment);
            container.appendChild(button);
            document.body.appendChild(container);

            jest.spyOn(checker, 'isTabbable').mockImplementation((el) => el.tagName === 'BUTTON');
            jest.spyOn(checker, 'isFocusable').mockImplementation((el) => el.tagName === 'BUTTON');

            const result = service.getTabbableElement(container);

            expect(result).toBe(button);

            document.body.removeChild(container);
        });

        it('should handle deeply nested elements', () => {
            const container = document.createElement('div');
            const level1 = document.createElement('div');
            const level2 = document.createElement('div');
            const button = document.createElement('button');
            level2.appendChild(button);
            level1.appendChild(level2);
            container.appendChild(level1);
            document.body.appendChild(container);

            jest.spyOn(checker, 'isTabbable').mockImplementation((el) => el.tagName === 'BUTTON');
            jest.spyOn(checker, 'isFocusable').mockImplementation((el) => el.tagName === 'BUTTON');

            const result = service.getTabbableElement(container);

            expect(result).toBe(button);

            document.body.removeChild(container);
        });
    });
});
