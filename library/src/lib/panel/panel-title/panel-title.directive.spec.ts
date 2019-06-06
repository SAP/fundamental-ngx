import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { PanelTitleDirective } from './panel-title.directive';
import { PanelModule } from '../panel.module';

@Component({
    template: `        
        <h1 #directiveElement fd-panel-title>Test Text</h1>
    `
})
class TestComponent {
    @ViewChild('directiveElement')
    ref: ElementRef;
}


describe('PanelTitleDirective', () => {
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
        expect(component.ref.nativeElement.className).toBe('fd-panel__title');
    });
});
