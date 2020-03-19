import { TemplateDirective } from './template.directive';
import { Component, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TemplateModule } from './template.module';

@Component({
    template: '<div fdTemplate="templateName">Template content</div>'
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
            imports: [TemplateModule],
            declarations: [TestComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    xit('should create an instance', () => {
        expect(component).toBeTruthy();
        expect(component.templateDirectiveRef).toBeTruthy();
    });

    xit('should return template name', () => {
        expect(component.templateDirectiveRef.getName).toBe(component.templateName);
    });

});
