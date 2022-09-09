import {
  PRODUCTS_LOADING,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
  LOAD_PRODUCTS,
} from '../actions';

const filter_reducer = (state, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      let maxPrice = action.payload.map((p) => p.price);
      maxPrice = Math.max(...maxPrice);

      return {
        ...state,
        all_products: [...action.payload],
        filtered_products: [...action.payload],
        filters: {
          ...state.filters,
          max_price: maxPrice,
          price: maxPrice,
        },
      };

    case SET_GRIDVIEW:
      return { ...state, grid_view: true };

    case SET_LISTVIEW:
      return { ...state, grid_view: false };

    case UPDATE_SORT:
      return { ...state, sort: action.payload };

    case SORT_PRODUCTS:
      const { sort, filtered_products } = state;
      let tempProducts = [...filtered_products];
      if (sort === 'price-lowest') {
        tempProducts = tempProducts.sort((a, b) => a.price - b.price);
      }
      if (sort === 'price-highest') {
        tempProducts = tempProducts.sort((a, b) => b.price - a.price);
      }
      if (sort === 'name-a') {
        tempProducts = tempProducts.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      }
      if (sort === 'name-z') {
        tempProducts = tempProducts.sort((a, b) =>
          b.name.localeCompare(a.name)
        );
      }
      return {
        ...state,
        filtered_products: tempProducts,
      };
    case UPDATE_FILTERS:
      const { name, value } = action.payload;
      return {
        ...state,
        filters: { ...state.filters, [name]: value },
      };
    case FILTER_PRODUCTS:
      const { all_products } = state;
      const {
        text,
        company,
        category,
        color,
        min_price,
        max_price,
        price,
        shipping,
      } = state.filters;
      let temp_Products = [...all_products];

      // search filter
      if (text) {
        temp_Products = temp_Products.filter((product) =>
          product.name.toLowerCase().startsWith(text)
        );
      }

      // filter by category
      if (category !== 'all') {
        temp_Products = temp_Products.filter(
          (prouct) => prouct.category === category
        );
      }

      // filter by company
      if (company !== 'all') {
        temp_Products = temp_Products.filter(
          (product) => product.company === company
        );
      }

      // filter by color
      if (color !== 'all') {
        temp_Products = temp_Products.filter((product) => {
          return product.colors.find((c) => c === color);
        });
      }

      //filter by price
      temp_Products = temp_Products.filter(
        (product) => product.price <= price
      );

      // filter by shipping
      if (shipping) {
        temp_Products = temp_Products.filter(
          (product) => product.shipping === true
        );
      }

      return { ...state, filtered_products: temp_Products };

    case CLEAR_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          text: '',
          company: 'all',
          category: 'all',
          color: 'all',
          price: state.filters.max_price,
          shipping: false,
        },
      };
    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default filter_reducer;
