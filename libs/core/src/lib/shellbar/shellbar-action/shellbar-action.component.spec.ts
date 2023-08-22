import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ShellbarActionComponent } from './shellbar-action.component';

describe('ShellbarActionComponent', () => {
    let component: ShellbarActionComponent;
    let fixture: ComponentFixture<ShellbarActionComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [ShellbarActionComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ShellbarActionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
