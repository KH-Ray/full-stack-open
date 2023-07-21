```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    server->>browser: new "<li></li>" element created
    deactivate server

    Note: Execution starts when the submit button is clicked
```
