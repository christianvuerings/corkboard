import { merge, style } from 'glamor';
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { sansSerif } from './styles';

function navtree(cards) {
  /* eslint-disable no-param-reassign */
  return cards.reduce((groups, card) => {
    const pos = card.position[0];
    switch (card.path.length) {
      case 2:
        groups[pos] = groups[pos] || {
          type: 'group',
          name: card.path[0],
          links: [],
        };
        groups[pos].links[card.position[1]] = {
          type: 'link',
          name: card.path[1],
        };
        return groups;
      case 1:
        groups[pos] = {
          type: 'link',
          name: card.path[0],
        };
        return groups;
      default:
        return groups;
    }
  }, []);
  /* eslint-enable no-param-reassign */
}

// --

function ActiveLink(props, context) {
  const { activeClassName, inactiveClassName, children, ...otherProps } = props;
  const isActive = context.router.isActive(props.to, true);
  const className = isActive ? activeClassName : inactiveClassName;

  return (
    <Link {...otherProps} className={[props.className, className].join(' ')}>
      {children}
    </Link>
  );
}

ActiveLink.propTypes = {
  children: PropTypes.node,
  className: PropTypes.shape({}).isRequired,
  activeClassName: PropTypes.shape({}).isRequired,
  inactiveClassName: PropTypes.shape({}).isRequired,
  to: PropTypes.string.isRequired,
};

ActiveLink.contextTypes = {
  router: PropTypes.object.isRequired,
};

// --

const navLinkStyle = merge(
  sansSerif,
  style({
    display: 'block',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    textDecoration: 'none',
    fontSize: 15,
    lineHeight: 1.5,
  })
);

const activeStyle = style({
  color: '#000',
});

const inactiveStyle = style({
  color: '#CCC',
  ':hover': {
    color: '#325DFF',
  },
});

function NavLink(props) {
  const { name } = props;
  return (
    <ActiveLink
      to={`/${name}`}
      // "sans-serif text-l bold px2 block no-underline mb1"
      className={navLinkStyle}
      // pine
      activeClassName={activeStyle}
      // "gray dark-gray-hover"
      inactiveClassName={inactiveStyle}
    >
      {name}
    </ActiveLink>
  );
}

NavLink.propTypes = {
  name: PropTypes.string.isRequired,
};

// --

function Group(props) {
  const { name, links } = props;

  return (
    <div className="mb2">
      <div className="px2">
        <div className="sans-serif text-s bold mt4 py2 mb2 slate border-bottom">
          {name}
        </div>
      </div>
      {links.map((link, i) => <NavLink {...link} key={i} />)}
    </div>
  );
}

Group.propTypes = {
  name: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(PropTypes.shape(NavLink.propTypes)),
};

// --

export default function Navigation(props, context) {
  const { router } = context;
  const { cards } = props;
  const pathname = props.location.pathname;

  /* Links for menu on large screens */
  const nav = navtree(cards);

  /* Native dropdown options. No groups apply */
  const nativeSelectOptions = Array.from(
    new Set(cards.map(card => (card.path[card.path.length - 1])))
  ).map((pageTitle, idx) =>
    <option value={`/${pageTitle}`} key={idx}>{pageTitle}</option>
  );

  return (
    <div>
      <div
        className={style({
          paddingLeft: '1rem',
          paddingRight: '1rem',
          marginBottom: '1rem',
          '@media(min-width:480px)': { display: 'none' },
        })}
      >
        <select
          className={style({ display: 'block', width: '100%' })}
          defaultValue={pathname}
          onChange={e => router.push(e.target.value)}
        >
          {nativeSelectOptions}
        </select>
      </div>


      <div className="xs-hide sm-hide py2 gray">
        {nav.map((item, i) => {
          switch (item.type) {
            case 'link':
              return <NavLink {...item} key={i} />;
            case 'group':
              return <Group {...item} key={i} />;
            default:
              return <div key={i} />;
          }
        })}
      </div>
    </div>
  );
}

Navigation.contextTypes = {
  router: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

Navigation.propTypes = {
  /* @chrislloyd */
  /* eslint-disable react/forbid-prop-types */
  cards: PropTypes.any,
  /* eslint-enable react/forbid-prop-types */
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};
