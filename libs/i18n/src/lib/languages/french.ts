import { FdLanguage } from '../models/lang';

/**
 * Default set of translations of Fundamental UI library for French language
 */
export const FD_LANGUAGE_FRENCH: FdLanguage = {
    coreCarousel: {
        leftNavigationBtnLabel: "Aller à l'élément précédent",
        rightNavigationBtnLabel: "Aller à l'élément suivant"
    },
    coreDatePicker: {
        dateInputLabel: 'Sélecteur de date',
        dateRangeInputLabel: 'Sélecteur de la plage de date',
        displayCalendarToggleLabel: 'Ouvrir la sélection',
        valueStateSuccessMessage: 'État de la valeur de Succès',
        valueStateInformationMessage: "État de la valeur d'Information",
        valueStateWarningMessage: "État de la valeur d'Avertissement",
        valueStateErrorMessage: "État de la valeur d'Erreur"
    },
    coreDatetimePicker: {
        datetimeInputLabel: 'Entrée de la date',
        displayDatetimeToggleLabel: 'Affichage du Calendrier',
        displayTypeDateLabel: 'Date',
        displayTypeTimeLabel: 'Heure',
        datetimeOkLabel: 'Ok',
        datetimeCancelLabel: 'Annuler'
    },
    coreFeedListItem: {
        moreLabel: 'Plus',
        lessLabel: 'Moins'
    },
    coreGridList: {
        filterBarCancelButtonTitle: 'Annuler',
        listItemStatusAriaLabel: "L'élément a un statut. Statut: {{ status }}.",
        listItemCounterAriaLabel: "L'élément a {{ count }} d'enfants.",
        listItemButtonDetailsTitle: 'Détails',
        listItemButtonDeleteTitle: 'Supprimer',
        listItemStatusContainsErrors: 'Comporte des erreurs',
        listItemStatusLocked: 'Bloqué',
        listItemStatusDraft: 'Brouillon'
    },
    coreList: {
        listItem: 'List Item',
        selected: 'Selected',
        notSelected: 'Not Selected',
        navigated: 'Navigated',
        navigable: 'Navigable'
    },
    coreMessageStrip: {
        dismissLabel: 'Rejeter'
    },
    coreNestedList: {
        linkItemAriaLabel:
            "Élément de l'arborescence {{ itemDetails }}, {{ index }} of {{ total }}{{ selectedDescription }}"
    },
    coreOverflowLayout: {
        moreItemsButton: '{{ count }} plus'
    },
    corePagination: {
        pageLabel: 'Page {{ pageNumber }}',
        currentPageAriaLabel: 'Page {{ pageNumber }} est la page en cours',
        labelBeforeInputMobile: 'Page:',
        labelAfterInputMobile: 'de {{ totalCount }}',
        inputAriaLabel: 'Entrée de page, Page actuelle, Page {{ pageNumber }} of {{ totalCount }}',
        itemsPerPageLabel: 'Résultats par pages:',
        firstLabel: 'Premier',
        previousLabel: 'Précédent',
        nextLabel: 'Prochain',
        lastLabel: 'Dernier',
        ariaLabel: 'Pagination',
        totalResultsLabel: '{{ totalCount }} Résultats'
    },
    coreProductSwitch: {
        ariaLabel: 'Échange de produit'
    },
    coreShellbar: {
        collapsedItemMenuLabel: "Menu d'éléments réduit",
        cancel: 'Cancel',
        search: 'Search'
    },
    coreSlider: {
        singleMinMaxDetails: 'La valeur minimale du curseur est {{ min }}, la valeur maximale est {{ max }}',
        singleValueminDetails: 'La valeur est {{ value }}',
        singleValuemaxDetails: 'La valeur est {{ value }}',
        singleValueNowDetails: 'La valeur actuelle est {{ value }}',
        multipleHandle1MinMaxDetails: 'La valeur minimale du curseur est {{ min }}, la valeur maximale est {{ max }}',
        multipleHandle1ValueminDetails: 'La valeur est {{ value }}',
        multipleHandle1ValuemaxDetails: 'La valeur est {{ value }}',
        multipleHandle1ValueNowDetails: 'La valeur actuelle est {{ value }}',
        multipleHandle2MinMaxDetails: 'La valeur minimale du curseur est {{ min }}, la valeur maximale est {{ max }}',
        multipleHandle2ValueminDetails: 'La valeur est {{ value }}',
        multipleHandle2ValuemaxDetails: 'La valeur est {{ value }}',
        multipleHandle2ValueNowDetails: 'La valeur actuelle est {{ value }}'
    },
    coreSplitButton: {
        expandButtonAriaLabel: "Plus d'actions",
        arialLabel: 'Bouton Fractionner'
    },
    coreSplitter: {
        paginationItemAriaLabel: 'Section'
    },
    coreStepInput: {
        incrementButtonTitle: 'Incrément',
        decrementButtonTitle: 'Décrément',
        ariaRoleDescription: "Entrée de l'étape"
    },
    coreSwitch: {
        semanticAcceptLabel: 'Accepter',
        semanticDeclineLabel: 'Décliner'
    },
    coreTabs: {
        tabListExpandButtonText: "Plus d'infos"
    },
    coreText: {
        moreLabel: "Plus d'infos",
        lessLabel: 'Moins'
    },
    coreTime: {
        componentAriaName: 'Sélecteur de temps',
        increaseHoursLabel: 'Augmenter les heures',
        hoursLabel: 'Hrs',
        decreaseHoursLabel: 'Diminuer les heures',
        increaseMinutesLabel: 'Augmenter les minutes',
        minutesLabel: 'Min',
        decreaseMinutesLabel: 'Diminuer les minutes',
        increaseSecondsLabel: 'Augmenter les secondes',
        secondsLabel: 'Sec',
        decreaseSecondsLabel: 'Diminuer les secondes',
        increasePeriodLabel: 'Augmenter la durée',
        periodLabel: 'Period',
        decreasePeriodLabel: 'Diminuer la durée',
        navigationInstruction:
            'Pour vous déplacer entre les éléments de cette liste, appuyez sur la flèche du haut ou la flèche du bas. ' +
            "Pour passer d'une liste à l'autre, appuyez sur la flèche gauche ou la flèche droite."
    },
    coreTimePicker: {
        timePickerInputLabel: 'Saisie du sélecteur de temps',
        timePickerButtonLabel: 'Ouvrir le sélecteur'
    },
    coreToken: {
        deleteButtonLabel: 'Supprimable',
        ariaRoleDescription: 'jeton'
    },
    coreTokenizer: {
        moreLabel: '{{count}} more'
    },
    coreUploadCollection: {
        menuOkText: 'Ok',
        menuCancelText: 'Annuler',
        menuEditAriaLabel: 'Éditer',
        menuDeleteAriaLabel: 'Effacer',
        menuOkAriaLabel: 'Éditer',
        menuCancelAriaLabel: 'Annuler',
        formItemPlaceholder: 'Nom de fichier'
    },
    coreWizard: {
        ariaLabel: 'Assistant'
    },
    coreBreadcrumb: {
        overflowTitleMore: "Plus d'infos"
    },
    platformActionBar: {
        backButtonLabel: 'Revenir en arrière'
    },
    platformApprovalFlow: {
        defaultWatchersLabel: 'Observateurs',
        defaultTitle: "Procédure d'approbation",
        nextButtonAriaLabel: 'Aller à la diapo suivante',
        prevButtonAriaLabel: 'Aller à la diapo précédente',
        editModeSaveButtonLabel: 'Sauvegarder',
        editModeExitButtonLabel: 'Sortir',
        emptyTitle: 'Commencez à ajouter des approbateurs et des observateurs',
        emptyHint:
            'Pour ajouter des approbateurs, cliquez sur "Ajouter une étape". Pour ajouter des observateurs, cliquez sur le champ Observateurs',
        addNodeDialogHeaderAddApprovers: "Ajout d'approbateurs",
        addNodeDialogHeaderEditApprover: "Editer l'approbateur",
        addNodeDialogHeaderAddApproverTeam: 'Utilisateur/Équipe',
        addNodeDialogHeaderDetail: 'Détail',
        addNodeDialogNodeType: 'Parallèle ou en série',
        addNodeDialogNodeTypeSerial: 'En Série',
        addNodeDialogNodeTypeParallel: 'En Parallèle',
        addNodeDialogApproverType: "Type d'approuveur",
        addNodeDialogApproverTypeUser: 'Un usager',
        addNodeDialogApproverTypeTeamAnyone: "Toute personne de l'équipe",
        addNodeDialogApproverTypeTeamEveryone: "Tout le monde dans l'équipe",
        addNodeDialogUserOrTeam: 'Utilisateur/Équipe',
        addNodeDialogAddToNext: 'Ajouter au nœud de série suivant',
        addNodeDialogDueDate: 'Date limite',
        addNodeSearchPlaceholder: 'Recherchez',
        addNodeAddActionBtnLabel: 'Ajoutez',
        addNodeCancelActionBtnLabel: 'Annuler',
        addNodeSelectApproverActionBtnLabel: 'Sélectionner',
        addNodeCancelApproverSelectionActionBtnLabel: 'Annuler',
        addNodeApproverOrTeamDetailsCloseActionBtnLabel: 'Fermer',
        userDetailsHeader: 'Détail',
        userDetailsSendReminderBtnLabel: 'Envoyer un rappel',
        userDetailsCancelBtnLabel: 'Annuler',
        messagesApproverAddedSuccess: '1 approbateur a été ajouté',
        messagesTeamAddedSuccess: '1 équipe a été ajoutée',
        messagesNodeEdited: '1 approbateur a été modifié',
        messagesNodeRemovedSingular: '1 approbateur a été supprimé',
        messagesNodeRemovedPlural: 'Les approbateurs ont été supprimés',
        messagesTeamRemoved: '1 équipe a été retirée',
        messagesErrorBuildGraph:
            'Il y a eu une erreur en essayant de construire le graphique. Vérifiez les données initiales',
        messagesUndoAction: 'Annuler',
        nodeMembersCount: '{{nombre }} membres',
        nodeVariousTeams: 'Plusieurs équipes',
        nodeStatusDueToday: "À rendre aujourd'hui",
        nodeStatusDueInXDays: ' Échéance dans {{nombre }} jours',
        nodeStatusXDaysOverdue: '{{nombre}} jours de retard',
        nodeActionAddApproversBefore: 'Ajoutez des approbateurs avant',
        nodeActionAddApproversAfter: 'Ajoutez des approbateurs après',
        nodeActionAddApproversParallel: 'Ajouter des approbateurs en parallèle',
        nodeActionEditApprover: "Editer l'approbateur",
        nodeActionRemove: 'Supprimer',
        selectTypeDialogMoveApproverAs: "Déplacer l'approbateur en tant que",
        selectTypeDialogParallelOrSerial: 'Parallèle ou en série',
        selectTypeDialogNodeTypeParallel: 'Approbateur en parallèle',
        selectTypeDialogNodeTypeSerial: 'Approbateur en série',
        selectTypeDialogConfirmButton: 'Confirmer',
        selectTypeDialogCancelButton: 'Annuler',
        toolbarAddStepButton: 'Ajouter une étape',
        toolbarEditButton: 'Modifier',
        toolbarAddApproversBefore: 'Ajoutez des approbateurs avant',
        toolbarAddApproversAfter: 'Ajoutez des approbateurs après',
        toolbarAddApproversParallel: 'Ajouter des approbateurs en parallèle',
        toolbarRemove: 'Supprimer',
        toolbarEditApprover: "Editer l'approbateur",
        watchersInputPlaceholder: 'Rechercher ici..',
        userListSelectedItemsCountSingular: '1 élément sélectionné',
        userListSelectedItemsCountPlural: '{{ count }} éléments sélectionnés',
        statusApproved: 'approved',
        statusRejected: 'rejected',
        statusInProgress: 'in progress',
        statusNotStarted: 'not started'
    },
    platformFeedInput: {
        userTitle: 'Utilisateur'
    },
    platformVHD: {
        selectionBarLabel: 'Éléments sélectionnés et conditionnés',
        selectedAndConditionLabel: 'Éléments et conditions sélectionnés',
        footerClearSelectedTitle: 'supprimer les éléments sélectionnés',
        footerClearSelectedAriaLabel: 'supprimer les éléments sélectionnés',
        searchButtonLabel: 'Aller',
        successButtonLabel: 'OK',
        cancelButtonLabel: 'Annuler',
        selectedEmptyLabel: 'Aucun élément ou condition sélectionné',
        searchPlaceholder: 'Recherchez',
        searchAdvancedSearchLabel: 'Filtres',
        searchShowAdvancedSearchLabel: 'Afficher les filtres',
        searchHideAdvancedSearchLabel: 'Masquer les filtres',
        searchShowAllAdvancedSearchLabel: 'Afficher tous les filtres',
        searchHideAllAdvancedSearchLabel: 'Masquer tous les filtres',
        selectTabDisplayCountLabel: 'Articles ({{ count }})',
        selectTabMoreBtnLabel: "Plus d'infos",
        selectTabCountHiddenA11yLabel: 'contient {{ rowCount }} lignes et {{ colCount }} colonnes',
        selectMobileTabBackBtnTitle: 'Retour',
        selectMobileTabBtnOpenDialogLabel: 'Ouvrir la boîte de dialogue',
        selectMobileTabTitle: '{{ title }} onglet',
        selectMobileConditionEmpty: 'Vide',
        defineConditionTitle: 'Produit',
        defineConditionSelectedValueHiddenA11yLabel: 'valeur sélectionnée {{ value }}',
        defineConditionConditionsGroupHeaderInclude: 'Inclure',
        defineConditionConditionsGroupHeaderExclude: 'Exclure',
        defineConditionFromPlaceholder: 'de',
        defineConditionToPlaceholder: 'à',
        defineConditionValuePlaceholder: 'valeur',
        defineConditionRemoveConditionButtonTitle: 'Supprimer la condition',
        defineConditionAddConditionButtonLabel: 'Ajouter',
        defineConditionAddConditionButtonTitle: 'Ajouter une condition',
        defineConditionConditionStrategyLabelContains: 'contient',
        defineConditionConditionStrategyLabelEqualTo: 'égal à',
        defineConditionConditionStrategyLabelBetween: 'entre',
        defineConditionConditionStrategyLabelStartsWith: 'commence par',
        defineConditionConditionStrategyLabelEndsWith: 'se termine par',
        defineConditionConditionStrategyLabelLessThan: 'moins que',
        defineConditionConditionStrategyLabelLessThanEqual: 'inférieur à égal',
        defineConditionConditionStrategyLabelGreaterThan: 'supérieur à',
        defineConditionConditionStrategyLabelGreaterThanEqual: 'plus grand que égal',
        defineConditionConditionStrategyLabelEmpty: 'vide',
        defineConditionConditionStrategyLabelNotEqualTo: 'pas égal à',
        defineConditionConditionStrategyLabelNotEmpty: 'non vide',
        defineConditionMaxCountError: 'Entrez une valeur ne contenant pas plus de {{ count }} caractères',
        selectTabTitle: 'Sélectionnez dans la liste',
        searchTableEmptyMessage: 'Utilisez la recherche pour obtenir des résultats',
        defineTabTitle: 'Définir les conditions'
    },
    platformCombobox: {
        countListResultsSingular: "1 resultat sur la liste d'éléments",
        countListResultsPlural: '{{ count }} éléments de la liste de résultats'
    },
    platformMultiCombobox: {
        inputGlyphAriaLabel: 'Sélectionnez les options',
        inputIconTitle: 'Sélectionnez les options',
        mobileShowAllItemsButton: 'Afficher tous les éléments',
        mobileShowSelectedItemsButton: 'Afficher les éléments sélectionnés'
    },
    platformTextarea: {
        counterMessageCharactersOverTheLimitSingular: '1 caractère au-dessus de la limite',
        counterMessageCharactersOverTheLimitPlural: '{{ count }} de caractères au-delà de la limite',
        counterMessageCharactersRemainingSingular: '1 seul caractère restant',
        counterMessageCharactersRemainingPlural: '{{ count }} de caractères restants'
    },
    platformLink: {
        roleDescriptionWithMedia: 'Média: {{ media }}'
    },
    platformList: {
        loadingAriaLabel: 'chargement'
    },
    platformObjectListItem: {
        detailsActionAriaLabel: 'détail',
        deleteActionAriaLabel: 'supprimer'
    },
    platformStandardListItem: {
        detailsActionAriaLabel: 'détail',
        deleteActionAriaLabel: 'supprimer'
    },
    platformSearchField: {
        clearButtonTitle: 'Effacer',
        submitButtonTitle: 'Rechercher',
        synchronizeButtonTitle: 'Synchroniser',
        searchSuggestionMessage: '{{ count }} de suggestions trouvées',
        searchSuggestionNavigateMessage: 'utiliser les flèches haut et bas pour naviguer'
    },
    platformSmartFilterBar: {
        searchPlaceholder: 'Rechercher',
        submitButtonLabel: 'Aller',
        filtersButtonLabel: 'Filtres ({{ filtersCount }})',
        showFiltersButtonLabel: 'Affichez les filtres',
        hideFiltersButtonLabel: 'Masquer les filtres',
        defineConditionsRemoveConditionButtonTitle: 'Supprimer la condition',
        defineConditionsAddConditionButtonLabel: 'Ajouter une condition',
        defineConditionsSubmitButtonLabel: 'Aller',
        defineConditionsCancelButton: 'Annuler',
        selectFiltersHeader: 'Filtres',
        selectFiltersAvailableFiltersText: 'Filtres disponibles',
        selectFiltersFilterColumnLabel: 'Filtre',
        selectFiltersActiveColumnLabel: 'Actif',
        selectFiltersSubmitButtonLabel: 'Aller',
        selectFiltersCancelButton: 'Annuler',
        filterConditionContains: 'contient',
        filterConditionEqualTo: 'égal à',
        filterConditionBetween: 'entre',
        filterConditionBeginsWith: 'commence par',
        filterConditionEndsWith: 'se termine par',
        filterConditionLessThan: 'moins de',
        filterConditionLessThanOrEqualTo: 'inférieur ou égal à',
        filterConditionGreaterThan: 'plus que',
        filterConditionGreaterThanOrEqualTo: 'supérieur ou égal à',
        filterConditionAfter: 'après',
        filterConditionOnOrAfter: 'à partir de',
        filterConditionBefore: 'avant',
        filterConditionBeforeOrOn: 'avant ou à partir de',
        filterConditionValuePlaceholder: 'valeur',
        filterConditionValueFromPlaceholder: 'de',
        filterConditionValueToPlaceholder: 'à',
        settingsCategoryAll: 'Tous',
        settingsCategoryVisible: 'Visible',
        settingsCategoryActive: 'Actif',
        settingsCategoryVisibleAndActive: 'Visible et actif',
        settingsCategoryMandatory: 'Obligatoire'
    },
    platformTable: {
        headerMenuSortAsc: 'Tri ascendant',
        headerMenuSortDesc: 'Tri décroissant',
        headerMenuGroup: 'Grouper',
        headerMenuFreeze: 'Geler',
        headerMenuEndFreeze: 'Freeze to End',
        headerMenuUnfreeze: "Déverrouillage du menu d'en-tête",
        headerMenuFilter: 'Filtrer',
        defaultEmptyMessage: 'Aucune donnée trouvée',
        resetChangesButtonLabel: 'Réinitialiser',
        editableCellNumberPlaceholder: 'Entrez une valeur',
        editableCellDatePlaceholder: 'Entrez une valeur',
        editableCellStringPlaceholder: 'Entrez une valeur',
        P13ColumnsDialogHeader: 'Colonnes',
        P13ColumnsDialogSearchPlaceholder: 'Recherchez',
        P13ColumnsDialogsShowSelected: 'Afficher la sélection',
        P13ColumnsDialogShowAll: 'Afficher tout',
        P13ColumnsDialogSelectAll: 'Sélectionner tout ({{ selectedColumnsCount }}/{{ selectableColumnsCount }})',
        P13ColumnsDialogConfirmationBtnLabel: 'OK',
        P13ColumnsDialogCancelBtnLabel: 'Annuler',
        P13ColumnsDialogMoveToTopBtn: 'Haut de page',
        P13ColumnsDialogMoveUpBtn: 'Monter',
        P13ColumnsDialogMoveDownBtn: 'Descendre',
        P13ColumnsDialogMoveToBottomBtn: 'Déplacer vers le bas',
        P13FilterStrategyLabelBetween: 'entre',
        P13FilterStrategyLabelContains: 'contient',
        P13FilterStrategyLabelBeginsWith: 'commence par',
        P13FilterStrategyLabelEndsWith: 'se termine par',
        P13FilterStrategyLabelEqualTo: 'égal à',
        P13FilterStrategyLabelGreaterThan: 'supérieur à',
        P13FilterStrategyLabelGreaterThanOrEqualTo: 'supérieur ou égal à',
        P13FilterStrategyLabelLessThan: 'inférieur à',
        P13FilterStrategyLabelLessThanOrEqualTo: 'inférieur ou égal à',
        P13FilterStrategyLabelAfter: 'après',
        P13FilterStrategyLabelOnOrAfter: 'à partir de',
        P13FilterStrategyLabelBefore: 'avant',
        P13FilterStrategyLabelBeforeOrOn: 'avant ou à partir de',
        P13FilterStrategyLabelNotDefined: 'Non défini',
        P13FilterBooleanOptionNotDefined: ' ',
        P13FilterBooleanOptionTrue: 'Oui',
        P13FilterBooleanOptionFalse: 'Non',
        P13FilterDialogHeader: 'Filtrer par',
        P13FilterDialogIncludePanelTitleWithCount: 'Inclure ({{ count }})',
        P13FilterDialogIncludePanelTitleWithoutCount: 'Inclure',
        P13FilterDialogExcludePanelTitleWithCount: 'Exclure ({{ count }})',
        P13FilterDialogExcludePanelTitleWithoutCount: 'Exclure',
        P13FilterDialogRemoveFilterBtnTitle: 'Supprimer le filtre',
        P13FilterDialoAddFilterBtnTitle: 'Ajouter un filtre',
        P13FilterDialogConfirmationBtnLabel: 'OK',
        P13FilterDialogCancelBtnLabel: 'Annuler',
        P13GroupDialogHeader: 'Grouper',
        P13GroupDialogNoneSelectedColumnSelectPlaceholder: '(aucun)',
        P13GroupDialogShowFieldAsColumnCheckboxLabel: 'Afficher le champ sous forme de colonne',
        P13GroupDialogRemoveGroupBtnTitle: 'Supprimer',
        P13GroupDialogAddNewGroupBtnTitle: 'Ajouter nouveau',
        P13GroupDialogConfirmationBtnLabel: 'OK',
        P13GroupDialogCancelBtnLabel: 'Annuler',
        P13SortDialogHeader: 'Trier',
        P13SortDialogNoneSelectedColumn: '(aucun)',
        P13SortDialogNoneSelectedSorting: '(aucun)',
        P13SortDialogSortOrderSelectOptionAsc: 'Ascendant',
        P13SortDialogSortOrderSelectOptionDesc: 'Descendant',
        P13SortDialogRemoveSortBtnTitle: 'Supprimer',
        P13SortDialogAddNewSortBtnTitle: 'Ajouter nouveau',
        P13SortDialogConfirmationBtnLabel: 'OK',
        P13SortDialogCancelBtnLabel: 'Annuler',
        toolbarSearchPlaceholder: 'Recherchez',
        toolbarActionCreateButtonLabel: 'Créer',
        toolbarActionSaveButtonLabel: 'Sauvegarder',
        toolbarActionCancelButtonLabel: 'Annuler',
        toolbarActionSortButtonTitle: 'Trier',
        toolbarActionFilterButtonTitle: 'Filtre',
        toolbarActionGroupButtonTitle: 'Grouper',
        toolbarActionColumnsButtonTitle: 'Colonnes',
        toolbarActionExpandAllButtonTitle: 'Expand all',
        toolbarActionCollapseAllButtonTitle: 'Collapse all',
        filterDialogNotFilteredLabel: '(Non filtré)',
        filterDialogFilterByLabel: 'Filtrer par: {{ filterLabel }}',
        filterDialogFilterTitle: 'Filtre',
        filterDialogFilterBy: 'Filtrer par',
        filterDialogConfirmBtnLabel: 'OK',
        filterDialogCancelBtnLabel: 'Annuler',
        groupDialogHeader: 'Grouper',
        groupDialogGroupOrderHeader: 'Ordre du groupe',
        groupDialogGroupOrderAsc: 'Ascendant',
        groupDialogGroupOrderDesc: 'Descendant',
        groupDialogGroupByHeader: 'Grouper par',
        groupDialogNotGroupedLabel: '(Non groupés)',
        groupDialogConfirmBtnLabel: 'OK',
        groupDialogCancelBtnLabel: 'Annuler',
        sortDialogHeader: 'Trier',
        sortDialogSortOrderHeader: 'Ordre de tri',
        sortDialogSortOrderAsc: 'Ascendant',
        sortDialogSortOrderDesc: 'Descendant',
        sortDialogSortByHeader: 'Trié par',
        sortDialogNotSortedLabel: '(Non trié)',
        sortDialogConfirmBtnLabel: 'OK',
        sortDialogCancelBtnLabel: 'Annuler'
    },
    platformThumbnail: {
        detailsGotoPreviousButtonTitle: 'Aller à la page précédente',
        detailsGotoNextButtonTitle: 'Aller à la page suivante',
        detailsDialogCloseBtnLabel: 'Fermer',
        roleDescription: 'Image'
    },
    platformUploadCollection: {
        moveToTitle: 'Déplacer vers',
        moveToTitleFolder: 'Dossier',
        moveToNewFolderBtnLabel: 'Nouveau dossier',
        moveToAllFilesSubHeaderLabel: 'Tous les fichiers',
        moveToConfirmBtn: 'Déplacer',
        moveToCloseBtn: 'Annuler',
        newFolderTitle: 'Nouveau dossier',
        newFolderAtRootInputLabel: 'Nom du nouveau dossier',
        newFolderAtFolderInputLabel: 'Nom du nouveau dossier dans {{ folderName }}',
        newFolderInputPlaceholder: 'Saisissez ici..',
        newFolderInputErrorLabel: 'Maximum {{ count }} de caractères autorisés',
        newFolderDialogCreateBtnLabel: 'Créer',
        newFolderDialogCancelBtnLabel: 'Annuler',
        breadcrumbLabelAllFiles: 'Tous les fichiers',
        breadcrumbLabelAllFilesWithTotal: 'Tous les fichiers ({{ total }})',
        searchPlaceholder: 'Recherchez',
        addBtnLabel: 'Ajouter',
        newFolderBtnLabel: 'Nouveau dossier',
        moveToBtnLabel: 'Déplacer vers',
        downloadBtnLabel: 'Télécharger',
        updateVersionBtnLabel: 'Version de la mise à jour',
        removeBtnLabel: 'Supprimer',
        folderIconTitle: 'Icône de dossier',
        fileIconTitle: 'Icône de fichier',
        editFileNameInputPlaceholder: 'Entrez un nom',
        editFileNameFileAlreadyExistsError: 'Un fichier portant ce nom existe déjà',
        editFileNameFolderAlreadyExistsError: 'Un dossier avec ce nom existe déjà',
        itemStatusSuccessful: "Succès de l'opération",
        itemStatusUnsuccessful: "Échec de l'opération",
        uploadNewFileAfterFailAction: 'Exécuter',
        cancelUploadNewFileAction: 'Annuler',
        itemMenuBtnTitle: "Plus d'infos",
        dragDropAreaText: 'Faites glisser les fichiers à télécharger',
        noDataText: 'Aucun fichier trouvé',
        noDataDescription: 'Déposez les fichiers à télécharger, ou utilisez le bouton "Ajouter"..',
        paginationTotal: 'Affichage de {{ from }}-{ to }} de {{ total }}',
        resultsPerPage: 'Résultats par page',
        messageCreateFailed: 'Échec de la création de {{ folderName }}.',
        messageCreateSuccess: '{{ folderName }} a été créé.',
        messageUpdateVersionFailed: 'Impossible de mettre à jour la version de {{ folderName }}.',
        messageUpdateVersionSuccess: 'La version de {{ folderName }} a été mise à jour.',
        messageFileRenameFailed: 'Impossible de renommer "{{ from }}" en "{{ to }}."',
        messageFileRenameSuccess: '"{{ from }}" a été renommé en "{{ to }}".',
        messageRemoveFoldersAndFilesFailed:
            'Échec de la suppression des dossiers {{ foldersCount }} et des fichiers {{ filesCount }}.',
        messageRemoveFoldersAndFilesSuccess:
            'Les dossiers {{ foldersCount }} et les fichiers {{ filesCount }} ont été supprimés',
        messageRemoveFoldersFailed: 'Échec de la suppression des dossiers {{ foldersCount }}.',
        messageRemoveFoldersSuccess: 'Les dossiers {{ foldersCount }} ont été supprimés',
        messageRemoveFilesFailed: 'Échec de la suppression des fichiers {{ fichiersCount }}.',
        messageRemoveFilesSuccess: 'Les fichiers {{ filesCount }} ont été supprimés',
        messageRemoveFileOrFolderFailed: 'Échec de la suppression de {{ name }}.',
        messageRemoveFileOrFolderSuccess: '{{ name }} a été supprimé',
        messageMoveFoldersAndFilesFailed:
            'Échec du déplacement des dossiers {{ foldersCount }} et des fichiers {{ filesCount }} vers {{ to }}',
        messageMoveFoldersAndFilesSuccess:
            '{{ foldersCount }} dossiers et {{ filesCount }} fichiers ont été déplacés vers {{ to }}.',
        messageMoveFoldersFailed: 'Échec du déplacement de {{ foldersCount }} dossiers vers {{ to }}.',
        messageMoveFoldersSuccess: '{{ foldersCount }} dossiers ont été déplacés vers {{ to }}.',
        messageMoveFilesFailed: 'Échec du déplacement de {{ filesCount }} fichiers vers {{ to }}.',
        messageMoveFilesSuccess: '{{ filesCount }} fichiers ont été déplacés vers {{ to }}.',
        messageMoveFileOrFolderFailed: 'Échec du déplacement de {{ name }} vers {{ to }}.',
        messageMoveFileOrFolderSuccess: '{{ name }} a été déplacé vers {{ to }}.',
        messageMoveRootFoldersAndFilesFailed:
            'Échec du déplacement des {{ foldersCount }} dossiers et des {{ filesCount }} fichiers vers tous les fichiers.',
        messageMoveRootFoldersAndFilesSuccess:
            '{{ foldersCount }} dossiers et {{ filesCount }} fichiers ont été déplacés vers tous les fichiers.',
        messageMoveRootFoldersFailed: 'Impossible de déplacer les dossiers {{ foldersCount }} vers tous les fichiers.',
        messageMoveRootFoldersSuccess: '{{ foldersCount }} dossiers ont été déplacés vers tous les fichiers.',
        messageMoveRootFilesFailed: 'Impossible de déplacer les {{ filesCount }} fichiers vers tous les fichiers.',
        messageMoveRootFilesSuccess: '{{ filesCount }} fichiers ont été déplacés vers tous les fichiers.',
        messageMoveRootFileOrFolderFailed: 'Impossible de déplacer {{ name }} vers tous les fichiers.',
        messageMoveRootFileOrFolderSuccess: '{{ name }} a été déplacé dans tous les fichiers.',
        messageFileTypeMismatchPlural:
            "{{ filesCount }} fichiers n'ont pas le bon type. Types autorisés :  {{ allowedTypes }}.",
        messageFileTypeMismatchSingular:
            'Le fichier "{{ fileName }}" n\'a pas le bon type. Types autorisés : {{ allowedTypes }}.',
        messageFileSizeExceededPlural:
            '{{ filesCount }} fichiers ont dépassé la taille maximale du fichier. Taille maximale autorisée du fichier : {{ maxFileSize }}.',
        messageFileSizeExceededSingular:
            'Le fichier "{{ fileName }}" a dépassé la taille maximale du fichier. Taille maximale autorisée du fichier : {{ maxFileSize }}.',
        messageFileNameLengthExceededPlural:
            '{{ filesCount }} fichiers ont dépassé la longueur maximale du nom de fichier. ' +
            'Longueur autorisée du nom de fichier : {{ maxFilenameLength }} caractères.',
        messageFileNameLengthExceededSingular:
            'Le nom "{{ fileName }}" a dépassé la longueur maximale. Longueur autorisée du nom de fichier: {{ maxFilenameLength }} caractères.'
    },
    platformWizardGenerator: {
        summarySectionEditStep: 'Editer'
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
        selectOptionLabel: 'Sélectionnez une option'
    },
    fnSlider: {
        minMaxDetails: 'La valeur minimale du curseur est {{ min }}, la valeur maximale est {{ max }}',
        valueminDetails: 'La valeur est {{ value }}',
        valuemaxDetails: 'La valeur est {{ value }}',
        valueNowDetails: 'La valeur actuelle est {{ value }}'
    },
    fnSwitch: {
        semanticAcceptLabel: 'Accepter',
        semanticDeclineLabel: 'Refuser'
    }
};
