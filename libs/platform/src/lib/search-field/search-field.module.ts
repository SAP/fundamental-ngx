import { NgModule } from '@angular/core';

import { ContentDensityModule } from '@fundamental-ngx/core/content-density';

import { SearchFieldComponent, SearchFieldSuggestionDirective, SuggestionMatchesPipe } from './search-field.component';

const components = [SearchFieldComponent, SearchFieldSuggestionDirective, SuggestionMatchesPipe, ContentDensityModule];

@NgModule({
    imports: [...components],
    exports: [...components]
})
export class PlatformSearchFieldModule {}
