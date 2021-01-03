import {
  types,
  flow,
  getSnapshot,
  destroy,
  applySnapshot,
} from "mobx-state-tree";
import {
  deleteAntiHeroAxios,
  getAntiHeroesAxios,
  postAntiHeroAxios,
  putAntiHeroAxios,
} from "./antiHeroService";
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
    setAntiHeroAction: function (antiHero: AntiHeroType) {
      self.antiHero = { ...antiHero };
    },
    /*async actions*/
    // pessimistic update
    getAntiHeroesAction: flow(function* () {
      self.loading = true;
      try {
        self.antiHeroes = (yield getAntiHeroesAxios()).data;
      } catch (e) {
        console.log(e);
        alert("Something happened. Please try again later.");
      }
      self.loading = false;
    }),
    // optimistic update
    deleteAntiHeroAction: flow(function* (antiHero: AntiHeroType) {
      const previous = getSnapshot(self.antiHeroes);
      destroy(antiHero);
      try {
        yield deleteAntiHeroAxios(antiHero.id);
      } catch (e) {
        console.log(e);
        alert("Something happened. Please try again later.");
        applySnapshot(self.antiHeroes, previous);
      }
    }),
    postAntiHeroAction: flow(function* (antiHero: AntiHeroType) {
      try {
        const data = (yield postAntiHeroAxios(antiHero)).data;
        self.antiHeroes.push(data);
      } catch (e) {
        console.log(e);
        alert("Something happened. Please try again later.");
      }
    }),
    putAntiHeroAction: flow(function* (antiHero: AntiHeroType) {
      try {
        yield putAntiHeroAxios(antiHero);
        const index = self.antiHeroes.findIndex((ah) => ah.id == antiHero.id);
        self.antiHeroes[index] = antiHero;
      } catch (e) {
        console.log(e);
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
