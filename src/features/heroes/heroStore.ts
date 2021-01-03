import { types, flow, getSnapshot, destroy } from "mobx-state-tree";
import {
  deleteHeroAxios,
  getHeroesAxios,
  postHeroAxios,
  putHeroAxios,
} from "./heroService";
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
    getHeroesAction: flow(function* () {
      self.loading = true;
      try {
        self.heroes = (yield getHeroesAxios()).data;
      } catch (e) {
        console.log(e);
        alert("Something happened. Please try again later.");
      }
      self.loading = false;
    }),
    deleteHeroAction: flow(function* (hero: HeroType) {
      const previous = getSnapshot(self.heroes);
      destroy(hero); // optimistic update
      try {
        yield deleteHeroAxios(hero.id);
      } catch (e) {
        console.log(e);
        alert("Something happened. Please try again later.");
      }
    }),
    postHeroAction: flow(function* (hero: HeroType) {
      try {
        const data = (yield postHeroAxios(hero)).data;
        self.heroes.push(data);
      } catch (e) {
        console.log(e);
        alert("Something happened. Please try again later.");
      }
    }),
    putHeroAction: flow(function* (hero: HeroType) {
      try {
        yield putHeroAxios(hero);
        const index = self.heroes.findIndex((ah) => ah.id == hero.id);
        self.heroes[index] = hero;
      } catch (e) {
        console.log(e);
        alert("Something happened. Please try again later.");
      }
    }),
    setHeroAction: function (hero: HeroType) {
      self.hero = hero;
    },
  }))
  .views((self) => ({
    get totalHeroesCount() {
      return self.heroes.length;
    },
  }));
