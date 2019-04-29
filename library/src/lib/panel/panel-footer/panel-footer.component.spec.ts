import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelFooterComponent } from './panel-footer.component';

describe('PanelFooterComponent', () => {
    let component: PanelFooterComponent;
    let fixture: ComponentFixture<PanelFooterComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PanelFooterComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PanelFooterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have panel footer class', () => {
        expect(fixture.nativeElement.className).toBe('fd-panel__footer');
    });
});
