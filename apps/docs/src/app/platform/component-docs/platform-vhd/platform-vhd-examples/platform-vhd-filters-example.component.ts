import { Component, OnInit } from '@angular/core';

import { VhdDataProvider, VhdValue, VhdValueChangeEvent, ValueHelpDialogDataSource } from '@fundamental-ngx/platform';

interface ExampleTestModel {
  id: number;
  name: string;
  code: number;
  city: string;
}

const exampleDataSource = () => {
  const dataSource = Array(100).fill(null).map((_value, index) => {
    return {
      id: index + 1,
      name: `Name ${index}`,
      code: Math.floor(Math.random() * 99999),
      city: `City ${Math.floor(Math.random() * index)}`
    }
  })
  return {
    dataSource: dataSource,
    filters: [{
      key: 'id',
      label: `Product ID`,
      advanced: false
    }, {
      key: 'name',
      label: `Name`,
      advanced: true
    }, {
      key: 'code',
      label: `Product Code`,
      advanced: true
    }, {
      key: 'city',
      label: `City`,
      advanced: true
    }]
  }
}

@Component({
  selector: 'fdp-platform-vhd-filters-example',
  templateUrl: './platform-vhd-filters-example.component.html'
})
export class PlatformVhdFiltersExampleComponent implements OnInit {
  filters: any;
  dataSource: ValueHelpDialogDataSource<ExampleTestModel>;
  hasAdvanced = false;

  selectedValue = [];
  currentValue: VhdValue = {};
  hasIncluded = true;
  hasExcluded = true;

  ngOnInit(): void {
    const data = exampleDataSource();
    this.filters = data.filters;
    this.dataSource = new ValueHelpDialogDataSource(new VhdDataProvider(data.dataSource));
  }

  tokenizerFn = (row: ExampleTestModel) => {
    return `${row.name} (${row.id})`;
  }

  valueChange($event: VhdValueChangeEvent<ExampleTestModel[]>): void {
    console.log($event);
    this.currentValue = $event;
    this.selectedValue = [...($event.selected || [])];
  }
}
