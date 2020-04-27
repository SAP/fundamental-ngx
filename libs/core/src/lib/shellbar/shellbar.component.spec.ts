import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShellbarComponent } from './shellbar.component';

describe('ShellbarComponent', () => {
    let component: ShellbarComponent;
    let fixture: ComponentFixture<ShellbarComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ShellbarComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ShellbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
