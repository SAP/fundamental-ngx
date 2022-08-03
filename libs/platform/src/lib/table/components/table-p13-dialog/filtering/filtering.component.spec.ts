import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogConfig, DialogRef } from '@fundamental-ngx/core/dialog';
import { PlatformTableModule } from '../../../table.module';
import { FilterDialogData, P13FilteringDialogComponent } from './filtering.component';

describe('PlatformTableP13FilterDialogComponent', () => {
    let component: P13FilteringDialogComponent;
    let fixture: ComponentFixture<P13FilteringDialogComponent>;

    const dialogRef = new DialogRef();
    const dialogData: FilterDialogData = {
        columns: [],
        collectionFilter: []
    };

    dialogRef.data = dialogData;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [PlatformTableModule, BrowserAnimationsModule],
                providers: [{ provide: DialogRef, useValue: dialogRef }, DialogConfig]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(P13FilteringDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
