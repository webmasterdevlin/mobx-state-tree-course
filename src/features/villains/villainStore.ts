import { EndPoints } from "axios/api-config";
import { deleteAxios, getAxios, postAxios } from "axios/generic-api-calls";
import {
  types,
  flow,
  getSnapshot,
  destroy,
  applySnapshot,
} from "mobx-state-tree";
import { VillainType } from "./villainType";

const VillainModel = types.model({
  id: types.identifier,
  firstName: types.string,
  lastName: types.string,
  house: types.string,
  knownAs: types.string,
});

export const VillainStore = types
  .model({
    villains: types.array(VillainModel),
    villain: types.maybe(VillainModel),
    loading: types.boolean,
  })
  .actions((self) => ({
    /*non-async actions*/
    softDeleteVillainAction: function (villain: VillainType) {
      destroy(villain);
    },

    /*async actions*/
    // pessimistic update
    getVillainsAction: flow(function* () {
      self.loading = true;
      try {
        const { data } = yield getAxios(EndPoints.villains);
        self.villains = data;
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
    deleteVillainAction: flow(function* (villain: VillainType) {
      const previous = getSnapshot(self.villains);
      destroy(villain);
      try {
        yield deleteAxios(EndPoints.villains, villain.id);
      } catch (e) {
        alert("Something happened. Please try again later.");
        applySnapshot(self.villains, previous);
      }
    }),
    postVillainAction: flow(function* (villain: VillainType) {
      try {
        const data = (yield postAxios(EndPoints.villains, villain)).data;
        self.villains.push(data);
      } catch (e) {
        alert("Something happened. Please try again later.");
      }
    }),
  }))
  .views((self) => ({
    /*computed or derived values*/
    get totalVillainsCount() {
      return self.villains.length;
    },
  }));
