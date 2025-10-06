import { FdLanguageKey } from './fd-language-key';

/**
 * Representation of the dictionary per UI component
 */
export interface FdLanguage {
    coreCalendar: {
        /** Year selection aria label. Used on the button to navigate to the years view. */
        yearSelectionLabel: FdLanguageKey;

        /** Years range selection aria label. Used on the button to navigate to the years range view. */
        yearsRangeSelectionLabel: FdLanguageKey;

        /** Month selection aria label. Used on the button to navigate to the months view. */
        monthSelectionLabel: FdLanguageKey;

        /** Day selection aria label. Used on the button to navigate to the day view. */
        dateSelectionLabel: FdLanguageKey;

        /** Previous year aria label. Used on the button to switch to a previous year in the years view. */
        previousYearLabel: FdLanguageKey;

        /** Next year aria label. Used on the button to switch to a next year in the years view. */
        nextYearLabel: FdLanguageKey;

        /** Previous month aria label. Used on the button to switch to a previous month in the months view. */
        previousMonthLabel: FdLanguageKey;

        /** Next month aria label. Used on the button to switch to a next month in the months view. */
        nextMonthLabel: FdLanguageKey;

        /** Week number column label */
        weekColumnLabel: FdLanguageKey;

        /** Selected date label. Used on the selected day/month/year cell. */
        dateSelectedLabel: FdLanguageKey;

        /** Is used to describe present date */
        todayLabel: FdLanguageKey;

        /** Range start label. Used for date range selection */
        rangeStartLabel: FdLanguageKey;

        /** Range end label. Used for date range selection */
        rangeEndLabel: FdLanguageKey;

        /** Past days aria label. Used when days in the past are accessed */
        dayInPastLabel: FdLanguageKey;

        /** Past days aria label. Used when days in the past are accessed */
        closeCalendarLabel: FdLanguageKey;

        /** Calendar day view aria role description. */
        calendarDayViewDescription: FdLanguageKey;

        /** Calendar month view aria role description. */
        calendarMonthViewDescription: FdLanguageKey;

        /** Calendar years view aria role description. */
        calendarYearsViewDescription: FdLanguageKey;

        /** Calendar years range view aria role description. */
        calendarYearsRangeViewDescription: FdLanguageKey;

        /** Label for work days in the calendar legend. */
        workDayLabel: FdLanguageKey;

        /** Label for non-work days in the calendar legend. */
        nonWorkDayLabel: FdLanguageKey;
    };
    coreMultiComboBox: {
        /** Label for the multi-combobox. */
        multiComboBoxAriaLabel: FdLanguageKey;
        selectAllLabel: FdLanguageKey;
    };
    coreCarousel: {
        pageIndicatorLabel: FdLanguageKey;
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
    coreDynamicPage: {
        expandLabel: FdLanguageKey;
        collapseLabel: FdLanguageKey;
        pinLabel: FdLanguageKey;
        unpinLabel: FdLanguageKey;
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
        announcementInfo: FdLanguageKey;
        announcementWarning: FdLanguageKey;
        announcementError: FdLanguageKey;
        announcementSuccess: FdLanguageKey;
        announcementDefault: FdLanguageKey;
        closable: FdLanguageKey;
    };
    coreMultiInput: {
        multiInputAriaLabel: FdLanguageKey;
        tokensCountText: FdLanguageKey;
        noResults: FdLanguageKey;
        navigateSelectionsWithArrows: FdLanguageKey;
        escapeNavigateTokens: FdLanguageKey;
        countListResultsSingular: FdLanguageKey<{ count: number }>;
        countListResultsPlural: FdLanguageKey<{ count: number }>;
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
        assistiveTools: FdLanguageKey;
        backButtonLabel: FdLanguageKey;
        navigationButtonLabel: FdLanguageKey;
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
        invalidEntryError: FdLanguageKey;
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
        headerMenuFreezePlural: FdLanguageKey;
        headerMenuUnfreezePlural: FdLanguageKey;
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
        P13FilterDialogAddFilterBtnTitle: FdLanguageKey;
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
        deselectAllCheckboxLongLabel: FdLanguageKey;
        selectAllCheckboxLongLabel: FdLanguageKey;
        selectAllCheckboxMixedLongLabel: FdLanguageKey;
        deselectSingleRow: FdLanguageKey;
        selectSingleRow: FdLanguageKey;
        showingBlankOfBlank: FdLanguageKey;
        collapseRowButtonTitle: FdLanguageKey;
        expandRowButtonTitle: FdLanguageKey;
        rowNavigateButtonTitle: FdLanguageKey;
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
    btpSearchField: {
        searchButtonLabel: FdLanguageKey;
        clearButtonLabel: FdLanguageKey;
        searchInputPlaceholder: FdLanguageKey;
        searchInputAriaLabel: FdLanguageKey;
    };
    btpToolHeader: {
        menuButtonAriaLabel: FdLanguageKey;
    };
    coreNotification: {
        groupHeaderTitle: FdLanguageKey;
        groupAriaDescription: FdLanguageKey;
        groupAriaDescriptionExpanded: FdLanguageKey;
        groupAriaDescriptionCollapsed: FdLanguageKey;
        triggerMoreLabel: FdLanguageKey;
        triggerLessLabel: FdLanguageKey;
    };
    segmentedButton: {
        groupRoleDescription: FdLanguageKey;
        buttonRoleDescription: FdLanguageKey;
    };
}
