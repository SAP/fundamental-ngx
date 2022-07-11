import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShellbarSearchComponent } from './shellbar-search.component';

describe('ShellbarSearchComponent', () => {
    let component: ShellbarSearchComponent;
    let fixture: ComponentFixture<ShellbarSearchComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ShellbarSearchComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ShellbarSearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
