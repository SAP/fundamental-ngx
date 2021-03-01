import { TemplateDirective } from './template.directive';
import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TemplateModule } from './template.module';

@Component({
    template: '<ng-template fdTemplate="Header">Template content</ng-template>'
})
class TestComponent {
    @ViewChild(TemplateDirective) templateDirectiveRef: TemplateDirective;
}

describe('TemplateDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(waitForAsync(() => {
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

    it('should create an instance', () => {
        expect(component).toBeTruthy();
        expect(component.templateDirectiveRef).toBeTruthy();
    });

    it('should return template name', () => {
        expect(component.templateDirectiveRef.getName()).toBe('Header');
    });
});
