import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ListSublineDirective } from './list-subline.directive';

@Component({
    template: `<li #componentElement fd-list-subline [truncate]="isTruncate">List Subline Directive Test</li>`,
    standalone: true,
    imports: [ListSublineDirective]
})
class TestComponent {
    @ViewChild('componentElement', { read: ElementRef })
    ref!: ElementRef;

    isTruncate = false;
}

describe('ListSublineDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let directiveInstance: ListSublineDirective;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        // Get the directive instance
        const debugElement = fixture.debugElement.query(By.directive(ListSublineDirective));
        directiveInstance = debugElement.injector.get(ListSublineDirective);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        expect(directiveInstance).toBeTruthy();
    });

    it('should assign base class', () => {
        expect(component.ref.nativeElement.classList).toContain('fd-list__subline');
    });

    it('should not have truncate class by default', () => {
        expect(component.ref.nativeElement.classList).not.toContain('fd-list__subline--truncate');
    });

    it('should add truncate class when truncate is true (via input binding)', () => {
        component.isTruncate = true;
        fixture.detectChanges();

        expect(component.ref.nativeElement.classList).toContain('fd-list__subline--truncate');
    });
});
