import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../pages/NotFound';

describe('testes da page NotFound', () => {
  it('A deve conter um h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);
    const notFound = screen.getByRole('heading', { level: 2 });
    expect(notFound).toHaveTextContent('Page requested not found');
  });

  it('A pagina deve conte a imagem selecionada', () => {
    renderWithRouter(<NotFound />);
    const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const getImg = screen.getByRole('img');
    expect(getImg).toHaveAttribute('src', url);
  });
});
