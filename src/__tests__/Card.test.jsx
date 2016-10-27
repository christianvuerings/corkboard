/* eslint-env jest */
import React from 'react';
import { parseArgs } from '../Card';

describe('parseArgs', () => {
  it('defcard([title])', () => {
    expect(parseArgs(['Foo'])).toEqual({
      name: 'Foo',
      parts: [],
      stacked: false,
    });
  });

  it('parseArgs([title, node])', () => {
    expect(parseArgs(['Foo', <div />])).toEqual({
      name: 'Foo',
      parts: [<div />],
      stacked: false,
    });
  });

  it('parseArgs([title, node, node])', () => {
    expect(parseArgs(['Foo', <div />, <div />])).toEqual({
      name: 'Foo',
      parts: [<div />, <div />],
      stacked: false,
    });
  });

  it('parseArgs([title, options])', () => {
    expect(parseArgs(['Foo', { custom: true }])).toEqual({
      name: 'Foo',
      parts: [],
      custom: true,
      stacked: false,
    });
  });

  it('parseArgs([title, node, options])', () => {
    expect(parseArgs(['Foo', <div />, { custom: true }])).toEqual({
      name: 'Foo',
      parts: [<div />],
      custom: true,
      stacked: false,
    });
  });
});
