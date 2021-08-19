import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { QuickViewGroupComponent, QuickViewModule } from '@fundamental-ngx/core/quick-view';

describe('QuickViewGroupComponent', () => {
    let component: QuickViewGroupComponent;
    let fixture: ComponentFixture<QuickViewGroupComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [QuickViewModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(QuickViewGroupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
