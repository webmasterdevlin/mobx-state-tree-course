import { EndPoints } from "axios/api-config";
import { deleteAxios, getAxios, postAxios } from "axios/generic-api-calls";
import {
  types,
  flow,
  getSnapshot,
  destroy,
  applySnapshot,
} from "mobx-state-tree";
import { HeroType } from "./heroType";

const HeroModel = types.model({
  id: types.identifier,
  firstName: types.string,
  lastName: types.string,
  house: types.string,
  knownAs: types.string,
});

export const HeroStore = types
  .model({
    heroes: types.array(HeroModel),
    hero: types.maybe(HeroModel),
    loading: types.boolean,
    error: types.string,
  })
  .actions((self) => ({
    /*non-async actions*/
    setHeroAction: function (hero: HeroType) {
      self.hero = { ...hero };
    },

    /*async actions*/
    // pessimistic update
    getHeroesAction: flow(function* () {
      self.loading = true;
      try {
        self.heroes = (yield getAxios(EndPoints.heroes)).data;
      } catch (e) {
        console.log(e);
        alert("Something happened. Please try again later.");
      }
      self.loading = false;
    }),
    softDeleteHeroAction: function (hero: HeroType) {
      destroy(hero);
    },
    // optimistic update
    deleteHeroAction: flow(function* (hero: HeroType) {
      const previous = getSnapshot(self.heroes);
      destroy(hero);
      try {
        yield deleteAxios(EndPoints.heroes, hero.id);
      } catch (e) {
        console.log(e);
        alert("Something happened. Please try again later.");
        applySnapshot(self.heroes, previous);
      }
    }),
    postHeroAction: flow(function* (hero: HeroType) {
      try {
        const data = (yield postAxios(EndPoints.heroes, hero)).data;
        self.heroes.push(data);
      } catch (e) {
        console.log(e);
        alert("Something happened. Please try again later.");
      }
    }),
  }))
  .views((self) => ({
    /*computed or derived values*/
    get totalHeroesCount() {
      return self.heroes.length;
    },
  }));
