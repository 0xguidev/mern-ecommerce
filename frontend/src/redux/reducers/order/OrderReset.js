import { resetCreateOrder } from './CreateOrderSlice';
import { resetOrderDetails } from './GetUserOrders';
import { orderPayReset } from './PayOrderSlice';

export const ResetOrders = () => (dispatch, getState) => {
  dispatch(resetCreateOrder());
  dispatch(resetOrderDetails());
  dispatch(orderPayReset());
};
