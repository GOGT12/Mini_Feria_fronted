

//////////////////////////////        Attribute Names          ///////////////////////////////


interface AttributeName{
  value: string;
  name: string;
  display_type : string;
}

const attributeNames: AttributeName[] = [
  {value: 'color', name: 'Color', display_type : 'color_swatch' },
  {value: 'talla-ropa-general', name: 'Talla Ropa (General)', display_type : 'text_swatch'},
  {value: 'talla-pantalon-hombre', name: 'Talla Pantalon Hombre', display_type : 'text_swatch'},
  {value: 'talla-pantalon-mujer', name: 'Talla Pantalon Mujer', display_type : 'text_swatch'},
  {value: 'talla-calzado', name: 'Talla Calzado (cm)', display_type : 'text_swatch'},
  {value: 'cantidad-unidades', name: 'Cantidad Unidades', display_type : 'text_swatch'},
  {value: 'material-textil', name: 'Material Textil', display_type : 'text_swatch'},

]

const productAbreviations = [
    {'pantalon': 'PA'},
    {'vestido': 'VE'},
    {'jean': 'JN'},
    {'chaqueta': 'CH'},
    {'shorts': 'SH'},
    {'zapatillas': 'ZA'},
    {'zapatos': 'ZO'},
    {'chinelas': 'CH'},
    {'polera': 'PO'},
    {'saco': 'SA'},
    {'abrigo': 'AB'},
    {'tacones': 'TA'},
    {'sudadera': 'SU'},
    {'blusa': 'BL'}
  ]
  const genreAbreviations = [
    {'mujer': 'M'},
    {'varona': 'M'},
    {'hombre': 'H'},
    {'varon': 'H'},
    {'niña': 'ÑA'},
    {'niño': 'ÑO'},
    {'dama': 'M'},
    {'caballero': 'H'},
    {'joven': 'H'},
    {'señorita': 'M'}
  ]

  const displayOptions = [
    {'color': 'color_swatch'},
    {'talla': 'text_swatch'},
    {'material': 'select'},
  ]

/////////////////////////////////////////         COLORS       //////////////////////////////////////////

// Definir la interfaz ColorOption
interface ColorOption {
  value: string;
  label: string;
  abrev: string;
  display_value: string;
  order: number;
}

// Lista de colores con sus valores, etiquetas, códigos display_valueadecimales y orden
const colorOptions: ColorOption[] = [
  // Básicos / Neutros
  { value: 'negro', label: 'Negro', abrev: 'NG', display_value: '#000000', order: 10 },
  { value: 'gris oscuro', label: 'Gris Oscuro', abrev: 'GO', display_value: '#333333', order: 20 },
  { value: 'gris', label: 'Gris', abrev: 'GR', display_value: '#808080', order: 30 },
  { value: 'gris claro', label: 'Gris Claro', abrev: 'GC', display_value: '#CCCCCC', order: 40 },
  { value: 'bl', label: 'Blanco', abrev: 'BL', display_value: '#FFFFFF', order: 50 },
  { value: 'blanco roto', label: 'Blanco Roto', abrev: 'BR', display_value: '#F5F5DC', order: 60 },
  { value: 'beige', label: 'Beige', abrev: 'BEI', display_value: '#F5F5DC', order: 70 },
  { value: 'crema', label: 'Crema', abrev: 'CRE', display_value: '#FFFDD0', order: 80 },
  { value: 'marron', label: 'Marrón', abrev: 'MAR', display_value: '#8B4513', order: 90 },
  { value: 'cananela', label: 'Canela', abrev: 'CAN', display_value: '#D2691E', order: 100 },
  { value: 'topo', label: 'Topo', abrev: 'TOP', display_value: '#4A4A4A', order: 110 },

  // Rojos / Rosados
  { value: 'rojo', label: 'Rojo', abrev: 'ROJ', display_value: '#FF0000', order: 200 },
  { value: 'guindo', label: 'Guindo (Rojo Vino)', abrev: 'GUI', display_value: '#800020', order: 210 },
  { value: 'fucsia', label: 'Fucsia', abrev: 'FUC', display_value: '#FF00FF', order: 220 },
  { value: 'rosado', label: 'Rosado', abrev: 'ROS', display_value: '#FFC0CB', order: 230 },
  { value: 'rosa palo', label: 'Rosa Palo', abrev: 'RP', display_value: '#FADADD', order: 240 },
  { value: 'coral', label: 'Coral', abrev: 'COR', display_value: '#FF7F50', order: 250 },

  // Azules / Verdes
  { value: 'azul', label: 'Azul', abrev: 'AZL', display_value: '#0000FF', order: 300 },
  { value: 'azul marino', label: 'Azul Marino', abrev: 'AM', display_value: '#000080', order: 310 },
  { value: 'celeste', label: 'Celeste', abrev: 'CEL', display_value: '#87CEEB', order: 320 },
  { value: 'turquesa', label: 'Turquesa', abrev: 'TUR', display_value: '#40E0D0', order: 330 },
  { value: 'aqua', label: 'Aqua', abrev: 'AQU', display_value: '#00FFFF', order: 340 },
  { value: 'bígaro', label: 'Bígaro', abrev: 'BIG', display_value: '#6699CC', order: 350 },
  { value: 'verde', label: 'Verde', abrev: 'VER', display_value: '#008000', order: 360 },
  { value: 'verde claro', label: 'Verde Claro', abrev: 'VC', display_value: '#90EE90', order: 370 },
  { value: 'verde lima', label: 'Verde Lima', abrev: 'VL', display_value: '#32CD32', order: 380 },
  { value: 'verde militar', label: 'Verde Militar', abrev: 'VM', display_value: '#6B8E23', order: 390 },
  { value: 'verde oscuro', label: 'Verde Oscuro', abrev: 'VO', display_value: '#006400', order: 400 },
  { value: 'menta', label: 'Menta', abrev: 'MEN', display_value: '#98FF98', order: 410 },

  // Amarillos / Naranjas
  { value: 'amarillo', label: 'Amarillo', abrev: 'AMA', display_value: '#FFFF00', order: 500 },
  { value: 'mostaza', label: 'Mostaza', abrev: 'MOS', display_value: '#FFDB58', order: 510 },
  { value: 'naranja', label: 'Naranja', abrev: 'NAR', display_value: '#FFA500', order: 520 },

  // Morados / Violetas
  { value: 'purpura', label: 'Purpura', abrev: 'PUR', display_value: '#800080', order: 600 },
  { value: 'lavanda', label: 'Lavanda', abrev: 'LAV', display_value: '#E6E6FA', order: 610 },
  { value: 'lila', label: 'Lila', abrev: 'LIL', display_value: '#C8A2C8', order: 620 },

  // Metálicos
  { value: 'dorado', label: 'Dorado', abrev: 'DOR', display_value: '#FFD700', order: 700 },
  { value: 'plateado', label: 'Plateado', abrev: 'PT', display_value: '#C0C0C0', order: 710 },
  { value: 'bronce', label: 'Bronce', abrev: 'BRC', display_value: '#CD7F32', order: 720 },
];


/////////////////////////////////////         TALLAS            /////////////////////////////////////////


interface TallaGeneral{
  value: string;
  label: string;
  display_value: string;
  order: number
}

const tallaGeneralOptions: TallaGeneral[] = [
  { value: '3xs', label: '3XS', display_value: 'talla xxxs', order: 0 },
  { value: 'xs', label: 'XS', display_value: 'talla xs', order: 10 },
  { value: 's', label: 'S', display_value: 'talla s', order: 20 },
  { value: 'p', label: 'P', display_value: 'talla p', order: 25},
  { value: 'm', label: 'M', display_value: 'talla m', order: 30 },
  { value: 'l', label: 'L', display_value: 'talla l', order: 40 },
  { value: 'g', label: 'G', display_value: 'talla g', order: 45},
  { value: 'xl', label: 'XL', display_value: 'talla xl', order: 50 },
  { value: 'xxl', label: 'XXL', display_value: 'talla xxl', order: 60 },
  { value: '3xl', label: '3XL', display_value: 'talla xxxl', order: 70 },
  { value: '4xl', label: '4XL', display_value: 'talla xxxxl', order: 80 },
  { value: 'u', label: 'Unica', display_value: 'Talla única', order: 90 }
];


interface TallaCalzado{
  value: string;
  label: string;
  display_value: string;
  order: number;
}

const tallaCalzadoOptions: TallaCalzado[] = [
  { value: '21.6 cm', label: '21.6', display_value: 'EU 35.5 | US W5 / M3.5', order: 10 },
  { value: '22.0 cm', label: '22.0', display_value: 'EU 36  | US W5.5 / M4', order: 20 },
  { value: '22.4 cm', label: '22.4', display_value: 'EU 36.5 | US W6 / M4.5', order: 30 },
  { value: '22.9 cm', label: '22.9', display_value: 'EU 37.5 | US W6.5 / M5', order: 40 },
  { value: '23.3 cm', label: '23.3', display_value: 'EU 38 | US W7 / M5.5', order: 50 },
  { value: '23.7 cm', label: '23.7', display_value: 'EU 38.5 | US W7.5 / M6', order: 60 },
  { value: '24.1 cm', label: '24.1', display_value: 'EU 39 | US W8 / M6.5', order: 70 },
  { value: '24.5 cm', label: '24.5', display_value: 'EU 40 | US W8.5 / M7', order: 80 },
  { value: '25.0 cm', label: '25.0', display_value: 'EU 40.5| US W9 / M7.5', order: 90 },
  { value: '25.4 cm', label: '25.4', display_value: 'EU 41 | US W9.5 / M8', order: 100 },
  { value: '25.8 cm', label: '25.8', display_value: 'EU 42 | US W10 / M8.5', order: 110 },
  { value: '26.2 cm', label: '26.2', display_value: 'EU 42.5| US W10.5 / M9', order: 120 },
  { value: '26.7 cm', label: '26.7', display_value: 'EU 43 | US W11 / M9.5', order: 130 },
  { value: '27.1 cm', label: '27.1', display_value: 'EU 44 | US W11.5 / M10', order: 140 },
  { value: '27.5 cm', label: '27.5', display_value: 'EU 44.5| US W12 / M10.5', order: 150 },
  { value: '27.9 cm', label: '27.9', display_value: 'EU 45 | US W12.5 / M11', order: 160 },
  { value: '28.3 cm', label: '28.3', display_value: 'EU 45.5| US W13 / M11.5', order: 170 },
  { value: '28.8 cm', label: '28.8', display_value: 'EU 46 | US W13.5 / M12', order: 180 },
  { value: '29.2 cm', label: '29.2', display_value: 'EU 47 | US W14 / M12.5', order: 190 },
  { value: '29.6 cm', label: '29.6', display_value: 'EU 47.5| US W14.5 / M13', order: 200 },
  { value: '30.0 cm', label: '30.0', display_value: 'EU 48 | US W15 / M13.5', order: 210 }
];

interface TallaMenPantsOption{
  value: string;
  label: string;
  display_value: string;
  order: number;
}
const tallaMenPantsOptions: TallaMenPantsOption[] =[
  { value: '26/30', label: 'W26/L30', display_value: 'EU 38 / US 26 - Cintura 66cm / Largo 76cm', order: 5 },
  { value: '28/30', label: 'W28/L30', display_value: 'EU 40 / US 28 - Cintura 71cm / Largo 76cm', order: 10 },
  { value: '30/32', label: 'W30/L32', display_value: 'EU 42 / US 30 - Cintura 76cm / Largo 81cm', order: 20 },
  { value: '32/32', label: 'W32/L32', display_value: 'EU 44 / US 32 - Cintura 81cm / Largo 81cm', order: 30 },
  { value: '34/34', label: 'W34/L34', display_value: 'EU 46 / US 34 - Cintura 86cm / Largo 86cm', order: 40 },
  { value: '36/34', label: 'W36/L34', display_value: 'EU 48 / US 36 - Cintura 91cm / Largo 86cm', order: 50 },
  { value: '38/34', label: 'W38/L34', display_value: 'EU 50 / US 38 - Cintura 97cm / Largo 86cm', order: 60 },
  { value: '40/34', label: 'W40/L34', display_value: 'EU 52 / US 40 - Cintura 102cm / Largo 86cm', order: 70 },
  { value: '42/34', label: 'W42/L34', display_value: 'EU 54 / US 42 - Cintura 107cm / Largo 86cm', order: 80 },
  { value: '44/34', label: 'W44/L34', display_value: 'EU 56 / US 44 - Cintura 112cm / Largo 86cm', order: 90 },
]

interface TallaWomenPantsOption{
  value: string;
  label: string;
  display_value: string;
  order: number;
  abrev: string;
}

const tallaWomenPantsOptions: TallaWomenPantsOption[] =[
  { value: '2 corto', label: '2 Corto', abrev: '2C', display_value: 'US 2 / EU 32 - Cintura 62cm / Largo 74cm (Corto)', order: 5 },
  { value: '2 regular', label: '2 Regular', abrev: '2R', display_value: 'US 2 / EU 32 - Cintura 62cm / Largo 76cm (Regular)', order: 6 },
  { value: '4 corto', label: '4 Corto', abrev: '4C', display_value: 'US 4 / EU 36 - Cintura 65cm / Largo 74cm (Corto)', order: 10 },
  { value: '4 regular', label: '4 Regular', abrev: '4R', display_value: 'US 4 / EU 36 - Cintura 65cm / Largo 76cm (Regular)', order: 20 },
  { value: '4 largo', label: '4 Largo', abrev: '4R', display_value: 'US 4 / EU 36 - Cintura 65cm / Largo 81cm (Largo)', order: 25 },

  // Tallas estándar (corregido EU 38 para US 6)
  { value: '6 regular', label: '6 Regular', abrev: '6R', display_value: 'US 6 / EU 38 - Cintura 68cm / Largo 76cm (Regular)', order: 30 },
  { value: '8 regular', label: '8 Regular', abrev: '8R', display_value: 'US 8 / EU 40 - Cintura 71cm / Largo 76cm (Regular)', order: 40 },
  { value: '10 regular', label: '10 Regular', abrev: '10R', display_value: 'US 10 / EU 42 - Cintura 76cm / Largo 76cm (Regular)', order: 50 },
  { value: '12 largo', label: '12 Largo', abrev: '12L', display_value: 'US 12 / EU 44 - Cintura 81cm / Largo 81cm (Largo)', order: 60 },

  // Tallas grandes
  { value: '14 largo', label: '14 Largo', abrev: '14L', display_value: 'US 14 / EU 46 - Cintura 86cm / Largo 81cm (Largo)', order: 70 },
  { value: '16 corto', label: '16 Corto', abrev: '16C', display_value: 'US 16 / EU 48 - Cintura 91cm / Largo 74cm (Corto)', order: 80 },
  { value: '16 regular', label: '16 Regular', abrev: '16R', display_value: 'US 16 / EU 48 - Cintura 91cm / Largo 76cm (Regular)', order: 90 },
  { value: '18 largo', label: '18 Largo', abrev: '18L', display_value: 'US 18 / EU 50 - Cintura 97cm / Largo 81cm (Largo)', order: 100 },
]

interface CantidadOption{
  value: string;
  label: string;
  display_value: string;
  order: number;
}

const cantidadUnidadesOptions: CantidadOption[] = [
  { value: '1', label: '1', display_value: 'Cantidad: 1 unidad/pieza', order: 10},
  { value: '2', label: '2', display_value: 'Cantidad: 2 unidades/piezas', order: 20},
  { value: '3', label: '3', display_value: 'Cantidad: 3 unidades/piezas (1/4 docena)', order: 20},
  { value: '4', label: '4', display_value: 'Cantidad: 4 unidades/piezas', order: 30},
  { value: '6', label: '6', display_value: 'Cantidad: 6 unidades/piezas (1/2 docena)', order: 40},
  { value: '12', label: '12', display_value: 'Cantidad: 12 unidades/piezas (1 docena)', order: 50},
  { value: '24', label: '24', display_value: 'Cantidad: 24 unidades/piezas (2 docenas)', order: 60},
]

interface MaterialTextil{
  value: string;
  label: string;
  display_value: string;
  order: number;
  abrev: string;
}

const materialTextilOptions: MaterialTextil[] = [
  { value: 'algodon', label: 'Algodón', abrev: 'ALG', display_value: 'Fibra natural, suave, transpirable, hipoalergénica.', order: 10},
  { value: 'poliester', label: 'Poliéster', abrev: 'POL', display_value: 'Fibra sintética, resistente a arrugas, duradera, de secado rápido.', order: 20},
  { value: 'lana', label: 'Lana', abrev: 'LNA', display_value: 'Fibra natural de oveja, cálida, aislante, absorbe humedad.', order: 30},
  { value: 'seda', label: 'Seda', abrev: 'SDA', display_value: 'Fibra natural de gusano de seda, suave, brillante, ligera.', order: 40},
  { value: 'lino', label: 'Lino', abrev: 'LNO', display_value: 'Fibra natural, fresca, absorbente, resistente, se arruga fácilmente.', order: 50},
  { value: 'viscosa', label: 'Viscosa', abrev: 'VSA', display_value: 'Fibra semi-sintética (celulosa), suave, fluida, transpirable.', order: 60},
  { value: 'nylon', label: 'Nylon', abrev: 'NLN', display_value: 'Fibra sintética, muy resistente, elástica, impermeable.', order: 70},
  { value: 'elastano', label: 'Lycra', abrev: 'ELA', display_value: '(Spandex/Elastano) Fibra sintética, alta elasticidad, se usa en mezclas para dar flexibilidad.', order: 80},
  { value: 'mezclilla', label: 'Mezclilla', abrev: 'MEZ', display_value: '(Denim/Tela jean) Tejido de algodón resistente, usado principalmente en jeans.', order: 90},
  { value: 'franela', label: 'Franela', abrev: 'FRA', display_value: 'Tejido suave y cálido, generalmente de algodón o lana.', order: 100},
  { value: 'terciopelo', label: 'Terciopelo', abrev: 'TER', display_value: 'Tejido con superficie suave y densa, de algodón, seda o sintético.', order: 110},
  { value: 'gamuza-sintetica', label: 'Gamuza S', abrev: 'GS', display_value: '(Gamuza-Sintetica) Imitación de gamuza, suave al tacto, duradera y fácil de limpiar.', order: 120},
  { value: 'cuero-genuino', label: 'Cuero G', abrev: 'CG', display_value: '(Cuero-Genuino) Material natural, duradero, flexible, transpirable, de origen animal.', order: 130},
  { value: 'cuero-sintetico', label: 'Cuero S', abrev: 'CS', display_value: '(Cuero-Sintetico/PU/PVC) Imitación de cuero, resistente al agua, fácil de limpiar, vegano.', order: 140},
  { value: 'gamuza', label: 'Gamuza', abrev: 'GZA', display_value: 'Tipo de cuero con acabado aterciopelado, suave y delicado.', order: 150},
]

////////////////////////////////////////     MATERIAL       ////////////////////////////////////////

interface MaterialOption {
  value: string; // Valor único (con prefijo) para identificar el material
  label: string; // Nombre corto y legible del material
  display_value: string; // Descripción o propiedades clave del material
  order: number; // Para ordenar la lista
  category: 'textil' | 'cuero' | 'metal' | 'plastico' | 'madera' | 'piedra' | 'otro'; // Categoría del material
}


const materialOptions: MaterialOption[] = [

  // --- Materiales Textiles ---

  // --- Materiales de Cuero y Similares ---


  // --- Materiales Metálicos ---
  { value: 'material-acero-inoxidable', label: 'Acero Inoxidable', display_value: 'Aleación de metal, resistente a la corrosión, duradero, hipoalergénico.', order: 10, category: 'metal' },
  { value: 'material-plata', label: 'Plata', display_value: 'Metal precioso, brillante, maleable, utilizado en joyería.', order: 20, category: 'metal' },
  { value: 'material-oro', label: 'Oro', display_value: 'Metal precioso, resistente a la corrosión, alto valor, utilizado en joyería.', order: 30, category: 'metal' },
  { value: 'material-cobre', label: 'Cobre', display_value: 'Metal rojizo, buen conductor de electricidad y calor, maleable.', order: 40, category: 'metal' },
  { value: 'material-aluminio', label: 'Aluminio', display_value: 'Metal ligero, resistente a la corrosión, maleable.', order: 50, category: 'metal' },
  { value: 'material-aleacion-zinc', label: 'Aleación de Zinc', display_value: 'Metal duradero y versátil, común en herrajes y bisutería.', order: 60, category: 'metal' },

  // --- Materiales Plásticos ---
  { value: 'material-plastico-abs', label: 'Plástico ABS', display_value: 'Plástico resistente a impactos, rígido, común en carcasas y juguetes.', order: 10, category: 'plastico' },
  { value: 'material-plastico-pvc', label: 'Plástico PVC', display_value: 'Plástico versátil, resistente al agua, usado en tuberías, calzado, etc.', order: 20, category: 'plastico' },
  { value: 'material-silicona', label: 'Silicona', display_value: 'Polímero sintético, flexible, resistente a temperaturas extremas.', order: 30, category: 'plastico' },
  { value: 'material-acrilico', label: 'Acrílico', display_value: 'Plástico transparente, ligero, resistente a impactos, similar al vidrio.', order: 40, category: 'plastico' },

  // --- Materiales de Madera ---
  { value: 'material-madera-pino', label: 'Madera de Pino', display_value: 'Madera blanda, ligera, económica, común en muebles y construcción.', order: 10, category: 'madera' },
  { value: 'material-madera-roble', label: 'Madera de Roble', display_value: 'Madera dura, resistente, duradera, común en muebles de alta calidad.', order: 20, category: 'madera' },
  { value: 'material-bambu', label: 'Bambú', display_value: 'Material natural, ecológico, resistente, ligero, de rápido crecimiento.', order: 30, category: 'madera' },

  // --- Materiales de Piedra/Minerales ---
  { value: 'material-piedra-natural', label: 'Piedra Natural', display_value: 'Material rocoso, duradero, con variaciones únicas en color y textura.', order: 10, category: 'piedra' },
  { value: 'material-ceramica', label: 'Cerámica', display_value: 'Material inorgánico, rígido, resistente al calor, frágil.', order: 20, category: 'piedra' },
  { value: 'material-vidrio', label: 'Vidrio', display_value: 'Material transparente, rígido, frágil, reciclable.', order: 30, category: 'piedra' },

  // --- Otros Materiales ---
  { value: 'material-caucho', label: 'Caucho', display_value: 'Material elástico, impermeable, usado en suelas y sellos.', order: 10, category: 'otro' },
  { value: 'material-neopreno', label: 'Neopreno', display_value: 'Goma sintética, flexible, aislante, resistente al agua.', order: 20, category: 'otro' },
  { value: 'material-papel', label: 'Papel', display_value: 'Material a base de celulosa, ligero, versátil, reciclable.', order: 30, category: 'otro' },
  { value: 'material-carton', label: 'Cartón', display_value: 'Material a base de celulosa, rígido, ligero, usado en embalajes.', order: 40, category: 'otro' },
];

/////////////////////////////////////         CAPACIDAD           ///////////////////////////////////////

interface CapacidadOption {
  value: string; // Valor único (con prefijo) para identificar la capacidad
  label: string; // Nombre corto y legible de la capacidad (ej. "1 Litro", "5 kg")
  display_value: string; // Descripción o equivalencia de la capacidad
  order: number; // Para ordenar la lista dentro de su categoría
  category: 'volumen' | 'peso' | 'cantidad' | 'energia' | 'almacenamiento_digital' | 'otro'; // Categoría de capacidad
}

const capacidadOptions: CapacidadOption[] = [
  // --- Capacidad de Volumen (Líquidos, Contenedores) ---
  { value: 'volumen-ml-100', label: '100 ml', display_value: 'Volumen: 100 mililitros (0.1 Litros)', order: 10, category: 'volumen' },
  { value: 'volumen-ml-250', label: '250 ml', display_value: 'Volumen: 250 mililitros (0.25 Litros)', order: 20, category: 'volumen' },
  { value: 'volumen-ml-500', label: '500 ml', display_value: 'Volumen: 500 mililitros (0.5 Litros)', order: 30, category: 'volumen' },
  { value: 'volumen-l-1', label: '1 Litro', display_value: 'Volumen: 1 Litro (1000 mililitros)', order: 40, category: 'volumen' },
  { value: 'volumen-l-2', label: '2 Litros', display_value: 'Volumen: 2 Litros', order: 50, category: 'volumen' },
  { value: 'volumen-l-5', label: '5 Litros', display_value: 'Volumen: 5 Litros', order: 60, category: 'volumen' },
  { value: 'volumen-l-10', label: '10 Litros', display_value: 'Volumen: 10 Litros', order: 70, category: 'volumen' },
  { value: 'volumen-l-20', label: '20 Litros', display_value: 'Volumen: 20 Litros', order: 80, category: 'volumen' },
  { value: 'volumen-l-50', label: '50 Litros', display_value: 'Volumen: 50 Litros', order: 90, category: 'volumen' },
  { value: 'volumen-l-100', label: '100 Litros', display_value: 'Volumen: 100 Litros', order: 100, category: 'volumen' },
  { value: 'volumen-gal-1', label: '1 Galón', display_value: 'Volumen: 1 Galón (aprox. 3.785 Litros)', order: 110, category: 'volumen' },
  { value: 'volumen-gal-5', label: '5 Galones', display_value: 'Volumen: 5 Galones (aprox. 18.9 Litros)', order: 120, category: 'volumen' },
  { value: 'volumen-cm3-100', label: '100 cm³', display_value: 'Volumen: 100 centímetros cúbicos', order: 130, category: 'volumen' },
  { value: 'volumen-cm3-500', label: '500 cm³', display_value: 'Volumen: 500 centímetros cúbicos', order: 140, category: 'volumen' },
  { value: 'volumen-m3-1', label: '1 m³', display_value: 'Volumen: 1 metro cúbico', order: 150, category: 'volumen' },

  // --- Capacidad de Peso (Carga Máxima, Ingredientes) ---
  { value: 'peso-g-100', label: '100 g', display_value: 'Peso: 100 gramos', order: 10, category: 'peso' },
  { value: 'peso-g-250', label: '250 g', display_value: 'Peso: 250 gramos', order: 20, category: 'peso' },
  { value: 'peso-g-500', label: '500 g', display_value: 'Peso: 500 gramos', order: 30, category: 'peso' },
  { value: 'peso-kg-1', label: '1 kg', display_value: 'Peso: 1 kilogramo (1000 gramos)', order: 40, category: 'peso' },
  { value: 'peso-kg-2', label: '2 kg', display_value: 'Peso: 2 kilogramos', order: 50, category: 'peso' },
  { value: 'peso-kg-5', label: '5 kg', display_value: 'Peso: 5 kilogramos', order: 60, category: 'peso' },
  { value: 'peso-kg-10', label: '10 kg', display_value: 'Peso: 10 kilogramos', order: 70, category: 'peso' },
  { value: 'peso-kg-20', label: '20 kg', display_value: 'Peso: 20 kilogramos', order: 80, category: 'peso' },
  { value: 'peso-kg-50', label: '50 kg', display_value: 'Peso: 50 kilogramos', order: 90, category: 'peso' },
  { value: 'peso-kg-100', label: '100 kg', display_value: 'Peso: 100 kilogramos', order: 100, category: 'peso' },
  { value: 'peso-ton-1', label: '1 Tonelada', display_value: 'Peso: 1 Tonelada (1000 kilogramos)', order: 110, category: 'peso' },
  { value: 'peso-lb-1', label: '1 lb', display_value: 'Peso: 1 libra (aprox. 0.45 kg)', order: 120, category: 'peso' },
  { value: 'peso-lb-5', label: '5 lb', display_value: 'Peso: 5 libras (aprox. 2.27 kg)', order: 130, category: 'peso' },

  // --- Capacidad de Cantidad (Número de unidades, personas) ---


  // --- Capacidad de Energía (Baterías) ---
  { value: 'energia-mah-500', label: '500 mAh', display_value: 'Capacidad de batería: 500 miliamperios-hora', order: 10, category: 'energia' },
  { value: 'energia-mah-1000', label: '1000 mAh', display_value: 'Capacidad de batería: 1000 miliamperios-hora (1 Ah)', order: 20, category: 'energia' },
  { value: 'energia-mah-2000', label: '2000 mAh', display_value: 'Capacidad de batería: 2000 miliamperios-hora (2 Ah)', order: 30, category: 'energia' },
  { value: 'energia-mah-5000', label: '5000 mAh', display_value: 'Capacidad de batería: 5000 miliamperios-hora (5 Ah)', order: 40, category: 'energia' },
  { value: 'energia-wh-100', label: '100 Wh', display_value: 'Capacidad de energía: 100 vatios-hora', order: 50, category: 'energia' },
  { value: 'energia-w-5', label: '5 W', display_value: 'Potencia: 5 vatios', order: 60, category: 'energia' },
  { value: 'energia-w-10', label: '10 W', display_value: 'Potencia: 10 vatios', order: 70, category: 'energia' },
  { value: 'energia-w-50', label: '50 W', display_value: 'Potencia: 50 vatios', order: 80, category: 'energia' },
  { value: 'energia-w-100', label: '100 W', display_value: 'Potencia: 100 vatios', order: 90, category: 'energia' },

  // --- Capacidad de Almacenamiento Digital ---
  { value: 'almacenamiento-gb-16', label: '16 GB', display_value: 'Almacenamiento digital: 16 Gigabytes', order: 10, category: 'almacenamiento_digital' },
  { value: 'almacenamiento-gb-32', label: '32 GB', display_value: 'Almacenamiento digital: 32 Gigabytes', order: 20, category: 'almacenamiento_digital' },
  { value: 'almacenamiento-gb-64', label: '64 GB', display_value: 'Almacenamiento digital: 64 Gigabytes', order: 30, category: 'almacenamiento_digital' },
  { value: 'almacenamiento-gb-128', label: '128 GB', display_value: 'Almacenamiento digital: 128 Gigabytes', order: 40, category: 'almacenamiento_digital' },
  { value: 'almacenamiento-gb-256', label: '256 GB', display_value: 'Almacenamiento digital: 256 Gigabytes', order: 50, category: 'almacenamiento_digital' },
  { value: 'almacenamiento-gb-512', label: '512 GB', display_value: 'Almacenamiento digital: 512 Gigabytes', order: 60, category: 'almacenamiento_digital' },
  { value: 'almacenamiento-tb-1', label: '1 TB', display_value: 'Almacenamiento digital: 1 Terabyte (1024 GB)', order: 70, category: 'almacenamiento_digital' },
  { value: 'almacenamiento-tb-2', label: '2 TB', display_value: 'Almacenamiento digital: 2 Terabytes', order: 80, category: 'almacenamiento_digital' },

  // --- Otros tipos de Capacidad ---
  { value: 'otro-rpm-7200', label: '7200 RPM', display_value: 'Velocidad de rotación: 7200 revoluciones por minuto', order: 10, category: 'otro' },
  { value: 'otro-psi-100', label: '100 PSI', display_value: 'Presión: 100 libras por pulgada cuadrada', order: 20, category: 'otro' },
  { value: 'otro-btu-12000', label: '12000 BTU', display_value: 'Capacidad de enfriamiento/calefacción: 12000 BTU/h', order: 30, category: 'otro' },
];

export default {
  attributeNames,
  productAbreviations,
  genreAbreviations,
  displayOptions,
  colorOptions,
  tallaGeneralOptions,
  tallaCalzadoOptions,
  tallaMenPantsOptions,
  tallaWomenPantsOptions,
  cantidadUnidadesOptions,
  materialTextilOptions,
  materialOptions,
  capacidadOptions,
}
