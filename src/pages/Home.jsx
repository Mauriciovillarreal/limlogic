import { useEffect, useState, useContext } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import { CartContext } from '../context/CartContext';
import '../styles/Home.css';
import { ShoppingBag, Search } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from 'react-bootstrap';
import FiltroCategoria from '../components/FiltrosCategoria/FiltrosCategoria';

const Home = () => {
    const [productos, setProductos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [allCategories, setAllCategories] = useState([]);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        const fetchProductos = async () => {
            const productosRef = collection(db, 'products');
            const snapshot = await getDocs(productosRef);
            const productosData = snapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    name: data.nombre,
                    price: Number(data.precio),
                    img: data.img,
                    categoria: data.categoria || 'Sin categoría',
                    stock: data.stock ?? 0 
                };
            });

            

            setProductos(productosData);

            // Sacamos todas las categorías distintas para los checkboxes
            const categoriasUnicas = [...new Set(productosData.map(p => p.categoria))];
            setAllCategories(categoriasUnicas);
        };

        fetchProductos();
    }, []);

    const handleCategoryChange = (categoria) => {
        setSelectedCategories(prev =>
            prev.includes(categoria)
                ? prev.filter(cat => cat !== categoria)
                : [...prev, categoria]
        );
    };

    const productosFiltrados = productos.filter(prod =>
        prod.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategories.length === 0 || selectedCategories.includes(prod.categoria))
    );

    return (
        <div className="home-container">
            <Container>
                <div className='container-card'>
                    <h2 className="home-title">Productos</h2>


                    <div className='home-container-desktop'>
                        <div>
                            {/* Input de búsqueda */}
                            <div className="search-container">
                                <input
                                    type="text"
                                    placeholder="Buscar"
                                    className="search-input"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <Search className="search-icon" />
                            </div>

                            {/* Filtro por categorías */}
                            <div>

                                <FiltroCategoria
                                    allCategories={allCategories}
                                    selectedCategories={selectedCategories}
                                    onCategoryChange={handleCategoryChange}
                                />

                            </div>
                        </div>

                        <div>
                            {/* Lista de productos */}
                            <div className="product-grid">
                                {productosFiltrados.length > 0 ? (
                                    productosFiltrados.map(prod => (
                                        <div className="product-card" key={prod.id}>
                                            <img src={prod.img} alt={prod.name} />
                                            <h4>{prod.name}</h4>
                                            <p>${prod.price}</p>
                                            {prod.stock > 0 ? (
    <button
        onClick={() => {
            addToCart(prod);
            toast.success(`${prod.name} se agregó al carrito`, {
                position: "bottom-right",
                autoClose: 2000,
                theme: "colored",
            });
        }}
        className="buy-button"
    >
        <ShoppingBag size={16} style={{ marginRight: '6px' }} />
        COMPRAR
    </button>
) : (
    <button
        className="buy-button out-of-stock"
        onClick={() => toast.error(`${prod.name} está sin stock 😔`, {
            position: "bottom-right",
            autoClose: 2000,
            theme: "colored",
        })}
    >
        SIN STOCK
    </button>
)}

                                        </div>
                                    ))
                                ) : (
                                    <p className="msjCartEmpty">No se encontraron productos</p>
                                )}
                            </div>
                        </div>

                    </div>






                </div>

                <ToastContainer />
            </Container>
        </div>
    );
};

export default Home;
