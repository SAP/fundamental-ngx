import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TemplateDirective } from './template.directive';

@Component({
    standalone: true,
    imports: [TemplateDirective],
    template: '<ng-template fdkTemplate="Header">Template content</ng-template>'
})
class TestComponent {
    @ViewChild(TemplateDirective) templateDirectiveRef: TemplateDirective;
}

describe('TemplateDirective', () => {
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

    it('should create an instance of the component and directive', () => {
        expect(component).toBeTruthy();
        expect(component.templateDirectiveRef).toBeTruthy();
    });

    it('should return the name of the template', () => {
        expect(component.templateDirectiveRef.getName()).toBe('Header');
    });
});
