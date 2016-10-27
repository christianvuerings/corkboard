import React from 'react';
import { render } from 'react-dom';
import Corkboard, { group, card, cards, md } from 'corkboard/src/index';

function Button(props) {
  const style = {
    backgroundColor: '#EF421E',
    color: '#FFF',
    border: 'none',
    borderRadius: 6,
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: 16,
  };
  return <button style={style}>{props.children}</button>;
}

group('Button', () => {
  card('Button', md`
Buttons let a user initiate behavior with a tap. You communicate a button’s function through a textual label or with an image. Your app changes button appearance based upon user touch interactions, using highlighting, changes in the label or image, color, and state to indicate the button action dynamically.

## Purpose

Buttons allow users to:

* Initiate behavior with a tap
* Initiate an action in the app with a single simple gesture

## Customizing

### Making Buttons Accessible

Buttons are accessible by default. The default accessibility traits for a button are Button and User Interaction Enabled.

The accessibility label, traits, and hint are spoken back to the user when VoiceOver is enabled on a device. The button’s title overwrites its accessibility label; even if you set a custom value for the label, VoiceOver speaks the value of the title. VoiceOver speaks this information when a user taps the button once. For example, when a user taps the Options button in Camera, VoiceOver speaks the following:

> "Options. Button. Shows additional camera options."


### Internationalizing Buttons

To internationalize a button, you must provide localized strings for its title text.


`,
  <Button>Hello world</Button>);
});

const el = document.createElement('DIV');
document.body.appendChild(el);
render(
  Corkboard({
    name: 'Corkboard Example',
    cards: cards(),
  }), el);
