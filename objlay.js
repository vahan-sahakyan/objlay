/**
 *
 * Displays a formatted representation of an Object
 * in the Browser using Express.js (with token colorization and recursively expanding manner)
 *
 * @param {object} objectToDisplay
 * An object to be displayed formatted in the browser
 * @param {number} PORT
 * The PORT for Express to listen on, default is 3000
 * @param {number} INDENT_SIZE
 * The number of spaces for JSON indentation, default is 2
 * @param {boolean} arePrimitivesGray
 * Display primitive values in Gray Color
 * @returns {void} void
 */
module.exports = function objlay(
  objectToDisplay = { please: 'insert an object' },
  PORT = 3000,
  INDENT_SIZE = 2,
  arePrimitivesGray = false
) {
  const express = require('express');
  const app = express();
  const filename = process.argv[1].split('/').at(-1);
  try {
    const objectStr = JSON.stringify(objectToDisplay, undefined, INDENT_SIZE);
    app.get('/', (req, res) => {
      res.send(`<html><head>
      <title>${filename}</title>
      ${getStyles(arePrimitivesGray)}
      </head>
      <body>
      <!-- VISUALIZED OBJECT -->
      <pre>
<h3 class="filename">${filename}</h3>${objectStr.replace(/"(\w+)": ([{[]?)("?.*"?)(,?)/g, (m, ...args) => {
        return m.includes(': {') || m.includes(': [')
          ? //
            `<strong class="prior">${args[0]}</strong>: ${args[1]}`
          : `<strong>${args[0]}</strong>: <span class="${
              args[2][0].includes('"') ? 'string' : args[2][0].includes('null') ? 'null' : ''
            }">${args[2].at(-1) === ',' ? args[2].slice(0, -1) : args[2]}</span>${args[2].at(-1) === ',' ? ',' : ''}`;
      })}</pre></body></html>`);
    });
  } catch (error) {
    app.get('/', (req, res) => {
      console.log(error);
      res.send(`<html><head>
      <title>${filename}</title>
      ${getStyles(arePrimitivesGray)}
      </head>
      <body>
<div class="error"><pre class="went-wrong">Something went wrong</pre><button>Show Error Message</button><hr>
<pre class="error-msg">
      ${error}
      </pre>
      </div></body>
      <script defer>
        const btn = document.querySelector('button');
        const errMsg = document.querySelector('.error-msg');
        let visible = false;
        const display = {
          true: {
            msg:'unset',
            btn: 'Hide Error Message'
          },
          false: {
            msg: 'none',
            btn: 'Show Error Message'
          }
        }
        btn.addEventListener('click', () => {
          visible = !visible;
          errMsg.style.display = display[visible].msg;
          btn.textContent = display[visible].btn;
        });

      </script>
      </html>`);
    });
  }
  app.listen(PORT, (req, res) => {
    console.log('\n  CTRL + Click 🟢\x1b[1;34m http://localhost:' + PORT + '/\x1b[0m\n');
  });
};

function getStyles(arePrimitivesGray) {
  return `<style>
  h1,h2,h3,h4,h5,h6 {
    margin: 0;
  }
  hr {
    border: none;
    border-bottom: 1px solid gray;
  }
  body {
    background: #202124;
    color: #9da3a9;
    font-size: 1.2rem;
  }
  strong {
    color: ${arePrimitivesGray ? '#81878b' : '#5eb0d7'};
  }
  .filename {
    color: #a184dd;
    color: #81878b;
  }
  .prior {
    color: #37cec3;
    color: #5eb0d7;
  }
  span {
    color: #a184dd;
  }
  span.string {
    color: #f28b54;
  }
  span.null {
    color: #61676b;
  }
  button {
    border:none;
    border-radius:4px;
    color:#5eb0d7;
    cursor: pointer;
    background:#111a;
    padding:.5rem 2rem;

  }
  .error {
    display: 'none';
    color: #61676b;
    white-space: pre-wrap;
    max-width: 100vw;
  }
  .went-wrong {
    font-size: 1rem;
  }
  .error-msg {
    white-space: pre-wrap;
    display: none;
    font-size: .8rem;
  }
</style>`;
}
