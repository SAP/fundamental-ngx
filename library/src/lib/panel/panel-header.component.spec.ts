import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelHeaderComponent } from './panel-header.component';

describe('PanelHeaderComponent', () => {
    let component: PanelHeaderComponent;
    let fixture: ComponentFixture<PanelHeaderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PanelHeaderComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PanelHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
