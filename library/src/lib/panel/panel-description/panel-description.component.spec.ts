import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelDescriptionComponent } from './panel-description.component';

describe('PanelDescriptionComponent', () => {
    let component: PanelDescriptionComponent;
    let fixture: ComponentFixture<PanelDescriptionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PanelDescriptionComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PanelDescriptionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
