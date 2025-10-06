import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ListModule } from '../list.module';
import { ListTitleDirective } from './list-title.directive';

@Component({
    template: `<li #componentElement fd-list-title [truncate]="isTruncate">ListTitleComponent</li>`,
    standalone: true,
    imports: [ListModule]
})
class TestComponent {
    @ViewChild('componentElement', { read: ElementRef })
    ref!: ElementRef;

    isTruncate = false;
}

describe('ListTitleDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let directiveInstance: ListTitleDirective;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        const debugElement = fixture.debugElement.query(By.directive(ListTitleDirective));
        directiveInstance = debugElement.injector.get(ListTitleDirective);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        expect(directiveInstance).toBeTruthy();
    });

    it('should assign base class', () => {
        expect(component.ref.nativeElement.classList).toContain('fd-list__title');
    });

    it('should not have truncate or wrap classes by default', () => {
        expect(component.ref.nativeElement.classList).not.toContain('fd-list__title--truncate');
    });

    it('should add truncate class when truncate is true (via input binding)', () => {
        component.isTruncate = true;
        fixture.detectChanges();

        expect(component.ref.nativeElement.classList).toContain('fd-list__title--truncate');
    });
});
