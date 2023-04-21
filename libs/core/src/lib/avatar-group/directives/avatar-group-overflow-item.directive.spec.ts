import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AvatarGroupModule } from '../avatar-group.module';

@Component({
    template: `<div #directiveElement fd-avatar-group-overflow-item>Avatar Group Overflow Item</div>`,
    standalone: true,
    imports: [AvatarGroupModule]
})
class TestComponent {
    @ViewChild('directiveElement', { read: ElementRef })
    ref: ElementRef;
}

describe('AvatarGroupOverflowItemDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [AvatarGroupModule, TestComponent]
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
        expect(component.ref.nativeElement).toHaveClass('fd-avatar-group__item');
    });
});
