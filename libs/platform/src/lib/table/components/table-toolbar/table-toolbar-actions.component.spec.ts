import { TemplateRef } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableToolbarActionsComponent } from './table-toolbar-actions.component';

describe('TableToolbarActionsComponent', () => {
    let component: TableToolbarActionsComponent;
    let fixture: ComponentFixture<TableToolbarActionsComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TableToolbarActionsComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TableToolbarActionsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have contentTemplateRef reference', () => {
        expect(component.contentTemplateRef).toBeInstanceOf(TemplateRef);
    });
});
