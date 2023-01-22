import React from 'react';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../pages/Pokedex';
import pokemonList from '../data';

const isFavorite = {};

describe('testes do componente pokedex', () => {
  it('A pagina deve conter um H2 com texto Encountered Pokémon', () => {
    renderWithRouter(
      <Pokedex
        pokemonList={ pokemonList }
        isPokemonFavoriteById={ isFavorite }
      />,
    );
    const getText = screen.getByRole('heading', { level: 2 });
    expect(getText).toHaveTextContent('Encountered Pokémon');
  });

  it('Na pagina deve conter um botão com texto Próximo Pokémon', () => {
    renderWithRouter(
      <Pokedex
        pokemonList={ pokemonList }
        isPokemonFavoriteById={ isFavorite }
      />,
    );
    const getButtonText = screen.getByTestId('next-pokemon');
    expect(getButtonText).toHaveTextContent('Próximo Pokémon');
  });

  it('Os próximos Pokémon da lista devem ser mostrados, um a um, ao clicar sucessivamente no botão', () => {
    renderWithRouter(
      <Pokedex
        pokemonList={ pokemonList }
        isPokemonFavoriteById={ isFavorite }
      />,
    );
    const { name } = pokemonList[1];
    const getButtonText = screen.getByTestId('next-pokemon');
    userEvent.click(getButtonText);
    const pokemon = screen.getByTestId('pokemon-name');
    expect(pokemon).toHaveTextContent(name);
  });

  it('O primeiro Pokémon da lista deve ser mostrado ao clicar no botão, se estiver no último Pokémon da lista.', () => {
    renderWithRouter(
      <Pokedex
        pokemonList={ pokemonList }
        isPokemonFavoriteById={ isFavorite }
      />,
    );
    const length = 9;
    for (let index = 0; index < length; index += 1) {
      if (index === 8) {
        const getButtonText = screen.getByTestId('next-pokemon');
        userEvent.click(getButtonText);
        const pokemon = screen.getByTestId('pokemon-name');
        expect(pokemon).toHaveTextContent('Pikachu');
      } else {
        const { name } = pokemonList[index + 1];
        const getButtonText = screen.getByTestId('next-pokemon');
        userEvent.click(getButtonText);
        const pokemon = screen.getByTestId('pokemon-name');
        expect(pokemon).toHaveTextContent(name);
      }
    }
  });

  it('A pagina deve exibir apenas um pokemon por vez', () => {
    renderWithRouter(
      <Pokedex
        pokemonList={ pokemonList }
        isPokemonFavoriteById={ isFavorite }
      />,
    );
    const pokemon = screen.getByTestId('pokemon-name');
    expect(pokemon).toBeInTheDocument();
  });

  it('a Pokédex tem os botões de filtro', () => {
    renderWithRouter(
      <Pokedex
        pokemonList={ pokemonList }
        isPokemonFavoriteById={ isFavorite }
      />,
    );
    const pokemon = screen.getAllByTestId('pokemon-type-button');
    expect(pokemon).toHaveLength(7);
  });

  it('a seleção de typo de pokemon deve esta funcionando', () => {
    renderWithRouter(
      <Pokedex
        pokemonList={ pokemonList }
        isPokemonFavoriteById={ isFavorite }
      />,
    );
    const selectType = screen.getByRole('button', { name: 'Fire' });
    userEvent.click(selectType);
    const pokemon = screen.getByTestId('pokemon-type');
    expect(pokemon).toHaveTextContent('Fire');
    const getButtonText = screen.getByTestId('next-pokemon');
    userEvent.click(getButtonText);
    const pokemonNext = screen.getByTestId('pokemon-type');
    expect(pokemonNext).toHaveTextContent('Fire');
  });

  it('o Botão All precisa esta sempre visível', () => {
    renderWithRouter(
      <Pokedex
        pokemonList={ pokemonList }
        isPokemonFavoriteById={ isFavorite }
      />,
    );
    const selectType = screen.getByRole('button', { name: 'Fire' });
    userEvent.click(selectType);
    const pokemon = screen.getByText('All');
    expect(pokemon).toBeInTheDocument();
  });

  it('a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(
      <Pokedex
        pokemonList={ pokemonList }
        isPokemonFavoriteById={ isFavorite }
      />,
    );
    const selectType = screen.getByRole('button', { name: 'Fire' });
    userEvent.click(selectType);
    const selectAll = screen.getByRole('button', { name: 'All' });
    userEvent.click(selectAll);
    const pokemon = screen.getByTestId('pokemon-name');
    expect(pokemon).toHaveTextContent('Pikachu');
    const getButtonText = screen.getByTestId('next-pokemon');
    userEvent.click(getButtonText);
    expect(pokemon).toHaveTextContent('Charmander');
  });
});
