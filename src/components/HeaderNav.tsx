import React from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useMst } from "../store";

/* observer converts components into reactive components*/
const HeaderNav = observer(() => {
  const { antiHeroStore, heroStore } = useMst();

  return (
    <nav className="sticky-top navbar navbar-expand-lg navbar-light bg-light mb-5">
      <div className="container-fluid">
        <span className="navbar-brand me-5">
          <Link className="nav-link" to="/">
            <li className="fas fa-database me-1" />
            MST Course
          </Link>
        </span>

        <ul className="navbar-nav me-5">
          <li className="nav-item">
            <Link className="nav-link" to="/heroes">
              Heroes
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/anti-heroes">
              AntiHeroes
            </Link>
          </li>
        </ul>

        <span className="me-5" style={{ color: "purple" }}>
          Total heroes: {heroStore.totalHeroesCount}
        </span>
        <span className="me-5" style={{ color: "purple" }}>
          Total anti-heroes: {antiHeroStore.totalAntiHeroesCount}
        </span>
        <span className="me-5" style={{ color: "purple" }}>
          s Last Edited Hero: {heroStore.hero.firstName}
        </span>
        <span className="me-5" style={{ color: "purple" }}>
          Last Edited AntiHero: {antiHeroStore.antiHero.firstName}
        </span>
      </div>
    </nav>
  );
});
export default HeaderNav;
