import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformPanelComponent } from './panel.component';

describe('PanelComponent', () => {
    let component: PlatformPanelComponent;
    let fixture: ComponentFixture<PlatformPanelComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PlatformPanelComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PlatformPanelComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
