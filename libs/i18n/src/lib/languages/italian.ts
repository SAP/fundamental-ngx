import { FdLanguage } from '../models/lang';

/**
 * Default set of translations of Fundamental UI libarary for Italian language
 */
export const FD_LANGUAGE_ITALIAN: FdLanguage = {
    coreCarousel: {
        leftNavigationBtnLabel: "Vai all'elemento precedente",
        rightNavigationBtnLabel: "Vai all'elemento successivo"
    },
    coreDatePicker: {
        dateInputLabel: 'Inserimento data',
        dateRangeInputLabel: 'Inserimento intervallo di date',
        displayCalendarToggleLabel: 'Selettore aperto',
        valueStateSuccessMessage: 'Stato valore Success',
        valueStateInformationMessage: 'Informazioni sullo stato del valore',
        valueStateWarningMessage: 'Avviso stato valore',
        valueStateErrorMessage: 'Errore stato valore'
    },
    coreDatetimePicker: {
        datetimeInputLabel: 'Inserimento data/ora',
        displayDatetimeToggleLabel: 'Visualizza/disattiva calendario',
        displayTypeDateLabel: 'Data',
        displayTypeTimeLabel: 'Volta',
        datetimeOkLabel: 'Ok',
        datetimeCancelLabel: 'Anulla'
    },
    coreFeedListItem: {
        moreLabel: 'Altro',
        lessLabel: 'Meno'
    },
    coreGridList: {
        filterBarCancelButtonTitle: 'Annulla',
        listItemStatusAriaLabel: "L'articolo ha uno stato. Stato: {{ status }}.",
        listItemCounterAriaLabel: "L'articolo ha {{count}} sottoarticoli.",
        listItemButtonDetailsTitle: 'Dettagli',
        listItemButtonDeleteTitle: 'Elimina',
        listItemStatusContainsErrors: 'Contiene errori',
        listItemStatusLocked: 'Bloccato',
        listItemStatusDraft: 'Bozza'
    },
    coreMessageStrip: {
        dismissLabel: 'Congedare'
    },
    coreMultiInput: {
        multiInputAriaLabel: 'Multi Input'
    },
    coreNavigation: {
        mainNavigation: 'Main Navigation',
        navigationPath: 'Navigation Path'
    },
    coreNestedList: {
        linkItemAriaLabel: "Elemento dell'albero {{ itemDetails }}, {{ index }} di {{ total }}{{ selectedDescription }}"
    },
    coreOverflowLayout: {
        moreItemsButton: (params) => {
            const count = params['count'];
            if (count === 1) {
                return '1 più articoli';
            }
            return `Altri ${count} articoli`;
        }
    },
    corePagination: {
        pageLabel: 'Pagina {{ pageNumber }}',
        currentPageAriaLabel: 'La pagina {{ pageNumber }} è la pagina corrente',
        labelBeforeInputMobile: 'Pagina:',
        labelAfterInputMobile: 'di {{ totalCount }}',
        inputAriaLabel: 'Inserimento pagina, Pagina corrente, Pagina {{ pageNumber }} di {{ totalCount }}',
        itemsPerPageLabel: 'Risultati per pagina:',
        firstLabel: 'First',
        previousLabel: 'Precedente',
        nextLabel: 'Next',
        lastLabel: 'Ultimo',
        ariaLabel: 'Impaginazione',
        totalResultsLabel: '{{ totalCount }} Risultati'
    },
    coreProductSwitch: {
        ariaLabel: 'Commutatore del prodotto'
    },
    coreShellbar: {
        collapsedItemMenuLabel: 'Menu di voci compresso',
        cancel: 'Cancel',
        search: 'Search'
    },
    coreSlider: {
        singleMinMaxDetails:
            'Il valore minimo del dispositivo di scorrimento è {{minimo}}, il valore massimo è {{max}}',
        singleValueminDetails: 'Il valore è {{ value }}',
        singleValuemaxDetails: 'Il valore è {{ value }}',
        singleValueNowDetails: 'Il valore attuale è {{ value }}',
        multipleHandle1MinMaxDetails:
            "Il valore minimo del dispositivo di scorrimento dell'intervallo è {{min}}, il valore massimo è {{max}}",
        multipleHandle1ValueminDetails: 'Il valore è {{ value }}',
        multipleHandle1ValuemaxDetails: 'Il valore è {{ value }}',
        multipleHandle1ValueNowDetails: 'Il valore attuale è {{ value }}',
        multipleHandle2MinMaxDetails:
            "Il valore minimo del dispositivo di scorrimento dell'intervallo è {{min}}, il valore massimo è {{max}}",
        multipleHandle2ValueminDetails: 'Il valore è {{ value }}',
        multipleHandle2ValuemaxDetails: 'Il valore è {{ value }}',
        multipleHandle2ValueNowDetails: 'Il valore attuale è {{ value }}'
    },
    coreSplitButton: {
        expandButtonAriaLabel: 'Più azioni',
        arialLabel: 'Pulsante Dividi'
    },
    coreSplitter: {
        paginationItemAriaLabel: 'Sezione'
    },
    coreStepInput: {
        incrementButtonTitle: 'Incremento',
        decrementButtonTitle: 'Decremento',
        ariaRoleDescription: 'Ingresso passo'
    },
    coreSwitch: {
        semanticAcceptLabel: 'Accettare',
        semanticDeclineLabel: 'Declino'
    },
    coreTabs: {
        tabListExpandButtonText: 'Di più'
    },
    coreText: {
        moreLabel: 'Di più',
        lessLabel: 'Meno'
    },
    coreTime: {
        componentAriaName: 'Selettore tempo',
        increaseHoursLabel: 'Aumenta le ore',
        hoursLabel: 'Ore',
        decreaseHoursLabel: 'Diminuisci ore',
        increaseMinutesLabel: 'Aumenta minuti',
        minutesLabel: 'Minimo',
        decreaseMinutesLabel: 'Diminuisci minuti',
        increaseSecondsLabel: 'Aumenta i secondi',
        secondsLabel: 'Sec',
        decreaseSecondsLabel: 'Diminuisci secondi',
        increasePeriodLabel: 'Aumento periodo',
        periodLabel: 'Periodo',
        decreasePeriodLabel: 'Diminuisci periodo',
        navigationInstruction:
            'Per spostarti tra gli elementi di questo elenco, premi la freccia in alto o in basso. ' +
            "Per passare da un elenco all'altro, premere la freccia sinistra o la freccia destra."
    },
    coreTimePicker: {
        timePickerInputLabel: 'Input per la selezione del tempo',
        timePickerButtonLabel: 'Selettore aperto'
    },
    coreToken: {
        deleteButtonLabel: 'Cancellabile',
        ariaRoleDescription: 'gettone'
    },
    coreTokenizer: {
        moreLabel: '{{count}} more'
    },
    coreUploadCollection: {
        menuOkText: 'Ok',
        menuCancelText: 'Annulla',
        menuEditAriaLabel: 'Modifica',
        menuDeleteAriaLabel: 'Elimina',
        menuOkAriaLabel: 'Modifica',
        menuCancelAriaLabel: 'Annulla',
        formItemPlaceholder: 'Nome file'
    },
    coreWizard: {
        ariaLabel: 'Procedura guidata'
    },
    coreBreadcrumb: {
        overflowTitleMore: 'Altro'
    },
    platformActionBar: {
        backButtonLabel: 'Torna indietro'
    },
    platformApprovalFlow: {
        defaultWatchersLabel: 'Osservatori',
        defaultTitle: 'Processo di approvazione',
        nextButtonAriaLabel: 'Vai alla diapositiva successiva',
        prevButtonAriaLabel: 'Vai alla diapositiva precedente',
        editModeSaveButtonLabel: 'Salva',
        editModeExitButtonLabel: 'Uscita',
        emptyTitle: 'Inizia ad aggiungere approvatori e osservatori',
        emptyHint:
            'Per aggiungere approvatori, fai clic su "Aggiungi un passaggio". Per aggiungere osservatori, fai clic sul campo Osservatori.',
        addNodeDialogHeaderAddApprovers: 'Aggiungi approvatori',
        addNodeDialogHeaderEditApprover: 'Modifica approvatori',
        addNodeDialogHeaderAddApproverTeam: 'Utente/Squadra',
        addNodeDialogHeaderDetail: 'Dettaglio',
        addNodeDialogNodeType: 'Parallelo o seriale',
        addNodeDialogNodeTypeSerial: 'Seriale',
        addNodeDialogNodeTypeParallel: 'Parallelo',
        addNodeDialogApproverType: 'Tipo di approvatore',
        addNodeDialogApproverTypeUser: 'Un utente',
        addNodeDialogApproverTypeTeamAnyone: 'Chiunque nel team',
        addNodeDialogApproverTypeTeamEveryone: 'Tutti in squadra',
        addNodeDialogUserOrTeam: 'Utente/Squadra',
        addNodeDialogAddToNext: 'Aggiungi al nodo seriale successivo',
        addNodeDialogDueDate: 'Data di scadenza',
        addNodeSearchPlaceholder: 'Cerca',
        addNodeAddActionBtnLabel: 'Aggiungi',
        addNodeCancelActionBtnLabel: 'Annulla',
        addNodeSelectApproverActionBtnLabel: 'Seleziona',
        addNodeCancelApproverSelectionActionBtnLabel: 'Annulla',
        addNodeApproverOrTeamDetailsCloseActionBtnLabel: 'Chiudi',
        userDetailsHeader: 'Dettaglio',
        userDetailsSendReminderBtnLabel: 'Invia promemoria',
        userDetailsCancelBtnLabel: 'Annulla',
        messagesApproverAddedSuccess: '1 approvatore è stato aggiunto',
        messagesTeamAddedSuccess: '1 squadra è stata aggiunta',
        messagesNodeEdited: '1 approvatore è stato modificato',
        messagesNodeRemovedSingular: '1 approvatore è stato rimosso',
        messagesNodeRemovedPlural: 'Gli approvatori sono stati rimossi',
        messagesTeamRemoved: '1 squadra è stata rimossa',
        messagesErrorBuildGraph:
            'Si è verificato un errore durante il tentativo di creare un grafico. Controllare i dati iniziali.',
        messagesUndoAction: 'Anulla',
        nodeMembersCount: '{{ count }} membri',
        nodeVariousTeams: 'Varie squadre',
        nodeStatusDueToday: 'Scadenza oggi',
        nodeStatusDueInXDays: ' Scadenza tra {{ count }} giorni',
        nodeStatusXDaysOverdue: '{{ count }} giorni scaduti',
        nodeActionAddApproversBefore: 'Aggiungi prima gli approvatori',
        nodeActionAddApproversAfter: 'Aggiungi approvatori dopo',
        nodeActionAddApproversParallel: 'Aggiungi approvatori paralleli',
        nodeActionEditApprover: 'Modifica approvatore',
        nodeActionRemove: 'Rimuovi',
        selectTypeDialogMoveApproverAs: 'Sposta approvatore come',
        selectTypeDialogParallelOrSerial: 'Parallelo o seriale',
        selectTypeDialogNodeTypeParallel: 'Approvatore parallelo',
        selectTypeDialogNodeTypeSerial: 'Approvatore seriale',
        selectTypeDialogConfirmButton: 'Conferma',
        selectTypeDialogCancelButton: 'Annulla',
        toolbarAddStepButton: 'Aggiungi un passo',
        toolbarEditButton: 'Modifica',
        toolbarAddApproversBefore: 'Aggiungi prima gli approvatori',
        toolbarAddApproversAfter: 'Aggiungi approvatori dopo',
        toolbarAddApproversParallel: 'Aggiungi approvatori paralleli',
        toolbarRemove: 'Rimuovi',
        toolbarEditApprover: 'Modifica approvatore',
        watchersInputPlaceholder: 'Cerca qui..',
        userListSelectedItemsCountSingular: '1 elemento selezionato',
        userListSelectedItemsCountPlural: '{{ count }} elementi selezionati',
        statusApproved: 'approved',
        statusRejected: 'rejected',
        statusInProgress: 'in progress',
        statusNotStarted: 'not started'
    },
    platformFeedInput: {
        userTitle: 'Utente'
    },
    platformVHD: {
        selectionBarLabel: 'Articoli selezionati e condizionati',
        selectedAndConditionLabel: 'Articoli e condizioni selezionati',
        footerClearSelectedTitle: 'cancella gli elementi selezionati',
        footerClearSelectedAriaLabel: 'cancella gli elementi selezionati',
        searchButtonLabel: 'Vai',
        successButtonLabel: 'OK',
        cancelButtonLabel: 'Annulla',
        selectedEmptyLabel: 'Nessun articolo o condizione selezionato',
        searchPlaceholder: 'Cerca',
        searchAdvancedSearchLabel: 'Filtri',
        searchShowAdvancedSearchLabel: 'Mostra filtri',
        searchHideAdvancedSearchLabel: 'Nascondi filtri',
        searchShowAllAdvancedSearchLabel: 'Mostra tutti i filtri',
        searchHideAllAdvancedSearchLabel: 'Nascondi tutti i filtri',
        selectTabDisplayCountLabel: 'Articoli ({{ count }})',
        selectTabMoreBtnLabel: 'Altro',
        selectTabCountHiddenA11yLabel: 'contiene {{ rowCount }} righe e {{ colCount }} colonne',
        selectMobileTabBackBtnTitle: 'Indietro',
        selectMobileTabBtnOpenDialogLabel: 'Apri finestra di dialogo',
        selectMobileTabTitle: '{{ title }} scheda',
        selectMobileConditionEmpty: 'Vuoto',
        defineConditionTitle: 'Prodotto',
        defineConditionSelectedValueHiddenA11yLabel: 'valore selezionato {{ value }}',
        defineConditionConditionsGroupHeaderInclude: 'Includi',
        defineConditionConditionsGroupHeaderExclude: 'Escludi',
        defineConditionFromPlaceholder: 'da',
        defineConditionToPlaceholder: 'a',
        defineConditionValuePlaceholder: 'valore',
        defineConditionRemoveConditionButtonTitle: 'Rimuovi condizione',
        defineConditionAddConditionButtonLabel: 'Aggiungi',
        defineConditionAddConditionButtonTitle: 'Aggiungi condizione',
        defineConditionConditionStrategyLabelContains: 'contiene',
        defineConditionConditionStrategyLabelEqualTo: 'uguale a',
        defineConditionConditionStrategyLabelBetween: 'fra',
        defineConditionConditionStrategyLabelStartsWith: 'inizia con',
        defineConditionConditionStrategyLabelEndsWith: 'finisce con',
        defineConditionConditionStrategyLabelLessThan: 'meno di',
        defineConditionConditionStrategyLabelLessThanEqual: 'meno che uguale',
        defineConditionConditionStrategyLabelGreaterThan: 'più grande di',
        defineConditionConditionStrategyLabelGreaterThanEqual: 'maggiore di uguale',
        defineConditionConditionStrategyLabelEmpty: 'vuoto',
        defineConditionConditionStrategyLabelNotEqualTo: 'non uguale a',
        defineConditionConditionStrategyLabelNotEmpty: 'no vuoto',
        defineConditionMaxCountError: 'Immettere un valore con non più di {{ count }} caratteri',
        selectTabTitle: "Seleziona dall'elenco",
        searchTableEmptyMessage: 'Usa la ricerca per ottenere risultati',
        defineTabTitle: 'Definisci condizioni'
    },
    platformCombobox: {
        countListResultsSingular: '1 elemento della lista dei risultati',
        countListResultsPlural: "{{ count }} elementi dell'elenco dei risultati"
    },
    platformMultiCombobox: {
        inputGlyphAriaLabel: 'Seleziona Opzioni',
        inputIconTitle: 'Seleziona Opzioni',
        mobileShowAllItemsButton: 'Mostra tutti gli articoli',
        mobileShowSelectedItemsButton: 'Mostra gli articoli selezionati'
    },
    platformTextarea: {
        counterMessageCharactersOverTheLimitSingular: '1 carattere oltre il limite',
        counterMessageCharactersOverTheLimitPlural: '{{ count }} caratteri oltre il limite',
        counterMessageCharactersRemainingSingular: '1 carattere rimanente',
        counterMessageCharactersRemainingPlural: '{{ count }} caratteri rimanenti'
    },
    platformLink: {
        roleDescriptionWithMedia: 'Media: {{ media }}'
    },
    platformList: {
        loadingAriaLabel: 'caricamento in corso'
    },
    platformObjectListItem: {
        detailsActionAriaLabel: 'dettaglio',
        deleteActionAriaLabel: 'elimina'
    },
    platformStandardListItem: {
        detailsActionAriaLabel: 'dettaglio',
        deleteActionAriaLabel: 'elimina'
    },
    platformSearchField: {
        clearButtonTitle: 'Cancella',
        submitButtonTitle: 'Cerca',
        synchronizeButtonTitle: 'Sincronizza',
        searchSuggestionMessage: '{{ count }} suggerimenti trovati.',
        searchSuggestionNavigateMessage: 'usa le frecce su e giù per navigare'
    },
    platformSmartFilterBar: {
        searchPlaceholder: 'Cerca',
        submitButtonLabel: 'Vai',
        filtersButtonLabel: 'Filtri ({{ filtersCount }})',
        showFiltersButtonLabel: 'Mostra filtri',
        hideFiltersButtonLabel: 'Nascondi filtri',
        defineConditionsRemoveConditionButtonTitle: 'Rimuovi condizione',
        defineConditionsAddConditionButtonLabel: 'Aggiungi condizione',
        defineConditionsSubmitButtonLabel: 'Vai',
        defineConditionsCancelButton: 'Annulla',
        selectFiltersHeader: 'Filtri',
        selectFiltersAvailableFiltersText: 'Filtri disponibili',
        selectFiltersFilterColumnLabel: 'Filtro',
        selectFiltersActiveColumnLabel: 'Attivo',
        selectFiltersSubmitButtonLabel: 'Vai',
        selectFiltersCancelButton: 'Annulla',
        filterConditionContains: 'contiene',
        filterConditionEqualTo: 'uguale a',
        filterConditionBetween: 'tra',
        filterConditionBeginsWith: 'inizia con',
        filterConditionEndsWith: 'finisce con',
        filterConditionLessThan: 'minore di',
        filterConditionLessThanOrEqualTo: 'minore o uguale a',
        filterConditionGreaterThan: 'maggiore di',
        filterConditionGreaterThanOrEqualTo: 'maggiore o uguale a',
        filterConditionAfter: 'dopo',
        filterConditionOnOrAfter: 'su o dopo',
        filterConditionBefore: 'prima',
        filterConditionBeforeOrOn: 'prima o sopra',
        filterConditionValuePlaceholder: 'valore',
        filterConditionValueFromPlaceholder: 'da',
        filterConditionValueToPlaceholder: 'a',
        settingsCategoryAll: 'Tutto',
        settingsCategoryVisible: 'Visibile',
        settingsCategoryActive: 'Attivo',
        settingsCategoryVisibleAndActive: 'Visibile e attivo',
        settingsCategoryMandatory: 'Obbligatorio'
    },
    platformTable: {
        headerMenuSortAsc: 'Ordine crescente',
        headerMenuSortDesc: 'Ordine decrescente',
        headerMenuGroup: 'Gruppo',
        headerMenuFreeze: 'Congela',
        headerMenuEndFreeze: 'Freeze to End',
        headerMenuUnfreeze: 'Sblocca',
        headerMenuFilter: 'Filtro',
        defaultEmptyMessage: 'Nessun dato trovato',
        resetChangesButtonLabel: 'Reset',
        editableCellNumberPlaceholder: 'Inserisci valore',
        editableCellDatePlaceholder: 'Inserisci valore',
        editableCellStringPlaceholder: 'Inserisci valoree',
        P13ColumnsDialogHeader: 'Colonne',
        P13ColumnsDialogSearchPlaceholder: 'Cerca',
        P13ColumnsDialogsShowSelected: 'Mostra selezionato',
        P13ColumnsDialogShowAll: 'Mostra tutto',
        P13ColumnsDialogSelectAll: 'Seleziona tutto ({{ selectedColumnsCount }}/{{ selectableColumnsCount }})',
        P13ColumnsDialogConfirmationBtnLabel: 'OK',
        P13ColumnsDialogCancelBtnLabel: 'Annulla',
        P13ColumnsDialogMoveToTopBtn: 'Sposta in alto',
        P13ColumnsDialogMoveUpBtn: 'Sposta su',
        P13ColumnsDialogMoveDownBtn: 'Sposta su',
        P13ColumnsDialogMoveToBottomBtn: 'Sposta in basso',
        P13FilterStrategyLabelBetween: 'fra',
        P13FilterStrategyLabelContains: 'contiene',
        P13FilterStrategyLabelBeginsWith: 'inizia con',
        P13FilterStrategyLabelEndsWith: 'finisce con',
        P13FilterStrategyLabelEqualTo: 'uguale a',
        P13FilterStrategyLabelGreaterThan: 'più grande di',
        P13FilterStrategyLabelGreaterThanOrEqualTo: 'maggiore o uguale a',
        P13FilterStrategyLabelLessThan: 'meno di',
        P13FilterStrategyLabelLessThanOrEqualTo: 'minore o uguale a',
        P13FilterStrategyLabelAfter: 'dopo',
        P13FilterStrategyLabelOnOrAfter: 'sopra o dopo',
        P13FilterStrategyLabelBefore: 'prima',
        P13FilterStrategyLabelBeforeOrOn: 'prima o dopo',
        P13FilterStrategyLabelNotDefined: 'Non definito',
        P13FilterBooleanOptionNotDefined: ' ',
        P13FilterBooleanOptionTrue: 'Si',
        P13FilterBooleanOptionFalse: 'No',
        P13FilterDialogHeader: 'Filtra per',
        P13FilterDialogIncludePanelTitleWithCount: 'Includi ({{ count }})',
        P13FilterDialogIncludePanelTitleWithoutCount: 'Includi',
        P13FilterDialogExcludePanelTitleWithCount: 'Escludi ({{ count }})',
        P13FilterDialogExcludePanelTitleWithoutCount: 'Escludi',
        P13FilterDialogRemoveFilterBtnTitle: 'Rimuovi filtro',
        P13FilterDialoAddFilterBtnTitle: 'Aggiungi filtro',
        P13FilterDialogConfirmationBtnLabel: 'OK',
        P13FilterDialogCancelBtnLabel: 'Annulla',
        P13GroupDialogHeader: 'Gruppo',
        P13GroupDialogNoneSelectedColumnSelectPlaceholder: '(nessuno)',
        P13GroupDialogShowFieldAsColumnCheckboxLabel: 'Mostra campo come colonna',
        P13GroupDialogRemoveGroupBtnTitle: 'Rimuovi',
        P13GroupDialogAddNewGroupBtnTitle: 'Aggiungi nuovo',
        P13GroupDialogConfirmationBtnLabel: 'OK',
        P13GroupDialogCancelBtnLabel: 'Annulla',
        P13SortDialogHeader: 'Ordina',
        P13SortDialogNoneSelectedColumn: '(nessuno)',
        P13SortDialogNoneSelectedSorting: '(nessuno)',
        P13SortDialogSortOrderSelectOptionAsc: 'Crescente',
        P13SortDialogSortOrderSelectOptionDesc: 'Decrescente',
        P13SortDialogRemoveSortBtnTitle: 'Rimuovi',
        P13SortDialogAddNewSortBtnTitle: 'Aggiungi nuovo',
        P13SortDialogConfirmationBtnLabel: 'OK',
        P13SortDialogCancelBtnLabel: 'Annulla',
        toolbarSearchPlaceholder: 'Cerca',
        toolbarActionCreateButtonLabel: 'Create',
        toolbarActionSaveButtonLabel: 'Salva',
        toolbarActionCancelButtonLabel: 'Annulla',
        toolbarActionSortButtonTitle: 'Ordina',
        toolbarActionFilterButtonTitle: 'Filtro',
        toolbarActionGroupButtonTitle: 'Gruppo',
        toolbarActionColumnsButtonTitle: 'Colonne',
        toolbarActionExpandAllButtonTitle: 'Expand all',
        toolbarActionCollapseAllButtonTitle: 'Collapse all',
        filterDialogNotFilteredLabel: '(Non filtrato)',
        filterDialogFilterByLabel: 'Filtra per: {{ filterLabel }}',
        filterDialogFilterTitle: 'Filtro',
        filterDialogFilterBy: 'Filtra per',
        filterDialogConfirmBtnLabel: 'OK',
        filterDialogCancelBtnLabel: 'Annulla',
        groupDialogHeader: 'Gruppo',
        groupDialogGroupOrderHeader: 'Ordine di gruppo',
        groupDialogGroupOrderAsc: 'Crescente',
        groupDialogGroupOrderDesc: 'Decrescente',
        groupDialogGroupByHeader: 'Gruppo per',
        groupDialogNotGroupedLabel: '(Non raggruppato)',
        groupDialogConfirmBtnLabel: 'OK',
        groupDialogCancelBtnLabel: 'Annulla',
        sortDialogHeader: 'Ordina',
        sortDialogSortOrderHeader: 'Ordinamento',
        sortDialogSortOrderAsc: 'Crescente',
        sortDialogSortOrderDesc: 'Decrescente',
        sortDialogSortByHeader: 'Ordinato per',
        sortDialogNotSortedLabel: '(Non ordinato)',
        sortDialogConfirmBtnLabel: 'OK',
        sortDialogCancelBtnLabel: 'Annulla'
    },
    platformThumbnail: {
        detailsGotoPreviousButtonTitle: 'Vai a Precedente',
        detailsGotoNextButtonTitle: 'Vai a Avanti',
        detailsDialogCloseBtnLabel: 'Chiudi',
        roleDescription: 'Immagine'
    },
    platformUploadCollection: {
        moveToTitle: 'Sposta a',
        moveToTitleFolder: 'Cartella',
        moveToNewFolderBtnLabel: 'Nuova cartella',
        moveToAllFilesSubHeaderLabel: 'Tutti i files',
        moveToConfirmBtn: 'Sposta',
        moveToCloseBtn: 'Annulla',
        newFolderTitle: 'Nuova cartella',
        newFolderAtRootInputLabel: 'Nome della nuova cartella',
        newFolderAtFolderInputLabel: "Nome della nuova cartella all'interno di {{ folderName }}",
        newFolderInputPlaceholder: 'Scrivi qui..',
        newFolderInputErrorLabel: 'Massimo {{ count }} caratteri consentiti',
        newFolderDialogCreateBtnLabel: 'Crea',
        newFolderDialogCancelBtnLabel: 'Annulla',
        breadcrumbLabelAllFiles: 'Tutti i files',
        breadcrumbLabelAllFilesWithTotal: 'Tutti i files ({{ total }})',
        searchPlaceholder: 'Cerca',
        addBtnLabel: 'Aggiungi',
        newFolderBtnLabel: 'Nuova cartella',
        moveToBtnLabel: 'Sposta a',
        downloadBtnLabel: 'Scarica',
        updateVersionBtnLabel: 'Aggiorna versione',
        removeBtnLabel: 'Rimuovi',
        folderIconTitle: 'Icona cartella',
        fileIconTitle: 'Icona file',
        editFileNameInputPlaceholder: 'Inserisci un nome',
        editFileNameFileAlreadyExistsError: 'Il file con questo nome esiste già',
        editFileNameFolderAlreadyExistsError: 'La cartella con questo nome esiste già',
        itemStatusSuccessful: 'Successo',
        itemStatusUnsuccessful: 'Non successo',
        uploadNewFileAfterFailAction: 'Esegui',
        cancelUploadNewFileAction: 'Annulla',
        itemMenuBtnTitle: 'Altro',
        dragDropAreaText: 'Trascina i file per caricarli',
        noDataText: 'Nessun file trovato',
        noDataDescription: 'Trascina i file da caricare o usa il pulsante "Aggiungi".',
        paginationTotal: 'Visualizzazione di {{ from }}-{{ to }} di {{ total }}',
        resultsPerPage: 'Risultati per pagina',
        messageCreateFailed: 'Impossibile creare {{ folderName }}.',
        messageCreateSuccess: '{{ folderName }} è stato creato.',
        messageUpdateVersionFailed: 'Impossibile aggiornare la versione di {{ folderName }}.',
        messageUpdateVersionSuccess: 'La versione di {{ folderName }} è stata aggiornata.',
        messageFileRenameFailed: 'Impossibile rinominare"{{ from }}" in "{{ to }}."',
        messageFileRenameSuccess: '"{{ from }}" è stato rinominato in "{{ to }}".',
        messageRemoveFoldersAndFilesFailed:
            'Impossibile rimuovere le cartelle {{ foldersCount }} e i file {{ filesCount }}.',
        messageRemoveFoldersAndFilesSuccess:
            'Le cartelle {{ foldersCount }} e i file {{ filesCount }} sono state rimosse.',
        messageRemoveFoldersFailed: 'Impossibile rimuovere le cartelle {{ foldersount }}.',
        messageRemoveFoldersSuccess: 'Le cartelle {{ foldersCount }} sono state rimosse.',
        messageRemoveFilesFailed: 'Impossibile rimuovere {{ filesCount }} file.',
        messageRemoveFilesSuccess: 'I file {{ filesCount }} sono stati rimossi.',
        messageRemoveFileOrFolderFailed: 'Impossibile rimuovere {{ name }}.',
        messageRemoveFileOrFolderSuccess: '{{ nome }} è stato rimosso.',
        messageMoveFoldersAndFilesFailed:
            'Impossibile spostare le cartelle {{ foldersCount }} e i file {{ filesCount }} in {{ to }}.',
        messageMoveFoldersAndFilesSuccess:
            '{{ foldersCount }} cartelle e {{ filesCount }} file sono stati sposati in {{ to }}.',
        messageMoveFoldersFailed: 'Impossibile spostare le cartelle {{ foldersCount }} in {{ to }}.',
        messageMoveFoldersSuccess: 'Le cartelle {{ foldersCount }} sono state spostate in {{ to }}.',
        messageMoveFilesFailed: 'Impossibile spostare i file {{ filesCount }} in {{ to }}.',
        messageMoveFilesSuccess: 'I file {{ filesCount }} sono stati spostati in {{ to }}.',
        messageMoveFileOrFolderFailed: 'Impossibile spostare {{ name }} in {{ to }}.',
        messageMoveFileOrFolderSuccess: '{{ name }} è stato spostato in {{ to }}.',
        messageMoveRootFoldersAndFilesFailed:
            'Impossibile spostare le cartelle {{ foldersCount }} e i file {{ filesCount }} in tutti i file.',
        messageMoveRootFoldersAndFilesSuccess:
            'Le cartelle {{ foldersCount }} e i file {{ filesCount }}  sono state spostate in tutti i file.',
        messageMoveRootFoldersFailed: 'Impossibile spostare le cartelle {{ foldersCount }} in tutti i file.',
        messageMoveRootFoldersSuccess: '{{ foldersCount }} le cartelle sono state spostate in tutti i file.',
        messageMoveRootFilesFailed: 'Impossibile spostare i file {{ filesCount }} in tutti i file.',
        messageMoveRootFilesSuccess: '{{ filesCount }} file sono stati spostati in tutti i file.',
        messageMoveRootFileOrFolderFailed: 'Impossibile spostare {{ name }} in tutti i file.',
        messageMoveRootFileOrFolderSuccess: '{{ name }} è stato spostato in tutti i file.',
        messageFileTypeMismatchPlural:
            '{{ filesCount }} file hanno il tipo sbagliato. Tipi consentiti: {{ allowedTypes }}',
        messageFileTypeMismatchSingular:
            'Il file "{{ fileName }}" ha il tipo errato. Tipi consentiti: {{ allowedTypes }}.',
        messageFileSizeExceededPlural:
            '{{ filesCount }} file hanno superato la dimensione massima del file. Dimensione file massima consentita: {{ maxFileSize }}.',
        messageFileSizeExceededSingular:
            'Il file "{{ fileName }}" ha superato le dimensioni massime del file. Dimensione file massima consentita: {{ maxFileSize }}.',
        messageFileNameLengthExceededPlural:
            '{{ filesCount }} file hanno superato la lunghezza massima del nome file. Lunghezza del nome file consentita: {{ maxFilenameLength }} caratteri.',
        messageFileNameLengthExceededSingular:
            'Il nome "{{ fileName }}" ha superato la lunghezza massima del nome del file. Lunghezza del nome consentita: {{ maxFilenameLength }} caratteri.'
    },
    platformWizardGenerator: {
        summarySectionEditStep: 'Edit'
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
    platformSelect: {
        selectOptionLabel: 'Seleziona un opzione'
    },
    fnSlider: {
        minMaxDetails: 'Il valore minimo dello slider è {{ min }}, il valore massimo è {{ max }}',
        valueminDetails: 'Il valore è  {{ value }}',
        valuemaxDetails: 'Il valore è {{ value }}',
        valueNowDetails: 'Il valore attuale è{{ value }}'
    },
    fnSwitch: {
        semanticAcceptLabel: 'Accettare',
        semanticDeclineLabel: 'Declino'
    },
    coreTree: {
        expand: 'Expand node',
        collapse: 'Collapse node',
        noData: 'No data'
    }
};
