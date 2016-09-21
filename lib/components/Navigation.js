import React, { PropTypes } from 'react';
import { Link } from 'react-router';

function NavLink(props, context) {
  const { activeClassName, inactiveClassName, ...otherProps } = props;
  const isActive = context.router.isActive(props.to, true);
  const className = isActive ? activeClassName : inactiveClassName;

  return <Link {...otherProps} className={[props.className, className].join(' ')} />;
}

NavLink.propTypes = {
  className: PropTypes.string.isRequired,
  activeClassName: PropTypes.string.isRequired,
  inactiveClassName: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

NavLink.contextTypes = {
  router: PropTypes.object.isRequired,
};

export default function Navigation(props, context) {
  const { router } = context;
  const { cards, location } = props;
  const links = Object.keys(cards).map((ns, i) =>
    <NavLink
      to={`/${ns}`}
      className="sans-serif text-l bold px2 block no-underline mb1"
      key={i}
      inactiveClassName="gray blue-hover"
      activeClassName="dark-gray"
    >
      {ns}
    </NavLink>
  );
  const options = Object.keys(cards).map((ns, i) => {
    const to = `/${ns}`;
    return <option value={to} key={i}>{ns}</option>;
  });

  return (
    <div>
      <div className="md-hide lg-hide p2">
        <select
          className="block col-12"
          defaultValue={location.pathname}
          onChange={(e) => router.push(e.target.value)}
        >
          {options}
        </select>
      </div>
      <div className="xs-hide sm-hide py2 gray">
        {links}
      </div>
    </div>
  );
}

Navigation.contextTypes = {
  router: PropTypes.object.isRequired,
};

Navigation.propTypes = {
  cards: PropTypes.any,
  location: PropTypes.object,
};
