import { TemplateDirective } from './template.directive';
import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

@Component({
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
            declarations: [TestComponent],
            imports: [TemplateDirective]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create an instance', () => {
        expect(component).toBeTruthy();
        expect(component.templateDirectiveRef).toBeTruthy();
    });

    it('should return template name', () => {
        expect(component.templateDirectiveRef.getName()).toBe('Header');
    });
});
