import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { AvatarGroupOverflowButtonTextDirective } from './avatar-group-overflow-button-text.directive';

@Component({
    template: `<span #directiveElement fd-avatar-group-overflow-button-text>Avatar Group Overflow Button Text</span>`,
    standalone: true,
    imports: [AvatarGroupOverflowButtonTextDirective]
})
class TestComponent {
    @ViewChild('directiveElement', { static: false })
    ref: ElementRef;
}

describe('AvatarGroupOverflowButtonTextDirective', () => {
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
        expect(component.ref.nativeElement.classList).toContain('fd-avatar-group__button-text');
    });
});
