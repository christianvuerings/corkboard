# Corkboard

[![npm](https://img.shields.io/npm/v/corkboard.svg?maxAge=2592000&style=flat)](https://www.npmjs.com/package/corkboard)
[![Build status](https://badge.buildkite.com/85e40937e5afc08c125fe27c8e1b807a21875a0260fd13a153.svg?branch=master)](https://buildkite.com/pinterest/corkboard)

Corkboard gives you a **visual-REPL** for your React app. A visual-REPL is an
isolated environment where you can **quickly prototype** and **document** your
components. It's analogous to (and inspired by) [Devcards](https://github.com/bhauman/devcards) in Clojure.

---
TODO: Screenshots!

---


1. [Getting started](#getting-started)
2. [Examples](#examples)
3. [Usage](#usage)
  1. [Cards](#cards)
  2. [Namespaces & groups]
  3. Themes
4. License


## Getting started

If you're just getting starting, it's recommended that you copy the [Webpack example project](https://github.com/chrislloyd/corkboard/tree/master/example). It's a convenient base for you to adapt. Otherwise, you can install corkboard with your favorite package manager:

```shell
yarn add corkboard
```

## Examples

* [Gestalt](https://pinterest.github.io/gestalt) (by Pinterest)


## Usage

The core of Corkboard is very simple.

```javascript
import { ns, card } from 'corkboard';

// Defines a Namespace. A Namespace is just a way of collecting cards together. Typically you'll have one namespace per. component or file.
ns('Buttons');

// A card is an example of a component that gets displayed.
card(
  'Primary Button',
  <Button color="red" />
);
```

### Cards

Cards follow a simple syntax:

```javascript
card(optionalName, ...reactComponents, optionalSettings);
```

Some examples of valid cards are:

```javascript
card(<div>Hello!</div>);
card('Example 2', <div />);
card('Example 3', <p>Hello</p>, <p>World</p>);
card('Example 4', <div />, { stacked: true });
card(<div />, { stacked: true });
```

Corkboard comes with a few helpers to help you quickly build cards. You can add Markdown documentation:

```javascript
import { card, md } from 'corkboard';

// md takes both template strings and regular strings
card('Button', md`
  A **button** is a clickable element that performs an action when clicked.
`);
```

You can illustrate how your components should mutate state with a `StateRecorder`. `StateRecorders` let you inspect and change state over time, and then let you play back how it has changed.

```javascript
import { card, md, recordState } from 'corkboard';

card('Segmented Control',
  md`This is a live, working, \`SegmentedControl\`.`,
  recordState(atom =>
    <SegmentedControl
      items={['Option A', 'Option B', 'Option C']}
      selectedIndex={atom.deref().selected}
      onChange={i => atom.reset({ selected: i})} />,
    { selected: 0 },
    { showState: true })
);
```

### Namespaces & Groups

Namespaces and groups are two ways of defining the same thing, they're just nested collections of cards. Namespaces are imperative whereas groups are scoped. Here's an example:

```javascript
ns('Buttons');
card('Primary Buttons', ...); // goes in the "Buttons" group

ns('Layout');
card('Flex', ...); // Goes in the "Layout" group

group('Getting Started', () => {
  card('Installation', ...); // Goes in the "Getting Started" group
});
```

Groups can be nested. However, the default theme only shows 2 levels of nesting.

```javascript
group('Basics', () => {
  ns('Colors');
  card('Primary Colors', ...); // Goes in the "Basics" -> "Getting Started" group
});
```


### Themes

Corkboard comes with a built-in theme. A theme is just a React Component that takes the state of all the cards and lays them out on the screen.

```javascript
import { render } from 'react-dom';
import Theme, { cards } from 'corkboard';

render(
  Theme({cards: cards()}),
  document.getElementById('app')
);
```

The data-structure of the cards looks like:

```javascript
Array<{|
  path: Array<string>,
  position: Array<number>,
  fn: () => ReactElement,
|}>
```

Which often ends up looking like:

```javascript
[
  {
    path: ['Basics', 'Colors'], // the cards path in the tree
    position: [0, 0], // the card's position in the current path
    fn: () => Card(), // a thunk that returns the card
  }
]
```

If you want to customize the look and feel of Corkboard you can always provide
your own custom theme.


## License

The MIT License (MIT)
Copyright (c) 2016 Christopher Lloyd

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
