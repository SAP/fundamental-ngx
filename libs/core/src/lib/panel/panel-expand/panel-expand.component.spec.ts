import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PanelExpandComponent } from './panel-expand.component';
import { ChangeDetectorRef, ElementRef, DebugElement } from '@angular/core';
import { PanelService } from '../panel.service';
import { BehaviorSubject } from 'rxjs';


describe('PanelExpandComponent', () => {
    let component: PanelExpandComponent;
    let fixture: ComponentFixture<PanelExpandComponent>;
    let debugElement: DebugElement;
    let button: ElementRef;
    let changeDetectorRef: ChangeDetectorRef;
    let panelServiceSpy: jasmine.SpyObj<PanelService>;

    beforeEach(async(() => {
        const panelSpy = jasmine.createSpyObj('PanelService', ['updateExpanded']);

        TestBed.configureTestingModule({
            declarations: [PanelExpandComponent],
            providers: [{ provide: PanelService, useValue: panelSpy }]
        }).compileComponents();

        panelServiceSpy = TestBed.get(PanelService);
        panelServiceSpy.expanded$ = new BehaviorSubject({isExpanded: false, isExpandTriggerClick: false});
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

    it('should call the Panel Service with the correct value', () => {
        button.nativeElement.click();
        fixture.detectChanges();
        expect(panelServiceSpy.updateExpanded).toHaveBeenCalledWith(true, true);
    });

    it('should expand the button when clicked', () => {
        button.nativeElement.click();
        fixture.detectChanges();
        expect(button.nativeElement.className).toContain('is-expanded');
    });

    it('should assign compact modifier class to the button', () => {
        component.compact = true;
        changeDetectorRef.markForCheck();
        fixture.detectChanges();
        expect(button.nativeElement.className).toContain('fd-button--compact');
    });
});
