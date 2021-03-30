import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Component, ElementRef, ViewChild } from '@angular/core';

import { AvatarGroupModule } from '../avatar-group.module';

@Component({
    template: `<span #directiveElement fd-avatar-group-overflow-button-text>Avatar Group Overflow Button Text</span>`
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
        expect(component.ref.nativeElement).toHaveClass('fd-button__text');
        expect(component.ref.nativeElement).toHaveClass('fd-avatar-group__button-text');
    });
});
