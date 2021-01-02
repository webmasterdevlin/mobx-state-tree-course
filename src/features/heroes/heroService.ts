import { api, Endpoints } from "api/axios-config";
import { HeroType } from "./heroType";

export async function getHeroesAxios() {
  return await api.get<HeroType[]>(Endpoints.heroes);
}

export async function deleteHeroAxios(id: string) {
  return await api.delete<void>(`${Endpoints.heroes}/${id}`);
}

export async function postHeroAxios(hero: HeroType) {
  return await api.post<HeroType>(Endpoints.heroes, hero);
}

export async function putHeroAxios(hero: HeroType) {
  return await api.put<void>(`${Endpoints.heroes}/${hero.id}`, hero);
}
