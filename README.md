# Dev Boilerplate

Dev Environment with a configured GULP setup.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

#### Installing

A step by step series of examples that tell you how to get a development env running

```
git clone git@github.com:shamalainen/dev-boilerplate.git
cd dev-boilerplate/
```

install dependencies

```
npm install
```

#### Gulp commands

Watch your changes

```
gulp
```

Build a production version of your creation into `/dist`.
It will only have `index.html` and `assets/*`.

```
gulp dist
```

Build a production version without minified code of your creation into `/dist`.

```
gulp dist dev
```

## Built With

- [Gulp Toolkit](https://gulpjs.com/) - Gulp is a toolkit for automating painful or time-consuming tasks in your development workflow.

## Authors

- **Sebastian Hämäläinen** - [shamalainen](https://github.com/shamalainen)
