import { FormSetDirective } from './form-set.directive';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormModule } from '../form.module';


@Component({
    template: `
            <div #directiveElement fd-form-set>Form Parent Test Text</div>       
            `
})

class TestComponent {
    @ViewChild('directiveElement')
    ref: ElementRef;
}

describe('FormSetDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent],
            imports: [FormModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create an instance', () => {
        const directive = new FormSetDirective();
        expect(directive).toBeTruthy();
    });

    it('should assign class', () => {
        expect(component.ref.nativeElement.className).toBe('fd-form__set');
    });
});
