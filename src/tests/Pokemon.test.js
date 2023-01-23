import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';
import data from '../data';

const modeDetail = 'More details';
describe('testes do componente pokemon', () => {
  const pikachu = data[0];
  it('O nome correto do Pokémon deve ser mostrado na tela', () => {
    renderWithRouter(
      <Pokemon
        pokemon={ pikachu }
        isFavorite
      />,
    );
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent(pikachu.name);
  });

  it('O tipo correto do Pokémon deve ser mostrado na tela', () => {
    renderWithRouter(
      <Pokemon
        pokemon={ pikachu }
        isFavorite
      />,
    );
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent(pikachu.type);
  });

  it('O peso médio do Pokémon deve ser exibido com um texto no formato Average weight: <value> <measurementUnit>;', () => {
    renderWithRouter(
      <Pokemon
        pokemon={ pikachu }
        isFavorite
      />,
    );
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');
  });

  it('A imagem do Pokémon deve ser exibida.', () => {
    renderWithRouter(
      <Pokemon
        pokemon={ pikachu }
        isFavorite
      />,
    );
    const { image } = pikachu;
    const pokemonImg = screen.getByRole('img', { name: 'Pikachu sprite' });
    expect(pokemonImg).toHaveAttribute('src', image);
    expect(pokemonImg).toHaveAttribute('alt', 'Pikachu sprite');
  });

  it('O componente deve ter um link que direciona para um pagina do PokemonDetail', () => {
    renderWithRouter(
      <Pokemon
        pokemon={ pikachu }
        isFavorite
      />,
    );
    const getLink = screen.getByText(modeDetail);
    expect(getLink).toHaveAttribute('href', '/pokemon/25');
  });

  it('A URL exibida no navegador deve muda para /pokemon/<id>', () => {
    const { history } = renderWithRouter(
      <Pokemon
        pokemon={ pikachu }
        isFavorite
      />,
    );
    const getLink = screen.getByText(modeDetail);
    userEvent.click(getLink);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/pokemon/25');
  });

  it('deve aparecer um ícone de estrela nos Pokémon favoritados', () => {
    renderWithRouter(
      <Pokemon
        pokemon={ pikachu }
        isFavorite
      />,
    );
    const pokemonImg = screen.getByRole('img', { name: 'Pikachu is marked as favorite' });
    expect(pokemonImg).toHaveAttribute('src', '/star-icon.svg');
  });
});
