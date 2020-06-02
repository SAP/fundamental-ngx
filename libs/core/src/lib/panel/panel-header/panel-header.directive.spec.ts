import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { PanelHeaderDirective } from './panel-header.directive';
import { PanelModule } from '../panel.module';

@Component({
    template: `<div #directiveElement fd-panel-header>Test Panel Header</div>`
})
class TestComponent {
    @ViewChild('directiveElement')
    ref: ElementRef;
}

describe('PanelHeaderDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent],
            imports: [PanelModule]
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
        expect(component.ref.nativeElement.className).toBe('fd-panel__header');
    });
});
