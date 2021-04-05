import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LayoutPanelFiltersComponent } from './layout-panel-filters.component';

describe('LayoutPanelFiltersComponent', () => {
    let component: LayoutPanelFiltersComponent;
    let fixture: ComponentFixture<LayoutPanelFiltersComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [LayoutPanelFiltersComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LayoutPanelFiltersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have panel filters class', () => {
        expect(fixture.nativeElement.className).toContain('fd-layout-panel__filters');
    });
});
