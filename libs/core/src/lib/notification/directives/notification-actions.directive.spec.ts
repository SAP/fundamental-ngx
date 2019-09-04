import { NotificationActionsDirective } from './notification-actions.directive';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationModule } from '@fundamental-ngx/core';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
    template: `
        <li #directiveElement fd-notification-actions>Notification Test</li>
    `
})
class TestComponent {
    @ViewChild('directiveElement')
    ref: ElementRef;
}
describe('NotificationActionsDirective', () => {

    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent],
            imports: [NotificationModule]
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
        expect(component.ref.nativeElement.className).toBe('fd-notification__actions');
    });
});
