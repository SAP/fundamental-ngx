import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundamentalNgxComponent } from './fundamental-ngx.component';

describe('FundamentalNgxComponent', () => {
    let component: FundamentalNgxComponent;
    let fixture: ComponentFixture<FundamentalNgxComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FundamentalNgxComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FundamentalNgxComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
