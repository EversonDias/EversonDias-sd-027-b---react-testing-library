import React from 'react';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('testes da barra de navegação', () => {
  it('A barra de navegação deve conter um link Home', () => {
    renderWithRouter(<App />);
    const home = screen.getByText('Home');
    expect(home).toBeInTheDocument();
  });

  it('A barra de navegação deve conter um link About', () => {
    renderWithRouter(<App />);
    const about = screen.getByText('About');
    expect(about).toBeInTheDocument();
  });

  it('A barra de navegação deve conter um link Favorite Pokémon', () => {
    renderWithRouter(<App />);
    const favoritePokemon = screen.getByText('Favorite Pokémon');
    expect(favoritePokemon).toBeInTheDocument();
  });

  it('O link Home de direcionar para pagina Home', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByText('Home');
    userEvent.click(home);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });

  it('O link About de direcionar para pagina About', () => {
    const { history } = renderWithRouter(<App />);
    const about = screen.getByText('About');
    userEvent.click(about);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/about');
  });

  it('O link Favorite Pokémon de direcionar para pagina Favorite Pokémon', () => {
    const { history } = renderWithRouter(<App />);
    const favoritePokemon = screen.getByText('Favorite Pokémon');
    userEvent.click(favoritePokemon);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorites');
  });

  it('Ao digita uma rota que não exite deve ser direcionado para pagina not Found', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/user');
    });
    const notFound = screen.getByText('Page requested not found');
    expect(notFound).toBeInTheDocument();
  });
});
