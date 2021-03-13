import { EndPoints } from "axios/api-config";
import { deleteAxios, getAxios, postAxios } from "axios/generic-api-calls";
import {
  types,
  flow,
  getSnapshot,
  destroy,
  applySnapshot,
} from "mobx-state-tree";
import { AntiHeroType } from "./antiHeroType";

const AntiHeroModel = types.model({
  id: types.identifier,
  firstName: types.string,
  lastName: types.string,
  house: types.string,
  knownAs: types.string,
});

export const AntiHeroStore = types
  .model({
    antiHeroes: types.array(AntiHeroModel),
    antiHero: types.maybe(AntiHeroModel),
    loading: types.boolean,
    error: types.string,
  })
  .actions((self) => ({
    /*non-async actions*/
    softDeleteAntiHeroAction: function (antiHero: AntiHeroType) {
      destroy(antiHero);
    },

    /*async actions*/
    // pessimistic update
    getAntiHeroesAction: flow(function* () {
      self.loading = true;
      try {
        const { data } = yield getAxios<AntiHeroType[]>(EndPoints.antiHeroes);
        self.antiHeroes = data;
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
    deleteAntiHeroAction: flow(function* (antiHero: AntiHeroType) {
      const previous = getSnapshot(self.antiHeroes);
      destroy(antiHero);
      try {
        yield deleteAxios(EndPoints.antiHeroes, antiHero.id);
      } catch (e) {
        alert("Something happened. Please try again later.");
        applySnapshot(self.antiHeroes, previous);
      }
    }),
    postAntiHeroAction: flow(function* (antiHero: AntiHeroType) {
      try {
        const data = (yield postAxios(EndPoints.antiHeroes, antiHero)).data;
        self.antiHeroes.push(data);
      } catch (e) {
        alert("Something happened. Please try again later.");
      }
    }),
  }))
  .views((self) => ({
    /*computed or derived values*/
    get totalAntiHeroesCount() {
      return self.antiHeroes.length;
    },
  }));
