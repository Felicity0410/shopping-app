import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {useDispatch, useSelector} from 'react-redux';
import {v4 as uuid} from 'uuid';
import { useEffect } from 'react';
import Notification from './components/UI/Notification/Notification';
import {betterSaveCartData, fetchCartData, userLogin, userRegister} from './store/thunk-actions';
import Login from './components/Login/Login';
import { setIsLoggedIn } from './store/authSlice';

const products = [
  {
    id: uuid(),
    unitPrice: 16,
    name: 'Coffee beans 250g',
    desc: 'Whole coffee bean 250 grams'
  },
  {
    id: uuid(),
    unitPrice: 7,
    name: 'Latte glass',
    desc: 'Standard latte glass'
  },
  {
    id: uuid(),
    unitPrice: 16,
    name: 'Cold brew can 200ml',
    desc: 'Cold brew in a can (200ml)'
  }
];

let isInitialLoading = true;

function App() {
  const showCart = useSelector(state => state.ui.showCart);
  const cart = useSelector(state => state.cart);
  const notification = useSelector(state => state.ui.notification);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
  const dispatch = useDispatch();

  const loginHandler = (email, password) => {
    dispatch(userLogin({username: email, password}))
  };

  const registerHandler = (email, password) => {
    dispatch(userRegister({ username: email, password }))
  }

  const logoutHandler = () => {
    localStorage.clear()
    dispatch(setIsLoggedIn(false))
  };

  useEffect(() => {
    if(localStorage.getItem('jwt')){
      dispatch(fetchCartData());
      dispatch(setIsLoggedIn(true))
    }
  }, [dispatch]);

  // pending: success, fulfilled: success, rejected: error
  useEffect(() => {
    if (isInitialLoading) {
      isInitialLoading = false;
      return;
    }
    dispatch(betterSaveCartData(cart));
  }, [cart, dispatch]);

  return (
    <>
        {notification && <Notification
            status={notification.status}
            title={notification.title}
            message={notification.message}/>}
        {!isLoggedIn && <Login onLogin={loginHandler} onRegister={registerHandler}/>}
        {isLoggedIn && 
          <Layout isLoggedIn={isLoggedIn} onLogout={logoutHandler}>
            {showCart && <Cart/>}
            <Products products={products}/>
          </Layout>
        } 
    </>
  );
}

export default App;
