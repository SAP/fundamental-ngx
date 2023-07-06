import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { AvatarGroupOverflowBodyDirective } from './avatar-group-overflow-body.directive';

@Component({
    template: `<div #directiveElement fd-avatar-group-overflow-body>Avatar Group Overflow Body</div>`,
    standalone: true,
    imports: [AvatarGroupOverflowBodyDirective]
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
        expect(component.ref.nativeElement.classList).toContain('fd-avatar-group__overflow-body');
    });
});
