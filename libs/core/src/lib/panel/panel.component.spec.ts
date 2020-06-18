import { Component, ElementRef, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PanelModule } from './panel.module';
import { PanelService } from './panel.service';
import { BehaviorSubject } from 'rxjs';

@Component({
    template: `
        <div #panelRef fd-panel [compact]="isCompact" [fixed]="isFixed">
            <div fd-panel-header>
                <div fd-panel-expand [compact]="isCompact"></div>
                <h5 fd-panel-title>Panel Header</h5>
            </div>
            <div fd-panel-content>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut laoreet lorem.
            </div>
        </div>
    `
})
class TestComponent {
    @ViewChild('panelRef', { read: ElementRef })
    panelRef: ElementRef;

    isCompact: boolean = false;
    isFixed: boolean = false;
}

describe('PanelComponent', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let panelContent: ElementRef;
    let button: ElementRef;
    let panelServiceSpy: jasmine.SpyObj<PanelService>;

    beforeEach(async(() => {
        const panelSpy = jasmine.createSpyObj('PanelService', ['updateExpanded']);

        TestBed.configureTestingModule({
            declarations: [TestComponent],
            providers: [{ provide: PanelService, useValue: panelSpy }],
            imports: [PanelModule]
        }).compileComponents();

        panelServiceSpy = TestBed.get(PanelService);
        panelServiceSpy.expanded$ = new BehaviorSubject({isExpanded: false, isExpandTriggerClick: false});
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.debugElement.componentInstance;
        button = fixture.debugElement.query(By.css('button'));
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
        button.nativeElement.click();
        fixture.detectChanges();
        panelContent = fixture.debugElement.query(By.css('.fd-panel__content'));
        expect(panelContent.nativeElement.innerHTML).toContain('Lorem ipsum dolor sit amet');
    });
});
