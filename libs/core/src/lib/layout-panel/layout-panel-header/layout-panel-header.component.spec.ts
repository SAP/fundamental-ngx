import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutPanelHeaderComponent } from './layout-panel-header.component';

describe('LayoutPanelHeaderComponent', () => {
    let component: LayoutPanelHeaderComponent;
    let fixture: ComponentFixture<LayoutPanelHeaderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LayoutPanelHeaderComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LayoutPanelHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have panel head class', () => {
        expect(fixture.nativeElement.className).toBe('fd-layout-panel__header');
    });
});
