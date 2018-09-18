import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcrumbItemComponent } from './breadcrumb-item.component';

describe('BreadcrumbItemComponent', () => {
    let component: BreadcrumbItemComponent;
    let fixture: ComponentFixture<BreadcrumbItemComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BreadcrumbItemComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BreadcrumbItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should change the cursor', () => {
        let retVal = component.getCursor();
        expect(retVal).toBe('text');
        component.url = 'someUrl';
        retVal = component.getCursor();
        expect(retVal).toBe('pointer');
        component.url = null;
        component.routerLink = 'someLink';
        retVal = component.getCursor();
        expect(retVal).toBe('pointer');
    });
});
