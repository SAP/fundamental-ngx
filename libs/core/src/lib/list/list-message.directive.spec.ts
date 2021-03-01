import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';
import { ListModule } from './list.module';
import { ListMessageDirective } from './list-message.directive';
import { MessageStates } from '../form/form-message/form-message.component';

@Component({
    template: ` <li #directiveElement fd-list-message [type]="type">List Item Test Text</li> `
})
class TestComponent {
    @ViewChild(ListMessageDirective, { static: true })
    directive: ListMessageDirective;
    type: MessageStates;
}

describe('ListMessageDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent],
            imports: [ListModule]
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
        expect(component.directive.elementRef().nativeElement.className).toContain('fd-list__message');
    });

    it('should assign success class', () => {
        component.type = 'success';
        component.directive.buildComponentCssClass();
        fixture.detectChanges();
        expect(component.directive.elementRef().nativeElement.classList).toContain('fd-list__message--success');
    });
});
