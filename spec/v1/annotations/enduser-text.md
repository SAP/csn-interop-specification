> <span className="feature-status-beta">BETA</span> This annotation is beta and should be reviewed for completion and correctness.

## Introduction

To allow an intuitive consumption of the data model in (End User) UIs, further metadata needs to be defined which helps the end user to understand the semantics of the underlying data model artifacts. Depending on the concrete context different types of UI texts are required. The UI text is displayed on the screen in the logon language of the user (if the text was translated into this language).

### Reference i18n keys

In the `@EndUserText` annotations it is also possible to reference [i18n](../csn-interop-effective#i18n) entries that are embedded into the CSN document.
In this case, the string has to include `{i18n>` as a prefix, then the key and end with `}`

Example: `{i18n>AD01PROFNR@ENDUSERTEXT.HEADING}`
