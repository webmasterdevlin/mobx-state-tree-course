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
  })
  .actions((self) => ({
    /*non-async actions*/
    softDeleteHeroAction: function (hero: HeroType) {
      destroy(hero);
    },

    /*async actions*/
    // pessimistic update
    getHeroesAction: flow(function* () {
      self.loading = true;
      try {
        const { data } = yield getAxios(EndPoints.heroes);
        self.heroes = data;
      } catch (e) {
        alert("Something happened. Please try again later.");
      }
      self.loading = false;
    }),

    /*
     optimistic update
     In tests, console.warn will appear but ignore it.
     Error: [mobx-state-tree] You are trying to read or write to an object that is no longer part of a state tree.
   */
    deleteHeroAction: flow(function* (hero: HeroType) {
      const previous = getSnapshot(self.heroes);
      destroy(hero);
      try {
        yield deleteAxios(EndPoints.heroes, hero.id);
      } catch (e) {
        alert("Something happened. Please try again later.");
        applySnapshot(self.heroes, previous);
      }
    }),
    postHeroAction: flow(function* (hero: HeroType) {
      try {
        const data = (yield postAxios(EndPoints.heroes, hero)).data;
        self.heroes.push(data);
      } catch (e) {
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
