import { TemplateDirective } from './template.directive';
import { Component, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

@Component({
    template: '<ng-template [fdTemplate]="templateName">Template content</ng-template>'
})
class TestComponent {
    @ViewChild(TemplateDirective, {static: true}) templateDirectiveRef: TemplateDirective;
    public templateName: string = 'Header';
}

describe('TemplateDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent]
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
        expect(component.templateDirectiveRef.getName).toBe(component.templateName);
    });

});
