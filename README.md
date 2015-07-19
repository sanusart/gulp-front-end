# gulp front end
Using browser sync, sass, minifies and concatenatesfiles

## Install dependencies

```
npm install
```

## Run
`gulp --jade` or `gulp` (create _index.html_ in stead of _index.jade_)

## options
`gulp --min`  - minifies css, js and html

`gulp --jade` - compiles _.jade_ files to html

`gulp release --min` - prepare release, add `--bs` - to run with  browserSync

## Misc
- **Browser sync** runs on [http://localhost:3000](http://localhost:3000) and **Browser sync UI** on [http://localhost:3001](http://localhost:3001)
- **Output directory** is `dist`
- **Add new files** to _css_files_ and _js_files_ array in `gulpfile.js` respectively
- You can have **src/index.html** or **src/index.jade** (if you used _jade_ you need to run gulp with `--jade` switch e.g. `gulp --jade`)
## license
MIT

--------------------------------------------------------------------------------

:)
