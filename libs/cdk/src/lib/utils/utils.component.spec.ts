import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilsComponent } from './utils.component';

describe('UtilsComponent', () => {
    let component: UtilsComponent;
    let fixture: ComponentFixture<UtilsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [UtilsComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(UtilsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
