import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { FdpFormGroupModule } from '@fundamental-ngx/platform/form';

import { PlatformFileUploaderModule } from './platform-file-uploader.module';
import { FileUploaderSelectionChangeEvent, PlatformFileUploaderComponent } from './platform-file-uploader.component';
import { ContentDensityMode } from '@fundamental-ngx/core/content-density';

@Component({
    selector: 'fdp-file-uploader-test',
    template: `
        <fdp-form-group #fg [fdContentDensity]="contentDensity">
            <fdp-form-field
                #ffl1
                label="File Uploader"
                id="file-uploader-sample"
                name="reactiveFormInput"
                zone="zLeft"
                rank="1"
                placeholder="Select the file"
            >
                <fdp-file-uploader
                    id="file-uploader-sample"
                    name="reactiveFormInput"
                    placeholder="Select the file"
                    buttonLabel="Browse"
                    buttonAriaLabel="browse file"
                    accept=".png,.jpg"
                    [(ngModel)]="files"
                    [disabled]="true"
                    [multiple]="true"
                ></fdp-file-uploader>
            </fdp-form-field>
        </fdp-form-group>
    `
})
class PlatformFileUploaderTestComponent {
    @ViewChild(PlatformFileUploaderComponent)
    platformFileUploader: PlatformFileUploaderComponent;
    contentDensity: ContentDensityMode = ContentDensityMode.COZY;
    files: File[];

    invalidFiles: File[];

    handleFileSelection(files: FileUploaderSelectionChangeEvent): void {
        this.files = files.payload;
    }
}
interface MockFile extends File {
    size: number;
}

describe('PlatformFileUploaderComponent', () => {
    let component: PlatformFileUploaderTestComponent;
    let fixture: ComponentFixture<PlatformFileUploaderTestComponent>;
    let fileInput: PlatformFileUploaderComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PlatformFileUploaderTestComponent],
            imports: [FormsModule, FdpFormGroupModule, PlatformFileUploaderModule]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PlatformFileUploaderTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        fileInput = component.platformFileUploader;
    });

    async function wait(componentFixture: ComponentFixture<any>): Promise<void> {
        componentFixture.detectChanges();
        await componentFixture.whenStable();
    }

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should setDisabledState', async () => {
        await wait(fixture);
        fileInput.disabled = true;
        fixture.detectChanges();
        const fileUploaderData = fixture.debugElement.query(By.css('fd-file-uploader'));
        const disabledValue = fileUploaderData.nativeElement.getAttribute('ng-reflect-disabled');
        expect(disabledValue).toBe('true');
    });

    it('should set compact', async () => {
        await wait(fixture);
        component.contentDensity = ContentDensityMode.COMPACT;
        fixture.detectChanges();
        const fileUploaderData = fixture.debugElement.query(By.css('.fd-file-uploader__input'));
        const disabledValue = fileUploaderData.nativeElement.classList;
        expect(disabledValue).toContain('fd-input--compact');
    });

    it('should upload file', async () => {
        await wait(fixture);
        component.contentDensity = ContentDensityMode.COMPACT;
        fixture.detectChanges();
        const fileUploaderData = fixture.debugElement.query(By.css('.fd-file-uploader__input'));
        const disabledValue = fileUploaderData.nativeElement.classList;
        expect(disabledValue).toContain('fd-input--compact');
    });

    it('should selectHandler with no maxFileSize', async () => {
        await wait(fixture);
        spyOn(fileInput.selectionChange, 'emit').and.callThrough();
        const file1: MockFile = new File([''], 'file1');
        spyOnProperty(file1, 'size').and.returnValue(1024);
        const event: File[] = [file1];
        const fileEvent = new FileUploaderSelectionChangeEvent(fileInput, event);
        fileInput.handleFileChange(event);
        expect(fileInput.selectionChange.emit).toHaveBeenCalledWith(fileEvent);
    });

    it('should selectHandler with maxFileSize', async () => {
        await wait(fixture);
        spyOn(fileInput.selectionChange, 'emit').and.callThrough();
        spyOn(fileInput.invalidFileChange, 'emit').and.callThrough();
        const file1: MockFile = new File([''], 'file1');
        spyOnProperty(file1, 'size').and.returnValue(1024);
        const file2: MockFile = new File([''], 'file2');
        spyOnProperty(file2, 'size').and.returnValue(1048580);
        const event: File[] = [file1, file2];
        fileInput.maxFileSize = '1MB';
        const fileEvent = new FileUploaderSelectionChangeEvent(fileInput, event);
        fileInput.handleFileChange(event);
        fileInput.handleInvalidFiles(event);
        expect(fileInput.selectionChange.emit).toHaveBeenCalledWith(fileEvent);
    });

    it('should selectHandler with minFileSize', async () => {
        await wait(fixture);
        spyOn(fileInput.selectionChange, 'emit').and.callThrough();
        spyOn(fileInput.invalidFileChange, 'emit').and.callThrough();
        const file1: MockFile = new File([''], 'file1');
        spyOnProperty(file1, 'size').and.returnValue(1024);
        const file2: MockFile = new File([''], 'file2');
        spyOnProperty(file2, 'size').and.returnValue(1048580);
        const event: File[] = [file1, file2];
        fileInput.minFileSize = '1MB';
        const fileEvent = new FileUploaderSelectionChangeEvent(fileInput, event);
        fileInput.handleFileChange(event);
        fileInput.handleInvalidFiles(event);
        expect(fileInput.selectionChange.emit).toHaveBeenCalledWith(fileEvent);
    });
});
