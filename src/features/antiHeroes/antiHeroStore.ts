import { types, flow } from "mobx-state-tree";
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
      // self.loading = true;
      try {
        self.antiHeroes = (yield getAntiHeroesAxios()).data;
      } catch (e) {
        console.log(e);
        alert("Something happened. Please try again later.");
      }
      // self.loading = false;
    }),
    removeAntiHeroAction: flow(function* (id: string) {
      try {
        yield deleteAntiHeroAxios(id);
        self.antiHeroes.filter((ah) => ah.id !== id);
      } catch (e) {
        console.log(e);
        alert("Something happened. Please try again later.");
      }
    }),
    addAntiHeroAction: flow(function* (antiHero: AntiHeroType) {
      try {
        const data = (yield postAntiHeroAxios(antiHero)).data;
        self.antiHeroes.push(data);
      } catch (e) {
        console.log(e);
        alert("Something happened. Please try again later.");
      }
    }),
    updateAntiHeroAction: flow(function* (antiHero: AntiHeroType) {
      try {
        const data = (yield putAntiHeroAxios(antiHero)).data;
      } catch (e) {
        console.log(e);
        alert("Something happened. Please try again later.");
      }
    }),
    selectAntiHeroAction: flow(function* (antiHero: AntiHeroType) {
      // self.antiHero = antiHero;
    }),
  }));
