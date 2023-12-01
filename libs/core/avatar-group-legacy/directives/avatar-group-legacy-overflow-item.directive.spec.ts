import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AvatarGroupLegacyOverflowItemDirective } from './avatar-group-legacy-overflow-item.directive';

@Component({
    template: `<div #directiveElement fd-avatar-group-legacy-overflow-item>Avatar Group Overflow Item</div>`,
    standalone: true,
    imports: [AvatarGroupLegacyOverflowItemDirective]
})
class TestComponent {
    @ViewChild('directiveElement', { read: ElementRef })
    ref: ElementRef;
}

describe('AvatarGroupLegacyOverflowItemDirective', () => {
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

    /** TODO: #6316 */
    xit('should assign class', () => {
        expect(component.ref.nativeElement.classList).toContain('fd-avatar-group-legacy__item');
    });
});
