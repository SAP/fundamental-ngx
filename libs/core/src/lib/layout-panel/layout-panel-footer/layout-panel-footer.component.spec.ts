import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutPanelFooterComponent } from './layout-panel-footer.component';

describe('LayoutPanelFooterComponent', () => {
    let component: LayoutPanelFooterComponent;
    let fixture: ComponentFixture<LayoutPanelFooterComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LayoutPanelFooterComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LayoutPanelFooterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have panel footer class', () => {
        expect(fixture.nativeElement.className).toBe('fd-layout-panel__footer');
    });
});
