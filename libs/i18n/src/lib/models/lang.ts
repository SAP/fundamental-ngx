import { NestedKeyOf, Nullable, ObjectPathType } from '@fundamental-ngx/cdk/utils';

export type FdLanguageKeyArgs = Nullable<Record<string, string | number | boolean>>;

export type FdLanguageKeyFunction<T> = T extends undefined ? () => string : (args: T) => string;

export type FdLanguageKey<T = undefined> = string | FdLanguageKeyFunction<T>;

type _FdLanguageKeyIdentifierUnion = `${NestedKeyOf<FdLanguage>}`;

export type FdLanguageKeyIdentifier = {
    [Key in _FdLanguageKeyIdentifierUnion]: ObjectPathType<FdLanguage, Key> extends FdLanguageKey<any> | undefined
        ? Key
        : never;
}[_FdLanguageKeyIdentifierUnion];

export type FdLanguageKeyCtx<T extends FdLanguageKeyIdentifier> = ObjectPathType<FdLanguage, T> extends FdLanguageKey<
    infer Args
>
    ? Args
    : undefined;

export type FlatFdLanguage = {
    [Key in FdLanguageKeyIdentifier]: FdLanguageKey<FdLanguageKeyCtx<Key>>;
};

/**
 * Representation of the dictionary per UI component
 */
export interface FdLanguage {
    coreMultiComboBox: {
        selectAllLabel: FdLanguageKey;
    };
    coreCarousel: {
        leftNavigationBtnLabel: FdLanguageKey;
        rightNavigationBtnLabel: FdLanguageKey;
    };
    coreDatePicker: {
        dateInputLabel: FdLanguageKey;
        dateRangeInputLabel: FdLanguageKey;
        displayCalendarToggleLabel: FdLanguageKey;
        valueStateSuccessMessage: FdLanguageKey;
        valueStateInformationMessage: FdLanguageKey;
        valueStateWarningMessage: FdLanguageKey;
        valueStateErrorMessage: FdLanguageKey;
    };
    coreDatetimePicker: {
        datetimeInputLabel: FdLanguageKey;
        displayDatetimeToggleLabel: FdLanguageKey;
        displayTypeDateLabel: FdLanguageKey;
        displayTypeTimeLabel: FdLanguageKey;
        datetimeOkLabel: FdLanguageKey;
        datetimeCancelLabel: FdLanguageKey;
    };
    coreFeedListItem: {
        moreLabel: FdLanguageKey;
        lessLabel: FdLanguageKey;
    };
    coreGridList: {
        filterBarCancelButtonTitle: FdLanguageKey;
        /** @param status */
        listItemStatusAriaLabel: FdLanguageKey<{ status: string }>;
        /** @param count */
        listItemCounterAriaLabel: FdLanguageKey<{ count: number }>;
        listItemButtonDetailsTitle: FdLanguageKey;
        listItemButtonDeleteTitle: FdLanguageKey;
        listItemStatusContainsErrors: FdLanguageKey;
        listItemStatusLocked: FdLanguageKey;
        listItemStatusDraft: FdLanguageKey;
    };
    coreMessageStrip: {
        dismissLabel: FdLanguageKey;
    };
    coreMultiInput: {
        multiInputAriaLabel: FdLanguageKey;
        tokensCountText: FdLanguageKey;
    };
    coreNavigation: {
        mainNavigation: FdLanguageKey;
        navigationPath: FdLanguageKey;
    };
    coreNestedList: {
        /**
         * @param itemDetails
         * @param index
         * @param total
         * @param selectedDescription
         */
        linkItemAriaLabel: FdLanguageKey<{
            itemDetails: string;
            index: number;
            total: number;
            selectedDescription: string;
        }>;
    };
    coreOverflowLayout: {
        /** @param count */
        moreItemsButton: FdLanguageKey<{ count: number }>;
    };
    corePagination: {
        /** @param pageNumber */
        pageLabel: FdLanguageKey<{ pageNumber: number }>;
        /**
         * @param pageNumber
         * @param totalCount
         */
        currentPageAriaLabel: FdLanguageKey<{ pageNumber: number; totalCount: number }>;
        /**
         * @param pageNumber
         * @param totalCount
         */
        labelBeforeInputMobile: FdLanguageKey<{ pageNumber: number; totalCount: number }>;
        /**
         * @param pageNumber
         * @param totalCount
         */
        labelAfterInputMobile: FdLanguageKey<{ pageNumber: number; totalCount: number }>;
        /**
         * @param pageNumber
         * @param totalCount
         */
        inputAriaLabel: FdLanguageKey<{ pageNumber: number; totalCount: number }>;
        itemsPerPageLabel: FdLanguageKey;
        firstLabel: FdLanguageKey;
        previousLabel: FdLanguageKey;
        nextLabel: FdLanguageKey;
        lastLabel: FdLanguageKey;
        ariaLabel: FdLanguageKey;
        /**
         * @param totalCount
         * @param from
         * @param to
         */
        totalResultsLabel: FdLanguageKey<{ totalCount: number; from: number; to: number }>;
    };
    coreProductSwitch: {
        ariaLabel: FdLanguageKey;
    };
    coreShellbar: {
        collapsedItemMenuLabel: FdLanguageKey;
        cancel: FdLanguageKey;
        search: FdLanguageKey;
    };
    coreSlider: {
        /**
         * @param min
         * @param max
         */
        singleMinMaxDetails: FdLanguageKey<{ min: number; max: number }>;
        /** @param value */
        singleValueminDetails: FdLanguageKey<{ value: number | string }>;
        /** @param value */
        singleValuemaxDetails: FdLanguageKey<{ value: number | string }>;
        /** @param value */
        singleValueNowDetails: FdLanguageKey<{ value: number | string }>;
        /**
         * @param min
         * @param max
         */
        multipleHandle1MinMaxDetails: FdLanguageKey<{ min: number; max: number }>;
        /** @param value */
        multipleHandle1ValueminDetails: FdLanguageKey<{ value: number | string }>;
        /** @param value */
        multipleHandle1ValuemaxDetails: FdLanguageKey<{ value: number | string }>;
        /** @param value */
        multipleHandle1ValueNowDetails: FdLanguageKey<{ value: number | string }>;
        /**
         * @param min
         * @param max
         */
        multipleHandle2MinMaxDetails: FdLanguageKey<{ min: number; max: number }>;
        /** @param value */
        multipleHandle2ValueminDetails: FdLanguageKey<{ value: number | string }>;
        /** @param value */
        multipleHandle2ValuemaxDetails: FdLanguageKey<{ value: number | string }>;
        /** @param value */
        multipleHandle2ValueNowDetails: FdLanguageKey<{ value: number | string }>;
    };
    coreSplitButton: {
        expandButtonAriaLabel: FdLanguageKey;
        arialLabel: FdLanguageKey;
    };
    coreSplitter: {
        paginationItemAriaLabel: FdLanguageKey;
    };
    coreStepInput: {
        incrementButtonTitle: FdLanguageKey;
        decrementButtonTitle: FdLanguageKey;
        ariaRoleDescription: FdLanguageKey;
    };
    coreSwitch: {
        semanticAcceptLabel: FdLanguageKey;
        semanticDeclineLabel: FdLanguageKey;
    };
    coreTabs: {
        tabListExpandButtonText: FdLanguageKey;
    };
    coreText: {
        moreLabel: FdLanguageKey;
        lessLabel: FdLanguageKey;
    };
    coreTime: {
        /** Aria label for entire component */
        componentAriaName: FdLanguageKey;
        /** Aria label for the 'increase hours' button */
        increaseHoursLabel: FdLanguageKey;
        /** label for the 'hours' column */
        hrsLabel: FdLanguageKey;
        /** full label for the 'hours' column */
        hoursLabel: FdLanguageKey;
        /** Aria label for the 'decrease hours' button */
        decreaseHoursLabel: FdLanguageKey;
        /** Aria label for the 'increase minutes' button */
        increaseMinutesLabel: FdLanguageKey;
        /** label for the 'minutes' column */
        minLabel: FdLanguageKey;
        /** full label for the 'minutes' column */
        minutesLabel: FdLanguageKey;
        /** Aria label for the 'decrease minutes' button */
        decreaseMinutesLabel: FdLanguageKey;
        /** Aria label for the 'increase seconds' button */
        increaseSecondsLabel: FdLanguageKey;
        /** label for the 'seconds' column */
        secLabel: FdLanguageKey;
        /** full label for the 'seconds' column */
        secondsLabel: FdLanguageKey;
        /** Aria label for the 'decrease seconds' button */
        decreaseSecondsLabel: FdLanguageKey;
        /** Aria label for the 'increase period' button */
        increasePeriodLabel: FdLanguageKey;
        /** label for the 'period' column */
        periodLabel: FdLanguageKey;
        /** Aria label for the 'decrease period' button */
        decreasePeriodLabel: FdLanguageKey;
        /**
         * Instruction how to navigate between options
         * in the time column list and to switch between time columns
         */
        navigationInstruction: FdLanguageKey;
    };
    coreTimePicker: {
        timePickerInputLabel: FdLanguageKey;
        timePickerButtonLabel: FdLanguageKey;
    };
    coreToken: {
        deleteButtonLabel: FdLanguageKey;
        ariaRoleDescription: FdLanguageKey;
    };
    coreTokenizer: {
        moreLabel: FdLanguageKey;
        tokenizerLabel: FdLanguageKey;
    };
    coreUploadCollection: {
        menuOkText: FdLanguageKey;
        menuCancelText: FdLanguageKey;
        menuEditAriaLabel: FdLanguageKey;
        menuDeleteAriaLabel: FdLanguageKey;
        menuOkAriaLabel: FdLanguageKey;
        menuCancelAriaLabel: FdLanguageKey;
        formItemPlaceholder: FdLanguageKey;
    };
    coreWizard: {
        ariaLabel: FdLanguageKey;
    };
    coreBreadcrumb: {
        overflowTitleMore: FdLanguageKey;
    };
    coreTree: {
        expand: FdLanguageKey;
        collapse: FdLanguageKey;
        noData: FdLanguageKey;
    };
    platformActionBar: {
        backButtonLabel: FdLanguageKey;
    };
    platformApprovalFlow: {
        defaultWatchersLabel: FdLanguageKey;
        defaultTitle: FdLanguageKey;
        emptyTitle: FdLanguageKey;
        emptyHint: FdLanguageKey;
        prevButtonAriaLabel: FdLanguageKey;
        nextButtonAriaLabel: FdLanguageKey;
        editModeSaveButtonLabel: FdLanguageKey;
        editModeExitButtonLabel: FdLanguageKey;
        addNodeDialogHeaderAddApprovers: FdLanguageKey;
        addNodeDialogHeaderEditApprover: FdLanguageKey;
        addNodeDialogHeaderAddApproverTeam: FdLanguageKey;
        addNodeDialogHeaderDetail: FdLanguageKey;
        addNodeDialogNodeType: FdLanguageKey;
        addNodeDialogNodeTypeSerial: FdLanguageKey;
        addNodeDialogNodeTypeParallel: FdLanguageKey;
        addNodeDialogApproverType: FdLanguageKey;
        addNodeDialogApproverTypeUser: FdLanguageKey;
        addNodeDialogApproverTypeTeamAnyone: FdLanguageKey;
        addNodeDialogApproverTypeTeamEveryone: FdLanguageKey;
        addNodeDialogUserOrTeam: FdLanguageKey;
        addNodeDialogAddToNext: FdLanguageKey;
        addNodeDialogDueDate: FdLanguageKey;
        addNodeSearchPlaceholder: FdLanguageKey;
        addNodeAddActionBtnLabel: FdLanguageKey;
        addNodeCancelActionBtnLabel: FdLanguageKey;
        addNodeSelectApproverActionBtnLabel: FdLanguageKey;
        addNodeCancelApproverSelectionActionBtnLabel: FdLanguageKey;
        addNodeApproverOrTeamDetailsCloseActionBtnLabel: FdLanguageKey;
        userDetailsHeader: FdLanguageKey;
        userDetailsSendReminderBtnLabel: FdLanguageKey;
        userDetailsCancelBtnLabel: FdLanguageKey;
        messagesApproverAddedSuccess: FdLanguageKey;
        messagesTeamAddedSuccess: FdLanguageKey;
        messagesNodeEdited: FdLanguageKey;
        messagesNodeRemovedSingular: FdLanguageKey;
        messagesNodeRemovedPlural: FdLanguageKey;
        messagesTeamRemoved: FdLanguageKey;
        messagesErrorBuildGraph: FdLanguageKey;
        messagesUndoAction: FdLanguageKey;
        /** @param count */
        nodeMembersCount: FdLanguageKey<{ count: number }>;
        nodeVariousTeams: FdLanguageKey;
        nodeStatusDueToday: FdLanguageKey;
        /** @param count */
        nodeStatusDueInXDays: FdLanguageKey<{ count: number }>;
        /** @param count */
        nodeStatusXDaysOverdue: FdLanguageKey<{ count: number }>;
        addNodeButtonTitle: FdLanguageKey;
        nodeMenuButtonTitle: FdLanguageKey;
        nodeActionAddApproversBefore: FdLanguageKey;
        nodeActionAddApproversAfter: FdLanguageKey;
        nodeActionAddApproversParallel: FdLanguageKey;
        nodeActionEditApprover: FdLanguageKey;
        nodeActionRemove: FdLanguageKey;
        selectTypeDialogMoveApproverAs: FdLanguageKey;
        selectTypeDialogParallelOrSerial: FdLanguageKey;
        selectTypeDialogNodeTypeParallel: FdLanguageKey;
        selectTypeDialogNodeTypeSerial: FdLanguageKey;
        selectTypeDialogConfirmButton: FdLanguageKey;
        selectTypeDialogCancelButton: FdLanguageKey;
        toolbarAddStepButton: FdLanguageKey;
        toolbarEditButton: FdLanguageKey;
        toolbarAddApproversBefore: FdLanguageKey;
        toolbarAddApproversAfter: FdLanguageKey;
        toolbarAddApproversParallel: FdLanguageKey;
        toolbarRemove: FdLanguageKey;
        toolbarEditApprover: FdLanguageKey;
        watchersInputPlaceholder: FdLanguageKey;
        userListSelectedItemsCountSingular: FdLanguageKey;
        /** @param count */
        userListSelectedItemsCountPlural: FdLanguageKey<{ count: number }>;
        statusApproved: FdLanguageKey;
        statusRejected: FdLanguageKey;
        statusInProgress: FdLanguageKey;
        statusNotStarted: FdLanguageKey;
    };
    platformFeedInput: {
        userTitle: FdLanguageKey;
    };
    platformVHD: {
        selectionBarLabel: FdLanguageKey;
        selectedAndConditionLabel: FdLanguageKey;
        footerClearSelectedTitle: FdLanguageKey;
        footerClearSelectedAriaLabel: FdLanguageKey;
        searchButtonLabel: FdLanguageKey;
        successButtonLabel: FdLanguageKey;
        cancelButtonLabel: FdLanguageKey;
        selectedEmptyLabel: FdLanguageKey;
        searchPlaceholder: FdLanguageKey;
        searchAdvancedSearchLabel: FdLanguageKey;
        searchShowAdvancedSearchLabel: FdLanguageKey;
        searchHideAdvancedSearchLabel: FdLanguageKey;
        searchShowAllAdvancedSearchLabel: FdLanguageKey;
        searchHideAllAdvancedSearchLabel: FdLanguageKey;
        /** @param count */
        selectTabDisplayCountLabel: FdLanguageKey<{ count: number }>;
        selectTabMoreBtnLabel: FdLanguageKey;
        /**
         * @param rowCount
         * @param colCount
         */
        selectTabCountHiddenA11yLabel: FdLanguageKey<{ rowCount: number; colCount: number }>;
        selectMobileTabBackBtnTitle: FdLanguageKey;
        selectMobileTabBtnOpenDialogLabel: FdLanguageKey;
        selectMobileTabTitle: FdLanguageKey;
        selectMobileConditionEmpty: FdLanguageKey;
        defineConditionTitle: FdLanguageKey;
        /** @param value */
        defineConditionSelectedValueHiddenA11yLabel: FdLanguageKey<{ value: string }>;
        defineConditionConditionsGroupHeaderInclude: FdLanguageKey;
        defineConditionConditionsGroupHeaderExclude: FdLanguageKey;
        defineConditionFromPlaceholder: FdLanguageKey;
        defineConditionToPlaceholder: FdLanguageKey;
        defineConditionValuePlaceholder: FdLanguageKey;
        defineConditionRemoveConditionButtonTitle: FdLanguageKey;
        defineConditionAddConditionButtonLabel: FdLanguageKey;
        defineConditionAddConditionButtonTitle: FdLanguageKey;
        defineConditionConditionStrategyLabelContains: FdLanguageKey;
        defineConditionConditionStrategyLabelEqualTo: FdLanguageKey;
        defineConditionConditionStrategyLabelBetween: FdLanguageKey;
        defineConditionConditionStrategyLabelStartsWith: FdLanguageKey;
        defineConditionConditionStrategyLabelEndsWith: FdLanguageKey;
        defineConditionConditionStrategyLabelLessThan: FdLanguageKey;
        defineConditionConditionStrategyLabelLessThanEqual: FdLanguageKey;
        defineConditionConditionStrategyLabelGreaterThan: FdLanguageKey;
        defineConditionConditionStrategyLabelGreaterThanEqual: FdLanguageKey;
        defineConditionConditionStrategyLabelEmpty: FdLanguageKey;
        defineConditionConditionStrategyLabelNotEqualTo: FdLanguageKey;
        defineConditionConditionStrategyLabelNotEmpty: FdLanguageKey;
        /** @param count */
        defineConditionMaxCountError: FdLanguageKey<{ count: number }>;
        selectTabTitle: FdLanguageKey;
        searchTableEmptyMessage: FdLanguageKey;
        defineTabTitle: FdLanguageKey;
    };
    platformCombobox: {
        countListResultsSingular: FdLanguageKey;
        /** @param count */
        countListResultsPlural: FdLanguageKey<{ count: number }>;
    };
    platformMultiCombobox: {
        inputGlyphAriaLabel: FdLanguageKey;
        inputIconTitle: FdLanguageKey;
        mobileShowAllItemsButton: FdLanguageKey;
        mobileShowSelectedItemsButton: FdLanguageKey;
    };
    platformTextarea: {
        counterMessageCharactersOverTheLimitSingular: FdLanguageKey;
        /** @param count */
        counterMessageCharactersOverTheLimitPlural: FdLanguageKey<{ count: number }>;
        counterMessageCharactersRemainingSingular: FdLanguageKey;
        /** @param count */
        counterMessageCharactersRemainingPlural: FdLanguageKey<{ count: number }>;
    };
    platformLink: {
        /** @param media */
        roleDescriptionWithMedia: FdLanguageKey<{ media: string }>;
    };
    platformList: {
        loadingAriaLabel: FdLanguageKey;
    };
    platformObjectListItem: {
        detailsActionAriaLabel: FdLanguageKey;
        deleteActionAriaLabel: FdLanguageKey;
    };
    platformStandardListItem: {
        detailsActionAriaLabel: FdLanguageKey;
        deleteActionAriaLabel: FdLanguageKey;
    };
    platformSearchField: {
        clearButtonTitle: FdLanguageKey;
        submitButtonTitle: FdLanguageKey;
        searchInputLabel: FdLanguageKey;
        synchronizeButtonTitle: FdLanguageKey;
        /**
         * @param count
         */
        searchSuggestionMessage: FdLanguageKey<{ count: number }>;
        searchSuggestionNavigateMessage: FdLanguageKey;
    };
    platformSwitch: {
        ariaLabel: FdLanguageKey;
    };
    platformSmartFilterBar: {
        searchPlaceholder: FdLanguageKey;
        submitButtonLabel: FdLanguageKey;
        /** @param filtersCount */
        filtersButtonLabel: FdLanguageKey<{ filtersCount: number }>;
        showFiltersButtonLabel: FdLanguageKey;
        hideFiltersButtonLabel: FdLanguageKey;
        defineConditionsRemoveConditionButtonTitle: FdLanguageKey;
        defineConditionsAddConditionButtonLabel: FdLanguageKey;
        defineConditionsSubmitButtonLabel: FdLanguageKey;
        defineConditionsCancelButton: FdLanguageKey;
        selectFiltersHeader: FdLanguageKey;
        selectFiltersAvailableFiltersText: FdLanguageKey;
        selectFiltersFilterColumnLabel: FdLanguageKey;
        selectFiltersActiveColumnLabel: FdLanguageKey;
        selectFiltersSubmitButtonLabel: FdLanguageKey;
        selectFiltersCancelButton: FdLanguageKey;
        filterConditionContains: FdLanguageKey;
        filterConditionEqualTo: FdLanguageKey;
        filterConditionBetween: FdLanguageKey;
        filterConditionBeginsWith: FdLanguageKey;
        filterConditionEndsWith: FdLanguageKey;
        filterConditionLessThan: FdLanguageKey;
        filterConditionLessThanOrEqualTo: FdLanguageKey;
        filterConditionGreaterThan: FdLanguageKey;
        filterConditionGreaterThanOrEqualTo: FdLanguageKey;
        filterConditionAfter: FdLanguageKey;
        filterConditionOnOrAfter: FdLanguageKey;
        filterConditionBefore: FdLanguageKey;
        filterConditionBeforeOrOn: FdLanguageKey;
        filterConditionValuePlaceholder: FdLanguageKey;
        filterConditionValueFromPlaceholder: FdLanguageKey;
        filterConditionValueToPlaceholder: FdLanguageKey;
        settingsCategoryAll: FdLanguageKey;
        settingsCategoryVisible: FdLanguageKey;
        settingsCategoryActive: FdLanguageKey;
        settingsCategoryVisibleAndActive: FdLanguageKey;
        settingsCategoryMandatory: FdLanguageKey;
        manageFieldConditions: FdLanguageKey;
        refreshButtonAriaLabel: FdLanguageKey;
    };
    platformTable: {
        headerMenuSortAsc: FdLanguageKey;
        headerMenuSortDesc: FdLanguageKey;
        headerMenuGroup: FdLanguageKey;
        headerMenuFreeze: FdLanguageKey;
        headerMenuEndFreeze: FdLanguageKey;
        headerMenuUnfreeze: FdLanguageKey;
        headerMenuFilter: FdLanguageKey;
        defaultEmptyMessage: FdLanguageKey;
        emptyCell: FdLanguageKey;
        noVisibleColumnsMessage: FdLanguageKey;
        resetChangesButtonLabel: FdLanguageKey;
        editableCellNumberPlaceholder: FdLanguageKey;
        editableCellDatePlaceholder: FdLanguageKey;
        editableCellStringPlaceholder: FdLanguageKey;
        P13ColumnsDialogHeader: FdLanguageKey;
        P13ColumnsDialogSearchPlaceholder: FdLanguageKey;
        P13ColumnsDialogsShowSelected: FdLanguageKey;
        P13ColumnsDialogShowAll: FdLanguageKey;
        /**
         * @param selectedColumnsCount
         * @param selectableColumnsCount
         */
        P13ColumnsDialogSelectAll: FdLanguageKey<{ selectedColumnsCount: number; selectableColumnsCount: number }>;
        P13ColumnsDialogConfirmationBtnLabel: FdLanguageKey;
        P13ColumnsDialogCancelBtnLabel: FdLanguageKey;
        P13ColumnsDialogMoveToTopBtn: FdLanguageKey;
        P13ColumnsDialogMoveUpBtn: FdLanguageKey;
        P13ColumnsDialogMoveDownBtn: FdLanguageKey;
        P13ColumnsDialogMoveToBottomBtn: FdLanguageKey;
        P13FilterStrategyLabelBetween: FdLanguageKey;
        P13FilterStrategyLabelContains: FdLanguageKey;
        P13FilterStrategyLabelBeginsWith: FdLanguageKey;
        P13FilterStrategyLabelEndsWith: FdLanguageKey;
        P13FilterStrategyLabelEqualTo: FdLanguageKey;
        P13FilterStrategyLabelGreaterThan: FdLanguageKey;
        P13FilterStrategyLabelGreaterThanOrEqualTo: FdLanguageKey;
        P13FilterStrategyLabelLessThan: FdLanguageKey;
        P13FilterStrategyLabelLessThanOrEqualTo: FdLanguageKey;
        P13FilterStrategyLabelAfter: FdLanguageKey;
        P13FilterStrategyLabelOnOrAfter: FdLanguageKey;
        P13FilterStrategyLabelBefore: FdLanguageKey;
        P13FilterStrategyLabelBeforeOrOn: FdLanguageKey;
        P13FilterStrategyLabelNotDefined: FdLanguageKey;
        P13FilterBooleanOptionNotDefined: FdLanguageKey;
        P13FilterBooleanOptionTrue: FdLanguageKey;
        P13FilterBooleanOptionFalse: FdLanguageKey;
        P13FilterDialogHeader: FdLanguageKey;
        /** @param count */
        P13FilterDialogIncludePanelTitleWithCount: FdLanguageKey<{ count: number }>;
        P13FilterDialogIncludePanelTitleWithoutCount: FdLanguageKey;
        /** @param count */
        P13FilterDialogExcludePanelTitleWithCount: FdLanguageKey<{ count: number }>;
        P13FilterDialogExcludePanelTitleWithoutCount: FdLanguageKey;
        P13FilterDialogConfirmationBtnLabel: FdLanguageKey;
        P13FilterDialogRemoveFilterBtnTitle: FdLanguageKey;
        P13FilterDialoAddFilterBtnTitle: FdLanguageKey;
        P13FilterDialogCancelBtnLabel: FdLanguageKey;
        P13GroupDialogHeader: FdLanguageKey;
        P13GroupDialogNoneSelectedColumnSelectPlaceholder: FdLanguageKey;
        P13GroupDialogShowFieldAsColumnCheckboxLabel: FdLanguageKey;
        P13GroupDialogRemoveGroupBtnTitle: FdLanguageKey;
        P13GroupDialogAddNewGroupBtnTitle: FdLanguageKey;
        P13GroupDialogConfirmationBtnLabel: FdLanguageKey;
        P13GroupDialogCancelBtnLabel: FdLanguageKey;
        P13SortDialogHeader: FdLanguageKey;
        P13SortDialogNoneSelectedColumn: FdLanguageKey;
        P13SortDialogNoneSelectedSorting: FdLanguageKey;
        P13SortDialogSortOrderSelectOptionAsc: FdLanguageKey;
        P13SortDialogSortOrderSelectOptionDesc: FdLanguageKey;
        P13SortDialogRemoveSortBtnTitle: FdLanguageKey;
        P13SortDialogAddNewSortBtnTitle: FdLanguageKey;
        P13SortDialogConfirmationBtnLabel: FdLanguageKey;
        P13SortDialogCancelBtnLabel: FdLanguageKey;
        toolbarSearchPlaceholder: FdLanguageKey;
        toolbarActionCreateButtonLabel: FdLanguageKey;
        toolbarActionSaveButtonLabel: FdLanguageKey;
        toolbarActionCancelButtonLabel: FdLanguageKey;
        toolbarActionSortButtonTitle: FdLanguageKey;
        toolbarActionFilterButtonTitle: FdLanguageKey;
        toolbarActionGroupButtonTitle: FdLanguageKey;
        toolbarActionColumnsButtonTitle: FdLanguageKey;
        toolbarActionExpandAllButtonTitle: FdLanguageKey;
        toolbarActionCollapseAllButtonTitle: FdLanguageKey;
        filterDialogNotFilteredLabel: FdLanguageKey;
        /** @param filterLabel */
        filterDialogFilterByLabel: FdLanguageKey<{ filterLabel: string }>;
        filterDialogFilterTitle: FdLanguageKey;
        filterDialogFilterBy: FdLanguageKey;
        filterDialogConfirmBtnLabel: FdLanguageKey;
        filterDialogCancelBtnLabel: FdLanguageKey;
        groupDialogHeader: FdLanguageKey;
        groupDialogGroupOrderHeader: FdLanguageKey;
        groupDialogGroupOrderAsc: FdLanguageKey;
        groupDialogGroupOrderDesc: FdLanguageKey;
        groupDialogGroupByHeader: FdLanguageKey;
        groupDialogNotGroupedLabel: FdLanguageKey;
        groupDialogConfirmBtnLabel: FdLanguageKey;
        groupDialogCancelBtnLabel: FdLanguageKey;
        sortDialogHeader: FdLanguageKey;
        sortDialogSortOrderHeader: FdLanguageKey;
        sortDialogSortOrderAsc: FdLanguageKey;
        sortDialogSortOrderDesc: FdLanguageKey;
        sortDialogSortByHeader: FdLanguageKey;
        sortDialogNotSortedLabel: FdLanguageKey;
        sortDialogConfirmBtnLabel: FdLanguageKey;
        sortDialogCancelBtnLabel: FdLanguageKey;
        selectAllCheckboxLabel: FdLanguageKey;
        deselectAllCheckboxLabel: FdLanguageKey;
        deselectSingleRow: FdLanguageKey;
        selectSingleRow: FdLanguageKey;
        deselectSingleRowTitle: FdLanguageKey;
        selectSingleRowTitle: FdLanguageKey;
    };
    platformThumbnail: {
        detailsGotoPreviousButtonTitle: FdLanguageKey;
        detailsGotoNextButtonTitle: FdLanguageKey;
        detailsDialogCloseBtnLabel: FdLanguageKey;
        roleDescription: FdLanguageKey;
    };
    platformUploadCollection: {
        moveToTitle: FdLanguageKey;
        moveToTitleFolder: FdLanguageKey;
        moveToNewFolderBtnLabel: FdLanguageKey;
        moveToAllFilesSubHeaderLabel: FdLanguageKey;
        moveToConfirmBtn: FdLanguageKey;
        moveToCloseBtn: FdLanguageKey;
        newFolderTitle: FdLanguageKey;
        newFolderAtRootInputLabel: FdLanguageKey;
        /** @param folderName */
        newFolderAtFolderInputLabel: FdLanguageKey<{ folderName: string }>;
        newFolderInputPlaceholder: FdLanguageKey;
        /** @param count */
        newFolderInputErrorLabel: FdLanguageKey<{ count: number }>;
        newFolderDialogCreateBtnLabel: FdLanguageKey;
        newFolderDialogCancelBtnLabel: FdLanguageKey;
        breadcrumbLabelAllFiles: FdLanguageKey;
        /** @param total */
        breadcrumbLabelAllFilesWithTotal: FdLanguageKey<{ total: number }>;
        searchPlaceholder: FdLanguageKey;
        addBtnLabel: FdLanguageKey;
        newFolderBtnLabel: FdLanguageKey;
        moveToBtnLabel: FdLanguageKey;
        downloadBtnLabel: FdLanguageKey;
        updateVersionBtnLabel: FdLanguageKey;
        removeBtnLabel: FdLanguageKey;
        folderIconTitle: FdLanguageKey;
        fileIconTitle: FdLanguageKey;
        editFileNameInputPlaceholder: FdLanguageKey;
        editFileNameFileAlreadyExistsError: FdLanguageKey;
        editFileNameFolderAlreadyExistsError: FdLanguageKey;
        itemStatusSuccessful: FdLanguageKey;
        itemStatusUnsuccessful: FdLanguageKey;
        uploadNewFileAfterFailAction: FdLanguageKey;
        cancelUploadNewFileAction: FdLanguageKey;
        itemMenuBtnTitle: FdLanguageKey;
        dragDropAreaText: FdLanguageKey;
        noDataText: FdLanguageKey;
        noDataDescription: FdLanguageKey;
        /**
         * @param from
         * @param to
         * @param total
         */
        paginationTotal: FdLanguageKey<{ from: number; to: number; total: number }>;
        resultsPerPage: FdLanguageKey;
        /** @param folderName */
        messageCreateFailed: FdLanguageKey<{ folderName: string }>;
        /** @param folderName */
        messageCreateSuccess: FdLanguageKey<{ folderName: string }>;
        /** @param folderName */
        messageUpdateVersionFailed: FdLanguageKey<{ folderName: string }>;
        /** @param folderName */
        messageUpdateVersionSuccess: FdLanguageKey<{ folderName: string }>;
        /** @param foldersCount */
        folderNamePluralization: FdLanguageKey<{ foldersCount: number }>;
        /** @param filesCount */
        fileNamePluralization: FdLanguageKey<{ filesCount: number }>;
        /**
         * @param from
         * @param to
         */
        messageFileRenameFailed: FdLanguageKey<{ from: string; to: string }>;
        /**
         * @param from
         * @param to
         */
        messageFileRenameSuccess: FdLanguageKey<{ from: string; to: string }>;
        /**
         * @param foldersCount
         * @param filesCount
         */
        messageRemoveFoldersAndFilesFailed: FdLanguageKey<{ foldersCount: number; filesCount: number }>;
        /**
         * @param foldersCount
         * @param filesCount
         */
        messageRemoveFoldersAndFilesSuccess: FdLanguageKey<{ foldersCount: number; filesCount: number }>;
        /** @param foldersCount */
        messageRemoveFoldersFailed: FdLanguageKey<{ foldersCount: number }>;
        /** @param foldersCount */
        messageRemoveFoldersSuccess: FdLanguageKey<{ foldersCount: number }>;
        /** @param filesCount */
        messageRemoveFilesFailed: FdLanguageKey<{ filesCount: number }>;
        /** @param filesCount */
        messageRemoveFilesSuccess: FdLanguageKey<{ filesCount: number }>;
        /** @param name */
        messageRemoveFileOrFolderFailed: FdLanguageKey<{ name: string }>;
        /** @param name */
        messageRemoveFileOrFolderSuccess: FdLanguageKey<{ name: string }>;
        /**
         * @param foldersCount
         * @param filesCount
         * @param to
         */
        messageMoveFoldersAndFilesFailed: FdLanguageKey<{ foldersCount: number; filesCount: number; to: string }>;
        /**
         * @param foldersCount
         * @param filesCount
         * @param to
         */
        messageMoveFoldersAndFilesSuccess: FdLanguageKey<{ foldersCount: number; filesCount: number; to: string }>;
        /**
         * @param foldersCount
         * @param to
         */
        messageMoveFoldersFailed: FdLanguageKey<{ foldersCount: number; to: string }>;
        /**
         * @param foldersCount
         * @param to
         */
        messageMoveFoldersSuccess: FdLanguageKey<{ foldersCount: number; to: string }>;
        /**
         * @param filesCount
         * @param to
         */
        messageMoveFilesFailed: FdLanguageKey<{ filesCount: number; to: string }>;
        /**
         * @param filesCount
         * @param to
         */
        messageMoveFilesSuccess: FdLanguageKey<{ filesCount: number; to: string }>;
        /**
         * @param name
         * @param to
         */
        messageMoveFileOrFolderFailed: FdLanguageKey<{ name: string; to: string }>;
        /**
         * @param name
         * @param to
         */
        messageMoveFileOrFolderSuccess: FdLanguageKey<{ name: string; to: string }>;
        /**
         * @param foldersCount
         * @param filesCount
         */
        messageMoveRootFoldersAndFilesFailed: FdLanguageKey<{ foldersCount: number; filesCount: number }>;
        /**
         * @param foldersCount
         * @param filesCount
         */
        messageMoveRootFoldersAndFilesSuccess: FdLanguageKey<{ foldersCount: number; filesCount: number }>;
        /** @param foldersCount */
        messageMoveRootFoldersFailed: FdLanguageKey<{ foldersCount: number }>;
        /** @param foldersCount */
        messageMoveRootFoldersSuccess: FdLanguageKey<{ foldersCount: number }>;
        /** @param filesCount */
        messageMoveRootFilesFailed: FdLanguageKey<{ filesCount: number }>;
        /** @param filesCount */
        messageMoveRootFilesSuccess: FdLanguageKey<{ filesCount: number }>;
        /** @param name */
        messageMoveRootFileOrFolderFailed: FdLanguageKey<{ name: string }>;
        /** @param name */
        messageMoveRootFileOrFolderSuccess: FdLanguageKey<{ name: string }>;
        /**
         * @param filesCount
         * @param allowedTypes
         */
        messageFileTypeMismatchPlural: FdLanguageKey<{ filesCount: number; allowedTypes: string }>;
        /**
         * @param fileName
         * @param allowedTypes
         */
        messageFileTypeMismatchSingular: FdLanguageKey<{ fileName: string; allowedTypes: string }>;
        /**
         * @param filesCount
         * @param maxFileSize
         */
        messageFileSizeExceededPlural: FdLanguageKey<{ filesCount: number; maxFileSize: string | number }>;
        /**
         * @param fileName
         * @param maxFileSize
         */
        messageFileSizeExceededSingular: FdLanguageKey<{ fileName: string; maxFileSize: string | number }>;
        /**
         * @param filesCount
         * @param maxFilenameLength
         */
        messageFileNameLengthExceededPlural: FdLanguageKey<{ filesCount: number; maxFilenameLength: number }>;
        /**
         * @param fileName
         * @param maxFilenameLength
         */
        messageFileNameLengthExceededSingular: FdLanguageKey<{ fileName: string; maxFilenameLength: number }>;
    };
    platformWizardGenerator: {
        summarySectionEditStep: FdLanguageKey;
    };
    platformMessagePopover: {
        allErrors: FdLanguageKey;
        defaultErrors: {
            required: FdLanguageKey;
            min: FdLanguageKey;
            max: FdLanguageKey;
            requiredTrue: FdLanguageKey;
            email: FdLanguageKey;
            minLength: FdLanguageKey;
            maxLength: FdLanguageKey;
            pattern: FdLanguageKey;
        };
    };
    platformVariantManagement: {
        manage: FdLanguageKey;
        saveAs: FdLanguageKey;
        saveView: FdLanguageKey;
        save: FdLanguageKey;
        myViews: FdLanguageKey;
        view: FdLanguageKey;
        setAsDefault: FdLanguageKey;
        public: FdLanguageKey;
        applyAutomatically: FdLanguageKey;
        requiredFieldError: FdLanguageKey;
        nameTakenFieldError: FdLanguageKey;
        cancel: FdLanguageKey;
        manageViews: FdLanguageKey;
        markAsFavourite: FdLanguageKey;
        sharing: FdLanguageKey;
        default: FdLanguageKey;
        createdBy: FdLanguageKey;
        removeVariant: FdLanguageKey;
        search: FdLanguageKey;
        access: {
            public: FdLanguageKey;
            private: FdLanguageKey;
        };
    };
    platformSelect: {
        selectOptionLabel: FdLanguageKey;
    };
    fnSlider: {
        /**
         * @param min
         * @param max
         */
        minMaxDetails: FdLanguageKey;
        /** @param value */
        valueminDetails: FdLanguageKey;
        /** @param value */
        valuemaxDetails: FdLanguageKey;
        /** @param value */
        valueNowDetails: FdLanguageKey;
    };
    fnSwitch: {
        semanticAcceptLabel: FdLanguageKey;
        semanticDeclineLabel: FdLanguageKey;
    };
    btpSearchField: {
        searchButtonLabel: FdLanguageKey;
        clearButtonLabel: FdLanguageKey;
        searchInputPlaceholder: FdLanguageKey;
        searchInputAriaLabel: FdLanguageKey;
    };
    btpToolHeader: {
        menuButtonAriaLabel: FdLanguageKey;
    };
}
