import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DialogConfig, DialogRef } from '@fundamental-ngx/core/dialog';

import { PlatformTableModule } from '../../../table.module';
import { P13SortingDialogComponent, SortDialogData } from './sorting.component';

describe('PlatformTableP13SortDialogComponent', () => {
    let component: P13SortingDialogComponent;
    let fixture: ComponentFixture<P13SortingDialogComponent>;
    const dialogRef = new DialogRef();
    const dialogData: SortDialogData = {
        columns: [],
        collectionSort: []
    };
    dialogRef.data = dialogData;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [PlatformTableModule, BrowserAnimationsModule],
            providers: [{ provide: DialogRef, useValue: dialogRef }, DialogConfig]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(P13SortingDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
