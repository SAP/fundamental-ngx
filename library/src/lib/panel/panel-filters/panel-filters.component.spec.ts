import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelFiltersComponent } from './panel-filters.component';

describe('PanelFiltersComponent', () => {
    let component: PanelFiltersComponent;
    let fixture: ComponentFixture<PanelFiltersComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PanelFiltersComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PanelFiltersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have panel filters class', () => {
        expect(fixture.nativeElement.className).toBe('fd-panel__filters');
    });
});
