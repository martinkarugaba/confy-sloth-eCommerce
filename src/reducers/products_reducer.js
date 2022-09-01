import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  PRODUCTS_LOADING,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  SINGLE_PRODUCT_LOADING,
  SINGLE_PRODUCT_SUCCESS,
  SINGLE_PRODUCT_ERROR,
} from '../actions';

const products_reducer = (state, action) => {
  switch (action.type) {
    case SIDEBAR_OPEN:
      return { ...state, isSidebarOpen: true };
    case SIDEBAR_CLOSE:
      return { ...state, isSidebarOpen: false };
    case PRODUCTS_LOADING:
      return { ...state, products_loading: true };
    case GET_PRODUCTS_SUCCESS:
      const featured_products = action.payload.filter(
        (product) => product.featured === true
      );
      return {
        ...state,
        products_loading: false,
        products: action.payload,
        featured_products,
      };
    case GET_PRODUCTS_ERROR:
      return {
        ...state,
        products_loading: false,
        products_error: true,
      };
    case SINGLE_PRODUCT_LOADING:
      return {
        ...state,
        single_product_loading: true,
        single_product_error: false,
      };
    case SINGLE_PRODUCT_SUCCESS:
      return {
        ...state,
        single_product_loading: false,
        single_product: action.payload,
      };
    case SINGLE_PRODUCT_ERROR:
      return {
        ...state,
        single_product_loading: false,
        single_product_error: true,
      };
    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default products_reducer;
