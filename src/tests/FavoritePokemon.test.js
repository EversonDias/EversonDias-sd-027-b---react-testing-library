import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Favorite from '../pages/FavoritePokemon';

describe('test funcional da page favorite pokemon', () => {
  it('se não tiver pokemon favorito deve aparecer a mensagem No favorite pokemon found', () => {
    renderWithRouter(<Favorite />);
    const message = 'No favorite Pokémon found';
    const messageInScreen = screen.getByText(message);
    expect(messageInScreen).toBeInTheDocument();
  });

  it('mostre somente os pokemons favoritos', () => {
    const list = [
      {
        id: 25,
        name: 'Pikachu',
        type: 'Electric',
        averageWeight: {
          value: '6.0',
          measurementUnit: 'kg',
        },
        image: 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png',
        moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
        foundAt: [
          {
            location: 'Kanto Viridian Forest',
            map: 'https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png',
          },
          {
            location: 'Kanto Power Plant',
            map: 'https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png',
          },
        ],
        summary: 'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.',
      },
    ];
    renderWithRouter(<Favorite pokemonList={ list } />);
    expect(screen.getByTestId('pokemon-name')).toBeInTheDocument();
  });
});
