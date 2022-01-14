import { Pokemon } from "./Pokemon";

export interface IPokemonService {
  list(): Promise<Pokemon[]>
  add(ticket: Pokemon): Promise<void>
}

export const exampleTickets: Pokemon[] = [{
  id: '1',
  name: 'Pikachu',
  color: 'Yellow',
  level: 23
}]

export class PokemonService implements IPokemonService {
  list(): Promise<Pokemon[]> {
    return new Promise<Pokemon[]>(resolve => resolve(exampleTickets))
  }
  add(ticket: Pokemon): Promise<void> {
    return new Promise<void>(resolve => {
      exampleTickets.push(ticket);
      return resolve();;
    });
  }
}