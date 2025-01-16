import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ListModule } from '../list.module';

@Component({
    template: `
        <li #componentElement fd-list-link [navigated]="navigated" [navigationIndicator]="navigationIndicator">
            ListLinkComponent
        </li>
    `,
    standalone: true,
    imports: [ListModule]
})
class TestComponent {
    @ViewChild('componentElement', { read: ElementRef })
    ref: ElementRef;

    navigated = false;

    navigationIndicator = false;
}

describe('ListTitleComponent', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should assign class', () => {
        expect(component.ref.nativeElement.className).toBe('fd-list__link');
    });

    it('should assign additional classes', () => {
        component.navigated = true;
        component.navigationIndicator = true;

        fixture.detectChanges();

        expect(component.ref.nativeElement.classList).toContain('fd-list__link--navigation-indicator');
        expect(component.ref.nativeElement.classList).toContain('is-navigated');
    });
});
