import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelBodyComponent } from './panel-body.component';

describe('PanelBodyComponent', () => {
    let component: PanelBodyComponent;
    let fixture: ComponentFixture<PanelBodyComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PanelBodyComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PanelBodyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have body class', () => {
        expect(fixture.nativeElement.className).toContain('fd-panel__body');
    });

    it('should support edge bleeding', () => {
        component.bleed = true;
        fixture.detectChanges();
        expect(fixture.nativeElement.className).toContain('fd-panel__body--bleed');
    });
});
