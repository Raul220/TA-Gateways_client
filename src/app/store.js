import { configureStore } from '@reduxjs/toolkit';
import gatewaysReducer from '../Components/Home/Redux';

export default configureStore({
  reducer: {
    gateways: gatewaysReducer
  },
})