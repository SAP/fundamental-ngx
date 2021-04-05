import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { PanelContentDirective } from './panel-content.directive';
import { PanelModule } from '../panel.module';

@Component({
    template: `<div #directiveElement fd-panel-content [height]="'100px'">Test Panel Content</div>`
})
class TestComponent {
    @ViewChild('directiveElement')
    ref: ElementRef;
}

describe('PanelContentDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(waitForAsync(() => {
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
        expect(component.ref.nativeElement.className).toBe('fd-panel__content');
    });

    it('should assign height of the container', () => {
        const style = getComputedStyle(component.ref.nativeElement);
        expect(style.height).toEqual('100px');
    });
});
