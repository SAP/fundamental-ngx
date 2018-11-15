import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelHeadComponent } from './panel-head.component';

describe('PanelHeadComponent', () => {
    let component: PanelHeadComponent;
    let fixture: ComponentFixture<PanelHeadComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PanelHeadComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PanelHeadComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
