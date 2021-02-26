import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PanelModule } from './panel.module';
import { RtlService } from '../utils/services/rtl.service';

@Component({
    template: `
        <fd-panel #panelRef [compact]="isCompact" [fixed]="isFixed">
            <h5 fd-panel-title>Panel Header</h5>
            <div fd-panel-content>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut laoreet lorem.
            </div>
        </fd-panel>
    `
})
class TestComponent {
    @ViewChild('panelRef', { read: ElementRef })
    panelRef: ElementRef;

    isCompact = false;
    isFixed = false;
}

describe('PanelComponent', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let panelContent: ElementRef;
    let button: ElementRef;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent],
            imports: [PanelModule],
            providers: [RtlService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.debugElement.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should assign class', () => {
        expect(component.panelRef.nativeElement.className).toContain('fd-panel');
    });

    it('should assign additional classes', () => {
        component.isCompact = true;
        component.isFixed = true;
        fixture.detectChanges();
        expect(component.panelRef.nativeElement.classList).toContain('fd-panel--compact');
        expect(component.panelRef.nativeElement.classList).toContain('fd-panel--fixed');
    });

    it('should not display the panel content', () => {
        panelContent = fixture.debugElement.query(By.css('.fd-panel__content'));
        expect(panelContent).toBeNull();
    });

    it('should display the panel content when the Panel is fixed', () => {
        component.isFixed = true;
        fixture.detectChanges();
        panelContent = fixture.debugElement.query(By.css('.fd-panel__content'));
        expect(panelContent.nativeElement.innerHTML).toContain('Lorem ipsum dolor sit amet');
    });

    it('should expand the content when the button is clicked', () => {
        button = fixture.debugElement.query(By.css('button'));
        button.nativeElement.click();
        fixture.detectChanges();
        panelContent = fixture.debugElement.query(By.css('.fd-panel__content'));
        expect(button.nativeElement.classList).toContain('is-expanded');
        expect(panelContent.nativeElement.innerHTML).toContain('Lorem ipsum dolor sit amet');
    });
});
