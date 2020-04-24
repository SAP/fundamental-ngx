import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectComponent } from './select.component';
import { SelectModule } from './select.module';
import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { DialogModule, DialogRef, DialogService } from '@fundamental-ngx/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
    template: `
        <fd-select placeholder="Select an option"
                   [(value)]="selectedValue"
                   [mobile]="true"
                   (isOpenChange)="toggleDialog(dialogTemplate, $event)">

            <ng-template #optionsTemplate>
                <fd-option *ngFor="let option of options" [value]="option">
                    {{option}}
                </fd-option>
            </ng-template>

        </fd-select>

        <ng-template let-dialog let-dialogConfig="dialogConfig" #dialogTemplate>
            <fd-dialog [dialogConfig]="dialogConfig" [dialogRef]="dialog">

                <fd-dialog-header>
                    <h1 fd-dialog-title>Select Ingredient</h1>
                </fd-dialog-header>

                <fd-dialog-body>
                    <ng-container *ngTemplateOutlet="optionsTemplate"></ng-container>
                </fd-dialog-body>
            </fd-dialog>
        </ng-template>
    `
})
class TestWrapperComponent implements AfterViewInit, OnDestroy {
    options: string[] = ['Apple', 'Pineapple', 'Tomato', 'Strawberry'];
    selectedValue: string;
    dialogRef: DialogRef;

    @ViewChild(SelectComponent) selectComponent: SelectComponent;

    @ViewChild('dialogTemplate') dialogTemplate: TemplateRef<any>;

    constructor(private _dialogService: DialogService) {}

    ngAfterViewInit() {
        this._openDialog();
        this.dialogRef.hide(true);
    }

    ngOnDestroy() {
        this.dialogRef.close();
    }

    toggleDialog(dialogTemplate: TemplateRef<any>, isOpen: boolean): void {
        if (isOpen) {
            this.dialogRef.hide(false);
        } else {
            this.dialogRef.hide(true);
        }
    }

    private _openDialog(): void {
        this.dialogRef = this._dialogService.open(this.dialogTemplate, {
            mobile: true,
            focusTrapped: false,
            verticalPadding: false,
            escKeyCloseable: false,
            backdropClickCloseable: false,
            container: this.selectComponent.dialogContainerElementRef.nativeElement
        });
    }
}

describe('SelectComponent in mobile mode', () => {
    let testComponent: TestWrapperComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TestWrapperComponent],
            imports: [SelectModule, DialogModule, BrowserAnimationsModule]
        })
            .overrideComponent(
                SelectComponent,
                {
                    set: {changeDetection: ChangeDetectionStrategy.Default}
                }
            )
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestWrapperComponent);
        testComponent = fixture.componentInstance;
        fixture.detectChanges();
    });

    async function wait(componentFixture: ComponentFixture<any>) {
        componentFixture.detectChanges();
        await componentFixture.whenStable();
    }

    it('should create', async () => {
        expect(testComponent).toBeTruthy();

        await wait(fixture);

        expect(testComponent.selectComponent).toBeTruthy();
    });

    it('should start closed', async () => {
        await wait(fixture);

        expect(fixture.nativeElement.querySelector('.fd-dialog--active')).toBeFalsy();
    });

    it('should open', async () => {
        await wait(fixture);

        testComponent.selectComponent.open();

        await wait(fixture);

        expect(fixture.nativeElement.querySelector('.fd-dialog--active')).toBeTruthy();

        expect(fixture.nativeElement.querySelectorAll('fd-option').length).toBe(testComponent.options.length);
    });

    it('should close', async () => {
        await wait(fixture);

        testComponent.selectComponent.open();

        await wait(fixture);

        testComponent.selectComponent.close();

        await wait(fixture);

        expect(fixture.nativeElement.querySelector('.fd-dialog--active')).toBeFalsy();
    });

    it('should open on click', async () => {
        await wait(fixture);

        fixture.nativeElement.querySelector('.fd-select__control').click();

        await wait(fixture);

        expect(testComponent.selectComponent.isOpen).toBe(true);
        expect(fixture.nativeElement.querySelector('.fd-dialog--active')).toBeTruthy();
    });

    it('should close on click while open', async () => {
        await wait(fixture);

        fixture.nativeElement.querySelector('.fd-select__control').click();

        await wait(fixture);

        fixture.nativeElement.querySelector('.fd-select__control').click();

        await wait(fixture);

        expect(testComponent.selectComponent.isOpen).toBe(false);
        expect(fixture.nativeElement.querySelector('.fd-dialog--active')).toBeFalsy();
    });

    it('should select an option', async () => {
        await wait(fixture);

        testComponent.selectComponent.open();

        await wait(fixture);

        fixture.nativeElement.querySelector('fd-option').click();

        await wait(fixture);

        expect(fixture.componentInstance.selectedValue).toBe(testComponent.selectComponent.selected.value);
    });
});
