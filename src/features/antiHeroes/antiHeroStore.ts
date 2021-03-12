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
    setAntiHeroAction: function (antiHero: AntiHeroType) {
      self.antiHero = { ...antiHero };
    },
    /*async actions*/
    // pessimistic update
    getAntiHeroesAction: flow(function* () {
      self.loading = true;
      try {
        self.antiHeroes = (yield getAxios<AntiHeroType[]>(
          EndPoints.antiHeroes
        )).data;
      } catch (e) {
        console.log(e);
        alert("Something happened. Please try again later.");
      }
      self.loading = false;
    }),
    softDeleteAntiHeroAction: function (antiHero: AntiHeroType) {
      destroy(antiHero);
    },
    // optimistic update
    deleteAntiHeroAction: flow(function* (antiHero: AntiHeroType) {
      const previous = getSnapshot(self.antiHeroes);
      destroy(antiHero);
      try {
        yield deleteAxios(EndPoints.antiHeroes, antiHero.id);
      } catch (e) {
        console.log(e);
        alert("Something happened. Please try again later.");
        applySnapshot(self.antiHeroes, previous);
      }
    }),
    postAntiHeroAction: flow(function* (antiHero: AntiHeroType) {
      try {
        const data = (yield postAxios(EndPoints.antiHeroes, antiHero)).data;
        self.antiHeroes.push(data);
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
