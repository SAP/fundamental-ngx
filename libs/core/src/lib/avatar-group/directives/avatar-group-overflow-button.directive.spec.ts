import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Component, ElementRef, ViewChild } from '@angular/core';

import { Size } from '@fundamental-ngx/cdk/utils';
import { AvatarGroupOverflowButtonDirective } from './avatar-group-overflow-button.directive';
import { AvatarGroupOverflowButtonColor } from '../avatar-group.component';

@Component({
    template: `<button #directiveElement fd-avatar-group-overflow-button [size]="size" [color]="color">
        Avatar Group Overflow Button
    </button>`,
    standalone: true,
    imports: [AvatarGroupOverflowButtonDirective]
})
class TestComponent {
    @ViewChild('directiveElement', { static: false })
    ref: ElementRef;

    size: Size = 's';
    color: AvatarGroupOverflowButtonColor = 'neutral';
}

describe('AvatarGroupOverflowButtonDirective', () => {
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

    it('should assign classes', () => {
        expect(component.ref.nativeElement.classList).toContain('fd-button');
        expect(component.ref.nativeElement.classList).toContain('fd-avatar-group__more-button');
    });

    it('should assign class according to size', () => {
        component.size = 'm';
        fixture.detectChanges();
        expect(component.ref.nativeElement.classList).toContain('fd-avatar-group__more-button--m');

        component.size = 'xl';
        fixture.detectChanges();
        expect(component.ref.nativeElement.classList).toContain('fd-avatar-group__more-button--xl');
    });

    it('should assign class according to color', () => {
        component.color = 'random';
        fixture.detectChanges();
        expect(component.ref.nativeElement.className).toMatch(/fd-avatar-group__more-button--accent-color-/);

        component.color = 5;
        fixture.detectChanges();
        expect(component.ref.nativeElement.classList).toContain('fd-avatar-group__more-button--accent-color-5');
    });
});
