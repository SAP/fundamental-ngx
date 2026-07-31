import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
    let fixture: ComponentFixture<ButtonComponent>;
    let component: ButtonComponent;
    let element: HTMLElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ButtonComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(ButtonComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;
        fixture.detectChanges();
    });

    describe('Basic Functionality', () => {
        it('should create', () => {
            expect(component).toBeTruthy();
        });

        it('should have default button class', () => {
            expect(element.classList.contains('fd-button')).toBe(true);
        });

        it('should generate default id with prefix', () => {
            expect(component.id()).toContain('fd-button-');
        });

        it('should accept custom id', () => {
            fixture.componentRef.setInput('id', 'custom-button-id');
            fixture.detectChanges();
            expect(component.id()).toBe('custom-button-id');
            expect(element.getAttribute('id')).toBe('custom-button-id');
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
            it(`should apply ${type} button type class`, () => {
                fixture.componentRef.setInput('fdType', type);
                fixture.detectChanges();
                expect(element.classList.contains(`fd-button--${type}`)).toBe(true);
            });
        });

        it('should update button type dynamically', () => {
            fixture.componentRef.setInput('fdType', 'positive');
            fixture.detectChanges();
            expect(element.classList.contains('fd-button--positive')).toBe(true);

            fixture.componentRef.setInput('fdType', 'negative');
            fixture.detectChanges();
            expect(element.classList.contains('fd-button--negative')).toBe(true);
            expect(element.classList.contains('fd-button--positive')).toBe(false);
        });
    });

    describe('Menu Button', () => {
        it('should apply menu class when fdMenu is true', () => {
            fixture.componentRef.setInput('fdMenu', true);
            fixture.detectChanges();
            expect(element.classList.contains('fd-button--menu')).toBe(true);
        });

        it('should remove menu class when fdMenu is false', () => {
            fixture.componentRef.setInput('fdMenu', true);
            fixture.detectChanges();
            expect(element.classList.contains('fd-button--menu')).toBe(true);

            fixture.componentRef.setInput('fdMenu', false);
            fixture.detectChanges();
            expect(element.classList.contains('fd-button--menu')).toBe(false);
        });
    });

    describe('Disabled State', () => {
        it('should add is-disabled class when disabled', () => {
            fixture.componentRef.setInput('disabled', true);
            fixture.detectChanges();
            expect(element.classList.contains('is-disabled')).toBe(true);
            expect(element.getAttribute('disabled')).not.toBeNull();
        });

        it('should add is-disabled class when aria-disabled is true', () => {
            fixture.componentRef.setInput('aria-disabled', true);
            fixture.detectChanges();
            expect(element.classList.contains('is-disabled')).toBe(true);
            expect(element.getAttribute('aria-disabled')).toBe('true');
        });

        it('should handle both disabled and aria-disabled', () => {
            fixture.componentRef.setInput('disabled', true);
            fixture.componentRef.setInput('aria-disabled', true);
            fixture.detectChanges();
            expect(element.classList.contains('is-disabled')).toBe(true);
        });
    });

    describe('Toggled State', () => {
        it('should apply toggled class when toggled is true', () => {
            fixture.componentRef.setInput('toggled', true);
            fixture.detectChanges();
            expect(element.classList.contains('fd-button--toggled')).toBe(true);
            expect(element.getAttribute('aria-pressed')).toBe('true');
        });

        it('should remove toggled class when toggled is false', () => {
            fixture.componentRef.setInput('toggled', true);
            fixture.detectChanges();
            expect(element.classList.contains('fd-button--toggled')).toBe(true);

            fixture.componentRef.setInput('toggled', false);
            fixture.detectChanges();
            expect(element.classList.contains('fd-button--toggled')).toBe(false);
            expect(element.getAttribute('aria-pressed')).toBeNull();
        });
    });

    describe('Selected State', () => {
        it('should set aria-selected when selected is true', () => {
            fixture.componentRef.setInput('selected', true);
            fixture.detectChanges();
            expect(element.getAttribute('aria-selected')).toBe('true');
        });

        it('should remove aria-selected when selected is false', () => {
            fixture.componentRef.setInput('selected', true);
            fixture.detectChanges();
            expect(element.getAttribute('aria-selected')).toBe('true');

            fixture.componentRef.setInput('selected', false);
            fixture.detectChanges();
            expect(element.getAttribute('aria-selected')).toBeNull();
        });
    });

    describe('Aria Attributes', () => {
        it('should set aria-label when provided', () => {
            fixture.componentRef.setInput('ariaLabel', 'Custom Label');
            fixture.detectChanges();
            expect(element.getAttribute('aria-label')).toBe('Custom Label');
        });

        it('should not set aria-describedby when no description and non-special type', () => {
            fixture.componentRef.setInput('fdType', 'standard');
            fixture.detectChanges();
            expect(element.getAttribute('aria-describedby')).toBeNull();
        });

        describe('ariaDescription input', () => {
            it('should set aria-describedby pointing to description span', () => {
                fixture.componentRef.setInput('ariaDescription', 'Custom Description');
                fixture.detectChanges();
                const id = component.id();
                expect(element.getAttribute('aria-describedby')).toContain(`${id}-description`);
            });

            it('should render hidden span with description text', () => {
                fixture.componentRef.setInput('ariaDescription', 'Custom Description');
                fixture.detectChanges();
                const id = component.id();
                const span = element.querySelector(`#${id}-description`);
                expect(span).not.toBeNull();
                expect(span!.textContent!.trim()).toBe('Custom Description');
            });

            it('should not render description span when ariaDescription is not set', () => {
                fixture.detectChanges();
                const id = component.id();
                expect(element.querySelector(`#${id}-description`)).toBeNull();
            });
        });

        describe('special type auto-description', () => {
            const specialTypes = ['emphasized', 'positive', 'negative', 'attention'];

            specialTypes.forEach((type) => {
                it(`should set aria-describedby for ${type} button`, () => {
                    fixture.componentRef.setInput('fdType', type);
                    fixture.detectChanges();
                    const id = component.id();
                    expect(element.getAttribute('aria-describedby')).toContain(`${id}-type-description`);
                });

                it(`should render hidden type description span for ${type} button`, () => {
                    fixture.componentRef.setInput('fdType', type);
                    fixture.detectChanges();
                    const id = component.id();
                    const span = element.querySelector(`#${id}-type-description`);
                    expect(span).not.toBeNull();
                    expect(span!.textContent!.trim()).toBeTruthy();
                });
            });

            it('should not render type description span for non-special types', () => {
                fixture.componentRef.setInput('fdType', 'transparent');
                fixture.detectChanges();
                const id = component.id();
                expect(element.querySelector(`#${id}-type-description`)).toBeNull();
            });

            it('should use ariaTypeDescription to override default type description', () => {
                fixture.componentRef.setInput('fdType', 'negative');
                fixture.componentRef.setInput('ariaTypeDescription', 'Removes item permanently');
                fixture.detectChanges();
                const id = component.id();
                const span = element.querySelector(`#${id}-type-description`);
                expect(span!.textContent!.trim()).toBe('Removes item permanently');
            });
        });

        describe('combined ariaDescription and special type', () => {
            it('should include both IDs in aria-describedby', () => {
                fixture.componentRef.setInput('fdType', 'negative');
                fixture.componentRef.setInput('ariaDescription', 'Deletes the record');
                fixture.detectChanges();
                const id = component.id();
                const describedBy = element.getAttribute('aria-describedby');
                expect(describedBy).toContain(`${id}-description`);
                expect(describedBy).toContain(`${id}-type-description`);
            });
        });

        describe('auto-generated aria-label for special types', () => {
            it('should auto-generate aria-label from label for emphasized button', () => {
                fixture.componentRef.setInput('fdType', 'emphasized');
                fixture.componentRef.setInput('label', 'Submit');
                fixture.detectChanges();
                expect(element.getAttribute('aria-label')).toBe('Submit');
            });

            it('should auto-generate aria-label from glyph for special button without label', () => {
                fixture.componentRef.setInput('fdType', 'positive');
                fixture.componentRef.setInput('glyph', 'slim-arrow-down');
                fixture.detectChanges();
                expect(element.getAttribute('aria-label')).toBe('slim arrow down');
            });
        });
    });

    describe('Label and Icon', () => {
        it('should accept label input', () => {
            fixture.componentRef.setInput('label', 'Click Me');
            fixture.detectChanges();
            expect(component.label()).toBe('Click Me');
        });

        it('should accept glyph input', () => {
            fixture.componentRef.setInput('glyph', 'home');
            fixture.detectChanges();
            expect(component.glyph()).toBe('home');
        });

        it('should accept glyphPosition input', () => {
            fixture.componentRef.setInput('glyphPosition', 'after');
            fixture.detectChanges();
            expect(component.glyphPosition()).toBe('after');
        });
    });

    describe('ButtonModel Interface', () => {
        it('should implement isDisabled method', () => {
            expect(component.isDisabled()).toBe(false);

            fixture.componentRef.setInput('disabled', true);
            fixture.detectChanges();
            expect(component.isDisabled()).toBe(true);
        });

        it('should implement getFdType method', () => {
            fixture.componentRef.setInput('fdType', 'positive');
            fixture.detectChanges();
            expect(component.getFdType()).toBe('positive');
        });

        it('should implement isSelected method', () => {
            expect(component.isSelected()).toBe(false);

            fixture.componentRef.setInput('selected', true);
            fixture.detectChanges();
            expect(component.isSelected()).toBe(true);
        });

        it('should implement isToggled method', () => {
            expect(component.isToggled()).toBe(false);

            fixture.componentRef.setInput('toggled', true);
            fixture.detectChanges();
            expect(component.isToggled()).toBe(true);
        });
    });

    describe('Type Attribute', () => {
        it('should have default type "button"', () => {
            expect(element.getAttribute('type')).toBe('button');
        });

        it('should accept custom type', () => {
            fixture.componentRef.setInput('type', 'submit');
            fixture.detectChanges();
            expect(element.getAttribute('type')).toBe('submit');
        });
    });
});
