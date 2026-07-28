import {
    Component,
    ElementRef,
    InjectionToken,
    Pipe,
    PipeTransform,
    Signal,
    ViewChild,
    input,
    signal
} from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { FdTranslatePipe, TranslationResolver } from '@fundamental-ngx/i18n';
import { ObjectStatusComponent } from './object-status.component';

@Pipe({
    name: 'fdTranslate',
    standalone: true
})
class MockFdTranslatePipe implements PipeTransform {
    transform(value: string): Signal<string> {
        // For testing, return a signal that returns the translation key itself
        // This way we can verify the correct keys are being used
        return signal(value);
    }
}

class MockTranslationResolver {
    resolve(_lang: string, key: string): string {
        // Just return the key for testing
        return key;
    }
}

export const FD_LANGUAGE = new InjectionToken<any>('FD_LANGUAGE');

@Component({
    selector: 'fd-test-object-status',
    template: `
        <span
            fd-object-status
            [status]="status()"
            [glyph]="glyph()"
            [label]="label()"
            [indicationColor]="indicationColor()"
            [clickable]="clickable()"
            [inverted]="inverted()"
            [large]="large()"
            [statusMessage]="statusMessage()"
            [ariaLabel]="ariaLabel()"
            [ariaRoleDescription]="ariaRoleDescription()"
        >
        </span>
    `,
    standalone: true,
    imports: [ObjectStatusComponent]
})
class TestObjectStatusComponent {
    @ViewChild(ObjectStatusComponent, { static: true, read: ElementRef })
    objectStatusElementRef: ElementRef;

    readonly status = input<'negative' | 'critical' | 'positive' | 'informative'>();
    readonly glyph = input<string>();
    readonly label = input<string>();
    readonly indicationColor = input<number>();
    readonly clickable = input<boolean>();
    readonly inverted = input<boolean>();
    readonly large = input<boolean>();
    readonly statusMessage = input<string>();
    readonly ariaLabel = input<string>();
    readonly ariaRoleDescription = input<string>();
}

describe('ObjectStatusComponent', () => {
    let objectStatusElementRef: ElementRef;
    let testComponent: TestObjectStatusComponent;
    let fixture: ComponentFixture<TestObjectStatusComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestObjectStatusComponent],
            providers: [
                { provide: TranslationResolver, useClass: MockTranslationResolver },
                { provide: FD_LANGUAGE, useValue: 'en' }
            ]
        })
            .overrideComponent(ObjectStatusComponent, {
                remove: {
                    imports: [FdTranslatePipe]
                },
                add: {
                    imports: [MockFdTranslatePipe]
                }
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestObjectStatusComponent);
        objectStatusElementRef = fixture.componentInstance.objectStatusElementRef;
        testComponent = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Should create', () => {
        expect(testComponent).toBeTruthy();
        expect(objectStatusElementRef).toBeTruthy();
    });

    describe('when status is set', () => {
        beforeEach(() => {
            fixture.componentRef.setInput('status', 'positive');
            fixture.detectChanges();
        });

        it('should add the correct css status class', () => {
            expect(objectStatusElementRef.nativeElement.classList.contains('fd-object-status--positive')).toBe(true);
        });

        describe('when no statusMessage is provided', () => {
            it('should add default translated screen reader status text', () => {
                expect(
                    fixture.debugElement.queryAll(By.css('.fd-object-status__sr-only'))[1].nativeElement.textContent
                ).toBe('coreObjectStatus.positive');
            });
        });

        describe('when statusMessage is provided', () => {
            it('should add the provided statusMessage as screen reader text', () => {
                fixture.componentRef.setInput('statusMessage', 'Custom status message');
                fixture.detectChanges();
                expect(
                    fixture.debugElement.queryAll(By.css('.fd-object-status__sr-only'))[1].nativeElement.textContent
                ).toEqual('Custom status message');
            });
        });
    });

    describe('when indication color is set', () => {
        beforeEach(() => {
            fixture.componentRef.setInput('indicationColor', 2);
            fixture.detectChanges();
        });

        it('should add the correct indication color class', () => {
            expect(objectStatusElementRef.nativeElement.classList.contains('fd-object-status--indication-2')).toBe(
                true
            );
        });

        it('should set an indication color screen reader text', () => {
            expect(
                fixture.debugElement.queryAll(By.css('.fd-object-status__sr-only'))[1].nativeElement.textContent
            ).toBe('coreObjectStatus.indicationColor 2');
        });
    });

    it('Should add icon', () => {
        fixture.componentRef.setInput('glyph', 'future');
        fixture.detectChanges();
        const iconElement = fixture.nativeElement.querySelector('fd-icon');

        expect(iconElement).toBeTruthy();
        // expect(iconElement.getAttribute('glyph')).toBe('future');
    });

    it('Should add inverted class', () => {
        fixture.componentRef.setInput('inverted', true);
        fixture.detectChanges();
        expect(objectStatusElementRef.nativeElement.classList.contains('fd-object-status--inverted')).toBe(true);
    });

    it('Should add large design', () => {
        fixture.componentRef.setInput('large', true);
        fixture.detectChanges();
        expect(objectStatusElementRef.nativeElement.classList.contains('fd-object-status--large')).toBe(true);
    });

    describe('when the object status is clickable', () => {
        beforeEach(() => {
            fixture.componentRef.setInput('clickable', true);
            fixture.detectChanges();
        });

        it('should add clickable class', () => {
            expect(objectStatusElementRef.nativeElement.classList.contains('fd-object-status--link')).toBe(true);
        });

        it('should add tabindex=0', () => {
            expect(objectStatusElementRef.nativeElement.getAttribute('tabindex')).toBe('0');
        });

        it('should add role="button"', () => {
            expect(objectStatusElementRef.nativeElement.getAttribute('role')).toBe('button');
        });

        it('should add default aria-roledescription', () => {
            expect(objectStatusElementRef.nativeElement.getAttribute('aria-roledescription')).toBe(
                'Object Status Button'
            );
        });

        it('should not add an object status screen reader text', () => {
            expect(fixture.debugElement.query(By.css('.fd-object-status__sr-only'))).toBeNull();
        });

        describe('when ariaRoleDescription is set', () => {
            beforeEach(() => {
                fixture.componentRef.setInput('ariaRoleDescription', 'Custom Role Description');
                fixture.detectChanges();
            });

            it('should set custom aria-roledescription', () => {
                expect(objectStatusElementRef.nativeElement.getAttribute('aria-roledescription')).toBe(
                    'Custom Role Description'
                );
            });
        });
    });

    describe('when the object status is not clickable', () => {
        beforeEach(() => {
            fixture.componentRef.setInput('clickable', false);
            fixture.detectChanges();
        });

        it('should add a default object status screen reader text ', () => {
            expect(
                fixture.debugElement.queryAll(By.css('.fd-object-status__sr-only'))[0].nativeElement.textContent
            ).toBe('coreObjectStatus.ariaLabel');
        });

        describe('when ariaLabel is set', () => {
            beforeEach(() => {
                fixture.componentRef.setInput('ariaLabel', 'Custom Aria Label');
                fixture.detectChanges();
            });

            it('should set custom ariaLabel screen reader text', () => {
                expect(
                    fixture.debugElement.queryAll(By.css('.fd-object-status__sr-only'))[0].nativeElement.textContent
                ).toBe('Custom Aria Label');
            });
        });
    });

    it('Should display label', () => {
        const label = 'Test label';
        fixture.componentRef.setInput('label', label);
        fixture.detectChanges();

        const labelTextElement = fixture.nativeElement.querySelector('.fd-object-status__text');

        expect(labelTextElement).toBeTruthy();
        expect(labelTextElement.textContent.trim()).toBe(label);
    });
});
