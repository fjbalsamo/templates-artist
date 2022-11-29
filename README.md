# Template Artist

Create applications using templates

## Istallation

```bash
npm install template-artist # using npm

yarn add template-artist # using yarn
```

## Usage

```typescript
import { TemplateArtist } from 'templates-artist';

TemplateArtist.createApp({
  answers: {
    name: 'John',
    lastname: 'Doe',
    folder: 'thisIsMyFolder',
    fileName: 'loremIpsumFileName',
  },
  destinationApp: '/application/destination/directory',
  templatePath: '/template/path/directory',
});
```

## Creating templates using handlebarsjs

```
.template-directory
├── _index.html.hbs
├── _{{folder}}
│   ├── {{fileName}}.js
│   └── otherFile.txt
├── _assets
│   ├── file1.ts
│   └── file2.cpp
```

file template

```handlebars
Hello world! My name is {{name}}, and my lastname is {{lastname}}
```

App Created

```
.application-destination-directory
├── _index.html
├── _thisIsMyFolder
│   ├── loremIpsumFileName.js
│   └── otherFile.txt
├── _assets
│   ├── file1.ts
│   └── file2.cpp
```

> **Note:** more info in https://handlebarsjs.com/guide/

## Create questions within the same template

Create a simple nodejs app, install "template-artist" and finally create "template" folder with html file inside

```bash
mkdir test-template && cd ./test-template && npm init -y && npm install template-artist && touch index.js && mkdir ./template && echo "{{name}}" > ./template/index.html.hbs
```

```javascript
/*
This script will generate a json file inside the root directory of the app with your questions called template-questions.json.
*/
const { TemplateArtistQuestions } = require('templates-artist');
(() => {
  TemplateArtistQuestions.generateQuestions({
    questions: [
      {
        type: 'input',
        message: 'Type your name',
        name: 'name',
        default: 'Jhon',
        validation: {
          opts: ['required'],
          messageError: 'your name is required',
        },
      },
    ],
  });
})();
```
