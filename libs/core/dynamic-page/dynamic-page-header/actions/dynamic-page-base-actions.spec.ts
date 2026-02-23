import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicPageBaseActions } from './dynamic-page-base-actions';

// Test component that extends DynamicPageBaseActions to test the protected methods
@Component({
    selector: 'fd-test-actions',
    template: `<div class="fd-toolbar"></div>`
})
class TestActionsComponent extends DynamicPageBaseActions {
    // Expose protected method for testing
    testAddClassToToolbar(_class: string): void {
        this.addClassToToolbar(_class);
    }
}

@Component({
    selector: 'fd-test-no-toolbar',
    template: `<div class="other-element"></div>`
})
class TestActionsWithoutToolbarComponent extends DynamicPageBaseActions {
    // Expose protected method for testing
    testAddClassToToolbar(_class: string): void {
        this.addClassToToolbar(_class);
    }
}

describe('DynamicPageBaseActions', () => {
    describe('with toolbar', () => {
        let fixture: ComponentFixture<TestActionsComponent>;
        let component: TestActionsComponent;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestActionsComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(TestActionsComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should create', () => {
            expect(component).toBeTruthy();
        });

        it('should inject ElementRef', () => {
            expect(component.elementRef).toBeTruthy();
            expect(component.elementRef.nativeElement).toBeTruthy();
        });

        it('should add class to toolbar element when toolbar exists', () => {
            const testClass = 'test-class';

            component.testAddClassToToolbar(testClass);

            const toolbarEl = component.elementRef.nativeElement.querySelector('.fd-toolbar');
            expect(toolbarEl.classList.contains(testClass)).toBe(true);
        });

        it('should add multiple classes when called multiple times', () => {
            const class1 = 'first-class';
            const class2 = 'second-class';

            component.testAddClassToToolbar(class1);
            component.testAddClassToToolbar(class2);

            const toolbarEl = component.elementRef.nativeElement.querySelector('.fd-toolbar');
            expect(toolbarEl.classList.contains(class1)).toBe(true);
            expect(toolbarEl.classList.contains(class2)).toBe(true);
        });
    });

    describe('without toolbar', () => {
        let fixture: ComponentFixture<TestActionsWithoutToolbarComponent>;
        let component: TestActionsWithoutToolbarComponent;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestActionsWithoutToolbarComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(TestActionsWithoutToolbarComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should not throw when toolbar element does not exist', () => {
            expect(() => {
                component.testAddClassToToolbar('test-class');
            }).not.toThrow();
        });
    });
});
