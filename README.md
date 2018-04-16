# scripts

[![Build Status](https://travis-ci.org/splish-me/scripts.svg?branch=master)](https://travis-ci.org/splish-me/scripts)

Inspired by https://github.com/kentcdodds/kcd-scripts

## Setup

```
yarn add @splish-me/scripts --dev
```

## Usage

### `splish-scripts format`

Executes `prettier --write "{{.storybook,src}/**/*,*}.{js,jsx,ts,tsx,css,less,scss,json,md,markdown}"` with the [included default config](src/configs/prettierrc.json).
