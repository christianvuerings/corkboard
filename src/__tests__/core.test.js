/* eslint-env jest */

import {
  init,
  pushPath,
  popPath,
} from '../core';

/* @chrislloyd */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
const { check, gen } = require('jest-check');
/* eslint-enable import/no-extraneous-dependencies */
/* eslint-enable import/no-unresolved */

const genCommands = gen.array(
  gen.oneOf([
    gen.array([gen.return(pushPath), gen.string]),
    gen.array([gen.return(popPath)]),
  ])
);

check.it('push and pop correctly modify depth', { times: 10 }, [genCommands], (cmds) => {
  const subject = cmds.reduce(
    (tree, [cmd, ...args]) => cmd(...args, tree),
    init()
  );

  const depth = cmds.reduce((sum, cmd) => {
    switch (cmd[0]) {
      case pushPath:
        return sum + 1;
      case popPath:
        return Math.max(sum - 1, 0);
      default:
        return sum;
    }
  }, 0);
  expect(subject.path.length).toEqual(depth);
});
