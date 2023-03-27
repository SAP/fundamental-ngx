import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ListModule } from './list.module';

@Component({
    template: `
        <ul
            #componentElement
            [dropdownMode]="dropdown"
            [multiInputMode]="multiInput"
            [hasMessage]="hasMessage"
            [noBorder]="noBorder"
            [fdCompact]="compact"
            [unreadIndicator]="unreadIndicator"
            fd-list
        >
            Action Bar Title Test Text
        </ul>
    `
})
class TestComponent {
    @ViewChild('componentElement', { read: ElementRef })
    ref: ElementRef;

    dropdown = false;

    multiInput = false;

    compact = false;

    hasMessage = false;

    noBorder = false;

    unreadIndicator = false;
}

describe('ListComponent', () => {
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
        expect(component.ref.nativeElement.className).toContain('fd-list');
    });

    it('should assign additional classes', () => {
        component.dropdown = true;
        component.compact = true;
        component.multiInput = true;
        component.hasMessage = true;
        component.noBorder = true;
        fixture.detectChanges();
        expect(component.ref.nativeElement.classList).toContain('fd-list--no-border');
        expect(component.ref.nativeElement.classList).toContain('fd-list--has-message');
        expect(component.ref.nativeElement.classList).toContain('is-compact');
        expect(component.ref.nativeElement.classList).toContain('fd-list--multi-input');
        expect(component.ref.nativeElement.classList).toContain('fd-list--dropdown');
    });

    it('should add unread indicator', () => {
        component.unreadIndicator = true;
        fixture.detectChanges();

        expect(component.ref.nativeElement.classList).toContain('fd-list--unread-indicator');
    });
});
