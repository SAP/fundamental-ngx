import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AvatarGroupLegacyOverflowButtonTextDirective } from './avatar-group-legacy-overflow-button-text.directive';

@Component({
    template: `<span #directiveElement fd-avatar-group-legacy-overflow-button-text
        >Avatar Group Overflow Button Text</span
    >`,
    standalone: true,
    imports: [AvatarGroupLegacyOverflowButtonTextDirective]
})
class TestComponent {
    @ViewChild('directiveElement', { static: false })
    ref: ElementRef;
}

describe('AvatarGroupLegacyOverflowButtonTextDirective', () => {
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
        expect(component.ref.nativeElement.classList).toContain('fd-button__text');
        expect(component.ref.nativeElement.classList).toContain('fd-avatar-group-legacy__button-text');
    });
});
