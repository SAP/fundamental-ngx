import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutPanelHeadComponent } from './layout-panel-head.component';

describe('LayoutPanelHeadComponent', () => {
    let component: LayoutPanelHeadComponent;
    let fixture: ComponentFixture<LayoutPanelHeadComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LayoutPanelHeadComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LayoutPanelHeadComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have panel head class', () => {
        expect(fixture.nativeElement.className).toBe('fd-layout-panel__head');
    });
});
