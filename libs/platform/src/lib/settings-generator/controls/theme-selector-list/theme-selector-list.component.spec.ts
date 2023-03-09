import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeSelectorListComponent } from './theme-selector-list.component';

describe('ThemeSelectorListComponent', () => {
    let component: ThemeSelectorListComponent;
    let fixture: ComponentFixture<ThemeSelectorListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ThemeSelectorListComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(ThemeSelectorListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
