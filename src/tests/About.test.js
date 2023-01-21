import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../pages/About';

describe('A pagina About contem as informações da pokédex', () => {
  it('na Pagina About tem quer uma teg h2 com text About Pokédex', () => {
    renderWithRouter(<About />);

    const about = screen.getByRole('heading', { level: 2 });
    expect(about).toHaveTextContent('About Pokédex');
  });

  it('na Pagina About tem quer as informações da pokédex', () => {
    renderWithRouter(<About />);
    const paragraph1 = 'This application simulates a Pokédex, a digital encyclopedia containing all Pokémon';
    const paragraph2 = 'One can filter Pokémon by type, and see more details for each one of them';
    expect(screen.getByText(paragraph1)).toBeInTheDocument();
    expect(screen.getByText(paragraph2)).toBeInTheDocument();
  });

  it('na pagina About tem que conter a imagem da pokédex', () => {
    renderWithRouter(<About />);
    const url = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', url);
  });
});
