import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { AvatarGroupLegacyPopoverControlDirective } from './avatar-group-legacy-popover-control.directive';

@Component({
    template: `<fd-avatar #directiveElement fd-avatar-group-legacy-popover-control></fd-avatar>`,
    standalone: true,
    imports: [AvatarComponent, AvatarGroupLegacyPopoverControlDirective]
})
class TestComponent {
    @ViewChild('directiveElement', { read: ElementRef })
    ref: ElementRef;
}

describe('AvatarGroupLegacyPopoverControlDirective', () => {
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
        expect(component.ref.nativeElement.classList).toContain('fd-avatar-group-legacy__popover-control');
    });
});
