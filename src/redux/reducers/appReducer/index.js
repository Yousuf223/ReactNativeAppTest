

const INITIAL_STATE = {
  loader: false,
  cart: [],
};

export default (states = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LOADER_START':
      return {
        ...states,
        loader: true,
      };
    case 'LOADER_STOP':
      return {
        ...states,
        loader: false,
      };
      return {
        ...states,
        socket: action.payload,
      };
    case 'ADD_PRODUCT':
      const existingIndex = states.cart.findIndex(
        (prod) => prod.id === action.payload.id
      );

      if (existingIndex !== -1) {
        const updatedCart = [...states.cart];
        updatedCart[existingIndex].quantity += action.payload.quantity;
        return {
          ...states,
          cart: updatedCart,
        };
      } else {
        return {
          ...states,
          cart: [...states.cart, action.payload],
        };
      }

    case 'REMOVE_PRODUCT':
      return {
        ...states,
        cart: states.cart.filter((prod) => prod.id !== action.payload),
      };
    case 'UPDATE_QUANTITY':
      return {
        ...states,
        cart: states.cart.map(product =>
          product.id === action.payload.id
            ? { ...product, quantity: action.payload.quantity }
            : product
        ),
      };


    default:
      return states;
  }
};
