import chalk from 'chalk';
import { watch } from 'chokidar';
import { readFileSync, writeFileSync } from 'fs';
import sass from 'sass';

let time = Date.now();

const autoImportScss = ({ folder = 'scss' }) => {
  let files = [];

  const stringToScssPath = (path) => {
    let file = `${path.slice(folder.length + 1)}`.replace('\\', '/');

    if (file.includes('.scss')) return `@import '${folder}/${file}';`;
  };

  // watch folders
  watch(folder).on('all', (event, path) => {
    time = Date.now();

    // console.log(
    //   `${chalk.gray.bold('auto Import Scss ') + chalk.red('-->')} ${chalk.blue(
    //     event
    //   )}`
    // );

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
  };
};

/****** run script *****/

// import json file
let settings = JSON.parse(
  readFileSync('./settings.json', {
    encoding: 'utf-8',
  })
);

autoImportScss(settings);
