import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Cart from "./components/Cart";
import Catalog from "./components/Catalog";
import ThankYouPage from "./components/ThankYouPage";

import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [cartItems, setCartItems] = useState([]);

  const handleAddCart = (product, quantity) => {
    setCartItems((prevItems) => {
      //se nao existir => adiciono o item
      // se existir => incremento a quantidade

      const itemExists = prevItems.find((item) => item.id === product.id);

      if (itemExists) {
        toast.info(
          `Quantidade do item ${product.name} atualizado com sucesso!`
        );
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        // a funçao superior vai chamar atraves da funçao setcartitems os itens (prevItems), onde em return o map identifica cada item como item, onde o id de item deve ser igual ao id do item que foi clicado. onde { ...item, quantity: +quantity } onde apos a confirmaçao do item.id com product.id, vai ser chamado o item e vai ser apenas modificado a quantidade dele, onde (+quantity) sera includo + item no carrinho, mas se vc nao modificar sera retornado os dados do item original atraves do : item
      } else {
        toast.success(`${product.name} adicionado com sucesso!`);
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  // essa parte ira mostrar a quantidade de itens no carrinho
  const handleUpdateCart = (product, quantity) => {
    setCartItems((prevItems) => {
      toast.info(`Quantidade do item ${product.name} atualizado com sucesso!`);

      return prevItems.map((item) =>
        item.id === product.id ? { ...item, quantity: +quantity } : item
      );
    });
  };

  const handleRemoveFromCart = (product) => {
    toast.error(`${product.name} foi removido com sucesso`);
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== product.id)
    );
  };

  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Catálago</Link>
        <Link to="/cart">Carrinho</Link>
      </nav>
      <div className="container">
        <Routes>
          <Route path="/" element={<Catalog onAddToCart={handleAddCart} />} />
          <Route
            path="/cart"
            element={
              <Cart
                cartItems={cartItems}
                onUpdateCart={handleUpdateCart}
                onRemoveFromCart={handleRemoveFromCart}
                setCartItems={setCartItems}
                onCheckout={() => {
                  if (cartItems.length > 0) {
                    toast.success("Compra finalizada com sucesso!");
                    setCartItems([]);
                  } else {
                    toast.error("Seu carrinho está vazio");
                  }
                }}
              />
            }
          />
          <Route path="/thank-you" element={<ThankYouPage />} />
        </Routes>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
      />
    </BrowserRouter>
  );
}

export default App;
