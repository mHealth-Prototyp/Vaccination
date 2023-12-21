export default {
  common: {
    appName: 'Prototype mHealth Vaccination',
    error: "Oups ! Quelque chose s'est mal passé !",
    back: 'retour',
    close: 'fermer'
  },
  login: {
    welcome1: 'Bienvenue sur votre dossier patient !',
    welcome2: 'Connectez-vous avec votre adresse e-mail pour consulter vos données de vaccination.',
    emailAddressLabel: 'Adresse e-mail',
    passwordLabel: 'Mot de passe',
    loginLabel: 'Se connecter',
    invalidPassword: "L'adresse e-mail ou le mot de passe saisi n'est pas valide.",
    enterCode1: 'Veuillez saisir le code envoyé à ',
    enterCode2: ' a été envoyé',
    resend: 'Renvoyer le code',
    codeLabel: 'code',
    possibleLogins: 'Connexions possibles:',
    checkLabel: 'vérifier',
    invalidCode: "le code saisi n'est pas correct.",
    messageTitle: "SMS de l'EPD Playground à ",
    messageText: 'Votre code pour le use case EPD Playground est : ',
    loginError: "Aucune donnée correspondante n'a pu être trouvée pour ce login / mot de passe sur l'EPD Playground."
  },
  menu: {
    title: 'Menu',
    home: 'Recommandation de vaccination',
    immunizations: 'Mon document de vaccination',
    rules: 'Règles / paramètres',
    settings: 'Paramètres',
    create: 'Générer doc. vaccination',
    about: 'À propos du prototype mHealth'
  },
  about: {
    title: 'A propos du prototype mHealth, scénario de vaccination',
    aboutText:
      "Le prototype mHealth (scénario de vaccination) a été créé dans le cadre d'un projet d'eHealth Suisse et de l'Institut d'informatique médicale I4MI de la Haute école spécialisée bernoise. Il démontre un simple moteur de règles qui peut générer des recommandations de vaccination sur la base de documents de vaccination sur le EPD Playground (dans le format d'échange CH VACD).",
    readMore:
      "Les liens suivants vous permettront d'en savoir plus sur les partenaires du projet, le format d'échange et le dossier électronique du patient et le EPD Playground:"
  },
  settings: {
    languageTitle: 'Langue',
    languageText: "Choisissez la langue de l'application (actuellement, seuls le français et l'allemand sont disponibles)."
  },
  immunizationPage: {
    multipleDocuments: 'Il y a plusieurs documents de vaccination actifs sur EPD Playground',
    selectTitle: 'Veuillez en choisir un:',
    selectLabel: 'Document de vaccination du ',
    noRecord: "Il n'y a pas encore de document de vaccination pour {name} sur le EPD Playground."
  },
  rulesPage: {
    title: 'Règles / paramètres',
    description: 'Ici, vous pouvez adapter les règles selon lesquelles les recommandations de vaccination sont établies.',
    linkDescription: "Vous trouverez plus d'informations sous les liens suivants",
    fetchTitle: 'Charger les règles',
    fetchDescription: "Ici, vous pouvez charger les règles à partir d'une URL. L'URL doit pointer directement sur un fichier texte au format JSON.",
    fetchLabel: "Charger les règles à partir d'une source Internet",
    fetchHint: 'URL',
    fetchButton: 'Charger les règles',
    editTitle: 'Modifier les règles',
    editDescription: 'Ici, vous pouvez éditer le fichier de règles directement dans le navigateur',
    editLabel: 'Editez les règles directement ici',
    editButton: 'Enregistrer les règles',
    resetButton: 'Réinitialiser les règles',
    downloadButton: 'Télécharger les règles',
    fetchSuccess: '{rules} règles ont été chargées avec succès.',
    introText:
      "Vous voyez ici comment les règles et les faits sont générés. Cliquez sur les zones colorées pour voir des exemples.<br />Les faits générés se composent de faits relatifs aux patients, de faits relatifs à la vaccination et de faits relatifs aux risques ; ils sont créés à partir du document de vaccination.<br />Les faits dépendants sont des faits créés par l'application de règles aux faits générés; ils constituent la base des recommandations de vaccination.",
    infoTitle: {
      patient: 'Exemple de faits patients',
      vaccination: 'Exemple de faits vaccination',
      risk: 'Exemple de faits risque',
      depending: 'Exemple de faits dépendants'
    }
  },
  ruleCard: {
    title: 'Recommandation de vaccination pour ',
    rulesTitle: 'Règles',
    factsTitle: 'Faits',
    resultsTitle: 'Recommandations de vaccination',
    resultDescription: 'Ces résultats ont été générés sur la base de {rules} règles et de {facts} faits',
    factName: 'Fait déterminant:',
    recommendationText: 'Il existe les recommandations de vaccination suivantes pour {name}:',
    noRecommendation: "Il n'y a actuellement aucune recommandation de vaccination pour {name}.",
    setRules: 'Appliquer les règles',
    showRules: 'Afficher les règles',
    hideRules: 'Cacher les règles',
    rules: {
      needs_tetanus_0:
        "La vaccination contre la diphtérie / le tétanos / la coqueluche est recommandée car la personne est assez âgée et n'a pas encore été vaccinée",
      needs_tetanus_1: "Il est temps d'administrer la deuxième dose de vaccin contre la diphtérie / le tétanos / la coqueluche",
      needs_tetanus_2: 'Il est temps de recevoir la troisième dose de vaccin contre la diphtérie / le tétanos / la coqueluche',
      needs_child_tetanus_refresh: 'Il est temps de faire un rappel de vaccin contre la diphtérie / le tétanos / la coqueluche',
      tetanus_refresh_light_injury: 'Si la personne a une blessure légère, le rappel de la vaccination contre le tétanos est indiqué',
      tetanus_refresh_severe_injury: 'Si la personne présente une blessure plus grave, la mise à jour du vaccin antitétanique est indiquée',
      tetanus_necessary_injury: "La personne n'est pas encore immunisée contre le tétanos. En cas de blessure, la vaccination doit être vérifiée.",
      influenza_necessary: "Vaccination contre la grippe recommandée : La personne répond aux critères et la dernière vaccination remonte à plus d'un an",
      sp_evaluate_adult:
        "La vaccination contre les pneumocoques devrait être évaluée individuellement chez les personnes présentant ce profil de risque (maladies cardiaques, pulmonaires ou rénales, patients* transplantés et personnes présentant un risque accru d'exposition aux pneumocoques).",
      sp_vaccinate_adult:
        'La vaccination contre les pneumocoques est recommandée chez les personnes présentant ce profil de risque (maladies hépatiques, auto-immunes, spléniques, sanguines ou métaboliques, patients* transplantés et personnes ayant une fracture du crâne ou un implant cochléaire).',
      sp_premature_birth: "Les enfants nés prématurément ont besoin de quatre doses de vaccin contre les pneumocoques (à l'âge de 2, 3, 4 et 12 mois).",
      sp_necessary_3_doses: 'Les enfants de cet âge qui ne sont pas encore vaccinés ont besoin de trois doses contre les pneumocoques',
      sp_necessary_2_doses: 'Les enfants de cet âge qui ne sont pas encore vaccinés ont besoin de deux doses de vaccin antipneumococcique',
      sp_necessary_1_doses: "Les enfants non encore vaccinés âgés de 2 à 5 ans ont besoin d'une dose contre le pneumocoque",
      fsme_recommended:
        "La vaccination contre l'encéphalite à tiques est recommandée chez les personnes âgées de six ans et plus qui présentent un risque accru d'exposition à l'encéphalite à tiques et qui résident en Suisse (sauf Tessin / Genève)",
      fsme_evaluate:
        "Pour les enfants de moins de six ans qui présentent un risque accru d'exposition à la FSME et qui résident en Suisse (sauf Tessin / Genève), la vaccination contre la FSME doit être évaluée individuellement",
      rabies_recommended_2doses:
        "Il est recommandé aux personnes présentant un risque élevé d'exposition à la rage de se faire vacciner par voie prophilactique avec deux doses (à 28 jours d'intervalle)",
      rabies_recommended_3doses:
        "Il est recommandé aux personnes présentant un risque accru d'exposition à la rage et à l'immunodéficience de recevoir trois doses de vaccin prophilactique (jours 0, 7 et 21-28)."
    }
  },
  createPage: {
    title: 'Créer un document de vaccination CH VACD',
    add: 'Ajouter',
    prefix: 'Préfixe:',
    given: 'Prénom(s):',
    family: 'Nom:',
    id: 'ID:',
    create: 'Créer',
    clipboard: 'Ajouter la ressource au presse-papiers',
    reset: 'réinitialiser',
    upload: 'enregistrer dans le playground EPD',
    gender: {
      label: 'Sexe:',
      MALE: 'masculin',
      FEMALE: 'femelle',
      OTHER: 'autre'
    },
    set: 'définir localement comme ressource courante',
    practitioners: {
      title: 'Professionnels de la santé',
      organization: 'Organisation:',
      show: 'Afficher les professionnels de santé',
      hide: 'Masquer les professionnels de santé'
    },
    patient: {
      title: 'Patient',
      birthdate: 'Date de naissance:'
    },
    vaccinations: {
      title: 'Vaccinations',
      date: 'Date de vaccination:',
      lot: 'Lot:',
      dose: 'Nombre de doses:',
      completed: 'Complet:',
      performer: 'Exécutant*:'
    },
    risks: {
      title: 'Risques',
      recorded: "Date d'enregistrement:",
      onset: "Date d'occurrence:",
      recorder: 'Auteur de la saisie:'
    }
  }
};
