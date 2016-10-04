/* eslint react/no-unused-prop-types: 0 */
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import {
    getTopLevelMenuTitles,
    isInGroup,
    getPagesForTopLevelMenuTitle,
    getPageTitlesForTopLevelMenuTitle,
} from '../../index';

function NavLink(props, context) {
  const { activeClassName, inactiveClassName, children, ...otherProps } = props;
  const isActive = context.router.isActive(props.to, true);
  const className = isActive ? activeClassName : inactiveClassName;

  return (
    <Link {...otherProps} className={[props.className, className].join(' ')}>
      {children}
    </Link>
  );
}

NavLink.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string.isRequired,
  activeClassName: PropTypes.string.isRequired,
  inactiveClassName: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

NavLink.contextTypes = {
  router: PropTypes.object.isRequired,
};

// TODO(juliac): toggle children on click of title
function SubMenu(props) {
  const { title, children } = props;

  return (
    <div>
      <div className="sans-serif text-l bold px2 block mb1">
        {title}
      </div>
      <div className="px2">
        {children}
      </div>
    </div>
  );
}

SubMenu.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default function Navigation(props, context) {
  const { router } = context;
  const { location } = props;

  /* Links for menu on large screens */

  const menuTitles = getTopLevelMenuTitles();

  const fancyNavBar = menuTitles.map((menuTitle, i) => {
    const pageTitles = getPageTitlesForTopLevelMenuTitle(menuTitle);
    const navLinks = pageTitles.map((title, idx) =>
      <NavLink
        to={`/${title}`}
        className="sans-serif text-l bold px2 block no-underline mb1"
        key={idx}
        inactiveClassName="gray blue-hover"
        activeClassName="dark-gray"
      >
        {title}
      </NavLink>
    );

    /* Create submenu if we are dealing with a group of items*/
    if (isInGroup(menuTitle)) {
      return (
        <SubMenu title={menuTitle} key={i}>
          {navLinks}
        </SubMenu>
      );
    }
    return navLinks;
  });

  /* Native dropdown options. No groups apply */
  const nativeSelectOptions = menuTitles.map((menuTitle) => {
    const pages = getPagesForTopLevelMenuTitle(menuTitle);
    const options = pages.map((pageTitle, idx) =>
      <option value={`/${pageTitle}`} key={idx}>{pageTitle}</option>
    );
    return options;
  });


  return (
    <div>
      <div className="md-hide lg-hide p2">
        <select
          className="block col-12"
          defaultValue={location.pathname}
          onChange={e => router.push(e.target.value)}
        >
          {nativeSelectOptions}
        </select>
      </div>


      <div className="xs-hide sm-hide py2 gray">
        {fancyNavBar}
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
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};
