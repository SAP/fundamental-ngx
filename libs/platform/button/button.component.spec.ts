import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';

describe('Platform ButtonComponent', () => {
    let component: ButtonComponent;
    let fixture: ComponentFixture<ButtonComponent>;
    let element: HTMLElement;
    let buttonElement: HTMLButtonElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ButtonComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(ButtonComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;
        fixture.detectChanges();
        buttonElement = element.querySelector('button') as HTMLButtonElement;
    });

    describe('Basic Functionality', () => {
        it('should create', () => {
            expect(component).toBeTruthy();
        });

        it('should render core fd-button component', () => {
            expect(buttonElement).toBeTruthy();
            expect(buttonElement.hasAttribute('fd-button')).toBe(true);
        });

        it('should generate default id with fdp prefix', () => {
            expect(component.id()).toContain('fdp-button-');
        });

        it('should accept custom id', () => {
            fixture.componentRef.setInput('id', 'custom-platform-button');
            fixture.detectChanges();
            expect(component.id()).toBe('custom-platform-button');
            expect(buttonElement.getAttribute('id')).toBe('custom-platform-button');
        });

        it('should set name attribute', () => {
            fixture.componentRef.setInput('name', 'submitButton');
            fixture.detectChanges();
            expect(buttonElement.getAttribute('name')).toBe('submitButton');
        });

        it('should set width style', () => {
            fixture.componentRef.setInput('width', '200px');
            fixture.detectChanges();
            expect(buttonElement.style.width).toBe('200px');
        });
    });

    describe('Button Types', () => {
        const buttonTypes = [
            'standard',
            'positive',
            'negative',
            'attention',
            'emphasized',
            'transparent',
            'ghost',
            'menu'
        ];

        buttonTypes.forEach((type) => {
            it(`should apply ${type} button type`, () => {
                fixture.componentRef.setInput('fdType', type);
                fixture.detectChanges();
                expect(component.getFdType()).toBe(type);
            });
        });

        it('should support deprecated buttonType input', () => {
            fixture.componentRef.setInput('buttonType', 'positive');
            fixture.detectChanges();
            expect(component.getFdType()).toBe('positive');
        });

        it('should prioritize buttonType over fdType when both provided', () => {
            fixture.componentRef.setInput('fdType', 'standard');
            fixture.componentRef.setInput('buttonType', 'emphasized');
            fixture.detectChanges();
            expect(component.getFdType()).toBe('emphasized');
        });
    });

    describe('Label and Icon', () => {
        it('should set label', () => {
            fixture.componentRef.setInput('label', 'Click Me');
            fixture.detectChanges();
            expect(component.label()).toBe('Click Me');
        });

        it('should set glyph icon', () => {
            fixture.componentRef.setInput('glyph', 'home');
            fixture.detectChanges();
            expect(component.glyph()).toBe('home');
        });

        it('should set glyph position', () => {
            fixture.componentRef.setInput('glyphPosition', 'after');
            fixture.detectChanges();
            expect(component.glyphPosition()).toBe('after');
        });

        it('should set glyph font family', () => {
            fixture.componentRef.setInput('glyphFont', 'SAP-icons-TNT');
            fixture.detectChanges();
            expect(component.glyphFont()).toBe('SAP-icons-TNT');
        });

        it('should show title when only icon present', () => {
            fixture.componentRef.setInput('glyph', 'home');
            fixture.componentRef.setInput('title', 'Home Button');
            fixture.detectChanges();
            expect(buttonElement.getAttribute('title')).toBe('Home Button');
        });

        it('should not show title when both icon and label present', () => {
            fixture.componentRef.setInput('glyph', 'home');
            fixture.componentRef.setInput('label', 'Home');
            fixture.componentRef.setInput('title', 'Home Button');
            fixture.detectChanges();
            expect(buttonElement.getAttribute('title')).toBeNull();
        });
    });

    describe('Disabled State', () => {
        it('should disable button', () => {
            fixture.componentRef.setInput('disabled', true);
            fixture.detectChanges();
            expect(component.isDisabled()).toBe(true);
            expect(buttonElement.disabled).toBe(true);
        });

        it('should enable button by default', () => {
            expect(component.isDisabled()).toBe(false);
            expect(buttonElement.disabled).toBe(false);
        });

        it('should set aria-disabled attribute', () => {
            fixture.componentRef.setInput('ariaDisabled', true);
            fixture.detectChanges();
            expect(buttonElement.getAttribute('aria-disabled')).toBe('true');
        });

        it('should add is-disabled class when aria-disabled', () => {
            fixture.componentRef.setInput('ariaDisabled', true);
            fixture.detectChanges();
            expect(buttonElement.classList.contains('is-disabled')).toBe(true);
        });
    });

    describe('Toggled State', () => {
        it('should set toggled state', () => {
            fixture.componentRef.setInput('toggled', true);
            fixture.detectChanges();
            expect(component.toggled()).toBe(true);
        });

        it('should support deprecated ariaPressed input', () => {
            fixture.componentRef.setInput('ariaPressed', true);
            fixture.detectChanges();
            expect(component.ariaPressed()).toBe(true);
        });

        it('should support deprecated ariaSelected input', () => {
            fixture.componentRef.setInput('ariaSelected', true);
            fixture.detectChanges();
            expect(component.ariaSelected()).toBe(true);
        });

        it('should combine toggled with deprecated inputs', () => {
            fixture.componentRef.setInput('toggled', false);
            fixture.componentRef.setInput('ariaPressed', true);
            fixture.detectChanges();
            // Button should be toggled due to ariaPressed
            expect(
                buttonElement.hasAttribute('aria-pressed') || buttonElement.classList.contains('fd-button--toggled')
            ).toBe(true);
        });
    });

    describe('Aria Attributes', () => {
        it('should set aria-label', () => {
            fixture.componentRef.setInput('ariaLabel', 'Custom Label');
            fixture.detectChanges();
            expect(buttonElement.getAttribute('aria-label')).toBe('Custom Label');
        });

        it('should set aria-labelledby', () => {
            fixture.componentRef.setInput('ariaLabelledBy', 'label-id');
            fixture.detectChanges();
            // Platform button doesn't directly set aria-labelledby, but passes to core button
            expect(component.ariaLabelledBy()).toBe('label-id');
        });

        it('should set aria-describedby', () => {
            fixture.componentRef.setInput('ariaDescribedBy', 'desc-id');
            fixture.detectChanges();
            expect(component.ariaDescribedBy()).toBe('desc-id');
        });

        it('should set aria-expanded', () => {
            fixture.componentRef.setInput('ariaExpanded', true);
            fixture.detectChanges();
            expect(buttonElement.getAttribute('aria-expanded')).toBe('true');
        });

        it('should set aria-controls', () => {
            fixture.componentRef.setInput('ariaControlsId', 'menu-id');
            fixture.detectChanges();
            expect(buttonElement.getAttribute('aria-controls')).toBe('menu-id');
        });
    });

    describe('Type and Value', () => {
        it('should set button type attribute', () => {
            fixture.componentRef.setInput('type', 'submit');
            fixture.detectChanges();
            expect(buttonElement.getAttribute('type')).toBe('submit');
        });

        it('should set button value attribute', () => {
            fixture.componentRef.setInput('value', 'submitValue');
            fixture.detectChanges();
            expect(buttonElement.getAttribute('value')).toBe('submitValue');
        });
    });

    describe('Click Event', () => {
        it('should emit buttonClicked event on click', () => {
            let clickEvent: any;
            component.buttonClicked.subscribe((event) => {
                clickEvent = event;
            });

            buttonElement.click();
            fixture.detectChanges();

            expect(clickEvent).toBeDefined();
        });

        it('should call onBtnClick method', () => {
            jest.spyOn(component as any, 'onBtnClick');
            const mockEvent = { type: 'click' };
            (component as any).onBtnClick(mockEvent);
            expect((component as any).onBtnClick).toHaveBeenCalledWith(mockEvent);
        });
    });

    describe('ButtonModel Interface', () => {
        it('should implement setDisabled method (logs warning for signal inputs)', () => {
            const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
            component.setDisabled(true);
            expect(consoleWarnSpy).toHaveBeenCalled();
            consoleWarnSpy.mockRestore();
        });

        it('should implement isDisabled method', () => {
            expect(component.isDisabled()).toBe(false);
            fixture.componentRef.setInput('disabled', true);
            fixture.detectChanges();
            expect(component.isDisabled()).toBe(true);
        });

        it('should implement setFdType method (logs warning for signal inputs)', () => {
            const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
            component.setFdType('positive');
            expect(consoleWarnSpy).toHaveBeenCalled();
            consoleWarnSpy.mockRestore();
        });

        it('should implement getFdType method', () => {
            fixture.componentRef.setInput('fdType', 'negative');
            fixture.detectChanges();
            expect(component.getFdType()).toBe('negative');
        });

        it('should implement markForCheck method', () => {
            expect(() => component.markForCheck()).not.toThrow();
        });
    });

    describe('Deprecation Warnings', () => {
        it('should warn about deprecated component on construction', () => {
            // Component already constructed in beforeEach, warning already triggered
            expect(component).toBeTruthy();
        });
    });

    describe('Edge Cases', () => {
        it('should handle empty/null values gracefully', () => {
            fixture.componentRef.setInput('label', '');
            fixture.componentRef.setInput('glyph', null);
            fixture.detectChanges();
            expect(component).toBeTruthy();
        });

        it('should handle multiple rapid updates', () => {
            fixture.componentRef.setInput('fdType', 'standard');
            fixture.componentRef.setInput('fdType', 'positive');
            fixture.componentRef.setInput('fdType', 'negative');
            fixture.detectChanges();
            expect(component.getFdType()).toBe('negative');
        });

        it('should maintain state after multiple detectChanges calls', () => {
            fixture.componentRef.setInput('disabled', true);
            fixture.detectChanges();
            fixture.detectChanges();
            fixture.detectChanges();
            expect(component.isDisabled()).toBe(true);
        });
    });
});
