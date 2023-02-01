export type FdLanguageKeyArgs = Record<string, string | number | boolean>;

export type FdLanguageKeyFunction = (args: FdLanguageKeyArgs) => string;

export type FdLanguageKey = string | FdLanguageKeyFunction;

/**
 * Representation of the dictionary per UI component
 */
export interface FdLanguage {
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
        listItemStatusAriaLabel: FdLanguageKey;
        /** @param count */
        listItemCounterAriaLabel: FdLanguageKey;
        listItemButtonDetailsTitle: FdLanguageKey;
        listItemButtonDeleteTitle: FdLanguageKey;
        listItemStatusContainsErrors: FdLanguageKey;
        listItemStatusLocked: FdLanguageKey;
        listItemStatusDraft: FdLanguageKey;
    };
    coreMessageStrip: {
        dismissLabel: FdLanguageKey;
    };
    coreNestedList: {
        /**
         * @param itemDetails
         * @param index
         * @param total
         * @param selectedDescription
         */
        linkItemAriaLabel: FdLanguageKey;
    };
    coreOverflowLayout: {
        /** @param count */
        moreItemsButton: FdLanguageKey;
    };
    corePagination: {
        /** @param pageNumber */
        pageLabel: FdLanguageKey;
        /**
         * @param pageNumber
         * @param totalCount
         */
        currentPageAriaLabel: FdLanguageKey;
        /**
         * @param pageNumber
         * @param totalCount
         */
        labelBeforeInputMobile: FdLanguageKey;
        /**
         * @param pageNumber
         * @param totalCount
         */
        labelAfterInputMobile: FdLanguageKey;
        /**
         * @param pageNumber
         * @param totalCount
         */
        inputAriaLabel: FdLanguageKey;
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
        totalResultsLabel: FdLanguageKey;
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
        singleMinMaxDetails: FdLanguageKey;
        /** @param value */
        singleValueminDetails: FdLanguageKey;
        /** @param value */
        singleValuemaxDetails: FdLanguageKey;
        /** @param value */
        singleValueNowDetails: FdLanguageKey;
        /**
         * @param min
         * @param max
         */
        multipleHandle1MinMaxDetails: FdLanguageKey;
        /** @param value */
        multipleHandle1ValueminDetails: FdLanguageKey;
        /** @param value */
        multipleHandle1ValuemaxDetails: FdLanguageKey;
        /** @param value */
        multipleHandle1ValueNowDetails: FdLanguageKey;
        /**
         * @param min
         * @param max
         */
        multipleHandle2MinMaxDetails: FdLanguageKey;
        /** @param value */
        multipleHandle2ValueminDetails: FdLanguageKey;
        /** @param value */
        multipleHandle2ValuemaxDetails: FdLanguageKey;
        /** @param value */
        multipleHandle2ValueNowDetails: FdLanguageKey;
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
        hoursLabel: FdLanguageKey;
        /** Aria label for the 'decrease hours' button */
        decreaseHoursLabel: FdLanguageKey;
        /** Aria label for the 'increase minutes' button */
        increaseMinutesLabel: FdLanguageKey;
        /** label for the 'minutes' column */
        minutesLabel: FdLanguageKey;
        /** Aria label for the 'decrease minutes' button */
        decreaseMinutesLabel: FdLanguageKey;
        /** Aria label for the 'increase seconds' button */
        increaseSecondsLabel: FdLanguageKey;
        /** label for the 'seconds' column */
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
        nodeMembersCount: FdLanguageKey;
        nodeVariousTeams: FdLanguageKey;
        nodeStatusDueToday: FdLanguageKey;
        /** @param count */
        nodeStatusDueInXDays: FdLanguageKey;
        /** @param count */
        nodeStatusXDaysOverdue: FdLanguageKey;
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
        userListSelectedItemsCountPlural: FdLanguageKey;
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
        selectTabDisplayCountLabel: FdLanguageKey;
        selectTabMoreBtnLabel: FdLanguageKey;
        /**
         * @param rowCount
         * @param colCount
         */
        selectTabCountHiddenA11yLabel: FdLanguageKey;
        selectMobileTabBackBtnTitle: FdLanguageKey;
        selectMobileTabBtnOpenDialogLabel: FdLanguageKey;
        selectMobileTabTitle: FdLanguageKey;
        selectMobileConditionEmpty: FdLanguageKey;
        defineConditionTitle: FdLanguageKey;
        /** @param value */
        defineConditionSelectedValueHiddenA11yLabel: FdLanguageKey;
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
        defineConditionMaxCountError: FdLanguageKey;
        selectTabTitle: FdLanguageKey;
        searchTableEmptyMessage: FdLanguageKey;
        defineTabTitle: FdLanguageKey;
    };
    platformCombobox: {
        countListResultsSingular: FdLanguageKey;
        /** @param count */
        countListResultsPlural: FdLanguageKey;
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
        counterMessageCharactersOverTheLimitPlural: FdLanguageKey;
        counterMessageCharactersRemainingSingular: FdLanguageKey;
        /** @param count */
        counterMessageCharactersRemainingPlural: FdLanguageKey;
    };
    platformLink: {
        /** @param media */
        roleDescriptionWithMedia: FdLanguageKey;
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
        synchronizeButtonTitle: FdLanguageKey;
        /**
         * @param count
         */
        searchSuggestionMessage: FdLanguageKey;
        searchSuggestionNavigateMessage: FdLanguageKey;
    };
    platformSmartFilterBar: {
        searchPlaceholder: FdLanguageKey;
        submitButtonLabel: FdLanguageKey;
        /** @param filtersCount */
        filtersButtonLabel: FdLanguageKey;
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
    };
    platformTable: {
        headerMenuSortAsc: FdLanguageKey;
        headerMenuSortDesc: FdLanguageKey;
        headerMenuGroup: FdLanguageKey;
        headerMenuFreeze: FdLanguageKey;
        headerMenuUnfreeze: FdLanguageKey;
        headerMenuFilter: FdLanguageKey;
        defaultEmptyMessage: FdLanguageKey;
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
        P13ColumnsDialogSelectAll: FdLanguageKey;
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
        P13FilterDialogIncludePanelTitleWithCount: FdLanguageKey;
        P13FilterDialogIncludePanelTitleWithoutCount: FdLanguageKey;
        /** @param count */
        P13FilterDialogExcludePanelTitleWithCount: FdLanguageKey;
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
        filterDialogNotFilteredLabel: FdLanguageKey;
        /** @param filterLabel */
        filterDialogFilterByLabel: FdLanguageKey;
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
        newFolderAtFolderInputLabel: FdLanguageKey;
        newFolderInputPlaceholder: FdLanguageKey;
        /** @param count */
        newFolderInputErrorLabel: FdLanguageKey;
        newFolderDialogCreateBtnLabel: FdLanguageKey;
        newFolderDialogCancelBtnLabel: FdLanguageKey;
        breadcrumbLabelAllFiles: FdLanguageKey;
        /** @param total */
        breadcrumbLabelAllFilesWithTotal: FdLanguageKey;
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
        paginationTotal: FdLanguageKey;
        resultsPerPage: FdLanguageKey;
        /** @param folderName */
        messageCreateFailed: FdLanguageKey;
        /** @param folderName */
        messageCreateSuccess: FdLanguageKey;
        /** @param folderName */
        messageUpdateVersionFailed: FdLanguageKey;
        /** @param folderName */
        messageUpdateVersionSuccess: FdLanguageKey;
        /**
         * @param from
         * @param to
         */
        messageFileRenameFailed: FdLanguageKey;
        /**
         * @param from
         * @param to
         */
        messageFileRenameSuccess: FdLanguageKey;
        /**
         * @param foldersCount
         * @param filesCount
         */
        messageRemoveFoldersAndFilesFailed: FdLanguageKey;
        /**
         * @param foldersCount
         * @param filesCount
         */
        messageRemoveFoldersAndFilesSuccess: FdLanguageKey;
        /** @param foldersCount */
        messageRemoveFoldersFailed: FdLanguageKey;
        /** @param foldersCount */
        messageRemoveFoldersSuccess: FdLanguageKey;
        /** @param filesCount */
        messageRemoveFilesFailed: FdLanguageKey;
        /** @param filesCount */
        messageRemoveFilesSuccess: FdLanguageKey;
        /** @param name */
        messageRemoveFileOrFolderFailed: FdLanguageKey;
        /** @param name */
        messageRemoveFileOrFolderSuccess: FdLanguageKey;
        /**
         * @param foldersCount
         * @param filesCount
         * @param to
         */
        messageMoveFoldersAndFilesFailed: FdLanguageKey;
        /**
         * @param foldersCount
         * @param filesCount
         * @param to
         */
        messageMoveFoldersAndFilesSuccess: FdLanguageKey;
        /**
         * @param foldersCount
         * @param to
         */
        messageMoveFoldersFailed: FdLanguageKey;
        /**
         * @param foldersCount
         * @param to
         */
        messageMoveFoldersSuccess: FdLanguageKey;
        /**
         * @param filesCount
         * @param to
         */
        messageMoveFilesFailed: FdLanguageKey;
        /**
         * @param filesCount
         * @param to
         */
        messageMoveFilesSuccess: FdLanguageKey;
        /**
         * @param name
         * @param to
         */
        messageMoveFileOrFolderFailed: FdLanguageKey;
        /**
         * @param name
         * @param to
         */
        messageMoveFileOrFolderSuccess: FdLanguageKey;
        /**
         * @param foldersCount
         * @param filesCount
         */
        messageMoveRootFoldersAndFilesFailed: FdLanguageKey;
        /**
         * @param foldersCount
         * @param filesCount
         */
        messageMoveRootFoldersAndFilesSuccess: FdLanguageKey;
        /** @param foldersCount */
        messageMoveRootFoldersFailed: FdLanguageKey;
        /** @param foldersCount */
        messageMoveRootFoldersSuccess: FdLanguageKey;
        /** @param filesCount */
        messageMoveRootFilesFailed: FdLanguageKey;
        /** @param filesCount */
        messageMoveRootFilesSuccess: FdLanguageKey;
        /** @param name */
        messageMoveRootFileOrFolderFailed: FdLanguageKey;
        /** @param name */
        messageMoveRootFileOrFolderSuccess: FdLanguageKey;
        /**
         * @param filesCount
         * @param allowedTypes
         */
        messageFileTypeMismatchPlural: FdLanguageKey;
        /**
         * @param fileName
         * @param allowedTypes
         */
        messageFileTypeMismatchSingular: FdLanguageKey;
        /**
         * @param filesCount
         * @param maxFileSize
         */
        messageFileSizeExceededPlural: FdLanguageKey;
        /**
         * @param fileName
         * @param maxFileSize
         */
        messageFileSizeExceededSingular: FdLanguageKey;
        /**
         * @param filesCount
         * @param maxFilenameLength
         */
        messageFileNameLengthExceededPlural: FdLanguageKey;
        /**
         * @param fileName
         * @param maxFilenameLength
         */
        messageFileNameLengthExceededSingular: FdLanguageKey;
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
}
