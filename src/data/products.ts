import type { ProductProps } from "../components/Product";

export const mockProducts: ProductProps[] = [
  {
    id: 1,
    category: 'Ropa',
    name: 'Camperon Largo Cafe',
    image: 'src/assets/camperon_mujer_cafe.jpg',
    price: '320 Bs',
    description: 'Camperan Largo Cafe para mujer , talla L ; muy caliente para el invierno marca yiyi'

  },
  {
    id: 2,
    category: 'Ropa',
    name: 'Camperon Celeste',
    image: 'src/assets/camperon_mujer_celeste.jpg',
    price: '250 Bs',
    description: 'Camperon estilo coreano color celeste, con peluche marca ping'
  },
  {
    id: 3,
    category: 'Ropa',
    name: 'Chamarra Jean',
    image: 'src/assets/chamarra_jean.jpg',
    price: '250 Bs',
    description: 'Chamarra Jean con corderito en el interior; marca wei para el frio'
  },
  {
    id: 4,
    category: 'Ropa',
    name: 'shirt jacket',
    image: 'src/assets/abrigo_mujer_con_friza.jpg',
    price: '230 Bs',
    description: 'Hermosa jacket estilo shirt a cuadros, perfecta para lucir bien en el invierno'
  },
  {
    id: 5,
    category: 'Ropa',
    name: 'Polera manga larga frizada',
    image: 'src/assets/polera_manga_larga_frizada.jpg',
    price: '50 Bs',
    description: 'Hermosa polera manga larga frizada , especial para tiempos frios'
  }
];
