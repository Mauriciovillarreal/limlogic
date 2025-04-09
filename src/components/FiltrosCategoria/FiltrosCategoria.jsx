import { useState } from 'react';
import { Menu } from '@headlessui/react';
import { Filter } from 'lucide-react';
import './FiltrosCategoria.css'; // Podés ajustar estilos si querés

const FiltroCategoria = ({ allCategories, selectedCategories, onCategoryChange }) => {
  return (
    <div className="filtro-categorias">
      <Menu as="div" className="menu-categorias">
        <Menu.Button className="boton-filtrar">
          Filtrar <Filter size={18} style={{ marginLeft: '6px' }} />
        </Menu.Button>
        <Menu.Items className="menu-items">
          {allCategories.map((categoria) => (
            <Menu.Item key={categoria}>
              {({ active }) => (
                <button
                  className={`item-categoria ${selectedCategories.includes(categoria) ? 'activo' : ''}`}
                  onClick={() => onCategoryChange(categoria)}
                >
                  {categoria}
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Menu>
    </div>
  );
};

export default FiltroCategoria;
