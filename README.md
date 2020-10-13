# React-linky

[![Build Size](https://img.shields.io/bundlephobia/minzip/react-linky?label=bundle%20size&style=flat&colorA=000000&colorB=000000)](https://bundlephobia.com/result?p=react-linky)
[![Version](https://img.shields.io/npm/v/react-linky?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/react-linky)
[![Downloads](http://img.shields.io/npm/dt/react-linky?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/react-linky)

A minimal and tiny React component to find links in text and to turn them into HTML hyperlinks. It gets all kinds of URLs in a simple text and converts them to HTML hyperlink in react. it also supports finding email addresses in the text and convert them to a mailto: hyperlink. It also writes in TypeScript so has its types with itself. And all these features with less than a KBs.

You can try a live demo [here](https://codesandbox.io/s/react-linky-1kq1w).

## Installation

    yarn add react-linky

or

    npm i react-linky

## Usage

Simple usage:

    <Linky>
      If you enjoy the project just visit github.com/react-linky/ and give a start to `react-linky` ;)
    </Linky>

Nested elements:
`react-linky` also supports nested elements and it converts every string url to a link.

    <Linky>
      <h2>react-linky <i>(github.com/slasharash/react-linky)</i></h2>
      <p>A minimal and tiny React component to find links in text and to turn them into html links</p>
      <p>github is a like a <b>127.0.0.1</b> for us. Now you should know that it supports ip addresses too</p>
      <p>it also supports urls with http, like: https://github.com or http://github.com</p>
      <p>feel free to email me: <i>slasharash@protonmail.com</i></p>
    </Linky>

Email:
By default, `react-linky` converts every email to a hyperlink but you can change its behavior by passing a boolean value to the `email` prop.

    <Linky email={false}>
        this email will not convert to a link: slasharash@protonmail.com
    </Linky>
