import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormStates } from '@fundamental-ngx/cdk/forms';
import { ListMessageDirective } from './list-message.directive';
import { ListModule } from './list.module';

@Component({
    template: ` <li #directiveElement fd-list-message [type]="type">List Item Test Text</li> `,
    standalone: true,
    imports: [ListModule]
})
class TestComponent {
    @ViewChild(ListMessageDirective, { static: true })
    directive: ListMessageDirective;
    type: FormStates;
}

describe('ListMessageDirective', () => {
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
        component.directive.buildComponentCssClass();
        expect(component.directive.elementRef.nativeElement.className).toContain('fd-list__message');
    });

    it('should assign success class', () => {
        component.type = 'success';
        component.directive.buildComponentCssClass();
        fixture.detectChanges();
        expect(component.directive.elementRef.nativeElement.classList).toContain('fd-list__message--success');
    });
});
