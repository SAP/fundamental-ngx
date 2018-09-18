import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TileTitleComponent } from './tile-title.component';

describe('TileTitleComponent', () => {
    let component: TileTitleComponent;
    let fixture: ComponentFixture<TileTitleComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TileTitleComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TileTitleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
