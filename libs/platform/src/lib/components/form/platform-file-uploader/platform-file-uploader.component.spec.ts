import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { FdpFormGroupModule } from '../form-group/fdp-form.module';

import {
    FileUploaderInvalidChangeEvent,
    FileUploaderSelectionChangeEvent,
    PlatformFileUploaderComponent
} from './platform-file-uploader.component';
import { PlatformFileUploaderModule } from './platform-file-uploader.module';

@Component({
    selector: 'fdp-file-uploader-test',
    template: `
        <fdp-form-group #fg>
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
class PlatformFileUploaderTest {
    @ViewChild(PlatformFileUploaderComponent)
    platformfileUploader: PlatformFileUploaderComponent;
    files: File[];
    invalidFiles: File[];

    handleFileSelection(files: FileUploaderSelectionChangeEvent): void {
        this.files = files.payload;
    }

    handleInvalidFileSelection(files: FileUploaderInvalidChangeEvent): void {
        this.invalidFiles = files.payload;
    }
}
interface MockFile extends File {
    size: number;
}

describe('PlatformFileUploaderComponent', () => {
    let component: PlatformFileUploaderTest;
    let fixture: ComponentFixture<PlatformFileUploaderTest>;
    let fileinput: PlatformFileUploaderComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PlatformFileUploaderComponent, PlatformFileUploaderTest],
            imports: [CommonModule, FormsModule, FdpFormGroupModule, PlatformFileUploaderModule]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PlatformFileUploaderTest);
        component = fixture.componentInstance;
        fixture.detectChanges();
        fileinput = component.platformfileUploader;
    });
    async function wait(componentFixture: ComponentFixture<any>): Promise<void> {
        componentFixture.detectChanges();
        await componentFixture.whenStable();
    }

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    // TODO: Unskip after fix
    xit('should setDisabledState', async () => {
        await wait(fixture);
        fileinput.disabled = true;
        fixture.detectChanges();
        const fileUploaderData = fixture.debugElement.query(By.css('fd-file-uploader'));
        const disabledValue = fileUploaderData.nativeElement.getAttribute('ng-reflect-disabled');
        expect(disabledValue).toBe('true');
    });
    // TODO: Unskip after fix
    xit('should set compact', async () => {
        await wait(fixture);
        fileinput.contentDensity = 'compact';
        fixture.detectChanges();
        const fileUploaderData = fixture.debugElement.query(By.css('.fd-file-uploader__input'));
        const disabledValue = fileUploaderData.nativeElement.classList;
        expect(disabledValue).toContain('fd-input--compact');
    });
    // TODO: Unskip after fix
    xit('should upload file', async () => {
        await wait(fixture);
        fileinput.contentDensity = 'compact';
        fixture.detectChanges();
        const fileUploaderData = fixture.debugElement.query(By.css('.fd-file-uploader__input'));
        const disabledValue = fileUploaderData.nativeElement.classList;
        expect(disabledValue).toContain('fd-input--compact');
    });
    it('should selectHandler with no maxFileSize', async () => {
        await wait(fixture);
        spyOn(fileinput.selectionChange, 'emit').and.callThrough();
        const file1: MockFile = new File([''], 'file1');
        spyOnProperty(file1, 'size').and.returnValue(1024);
        const event: File[] = [file1];
        const fileEvent = new FileUploaderSelectionChangeEvent(fileinput, event);
        fileinput.handleFileChange(event);
        expect(fileinput.selectionChange.emit).toHaveBeenCalledWith(fileEvent);
    });
    it('should selectHandler with maxFileSize', async () => {
        await wait(fixture);
        spyOn(fileinput.selectionChange, 'emit').and.callThrough();
        spyOn(fileinput.invalidFileChange, 'emit').and.callThrough();
        const file1: MockFile = new File([''], 'file1');
        spyOnProperty(file1, 'size').and.returnValue(1024);
        const file2: MockFile = new File([''], 'file2');
        spyOnProperty(file2, 'size').and.returnValue(1048580);
        const event: File[] = [file1, file2];
        fileinput.maxFileSize = '1MB';
        const fileEvent = new FileUploaderSelectionChangeEvent(fileinput, event);
        fileinput.handleFileChange(event);
        fileinput.handleInvalidFiles(event);
        expect(fileinput.selectionChange.emit).toHaveBeenCalledWith(fileEvent);
    });

    it('should selectHandler with minFileSize', async () => {
        await wait(fixture);
        spyOn(fileinput.selectionChange, 'emit').and.callThrough();
        spyOn(fileinput.invalidFileChange, 'emit').and.callThrough();
        const file1: MockFile = new File([''], 'file1');
        spyOnProperty(file1, 'size').and.returnValue(1024);
        const file2: MockFile = new File([''], 'file2');
        spyOnProperty(file2, 'size').and.returnValue(1048580);
        const event: File[] = [file1, file2];
        fileinput.minFileSize = '1MB';
        const fileEvent = new FileUploaderSelectionChangeEvent(fileinput, event);
        fileinput.handleFileChange(event);
        fileinput.handleInvalidFiles(event);
        expect(fileinput.selectionChange.emit).toHaveBeenCalledWith(fileEvent);
    });
});
