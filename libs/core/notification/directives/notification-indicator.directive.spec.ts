import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NotificationModule } from '../notification.module';
import { IndicatorStates } from './notification-indicator.directive';
import { NotificationIndicatorDirective } from './notification-indicator.directive';

@Component({
    template: `<div fd-notification-indicator [type]="type"></div> `
})
class TestComponent {
    @ViewChild(NotificationIndicatorDirective, { static: true })
    directive: NotificationIndicatorDirective;
    type: IndicatorStates;
}
describe('NotificationIndicatorDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(waitForAsync(() => {
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
        component.directive.buildComponentCssClass();
        expect(component.directive.elementRef.nativeElement.className).toContain('fd-notification__indicator');
    });

    it('should assign success class', () => {
        component.type = 'success';
        component.directive.buildComponentCssClass();
        fixture.detectChanges();
        expect(component.directive.elementRef.nativeElement.classList).toContain('fd-notification__indicator--success');
    });
});
