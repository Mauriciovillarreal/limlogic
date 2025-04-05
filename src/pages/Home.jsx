import { useEffect, useState, useContext } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import { CartContext } from '../context/CartContext';
import '../styles/Home.css';
import { ShoppingBag } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import { Search } from 'lucide-react';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
    const [productos, setProductos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
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
                    img: data.img
                };
            });

            setProductos(productosData);
        };

        fetchProductos();
    }, []);

    // Filtrar según búsqueda
    const productosFiltrados = productos.filter((prod) =>
        prod.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="home-container">
            <div className='container-card'>
                <h2 className="home-title">Productos</h2>

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


                <div className="product-grid">
                    {productosFiltrados.length > 0 ? (
                        productosFiltrados.map(prod => (
                            <div className="product-card" key={prod.id}>
                                <img src={prod.img} alt={prod.name} />
                                <h4>{prod.name}</h4>
                                <p>${prod.price}</p>
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
                            </div>
                        ))
                    ) : (
                        <p className="msjCartEmpty">No se encontraron productos</p>
                    )}
                </div>
            </div>

            <ToastContainer />
        </div>
    );
};

export default Home;
