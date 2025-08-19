const Footer = () => {
  return (
    <footer className="bg-black text-white py-8 px-4 mt-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Columna 1: Información */}
        <div>
          <h3 className="text-xl font-bold text-red-500 mb-4">Mini-Feria</h3>
          <p className="text-gray-300 mb-2">
            La mejor selección de productos a precios increíbles.
          </p>
          <p className="text-gray-300">
            © {new Date().getFullYear()} Mini-Feria. Todos los derechos reservados.
          </p>
        </div>

        {/* Columna 3: Contacto */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Contacto</h4>
          <ul className="text-gray-300 space-y-2">
            <li>Email: miniferiaonly@gmail.com</li>
            <li>Teléfono: +1 234 567 890</li>
          </ul>
        </div>

        {/* Columna 4: Redes Sociales */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Síguenos</h4>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com/people/MiniFeria/61577022791548/"
              target="_blank"
              className="text-gray-300 hover:text-red-400 transition text-2xl">
              <i>FB</i>
            </a>
            <a
              href="https://www.tiktok.com/@mini_feria?lang=es-419&is_from_webapp=1&sender_device=mobile&sender_web_id=7495962516918404614"
              target="_blank"
              className="text-gray-300 hover:text-red-400 transition text-2xl">
              <i>TT</i>
            </a>
          </div>
        </div>
      </div>

      {/* Línea inferior */}
      <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
        <p>Términos y Condiciones | Política de Privacidad</p>
      </div>
    </footer>
  );
};

export default Footer;
