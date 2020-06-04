import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PanelExpandComponent } from './panel-expand.component';
import { ChangeDetectorRef, ElementRef, DebugElement } from '@angular/core';


describe('PanelExpandComponent', () => {
    let component: PanelExpandComponent;
    let fixture: ComponentFixture<PanelExpandComponent>;
    let debugElement: DebugElement;
    let button: ElementRef;
    let changeDetectorRef: ChangeDetectorRef;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PanelExpandComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PanelExpandComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        button = debugElement.query(By.css('button'));
        changeDetectorRef = fixture.componentRef.injector.get(ChangeDetectorRef);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should assign class', () => {
        expect(fixture.nativeElement.className).toContain('fd-panel__expand');
    });

    it('should expand the button', () => {
        button.nativeElement.click();
        fixture.detectChanges();
        expect(button.nativeElement.className).toContain('is-expanded');
    });

    it('should emit event when the button is clicked', () => {
        component.isExpanded = false;
        spyOn(component.expandedValue, 'emit');
        button.nativeElement.click();
        expect(component.expandedValue.emit).toHaveBeenCalledWith(true);
    });

    it('should assign compact modifier class to the button', () => {
        component.compact = true;
        changeDetectorRef.markForCheck();
        fixture.detectChanges();
        expect(button.nativeElement.className).toContain('fd-button--compact');
    });
});
