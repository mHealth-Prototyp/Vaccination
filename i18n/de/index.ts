export default {
  common: {
    appName: 'mHealth Prototyp Impfung',
    error: 'Ups. Da ist leider etwas schiefgegangen!',
    unknown: 'unbekannt',
    back: 'zurück',
    close: 'schliessen',
    yes: 'ja',
    no: 'no'
  },
  login: {
    welcome1: 'Willkommen zu Ihrem Patientendossier!',
    welcome2: 'Loggen Sie sich mit Ihrer E-Mailadresse ein, um Ihre Impfinformationen abzurufen.',
    emailAddressLabel: 'E-Mailadresse',
    passwordLabel: 'Passwort',
    loginLabel: 'einloggen',
    invalidPassword: 'Die eingegebene E-Mailadresse oder das Passwort ist ungültig.',
    enterCode1: 'Bitte geben Sie den Code ein, der an ',
    enterCode2: ' gesendet wurde.',
    resend: 'Code erneut senden',
    codeLabel: 'Code',
    checkLabel: 'prüfen',
    invalidCode: 'Der eingegebene Code ist nicht korrekt.',
    messageTitle: 'SMS von EPD Playground an ',
    messageText: 'Ihr Code für den mHealth Prototyp ist: ',
    possibleLogins: 'Mögliche Logins:',
    loginError: 'Für dieses Login konnten keine entsprechenden Daten auf dem EPD Playground gefunden werden.'
  },
  menu: {
    title: 'Menü',
    home: 'Impf-Empfehlung',
    settings: 'Einstellungen',
    create: 'Impfdokument generieren',
    immunizations: 'Mein Impfdokument',
    rules: 'Regeln / Einstellungen',
    about: 'Über den mHealth Prototyp'
  },
  about: {
    title: 'Über den mHealth Prototypen (Impf-Szenario)',
    aboutText:
      'Der mHealth-Prototyp (Impf-Szenario) wurde im Rahmen eines Projekts von eHealth Suisse und dem Institut für Medizininformatik I4MI der Berner Fachhochschule erstellt. Er demonstriert eine simple Rule Engine, die aufgrund von Impfdokumenten auf dem EPD Playground (im CH VACD Austauschformat) Impfempfehlungen erstellen kann.',
    readMore:
      'Unter den folgenden Links erfahren Sie mehr zu den Projektpartnern, dem Austauschformat und zum elektronischen Patientendossier und zum EPD Playground:',
    version: 'Version:'
  },
  settings: {
    languageTitle: 'Sprache'
  },
  createPage: {
    title: 'CH VACD Impfdokument erstellen',
    add: 'Hinzufügen',
    prefix: 'Prefix:',
    given: 'Vorname(n):',
    family: 'Name:',
    id: 'ID:',
    create: 'Erstellen',
    clipboard: 'Resource zur Zwischenablage hinzufügen',
    reset: 'zurücksetzen',
    upload: 'im EPD Playground speichern',
    gender: {
      label: 'Geschlecht:',
      MALE: 'männlich',
      FEMALE: 'weiblich',
      OTHER: 'andere'
    },
    set: 'lokal als aktuelle Resource setzen',
    practitioners: {
      title: 'Gesundheitsfachpersonen',
      organization: 'Organisation:',
      show: 'Gesundheitsfachpersonen anzeigen',
      hide: 'Gesundheitsfachpersonen ausblenden'
    },
    patient: {
      title: 'Patient*in',
      birthdate: 'Geburtsdatum:'
    },
    vaccinations: {
      title: 'Impfungen',
      date: 'Impfdatum:',
      lot: 'Lot:',
      dose: 'Anzahl Dosen:',
      completed: 'Vollständig:',
      performer: 'Ausführende*r:'
    },
    risks: {
      title: 'Risiken',
      recorded: 'Erfassungsdatum:',
      onset: 'Datum des Auftretens:',
      recorder: 'Erfasser:'
    }
  },
  immunizationPage: {
    multipleDocuments: 'Es sind mehrere aktive Impfdokumente auf dem EPD Playground vorhanden.',
    selectTitle: 'Bitte wählen Sie eines aus:',
    selectLabel: 'Impfdokument vom ',
    noRecord: 'Es gibt auf dem EPD Playground noch kein Impfdokument für {name}.'
  },
  rulesPage: {
    title: 'Regeln / Einstellungen',
    description: 'Hier können Sie die Regeln anpassen, nach denen die Impfempfehlungen erstellt werden.',
    linkDescription: 'Unter folgenden Links finden Sie weitere Informationen.',
    fetchTitle: 'Regeln laden',
    fetchDescription: 'Hier können Sie die Regeln von einer URL laden. Die URL muss direkt auf eine Textdatei im JSON-Format zeigen.',
    fetchLabel: 'Laden Sie die Regeln von einer Internet-Quelle',
    fetchHint: 'URL',
    fetchButton: 'Regeln laden',
    editTitle: 'Regeln bearbeiten',
    editDescription: 'Hier können Sie die Regeldatei direkt im Browser bearbeiten.',
    editLabel: 'Bearbeiten Sie die Regeln direkt hier',
    editButton: 'Regeln speichern',
    resetButton: 'Regeln zurücksetzen',
    downloadButton: 'Regeln herunterladen',
    fetchSuccess: 'Es wurden erfolgreich {rules} Regeln geladen.',
    introText:
      'Hier sehen Sie, wie die Regeln und Fakten generiert werden. Klicken Sie auf die bunten Flächen, um Beispiele zu sehen.<br />Die generierten Fakten bestehen aus Patienten-Fakten ("patient fact"), Impf-Fakten ("vaccination facts") und Risiko-Fakten ("risk facts"); diese werden aus dem Impfdokument erstellt.<br />"Depending" Fakten sind Fakten, die durch die Anwendung von Regeln auf generierte Fakten entstehen, diese sind die Grundlage für Impfempfehlungen.',
    infoTitle: {
      patient: 'Beispiel Patienten-Fakten',
      vaccination: 'Beispiel Impf-Fakten',
      risk: 'Beispiel Risiko-Fakten',
      depending: 'Beispiel abhängige Fakten'
    }
  },
  ruleCard: {
    title: 'Impfempfehlung für ',
    rulesTitle: 'Regeln',
    factsTitle: 'Fakten',
    resultsTitle: 'Impfempfehlungen',
    resultDescription: 'Diese Ergebnisse wurden auf Basis von {rules} Regeln und {facts} Fakten generiert.',
    factName: 'Ausschlaggebender Fakt:',
    recommendationText: 'Es gibt folgende Impfempfehlungen für {name}:',
    noRecommendation: 'Aktuell gibt es keine Impfempfehlungen für {name}.',
    setRules: 'Regeln anwenden',
    showRules: 'Regeln anzeigen',
    hideRules: 'Regeln ausblenden',
    showFacts: 'Fakten anzeigen',
    hideFacts: 'Fakten ausblenden',
    rules: {
      needs_tetanus_0: 'Die Impfung gegen Diphtherie / Tetanus / Pertussis wird empfohlen, da die Person alt genug ist und noch keine Impfung erhalten hat.',
      needs_tetanus_1: 'Es ist Zeit für die zweite Impfdosis gegen Diphtherie / Tetanus / Pertussis.',
      needs_tetanus_2: 'Es ist Zeit für die dritte Impfdosis gegen Diphtherie / Tetanus / Pertussis.',
      needs_child_tetanus_refresh: 'Es ist Zeit für die Auffrischimpfung gegen Diphtherie / Tetanus / Pertussis.',
      tetanus_refresh_light_injury: 'Falls die Person eine leichte Verletzung hat, ist die Auffrischung der Tetanus-Impfung angezeigt.',
      tetanus_refresh_severe_injury: 'Falls die Person eine schwerere Verletzung hat, ist die Auffrischung der Tetanus-Impfung angezeigt.',
      tetanus_necessary_injury: 'Die Person hat noch keine Immunisierung gegen Tetanus. Bei einer Verletzung ist die Impfung zu prüfen.',
      influenza_necessary: 'Grippe-Impfung empfohlen: Die Person erfüllt die Kriterien, und die letzte Impfung liegt mehr als ein Jahr zurück.',
      sp_evaluate_adult:
        'Die Impfung gegen Pneumokokken sollte individuell geprüft werden bei Personen mit diesem Risikoprofil (Herz-, Lungen- oder Nierenerkrankungen, Transplantationspatient*innen und Personen mit erhöhtem Expositionsrisiko für Pneumokokken.).',
      sp_vaccinate_adult:
        'Die Impfung gegen Pneumokokken ist empfohlen bei Personen mit diesem Risikoprofil (Leber-, Autoimmun-, Milz-, Blut- oder Stoffwechselerkrankungen, Transplantationspatient*innen und Personen mit Schädelfraktur oder Cochleaimplantat).',
      sp_premature_birth: 'Frühgeborene Kinder benötigen vier Impfdosen gegen Pneumokokken (im Alter von 2, 3, 4 und 12 Monaten).',
      sp_necessary_3_doses: 'Noch ungeimpfte Kinder in diesem Alter benötigen drei Dosen gegen Pneumokokken.',
      sp_necessary_2_doses: 'Noch ungeimpfte Kinder in diesem Alter benötigen zwei Dosen gegen Pneumokokken.',
      sp_necessary_1_doses: 'Noch ungeimpfte Kinder in zwischen 2 und 5 Jahren benötigen eine Dosis gegen Pneumokokken.',
      fsme_recommended:
        'Bei Personen ab sechs Jahren, die ein erhöhtes Expositionsrisiko für FSME haben und in der Schweiz (ausser Tessin / Genf) wohnen, ist eine FSME-Impfung empfohlen.',
      fsme_evaluate:
        'Bei Kindern unter sechs Jahren, die ein erhöhtes Expositionsrisiko für FSME haben und in der Schweiz (ausser Tessin / Genf) wohnen, muss die FSME-Impfung individuell geprüft werden.',
      rabies_recommended_2doses:
        'Personen mit erhöhtem Expositionsrisiko für Tollwut wird eine prophylaktische Impfung mit zwei Dosen empfohlen (mit 28 Tagen Abstand).',
      rabies_recommended_3doses:
        'Personen mit erhöhtem Expositionsrisiko für Tollwut und Immunschwäche wird eine prophylaktische Impfung mit drei Dosen empfohlen (Tag 0, 7 and 21–28).'
    }
  }
};
