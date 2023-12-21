# mHealth Proto FHIR-Questionnaire (mhealth-proto-fhir-questionnaire)

This is a prototype app for demonstrating a vaccination recommendation tool using a rule engine ([stugna-es](https://github.com/m-onyshchuk/stugna#readme)) and resources from the [CH VACD FHIR Implementation Guide](https://fhir.ch/ig/ch-vacd/index.html).

Try out the latest version of this webapp: https://mhealth-prototyp.github.io/Vaccionation/.
Use one of the test users from [chapter 1.1](#1.1-example-users) to log in.

You might also be interested in the [health-professional oriented prototype app](https://github.com/mHealth-Prototyp/Basic-Prototyp), the [patient and allergy oriented prototype app](https://github.com/mHealth-Prototyp/Allergy) and the [questionnaire prototype](https://github.com/mHealth-Prototyp/Questionnaire).

## Content Table

- [1 About this prototype webapp](#1-about-this-prototype-webapp)
  - [1.1 Example users](#1.1-example-users)
  - [1.2 EPD Playground](#1.3-epd-playground)
  - [1.3 Mobile Access Gateway](#1.4-mobile-access-gateway)
- [2 Pages](#2-pages)
  - [2.1 Home](#21-home)
  - [2.2 My vaccination document](#22-my-vaccination-document)
  - [2.3 Rules and Settings](#23-rules-and-settings)
  - [2.4 Generate Vaccination Documenbt](#24-generate-vaccination-document)
  - [2.5 About](#25-about)
- [3 Creating rules](#3-creating-rules)
  - [3.1 Facts](#31-facts)
  - [3.2 Rules](#32-rules)
- [4 Install and run the app](#4-install-and-run-the-app)
- [5 Submit issues](#5-submit-issues)
- [6 License](#6-license)
- [7 Changelog](#7-changelog)

## 1 About this prototype webapp

This webapp is intended to serve as a prototype around an use case with FHIR Questionnaires. It is able to connect to the [EPD Playground](#1.3-epd-playground) and load a patient's vaccination record. It is also able to fetch predefined rules from an endpoint to give vaccination recommendations.

### 1.1 Example users

Since the EPD Playground does not support user roles and authentification, the login is mocked in this prototype. You can use one of the following example users for playing around with the prototype:

<!-- prettier-ignore -->
|  Name                |  Login             |  Password  |  Personas  |
| -------------------- | ------------------ | ---------- | ---------- |
| Noah Gabriel Pichard     | noah@pichard.ch | np    | As a newborn child, Noahs vaccination record is still empty. |
| Verena Brönnimann | verena@broenni.ch| vb | Verena Brönnimann is an elderly woman with a lung condition (COPD Gold 2)                                                                                                                                 |
| Susanna Katz     | sus@katz.ch  | sk | Susanna Katz is a young health professional. |
| Bruce Wen     | bruce@wen.ch  | bw | Bruce Wen is an adult man that works as a bat researcher and thus is exposed to a risk of getting rabies.|

### 1.2 EPD Playground

The EPD Playground is a low-threshold "test and play" implementation of a Swiss electronic health record for demonstrating key use cases of mHealth. It is a source of inspiration for developers, managers and healthcare personal in Switzerland. For easier testing, no authentication is needed on the EPD Playground. Learn more on the [project page of the EPD Playground](https://epdplayground.ch/index.php?title=Main_Page).

### 1.3 Mobile Access Gateway

The Mobile Access Gateway is a FHIR endpoint that allows us to communicate with the EPD Playground using mHealth Profiles.

## 2 Pages

### 2.1 Home

On the Home page, the vaccination recommendations are displayed.

### 2.2 My vaccination document

This page displays the vaccination doccument loaded from the EPD Playground. If the patient has multiple document, the most recent is shown, with the possibility to switch to another document.

### 2.3 Rules and Settings

Here we can edit the rules or import rules from an endpoint. It also has an interactive diagram displaying how the rule engine facts and the vaccination recommendations are created, with examples from the current patient

### 2.4 Generate Vaccination Document

On this page we can easily generate a [CH VACD Vaccination Record Document](https://fhir.ch/ig/ch-vacd/StructureDefinition-ch-vacd-document-vaccination-record.html#), that can then be saved to the EPD Playground or directly be used as the current working document.

### 2.5 About

The About page shows information about the project, links to the project partners and the number of the app version currently running.

## 3 Creating rules

A detailes documentation of how the rules can be created (with examples) is to be found on the [website of stugna-es](https://github.com/m-onyshchuk/stugna#readme).

### 3.1 Facts

When creating rules, we can rely on the following facts:

| Name / key           | Type                      | Explanation                                                                 |
| -------------------- | ------------------------- | --------------------------------------------------------------------------- |
| gender               | "male", "female", "other" | The patients gender                                                         |
| age                  | integer                   | The patients age, in completed years                                        |
| age_in_months        | integer, NULL             | The patients age, in completed months, when the age is below two years      |
| vXXX_last_dose       | integer, NULL             | Duration since last dose of the given vaccination, in days.                 |
| vXXX_completed       | "TRUE", "FALSE"           | Wether the vaccination was completed or not                                 |
| dXXX_last_dose       | integer, NULL             | Duration since last vaccination dose for the given target disease, in days. |
| dXXX_completed       | "TRUE", "FALSE"           | Wether the vaccination for the given target disease was completed or not    |
| dXXX_number_of_doses | integer, NULL             | Number of vaccination doses given for the target disease                    |
| rXXX                 | "TRUE", "FALSE"           | Does the given risk apply to the patient?                                   |

`vXXX` stands for Vaccinations, where XXX has to be replaced with the coding,code. The same applies for `dXXX` for target diseases and `rXXX` for risks.

### 3.2 Rules

How the rules can be build, is documentet at [stugna-es](https://www.npmjs.com/package/stugna-es#ruleadd).
There are reserved words, these are: `TRUE`, `FALSE`, `AND`, `OR`, `NOT`, und `LIKE` (all case sensitive). You cannot use these words for variable names.

The rules are defined as followed, making `condition`, `factName` and `factValue` the required fields for a minimal rule.

```typescript
interface rule
  {
    // describe condition for adding new fact to system
    condition: string;

    // name of new fact, which will be added if condition is met. no spaces allowed.
    factName: string;

    // value of new fact, which will be added if condition is met
    factValue: string | number | boolean;

    // short fact description for logging
    description?: string;

    // rule priority, number, optional, default value is 1. low numbers are processed first
    priority?: number;

    // optional field with default values for missing facts. not working with precondition
    missing? string;

    // option string field with the same syntax as condition.
    precondition?: string;

    // name of new fact, which will be added if condition is not met. no spaces allowed. needs factValueElse if present.
    factNameElse?: string;

    // value of new fact, which will be added if condition is not met. needs factNameElse if present.
    factValueElse?: string | number | boolean;

    // Each value dictates when to halt the evaluation of subsequent rules as documented in the link above
    final?: 1 | 2 | 3;

    // after new rule adding, rules check procedure starts automatically (default: true)
    isTrigger?: boolean;
  }
```

_Keep care:_

- Missing facts are assumed as "TRUE" by default. If you don't want this behaviour, you have to set the parameter `missing: "FALSE"` to the rule.
- You cannot use shortened expressions: `fact1 OR fact2` is not the same as `fact1 = TRUE OR fact2 = TRUE`.

For helping facts, that should not end up in the end result, we have a convention: These fact names should start with `x_`, and are then ignored when displaying the rules to the user.

You can have a look at some rules in the [file with the default rules](./src/assets/rules.json).

## 4 Install and run the app

### 4.1 Install dependencies

Before you can run the app, you need to install the dependencies using the node package manager. Make sure you're in the root folder of the project (that contains `package.json`) and run the following command:

```bash
npm i
```

### 4.2 Start the app in development mode (hot-code reloading, error reporting, etc.)

After installing the dependencies, the following command will build the app and start a development server.

```bash
npm start
```

When the server is up and running, you can point your favorite browser to the displayed address to see the app (usually [localhost:9000](http://localhost:9000), but this may differ when you're already running other servers).

### 4.3 Build the app for production

If you want to deploy the app to a web server, you can run the following command and then just publish the content of the newly created `dist` folder.

```bash
npm run build
```

## 5 Submit issues

Go to the issue site of the repository to submit an issue: [on github.com](https://github.com/mHealth-Prototyp/Questionnaire/issues).

## 6 License

This software is published under a [MIT License](LICENSE).

## 7 Changelog

| Version | Date       | Changes                                     |
| ------- | ---------- | ------------------------------------------- |
| 1.0.0   | 2023-12-21 | Initial version uploaded to this repository |
