import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Component, ElementRef, ViewChild } from '@angular/core';

import { AvatarGroupModule } from '../avatar-group.module';

@Component({
    template: `<div #directiveElement fd-avatar-group-item>Avatar Group Item</div>`
})
class TestComponent {
    @ViewChild('directiveElement', { static: false })
    ref: ElementRef;
}

describe('AvatarGroupItemDirective', () => {
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

    it('should assign class', () => {
        expect(component.ref.nativeElement).toHaveClass('fd-avatar-group__item');
    });
});
