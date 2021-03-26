import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Component, ElementRef, ViewChild } from '@angular/core';

import { Size } from '../../utils/public_api';
import { AvatarGroupModule } from '../avatar-group.module';
import { AvatarGroupOverflowButtonColor } from '../avatar-group.component';

@Component({
    template: `<button #directiveElement fd-avatar-group-overflow-button [size]="size" [color]="color">Avatar Group Overflow Button </button>`
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
            declarations: [TestComponent],
            imports: [AvatarGroupModule]
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
        expect(component.ref.nativeElement).toHaveClass('fd-button');
        expect(component.ref.nativeElement).toHaveClass('fd-avatar-group__more-button');
    });

    it('should assign class according to size', () => {
        component.size = 'm';
        fixture.detectChanges();
        expect(component.ref.nativeElement).toHaveClass('fd-avatar-group__more-button--m');

        component.size = 'xl';
        fixture.detectChanges();
        expect(component.ref.nativeElement).toHaveClass('fd-avatar-group__more-button--xl');
    });

    it('should assign class according to color', () => {
        component.color = 'random';
        fixture.detectChanges();
        expect(component.ref.nativeElement.className).toMatch(/fd-avatar-group__more-button--accent-color-/);

        component.color = 5;
        fixture.detectChanges();
        expect(component.ref.nativeElement).toHaveClass('fd-avatar-group__more-button--accent-color-5');
    });
});
