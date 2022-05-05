import chalk from 'chalk';
import { watch } from 'chokidar';
import { readFileSync, writeFileSync } from 'fs';
import sass from 'sass';

let time = Date.now();

const autoImportScss = ({ folder = 'scss' }) => {
  let files = [];

  const stringToScssPath = (path) => {
    let file = path.replace(/\\/g, '/');

    if (file.includes('.scss')) return `@import '${file}';`;
  };

  // watch folders
  watch(folder, {
    ignored: folder + '/' + settings.ignore,
    persistent: true,
  }).on('all', (event, path) => {
    time = Date.now();

    // on remove file
    if (event === 'unlink') {
      files = files.filter((item) => item !== stringToScssPath(path));
    }

    // on add new file
    if (event === 'add') {
      files.push(stringToScssPath(path));
    }

    setTimeout(() => {
      compileFile(files);
    }, 500);
  });

  const compileFile = ($files) => {
    // check files
    if (files.length === 0) {
      console.clear();
      console.log(
        chalk.red('***************************************\n') +
          chalk.red('*************************************** \n\n') +
          chalk.red.bold('No scss files in your folders ') +
          chalk.green('check ignore setting in setting.json or ') +
          chalk.blue('or add new file') +
          chalk.red('\n\n***************************************') +
          chalk.red('\n***************************************')
      );
      return;
    }

    // remove duplicated items
    $files = [...new Set($files)];

    let file = $files
      .reduce((prev, current) => {
        return `${prev} \n${current}`;
      }, '')
      .trim();

    // to main Scss File
    writeFileSync(settings.output.scss, file, { encoding: 'utf-8' });

    /******* compile scss *********/
    try {
      let css = sass.compile(settings.output.scss).css;
      writeFileSync(settings.output.css, css, { encoding: 'utf-8' });

      console.log(
        `${
          chalk.blue(' compile ') +
          chalk.red.bold('scss to css') +
          chalk.red(' -----> ') +
          chalk.green(`${Date.now() - time}ms`)
        }`
      );
    } catch (error) {
      console.log(chalk.red('\n\n\n error '), error.message);
    }
  };

  // log my files
  setTimeout(() => {
    let allFiles = files.map((file) => {
      return file
        .split(`@import '${settings.folder}/`)
        .join('')
        .replace(';', '')
        .replace("'", '');
    });

    console.log(chalk.yellow('\n\n watch for these files ===>'), allFiles);
  }, 1000);
};

/****** run script *****/

// import json file
let settings = JSON.parse(
  readFileSync('./settings.json', {
    encoding: 'utf-8',
  })
);

autoImportScss(settings);
