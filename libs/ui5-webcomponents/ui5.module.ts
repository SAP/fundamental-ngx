import { NgModule } from '@angular/core';
import { Avatar } from './avatar';
import { AvatarGroup } from './avatar-group';
import { Bar } from './bar';
import { Breadcrumbs } from './breadcrumbs';
import { BreadcrumbsItem } from './breadcrumbs-item';
import { BusyIndicator } from './busy-indicator';
import { Button } from './button';
import { ButtonBadge } from './button-badge';
import { Calendar } from './calendar';
import { CalendarLegend } from './calendar-legend';
import { CalendarLegendItem } from './calendar-legend-item';
import { Card } from './card';
import { CardHeader } from './card-header';
import { Carousel } from './carousel';
import { ComboBoxItem } from './cb-item';
import { ComboBoxItemGroup } from './cb-item-group';
import { CheckBox } from './checkbox';
import { ColorPalette } from './color-palette';
import { ColorPaletteItem } from './color-palette-item';
import { ColorPalettePopover } from './color-palette-popover';
import { ColorPicker } from './color-picker';
import { ComboBox } from './combobox';
import { CalendarDate } from './date';
import { DatePicker } from './date-picker';
import { CalendarDateRange } from './date-range';
import { DateRangePicker } from './daterange-picker';
import { DateTimePicker } from './datetime-picker';
import { Dialog } from './dialog';
import { DynamicDateRange } from './dynamic-date-range';
import { ExpandableText } from './expandable-text';
import { FileUploader } from './file-uploader';
import { Form } from './form';
import { FormGroup } from './form-group';
import { FormItem } from './form-item';
import { Icon } from './icon';
import { Input } from './input';
import { Label } from './label';
import { ListItemStandard } from './li';
import { ListItemCustom } from './li-custom';
import { ListItemGroup } from './li-group';
import { Link } from './link';
import { List } from './list';
import { MultiComboBoxItem } from './mcb-item';
import { MultiComboBoxItemGroup } from './mcb-item-group';
import { Menu } from './menu';
import { MenuItem } from './menu-item';
import { MenuItemGroup } from './menu-item-group';
import { MenuSeparator } from './menu-separator';
import { MessageStrip } from './message-strip';
import { MultiComboBox } from './multi-combobox';
import { MultiInput } from './multi-input';
import { Option } from './option';
import { OptionCustom } from './option-custom';
import { Panel } from './panel';
import { Popover } from './popover';
import { ProgressIndicator } from './progress-indicator';
import { RadioButton } from './radio-button';
import { RangeSlider } from './range-slider';
import { RatingIndicator } from './rating-indicator';
import { ResponsivePopover } from './responsive-popover';
import { SegmentedButton } from './segmented-button';
import { SegmentedButtonItem } from './segmented-button-item';
import { Select } from './select';
import { Slider } from './slider';
import { SpecialCalendarDate } from './special-date';
import { SplitButton } from './split-button';
import { StepInput } from './step-input';
import { SuggestionItem } from './suggestion-item';
import { SuggestionItemCustom } from './suggestion-item-custom';
import { SuggestionItemGroup } from './suggestion-item-group';
import { Switch } from './switch';
import { Tab } from './tab';
import { TabSeparator } from './tab-separator';
import { TabContainer } from './tabcontainer';
import { Table } from './table';
import { TableCell } from './table-cell';
import { TableGrowing } from './table-growing';
import { TableHeaderCell } from './table-header-cell';
import { TableHeaderCellActionAI } from './table-header-cell-action-ai';
import { TableHeaderRow } from './table-header-row';
import { TableRow } from './table-row';
import { TableRowAction } from './table-row-action';
import { TableRowActionNavigation } from './table-row-action-navigation';
import { TableSelection } from './table-selection';
import { TableSelectionMulti } from './table-selection-multi';
import { TableSelectionSingle } from './table-selection-single';
import { TableVirtualizer } from './table-virtualizer';
import { Tag } from './tag';
import { Text } from './text';
import { TextArea } from './textarea';
import { TimePicker } from './time-picker';
import { Title } from './title';
import { Toast } from './toast';
import { ToggleButton } from './toggle-button';
import { Token } from './token';
import { Tokenizer } from './tokenizer';
import { Toolbar } from './toolbar';
import { ToolbarButton } from './toolbar-button';
import { ToolbarSelect } from './toolbar-select';
import { ToolbarSelectOption } from './toolbar-select-option';
import { ToolbarSeparator } from './toolbar-separator';
import { ToolbarSpacer } from './toolbar-spacer';
import { Tree } from './tree';
import { TreeItem } from './tree-item';
import { TreeItemCustom } from './tree-item-custom';

@NgModule({
    imports: [
        Avatar,
        AvatarGroup,
        Bar,
        Breadcrumbs,
        BreadcrumbsItem,
        BusyIndicator,
        Button,
        ButtonBadge,
        Calendar,
        CalendarDate,
        CalendarDateRange,
        CalendarLegend,
        CalendarLegendItem,
        Card,
        CardHeader,
        Carousel,
        CheckBox,
        ColorPalette,
        ColorPaletteItem,
        ColorPalettePopover,
        ColorPicker,
        ComboBox,
        ComboBoxItem,
        ComboBoxItemGroup,
        DatePicker,
        DateRangePicker,
        DateTimePicker,
        Dialog,
        DynamicDateRange,
        ExpandableText,
        FileUploader,
        Form,
        FormGroup,
        FormItem,
        Icon,
        Input,
        Label,
        Link,
        List,
        ListItemCustom,
        ListItemGroup,
        ListItemStandard,
        Menu,
        MenuItem,
        MenuItemGroup,
        MenuSeparator,
        MessageStrip,
        MultiComboBox,
        MultiComboBoxItem,
        MultiComboBoxItemGroup,
        MultiInput,
        Option,
        OptionCustom,
        Panel,
        Popover,
        ProgressIndicator,
        RadioButton,
        RangeSlider,
        RatingIndicator,
        ResponsivePopover,
        SegmentedButton,
        SegmentedButtonItem,
        Select,
        Slider,
        SpecialCalendarDate,
        SplitButton,
        StepInput,
        SuggestionItem,
        SuggestionItemCustom,
        SuggestionItemGroup,
        Switch,
        Tab,
        TabContainer,
        TabSeparator,
        Table,
        TableCell,
        TableGrowing,
        TableHeaderCell,
        TableHeaderCellActionAI,
        TableHeaderRow,
        TableRow,
        TableRowAction,
        TableRowActionNavigation,
        TableSelection,
        TableSelectionMulti,
        TableSelectionSingle,
        TableVirtualizer,
        Tag,
        Text,
        TextArea,
        TimePicker,
        Title,
        Toast,
        ToggleButton,
        Token,
        Tokenizer,
        Toolbar,
        ToolbarButton,
        ToolbarSelect,
        ToolbarSelectOption,
        ToolbarSeparator,
        ToolbarSpacer,
        Tree,
        TreeItem,
        TreeItemCustom
    ],
    exports: [
        Avatar,
        AvatarGroup,
        Bar,
        Breadcrumbs,
        BreadcrumbsItem,
        BusyIndicator,
        Button,
        ButtonBadge,
        Calendar,
        CalendarDate,
        CalendarDateRange,
        CalendarLegend,
        CalendarLegendItem,
        Card,
        CardHeader,
        Carousel,
        CheckBox,
        ColorPalette,
        ColorPaletteItem,
        ColorPalettePopover,
        ColorPicker,
        ComboBox,
        ComboBoxItem,
        ComboBoxItemGroup,
        DatePicker,
        DateRangePicker,
        DateTimePicker,
        Dialog,
        DynamicDateRange,
        ExpandableText,
        FileUploader,
        Form,
        FormGroup,
        FormItem,
        Icon,
        Input,
        Label,
        Link,
        List,
        ListItemCustom,
        ListItemGroup,
        ListItemStandard,
        Menu,
        MenuItem,
        MenuItemGroup,
        MenuSeparator,
        MessageStrip,
        MultiComboBox,
        MultiComboBoxItem,
        MultiComboBoxItemGroup,
        MultiInput,
        Option,
        OptionCustom,
        Panel,
        Popover,
        ProgressIndicator,
        RadioButton,
        RangeSlider,
        RatingIndicator,
        ResponsivePopover,
        SegmentedButton,
        SegmentedButtonItem,
        Select,
        Slider,
        SpecialCalendarDate,
        SplitButton,
        StepInput,
        SuggestionItem,
        SuggestionItemCustom,
        SuggestionItemGroup,
        Switch,
        Tab,
        TabContainer,
        TabSeparator,
        Table,
        TableCell,
        TableGrowing,
        TableHeaderCell,
        TableHeaderCellActionAI,
        TableHeaderRow,
        TableRow,
        TableRowAction,
        TableRowActionNavigation,
        TableSelection,
        TableSelectionMulti,
        TableSelectionSingle,
        TableVirtualizer,
        Tag,
        Text,
        TextArea,
        TimePicker,
        Title,
        Toast,
        ToggleButton,
        Token,
        Tokenizer,
        Toolbar,
        ToolbarButton,
        ToolbarSelect,
        ToolbarSelectOption,
        ToolbarSeparator,
        ToolbarSpacer,
        Tree,
        TreeItem,
        TreeItemCustom
    ]
})
export class Ui5ComponentsModule {}
