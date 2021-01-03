import { types, flow, getSnapshot, destroy } from "mobx-state-tree";
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
    antiHero: types.maybeNull(AntiHeroModel),
    loading: types.boolean,
    error: types.string,
  })
  .actions((self) => ({
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
    deleteAntiHeroAction: flow(function* (antiHero: AntiHeroType) {
      const previous = getSnapshot(self.antiHeroes);
      destroy(antiHero); // optimistic update
      try {
        yield deleteAntiHeroAxios(antiHero.id);
      } catch (e) {
        console.log(e);
        alert("Something happened. Please try again later.");
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
        const data = (yield putAntiHeroAxios(antiHero)).data;
      } catch (e) {
        console.log(e);
        alert("Something happened. Please try again later.");
      }
    }),
    setAntiHeroAction: flow(function* (antiHero: AntiHeroType) {
      // self.antiHero = antiHero;
    }),
  }))
  .views((self) => ({
    get totalAntiHeroesCount() {
      return self.antiHeroes.length;
    },
  }));
