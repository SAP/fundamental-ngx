import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ListModule } from '../list.module';

@Component({
    template: `
        <li
            #componentElement
            fd-list-link
            [navigated]="navigated"
            [navigationIndicator]="navigationIndicator"
            [selected]="selected"
        >
            ListLinkComponent
        </li>
    `
})
class TestComponent {
    @ViewChild('componentElement', { read: ElementRef })
    ref: ElementRef;

    navigated = false;

    navigationIndicator = false;

    selected = false;

}

describe('ListTitleComponent', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent],
            imports: [ListModule]
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
        component.selected = true;
        component.navigated = true;
        component.navigationIndicator = true;

        fixture.detectChanges();

        expect(component.ref.nativeElement.classList).toContain('fd-list__link--navigation-indicator');
        expect(component.ref.nativeElement.classList).toContain('is-navigated');
        expect(component.ref.nativeElement.classList).toContain('is-selected');
    });
});
