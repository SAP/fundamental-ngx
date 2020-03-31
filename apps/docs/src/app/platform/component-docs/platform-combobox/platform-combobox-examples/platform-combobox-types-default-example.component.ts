import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef, Inject, Renderer2, Optional, Self } from '@angular/core';
import { SelectItem, DATA_PROVIDERS, DataProvider, ArrayComboBoxDataSource, ComboBoxDataSource } from '@fundamental-ngx/platform';
import { NgControl, NgForm } from '@angular/forms';
import { Address } from './address';
import { addressDB, AddressCSV } from './addressCSV';

@Component({
    selector: 'fdp-combobox-types-default-example',
    templateUrl: './platform-combobox-types-default-example.component.html',
})
export class PlatformComboboxTypesDefaultExampleComponent implements OnInit {

    selectedValue: string;

    addressDataSource: ComboBoxDataSource<Address>;

    ngOnInit() {
        this.initDataSources();
    }

    constructor() {
    }

  private initDataSources() {
    this.addressDataSource = new ArrayComboBoxDataSource<Address>(
      addressDB.map((i: AddressCSV) => {

        return new Address(
          i.UniqueName, i.Name, i.Lines, i.City, i.State, i.PostalCode + '',
          i.Phone, i.Fax, i.Email, i.URL, i.Country);
      }));
  }

}
