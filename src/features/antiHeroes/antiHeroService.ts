import { api, Endpoints } from "api/axios-config";
import { AntiHeroType } from "./antiHeroType";

export async function getAntiHeroesAxios() {
  return await api.get<AntiHeroType[]>(Endpoints.antiHeroes);
}

export async function deleteAntiHeroAxios(id: string) {
  return await api.delete<void>(`${Endpoints.antiHeroes}/${id}`);
}

export async function postAntiHeroAxios(antiHero: AntiHeroType) {
  return await api.post<AntiHeroType>(Endpoints.antiHeroes, antiHero);
}

export async function putAntiHeroAxios(antiHero: AntiHeroType) {
  return await api.put<void>(
    `${Endpoints.antiHeroes}/${antiHero.id}`,
    antiHero
  );
}
