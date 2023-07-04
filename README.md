# Template Artist

Create applications using templates

## Installation

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

file generated

```html
Hello world! My name is John, and my lastname is Doe
```

> **Note:** more info in https://handlebarsjs.com/guide/

## Create questions within the same template

Create a simple nodejs app, install "template-artist" and finally create "template" folder with html file inside

```bash
mkdir test-template && cd ./test-template
npm init -y
npm install template-artist
touch index.js
mkdir ./template
echo "{{name}}" > ./template/index.html.hbs
```

```javascript
/*
This script will generate a json file inside the root directory of the app with your questions called template-questions.json.
*/
import { TemplateArtistQuestions } from 'templates-artist';
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
    jsonFileName: 'template-questions'
  });
})();
```

Test your template and questions and answers

```javascript
/*
This script will test your template, test your answers and questions match
*/
import { TemplateArtistQuestions, TemplateArtist } from 'templates-artist';
(() => {
  const questions = TemplateArtistQuestions.readQuestions(
    // path to questions file
  );
  const errors = TemplateArtist.test({
    answers,
    questions,
    templatePath: 'templateFolderPath'
  });

  if (errors.length == 0) {
    console.log('good!', errors);
  } else {
    console.error('something wnet wrong!', errors);
  }
})();
```

## Authors

- Franco - _Initial work_ - [fjbalsamo](https://github.com/fjbalsamo)
- Victor - [vicmans](https://github.com/vicmans)

See also the list of [contributors](https://github.com/fjbalsamo/templates-artist/contributors) who participated in this project.
