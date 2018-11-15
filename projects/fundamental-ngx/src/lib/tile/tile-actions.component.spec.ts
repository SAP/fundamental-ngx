import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TileActionsComponent } from './tile-actions.component';

describe('TileActionsComponent', () => {
    let component: TileActionsComponent;
    let fixture: ComponentFixture<TileActionsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TileActionsComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TileActionsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
