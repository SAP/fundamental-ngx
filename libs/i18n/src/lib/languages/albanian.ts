import { FdLanguage } from '../models/lang';

/**
 * Default set of translations of Fundamental UI libarary for Albanian language
 */
export const FD_LANGUAGE_ALBANIAN: FdLanguage = {
    coreCarousel: {
        leftNavigationBtnLabel: 'Shko te artikulli i mëparshëm',
        rightNavigationBtnLabel: 'Shko te artikulli tjetër'
    },
    coreDatePicker: {
        dateInputLabel: 'Hyrja e datës',
        dateRangeInputLabel: 'Hyrja e diapazonit të datave',
        displayCalendarToggleLabel: 'Hap zgjedhës',
        valueStateSuccessMessage: 'Suksesi i gjendjes së vlerës',
        valueStateInformationMessage: 'Informacioni i gjendjes së vlerës',
        valueStateWarningMessage: 'Paralajmërimi i gjendjes së vlerës',
        valueStateErrorMessage: 'Gabim i gjendjes së vlerës'
    },
    coreDatetimePicker: {
        datetimeInputLabel: 'Hyrja e datës',
        displayDatetimeToggleLabel: 'Shfaq ndryshimin e kalendarit',
        displayTypeDateLabel: 'Data',
        displayTypeTimeLabel: 'Koha',
        datetimeOkLabel: 'Ok',
        datetimeCancelLabel: 'Anulo'
    },
    coreFeedListItem: {
        moreLabel: 'Më shumë',
        lessLabel: 'Më pak'
    },
    coreGridList: {
        filterBarCancelButtonTitle: 'Anulo',
        listItemStatusAriaLabel: 'Artikulli ka status. Statusi: {{ status }}.',
        listItemCounterAriaLabel: 'Artikulli ka {{ count }} nënartikuj.',
        listItemButtonDetailsTitle: 'Detaje',
        listItemButtonDeleteTitle: 'Fshi',
        listItemStatusContainsErrors: 'Përmban gabime.',
        listItemStatusLocked: 'I kyçur',
        listItemStatusDraft: 'Draft'
    },
    coreMessageStrip: {
        dismissLabel: 'Largoje'
    },
    coreNestedList: {
        linkItemAriaLabel: 'Artikulli i pemës {{ itemDetails }}, {{ index }} nga {{ total }}{{ selectedDescription }}'
    },
    coreOverflowLayout: {
        moreItemsButton: (params) => {
            const count = params['count'];
            if (count === 1) {
                return '1 artikuj më shumë';
            }
            return `${count} artikuj të tjerë`;
        }
    },
    corePagination: {
        pageLabel: 'Faqja {{ pageNumber }}',
        currentPageAriaLabel: 'Faqja {{ pageNumber }} është faqja aktuale',
        labelBeforeInputMobile: 'Faqja:',
        labelAfterInputMobile: 'nga {{ totalCount }}',
        inputAriaLabel: 'Hyrja e faqes, Faqja aktuale, Faqja {{pageNumber }} nga {{ TotalCount }}',
        itemsPerPageLabel: 'Rezultatet për faqe:',
        firstLabel: 'Së pari',
        previousLabel: 'E mëparshme',
        nextLabel: 'Tjetër',
        lastLabel: 'E fundit',
        ariaLabel: 'Faqimi',
        totalResultsLabel: '{{ totalCount }} Rezultate'
    },
    coreProductSwitch: {
        ariaLabel: 'Ndërprerësi i produktit'
    },
    coreShellbar: {
        collapsedItemMenuLabel: 'Menyja e artikullit të palosur',
        cancel: 'Cancel',
        search: 'Search'
    },
    coreSlider: {
        singleMinMaxDetails: 'Vlera minimale e rrëshqitësit është {{ min }}, vlera maksimale është {{ max }}',
        singleValueminDetails: 'Vlera është {{ value }}',
        singleValuemaxDetails: 'Vlera është  {{ value }}',
        singleValueNowDetails: 'Vlera aktuale është {{ value }}',
        multipleHandle1MinMaxDetails: 'Vlera minimale e rrëshqitësit është {{ min }}, vlera maksimale është {{ max }}',
        multipleHandle1ValueminDetails: 'Vlera është  {{ value }}',
        multipleHandle1ValuemaxDetails: 'Vlera është {{ value }}',
        multipleHandle1ValueNowDetails: 'Vlera aktuale është{{ value }}',
        multipleHandle2MinMaxDetails: 'Vlera minimale e rrëshqitësit është {{ min }}, vlera maksimale është{{ max }}',
        multipleHandle2ValueminDetails: 'Vlera është {{ value }}',
        multipleHandle2ValuemaxDetails: 'Vlera është {{ value }}',
        multipleHandle2ValueNowDetails: 'Vlera aktuale është {{ value }}'
    },
    coreSplitButton: {
        expandButtonAriaLabel: 'Më shumë veprime',
        arialLabel: 'Butoni i ndarjes'
    },
    coreSplitter: {
        paginationItemAriaLabel: 'Seksioni'
    },
    coreStepInput: {
        incrementButtonTitle: 'Rritje',
        decrementButtonTitle: 'Zvogëlimi',
        ariaRoleDescription: 'Hyrja në hap'
    },
    coreSwitch: {
        semanticAcceptLabel: 'Pranoje',
        semanticDeclineLabel: 'Rënia'
    },
    coreTabs: {
        tabListExpandButtonText: 'Më shumë'
    },
    coreText: {
        moreLabel: 'Më shumë',
        lessLabel: 'Më pak'
    },
    coreTime: {
        componentAriaName: 'Zgjedhësi i kohës',
        increaseHoursLabel: 'Rritja e orëve',
        hoursLabel: 'Hrs',
        decreaseHoursLabel: 'Ul oraret',
        increaseMinutesLabel: 'Rritja e minutave',
        minutesLabel: 'Min',
        decreaseMinutesLabel: 'Zvogëlo minutat',
        increaseSecondsLabel: 'Rritja e sekondave',
        secondsLabel: 'Sec',
        decreaseSecondsLabel: 'Ul sekonda',
        increasePeriodLabel: 'Rritja e periudhës',
        periodLabel: 'Periudha',
        decreasePeriodLabel: 'Periudha e zvogëlimit',
        navigationInstruction:
            'Për të lëvizur midis artikujve në këtë listë, shtypni shigjetën lart ose shigjetën e poshtme. ' +
            'Për të kaluar midis listave, shtypni shigjetën majtas ose shigjetën djathtas.'
    },
    coreTimePicker: {
        timePickerInputLabel: 'Hyrja e zgjedhësit të kohës',
        timePickerButtonLabel: 'Zgjedhësi i hapur'
    },
    coreToken: {
        deleteButtonLabel: 'E fshishme',
        ariaRoleDescription: 'shenjë'
    },
    coreTokenizer: {
        moreLabel: '{{count}} more'
    },
    coreUploadCollection: {
        menuOkText: 'Ok',
        menuCancelText: 'Anulo',
        menuEditAriaLabel: 'Ndrysho',
        menuDeleteAriaLabel: 'Fshi',
        menuOkAriaLabel: 'Ndrysho',
        menuCancelAriaLabel: 'Anulo',
        formItemPlaceholder: 'Emri i skedarit'
    },
    coreWizard: {
        ariaLabel: 'Magjistar'
    },
    platformActionBar: {
        backButtonLabel: 'Kthehu mbrapa'
    },
    platformApprovalFlow: {
        defaultWatchersLabel: 'Vrojtuesit',
        defaultTitle: 'Procesi i aprovimit',
        nextButtonAriaLabel: 'Shko te skedari tjetër',
        prevButtonAriaLabel: 'Shko te skedari i mëparshëm',
        editModeSaveButtonLabel: 'Ruaj',
        editModeExitButtonLabel: 'Dalje',
        emptyTitle: 'Shto miratues dhe vëzhgues',
        emptyHint:
            'Për të shtuar miratues, kliko në "Shto një hap". Për të shtuar vëzhgues, kliko në fushën e Vëzhguesit.',
        addNodeDialogHeaderAddApprovers: 'Shto miratues',
        addNodeDialogHeaderEditApprover: 'Redakto miratuesin',
        addNodeDialogHeaderAddApproverTeam: 'Përdorues/Skuadër',
        addNodeDialogHeaderDetail: 'Detaje',
        addNodeDialogNodeType: 'Paralel ose në seri',
        addNodeDialogNodeTypeSerial: 'Seria',
        addNodeDialogNodeTypeParallel: 'Paralel',
        addNodeDialogApproverType: 'Lloji miratues',
        addNodeDialogApproverTypeUser: 'Përdorues',
        addNodeDialogApproverTypeTeamAnyone: 'Kushdo në skuadër',
        addNodeDialogApproverTypeTeamEveryone: 'Të gjithë në skuadër',
        addNodeDialogUserOrTeam: 'Përdorues/Skuadër',
        addNodeDialogAddToNext: 'Shto në nyjen serike tjetër',
        addNodeDialogDueDate: 'Afati kohor deri në',
        addNodeSearchPlaceholder: 'Kërko',
        addNodeAddActionBtnLabel: 'Shto',
        addNodeCancelActionBtnLabel: 'Anulo',
        addNodeSelectApproverActionBtnLabel: 'Selekto',
        addNodeCancelApproverSelectionActionBtnLabel: 'Anulo',
        addNodeApproverOrTeamDetailsCloseActionBtnLabel: 'Mbyll',
        userDetailsHeader: 'Detaje',
        userDetailsSendReminderBtnLabel: 'Dërgo lajmërim',
        userDetailsCancelBtnLabel: 'Anulo',
        messagesApproverAddedSuccess: '1 miratues është shtuar',
        messagesTeamAddedSuccess: '1 skuadër është shtuar',
        messagesNodeEdited: '1 miratues është shtuar',
        messagesNodeRemovedSingular: '1 miratues është hequr',
        messagesNodeRemovedPlural: 'Aprovuesit janë hequr',
        messagesTeamRemoved: '1 skuadër është hequr',
        messagesErrorBuildGraph:
            'Pati një gabim gjatë përpjekjes për të ndërtuar grafikun. Kontrolloni të dhënat fillestare.',
        messagesUndoAction: 'Zhbëj',
        nodeMembersCount: '{{ count }} anëtarë',
        nodeVariousTeams: 'Skuadra të ndryshme',
        nodeStatusDueToday: 'Afati kohor është sot',
        nodeStatusDueInXDays: ' Afati kohor në {{ count }} ditë',
        nodeStatusXDaysOverdue: '{{ count }} ditë me vonesë',
        nodeActionAddApproversBefore: 'Shto miratues më parë',
        nodeActionAddApproversAfter: 'Shto miratues më pas',
        nodeActionAddApproversParallel: 'Shto miratues paralel',
        nodeActionEditApprover: 'Redakto miratuesin',
        nodeActionRemove: 'Fshi',
        selectTypeDialogMoveApproverAs: 'Zhvendos miratuesin si',
        selectTypeDialogParallelOrSerial: 'Paralel ose në seri',
        selectTypeDialogNodeTypeParallel: 'Aprovues paralel',
        selectTypeDialogNodeTypeSerial: 'Aprovues serial',
        selectTypeDialogConfirmButton: 'Konfirmo',
        selectTypeDialogCancelButton: 'Anulo',
        toolbarAddStepButton: 'Shto një hap',
        toolbarEditButton: 'Redakto',
        toolbarAddApproversBefore: 'Shto miratues më parë',
        toolbarAddApproversAfter: 'Shto miratues më pas',
        toolbarAddApproversParallel: 'Shto miratues paralelë',
        toolbarRemove: 'Fshi',
        toolbarEditApprover: 'Redakto miratuesin',
        watchersInputPlaceholder: 'Kërko këtu..',
        userListSelectedItemsCountSingular: '1 artikull i zgjedhur',
        userListSelectedItemsCountPlural: '{{ count }} artikujt të zgjedhur',
        statusApproved: 'approved',
        statusRejected: 'rejected',
        statusInProgress: 'in progress',
        statusNotStarted: 'not started'
    },
    platformFeedInput: {
        userTitle: 'Përdoruesi'
    },
    platformVHD: {
        selectionBarLabel: 'Artikujt e zgjedhur dhe të gjendjes',
        selectedAndConditionLabel: 'Artikujt e zgjedhur dhe të gjendjes',
        footerClearSelectedTitle: 'pastro artikujt e zgjedhur',
        footerClearSelectedAriaLabel: 'pastro artikujt e zgjedhur',
        searchButtonLabel: 'Shko',
        successButtonLabel: 'OK',
        cancelButtonLabel: 'Anulo',
        selectedEmptyLabel: 'Asnjë Artikull ose Kusht i zgjedhur',
        searchPlaceholder: 'Kërko',
        searchAdvancedSearchLabel: 'Filtrat',
        searchShowAdvancedSearchLabel: 'Shfaq filtrat',
        searchHideAdvancedSearchLabel: 'Fshih filtrat',
        searchShowAllAdvancedSearchLabel: 'Shfaq të gjithë filtrat',
        searchHideAllAdvancedSearchLabel: 'Fshih të gjithë filtrat',
        selectTabDisplayCountLabel: 'Artikujt ({{ count }})',
        selectTabMoreBtnLabel: 'Më shumë',
        selectTabCountHiddenA11yLabel: 'përmban {{ rowCount }} rreshta dhe {{ colCount }} kolona',
        selectMobileTabBackBtnTitle: 'Pas',
        selectMobileTabBtnOpenDialogLabel: 'Hap dialogun',
        selectMobileTabTitle: '{{ title }} skeda',
        selectMobileConditionEmpty: 'Bosh',
        defineConditionTitle: 'Produkt',
        defineConditionSelectedValueHiddenA11yLabel: 'vlera e zgjedhur {{ value }}',
        defineConditionConditionsGroupHeaderInclude: 'Përfshij',
        defineConditionConditionsGroupHeaderExclude: 'Përjashto',
        defineConditionFromPlaceholder: 'nga',
        defineConditionToPlaceholder: 'në',
        defineConditionValuePlaceholder: 'vlera',
        defineConditionRemoveConditionButtonTitle: 'Hiq kushtin',
        defineConditionAddConditionButtonLabel: 'Shto',
        defineConditionAddConditionButtonTitle: 'Shto kushtin',
        defineConditionConditionStrategyLabelContains: 'përmban',
        defineConditionConditionStrategyLabelEqualTo: 'e barabartë me',
        defineConditionConditionStrategyLabelBetween: 'ndërmjet',
        defineConditionConditionStrategyLabelStartsWith: 'fillon me',
        defineConditionConditionStrategyLabelEndsWith: 'mbaron me',
        defineConditionConditionStrategyLabelLessThan: 'më pak se',
        defineConditionConditionStrategyLabelLessThanEqual: 'më pak se e barabartë',
        defineConditionConditionStrategyLabelGreaterThan: 'më i madh se',
        defineConditionConditionStrategyLabelGreaterThanEqual: 'më i madh ose i barabartë',
        defineConditionConditionStrategyLabelEmpty: 'bosh',
        defineConditionConditionStrategyLabelNotEqualTo: 'jo e barabartë me',
        defineConditionConditionStrategyLabelNotEmpty: 'jo bosh',
        defineConditionMaxCountError: 'Shto një vlerë me jo më shumë se {{ count }} karaktere.',
        selectTabTitle: 'Zgjidh nga lista',
        searchTableEmptyMessage: 'Përdor kërkimin për të marrë rezultate',
        defineTabTitle: 'Përcaktoni kushtet'
    },
    platformCombobox: {
        countListResultsSingular: '1 artikull i listës së rezultateve',
        countListResultsPlural: '{{ count }} artikujt e listës së rezultateve'
    },
    platformMultiCombobox: {
        inputGlyphAriaLabel: 'Zgjidhni Opsionet',
        inputIconTitle: 'Zgjidhni Opsionet',
        mobileShowAllItemsButton: 'Shfaq të gjithë artikujt',
        mobileShowSelectedItemsButton: 'Shfaq artikujt e zgjedhur'
    },
    platformTextarea: {
        counterMessageCharactersOverTheLimitSingular: '1 karakter mbi limitin ',
        counterMessageCharactersOverTheLimitPlural: '{{ count }} karaktere mbi limitin',
        counterMessageCharactersRemainingSingular: '1 karakter i mbetur',
        counterMessageCharactersRemainingPlural: '{{ count }} karaktere të mbetur'
    },
    platformLink: {
        roleDescriptionWithMedia: 'Media: {{ media }}'
    },
    platformList: {
        loadingAriaLabel: 'duke u ngarkuar'
    },
    platformObjectListItem: {
        detailsActionAriaLabel: 'detaje',
        deleteActionAriaLabel: 'fshi'
    },
    platformStandardListItem: {
        detailsActionAriaLabel: 'detaje',
        deleteActionAriaLabel: 'fshi'
    },
    platformSearchField: {
        clearButtonTitle: 'Pastro',
        submitButtonTitle: 'Kërko',
        synchronizeButtonTitle: 'Sinkronizo',
        searchSuggestionMessage: '{{ count }} sugjerime u gjetën.',
        searchSuggestionNavigateMessage: 'përdor shigjetat lart e poshtë për të lundruar'
    },
    platformSmartFilterBar: {
        searchPlaceholder: 'Kërko',
        submitButtonLabel: 'Shko',
        filtersButtonLabel: 'Filtrat ({{ filtersCount }})',
        showFiltersButtonLabel: 'Shfaq filtrat',
        hideFiltersButtonLabel: 'Fshih filtrat',
        defineConditionsRemoveConditionButtonTitle: 'Hiq kushtin',
        defineConditionsAddConditionButtonLabel: 'Shto kushtin',
        defineConditionsSubmitButtonLabel: 'Shko',
        defineConditionsCancelButton: 'Anulo',
        selectFiltersHeader: 'Filtrat',
        selectFiltersAvailableFiltersText: 'Filtrat e disponueshëm',
        selectFiltersFilterColumnLabel: 'Filtri',
        selectFiltersActiveColumnLabel: 'Aktive',
        selectFiltersSubmitButtonLabel: 'Shko',
        selectFiltersCancelButton: 'Anulo',
        filterConditionContains: 'përmban',
        filterConditionEqualTo: 'e barabartë me',
        filterConditionBetween: 'ndërmjet',
        filterConditionBeginsWith: 'fillon me',
        filterConditionEndsWith: 'mbaron me',
        filterConditionLessThan: 'më pak se',
        filterConditionLessThanOrEqualTo: 'më pak se ose e barabartë me',
        filterConditionGreaterThan: 'më e madhe se',
        filterConditionGreaterThanOrEqualTo: 'më e madhe se ose e barabartë me',
        filterConditionAfter: 'pas',
        filterConditionOnOrAfter: 'në ose pas',
        filterConditionBefore: 'para',
        filterConditionBeforeOrOn: 'para ose në',
        filterConditionValuePlaceholder: 'vlera',
        filterConditionValueFromPlaceholder: 'nga',
        filterConditionValueToPlaceholder: 'për',
        settingsCategoryAll: 'Të gjitha',
        settingsCategoryVisible: 'E dukshme',
        settingsCategoryActive: 'Aktiv',
        settingsCategoryVisibleAndActive: 'E dukshme dhe aktive',
        settingsCategoryMandatory: 'I detyrueshëm'
    },
    platformTable: {
        headerMenuSortAsc: 'Rendit në rritje',
        headerMenuSortDesc: 'Rendit në zbritje',
        headerMenuGroup: 'Groupo',
        headerMenuFreeze: 'Blloko',
        headerMenuUnfreeze: 'Menuja "Shkrije"',
        headerMenuFilter: 'Filtro',
        defaultEmptyMessage: 'No data found',
        resetChangesButtonLabel: 'Rivendos',
        editableCellNumberPlaceholder: 'Shto vlerën',
        editableCellDatePlaceholder: 'Shto vlerën',
        editableCellStringPlaceholder: 'Shto vlerën',
        P13ColumnsDialogHeader: 'Kolonat',
        P13ColumnsDialogSearchPlaceholder: 'Kërko',
        P13ColumnsDialogsShowSelected: 'Shfaq të zgjedhurat',
        P13ColumnsDialogShowAll: 'Shfaq të gjitha',
        P13ColumnsDialogSelectAll: 'Përzgjidh të gjitha ({{ selectedColumnsCount }}/{{ selectableColumnsCount }})',
        P13ColumnsDialogConfirmationBtnLabel: 'OK',
        P13ColumnsDialogCancelBtnLabel: 'Anulo',
        P13ColumnsDialogMoveToTopBtn: 'Kalo në krye',
        P13ColumnsDialogMoveUpBtn: 'Lëviz lartë',
        P13ColumnsDialogMoveDownBtn: 'Lëviz poshtë',
        P13ColumnsDialogMoveToBottomBtn: 'Lëviz në fund',
        P13FilterStrategyLabelBetween: 'midis',
        P13FilterStrategyLabelContains: 'përmban',
        P13FilterStrategyLabelBeginsWith: 'fillon me',
        P13FilterStrategyLabelEndsWith: 'mbaron me',
        P13FilterStrategyLabelEqualTo: 'e barabart me',
        P13FilterStrategyLabelGreaterThan: 'më e madhe se',
        P13FilterStrategyLabelGreaterThanOrEqualTo: 'më e madhe se ose e barabartë',
        P13FilterStrategyLabelLessThan: 'më e vogël se',
        P13FilterStrategyLabelLessThanOrEqualTo: 'më e vogël se ose e barabartë',
        P13FilterStrategyLabelAfter: 'pas',
        P13FilterStrategyLabelOnOrAfter: 'mbi ose pas',
        P13FilterStrategyLabelBefore: 'përpara',
        P13FilterStrategyLabelBeforeOrOn: 'përpara ose mbi',
        P13FilterStrategyLabelNotDefined: 'E papërcaktuar',
        P13FilterBooleanOptionNotDefined: ' ',
        P13FilterBooleanOptionTrue: 'Po',
        P13FilterBooleanOptionFalse: 'Jo',
        P13FilterDialogHeader: 'Filtro sipas',
        P13FilterDialogIncludePanelTitleWithCount: 'Përfshi ({{ count }})',
        P13FilterDialogIncludePanelTitleWithoutCount: 'Përfshi',
        P13FilterDialogExcludePanelTitleWithCount: 'Përjashto ({{ count }})',
        P13FilterDialogExcludePanelTitleWithoutCount: 'Përjashto',
        P13FilterDialogRemoveFilterBtnTitle: 'Hiq filtrin',
        P13FilterDialoAddFilterBtnTitle: 'Shto filtrin',
        P13FilterDialogConfirmationBtnLabel: 'OK',
        P13FilterDialogCancelBtnLabel: 'Anulo',
        P13GroupDialogHeader: 'Grupo',
        P13GroupDialogNoneSelectedColumnSelectPlaceholder: '(none)',
        P13GroupDialogShowFieldAsColumnCheckboxLabel: 'Shfaq Fushën si Kolona',
        P13GroupDialogRemoveGroupBtnTitle: 'Hiq',
        P13GroupDialogAddNewGroupBtnTitle: 'Shto një të re',
        P13GroupDialogConfirmationBtnLabel: 'OK',
        P13GroupDialogCancelBtnLabel: 'Anulo',
        P13SortDialogHeader: 'Rendit',
        P13SortDialogNoneSelectedColumn: '(none)',
        P13SortDialogNoneSelectedSorting: '(none)',
        P13SortDialogSortOrderSelectOptionAsc: 'Në ngritje',
        P13SortDialogSortOrderSelectOptionDesc: 'Në zbritje',
        P13SortDialogRemoveSortBtnTitle: 'Fshi',
        P13SortDialogAddNewSortBtnTitle: 'Shto një të re',
        P13SortDialogConfirmationBtnLabel: 'OK',
        P13SortDialogCancelBtnLabel: 'Anulo',
        toolbarSearchPlaceholder: 'Kërko',
        toolbarActionCreateButtonLabel: 'Krijo',
        toolbarActionSaveButtonLabel: 'Ruaj',
        toolbarActionCancelButtonLabel: 'Anulo',
        toolbarActionSortButtonTitle: 'Rendit',
        toolbarActionFilterButtonTitle: 'Filtro',
        toolbarActionGroupButtonTitle: 'Group',
        toolbarActionColumnsButtonTitle: 'Columns',
        filterDialogNotFilteredLabel: '(Not Filtered)',
        filterDialogFilterByLabel: 'Filtro sipas: {{ filterLabel }}',
        filterDialogFilterTitle: 'Filtro',
        filterDialogFilterBy: 'Filtro sipas',
        filterDialogConfirmBtnLabel: 'OK',
        filterDialogCancelBtnLabel: 'Anulo',
        groupDialogHeader: 'Grupo',
        groupDialogGroupOrderHeader: 'Rendit ne group',
        groupDialogGroupOrderAsc: 'Në ngritje',
        groupDialogGroupOrderDesc: 'Në zbritje',
        groupDialogGroupByHeader: 'Grupo sipas',
        groupDialogNotGroupedLabel: '(Not Grouped)',
        groupDialogConfirmBtnLabel: 'OK',
        groupDialogCancelBtnLabel: 'Anulo',
        sortDialogHeader: 'Rendit',
        sortDialogSortOrderHeader: 'Sort Order',
        sortDialogSortOrderAsc: 'Në ngritje',
        sortDialogSortOrderDesc: 'Në zbritje',
        sortDialogSortByHeader: 'Rendit sipas',
        sortDialogNotSortedLabel: '(Not Sorted)',
        sortDialogConfirmBtnLabel: 'OK',
        sortDialogCancelBtnLabel: 'Anulo'
    },
    platformThumbnail: {
        detailsGotoPreviousButtonTitle: 'Shko te paraardhësja',
        detailsGotoNextButtonTitle: 'Shko te pasardhëstja',
        detailsDialogCloseBtnLabel: 'Mbyll',
        roleDescription: 'Imazhi'
    },
    platformUploadCollection: {
        moveToTitle: 'Lëviz te',
        moveToTitleFolder: 'Dosje',
        moveToNewFolderBtnLabel: 'Dosje e re',
        moveToAllFilesSubHeaderLabel: 'Të gjithë skedarët',
        moveToConfirmBtn: 'Lëviz',
        moveToCloseBtn: 'Anulo',
        newFolderTitle: 'Dosje e re',
        newFolderAtRootInputLabel: 'Emëro një dosje të re',
        newFolderAtFolderInputLabel: 'Emëro një dosje të re brenda {{ folderName }}',
        newFolderInputPlaceholder: 'Shkruaj këtu..',
        newFolderInputErrorLabel: 'Maksimuni i karaktereve te lejuara është {{ count }}',
        newFolderDialogCreateBtnLabel: 'Krijo',
        newFolderDialogCancelBtnLabel: 'Anulo',
        breadcrumbLabelAllFiles: 'Të gjithë skedarët',
        breadcrumbLabelAllFilesWithTotal: 'Të gjithë skedarët ({{ total }})',
        searchPlaceholder: 'Kërko',
        addBtnLabel: 'Shto',
        newFolderBtnLabel: 'Dosje e re',
        moveToBtnLabel: 'Lëviz te',
        downloadBtnLabel: 'Shkarko',
        updateVersionBtnLabel: 'Ngarko versionin',
        removeBtnLabel: 'Fshi',
        folderIconTitle: 'Ikona e dosjes',
        fileIconTitle: 'Ikona e skedarit',
        editFileNameInputPlaceholder: 'Shto emrin',
        editFileNameFileAlreadyExistsError: 'Skedari me këtë emër ekziston.',
        editFileNameFolderAlreadyExistsError: 'Dosja me këtë emër ekziston.',
        itemStatusSuccessful: 'Sukses',
        itemStatusUnsuccessful: 'Nuk ka sukses',
        uploadNewFileAfterFailAction: 'Ekzekuto',
        cancelUploadNewFileAction: 'Anulo',
        itemMenuBtnTitle: 'Më shumë',
        dragDropAreaText: 'Tërhiq skedarët për t`i ngarkuar',
        noDataText: 'Nuk u gjet asnjë skedar',
        noDataDescription: 'Hidhni skedarët për të ngarkuar ose përdorni butonin "Shto".',
        paginationTotal: 'Po shfaqen {{ from }}-{{ to }} nga {{ total }}',
        resultsPerPage: 'Rezultatet për faqe',
        messageCreateFailed: 'Dështoj krijimi i {{ folderName }}.',
        messageCreateSuccess: '{{ folderName }} është krijuar.',
        messageUpdateVersionFailed: 'Përditësimi i versionit të dështoi {{ folderName }}.',
        messageUpdateVersionSuccess: '{{ folderName }} versioni është përditësuar.',
        messageFileRenameFailed: 'Riemërtimi nga "{{ from }}" në "{{ to }}  dështoi."',
        messageFileRenameSuccess: '"{{ from }}" është riemërtuar në "{{ to }}".',
        messageRemoveFoldersAndFilesFailed:
            'Dështoi për të hequr {{ foldersCount }} dosje dhe {{ filesCount }} skedare.',
        messageRemoveFoldersAndFilesSuccess: '{{ foldersCount }} dojse he {{ filesCount }} skedare janë hequr.',
        messageRemoveFoldersFailed: 'Dështoi për të hequr {{ foldersCount }} dosje.',
        messageRemoveFoldersSuccess: '{{ foldersCount }} dosje janë hequr.',
        messageRemoveFilesFailed: 'Dështoi për të hequr {{ filesCount }} skedare.',
        messageRemoveFilesSuccess: '{{ filesCount }} skedare janë hequr.',
        messageRemoveFileOrFolderFailed: 'Dështoi për të hequr {{ name }}.',
        messageRemoveFileOrFolderSuccess: '{{ name }} ështe hequr.',
        messageMoveFoldersAndFilesFailed:
            'Zhvendosja e dosjeve {{ foldersCount }} dhe skedarët {{ filesCount }} në {{ to }} dështoi.',
        messageMoveFoldersAndFilesSuccess: '{{ foldersCount }} dosje dhe {{ filesCount }} janë zhvendosur në {{ to }}.',
        messageMoveFoldersFailed: 'Zhvendosja e dosjeve {{ foldersCount }} dështoi në {{ to }}.',
        messageMoveFoldersSuccess: '{{ foldersCount }} dosje janë zhvendosur në{{ to }}.',
        messageMoveFilesFailed: 'Zhvendosja e  {{ filesCount }} skedarëve në {{ to }} ka dështuar.',
        messageMoveFilesSuccess: '{{ filesCount }} dosje janë zhvendosur në {{ to }}.',
        messageMoveFileOrFolderFailed: 'Lëvizja e {{ name }} në {{ to }} ka dështuar.',
        messageMoveFileOrFolderSuccess: '{{ name }} është zhvendosur në {{ to }}.',
        messageMoveRootFoldersAndFilesFailed:
            'Zhvendosja e skedarëve {{ foldersCount }} dhe {{ filesCount }} në të gjithë skedarët ka dështuar.',
        messageMoveRootFoldersAndFilesSuccess:
            '{{ foldersCount }} dosje dhe {{ filesCount }} skedarë janë zhvendosur në të gjithë skedarët.',
        messageMoveRootFoldersFailed: 'Zhvendosja e dosjeve {{ foldersCount }} në të gjithë skedarët dështoi.',
        messageMoveRootFoldersSuccess: '{{ foldersCount }} dosje janë zhvendosur në të gjithë skedarët.',
        messageMoveRootFilesFailed: 'Zhvendosja e skedarëve {{ filesCount }} në të gjithë skedarët dështoi.',
        messageMoveRootFilesSuccess: '{{ filesCount }} skedare janë zhvendosur në të gjithë skedarët.',
        messageMoveRootFileOrFolderFailed: 'Zhvendosja e {{ emri }} te të gjithë skedarët ka dështuar.',
        messageMoveRootFileOrFolderSuccess: '{{ name }} është zhvendosur në të gjithë skedarët.',
        messageFileTypeMismatchPlural:
            '{{ filesCount }} skedarët kanë llojin e gabuar. Llojet e lejuara: {{ allowedTypes }}.',
        messageFileTypeMismatchSingular:
            'Skedari "{{ fileName }}" ka llojin e gabuar. Llojet e lejuara: {{ allowedTypes }}.',
        messageFileSizeExceededPlural:
            '{{ filesCount }} skedarët tejkaluan madhësinë maksimale të skedarit. Madhësia maksimale e lejuar e skedarit:{{ maxFileSize }}.',
        messageFileSizeExceededSingular:
            'Skedari "{{ fileName }}" ka tejkaluar madhësinë maksimale të skedarit. Madhësia maksimale e lejuar e skedarit: {{ maxFileSize }}.',
        messageFileNameLengthExceededPlural:
            '{{ filesCount }} skedare tejkaluan gjatësinë maksimale të emrit. Gjatësia e lejuar e emrit të skedarit: {{ maxFilenameLength }} karaktere.',
        messageFileNameLengthExceededSingular:
            'Emri "{{ fileName }}" ka tejkaluar gjatësinë maksimale të emrit. Gjatësia e lejuar e emrit të skedarit: {{ maxFilenameLength }} karaktere.'
    },
    platformWizardGenerator: {
        summarySectionEditStep: 'Redakto'
    },
    platformMessagePopover: {
        allErrors: 'All',
        defaultErrors: {
            email: 'Email is invalid',
            max: 'The field exceeds maximum value',
            maxLength: 'The field exceeds maximum length',
            min: 'The field value is less than allowed',
            minLength: 'The field length is less than allowed',
            pattern: 'The field value is invalid',
            required: 'The field is mandatory',
            requiredTrue: 'The field is mandatory'
        }
    },
    platformVariantManagement: {
        manage: 'Manage',
        saveAs: 'Save as',
        saveView: 'Save View',
        save: 'Save',
        myViews: 'My Views',
        view: 'View',
        setAsDefault: 'Set as Default',
        public: 'Public',
        applyAutomatically: 'Apply Automatically',
        requiredFieldError: 'This field is required.',
        nameTakenFieldError: 'Variant with such name already exists. Please chose a different name.',
        cancel: 'Cancel',
        manageViews: 'Manage Views',
        markAsFavourite: 'Mark as Favourite',
        sharing: 'Sharing',
        default: 'Default',
        createdBy: 'Created By',
        removeVariant: 'Remove View',
        search: 'Search',
        access: {
            public: 'Public',
            private: 'Private'
        }
    },
    fnSlider: {
        minMaxDetails: 'Vlera minimale e rrëshqitësit është {{ min }}, vlera maksimale është {{ max }}',
        valueminDetails: 'Vlera është  {{ value }}',
        valuemaxDetails: 'Vlera është  {{ value }}',
        valueNowDetails: 'Vlera aktuale është  {{ value }}'
    },
    fnSwitch: {
        semanticAcceptLabel: 'Pranoje',
        semanticDeclineLabel: 'Rënia'
    }
};
