import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelTitleComponent } from './panel-title.component';

describe('PanelTitleComponent', () => {
    let component: PanelTitleComponent;
    let fixture: ComponentFixture<PanelTitleComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PanelTitleComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PanelTitleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
