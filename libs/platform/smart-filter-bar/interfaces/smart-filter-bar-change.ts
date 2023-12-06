import { SearchInput } from '@fundamental-ngx/platform/search-field';
import { CollectionFilterGroup } from '@fundamental-ngx/platform/table';
import { SmartFilterBarSubjectDirective } from '../directives/smart-filter-bar-subject.directive';

export interface SmartFilterBarManagedPreset {
    search?: SearchInput;
    filterBy?: CollectionFilterGroup[];
}

export interface SmartFilterChangeObject extends SmartFilterBarManagedPreset {
    subject: SmartFilterBarSubjectDirective;
}
