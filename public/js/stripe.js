/*eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
  'pk_test_51Jnf3BD3kdSdMT30gKnBlxoitD8ZEAjqdEFyCX5pWn97YVsJzPgC6N3V1FZrnpSwtW75lJdfnlq4Mml6Rc6lAMRO00xR7xIHY1'
);

export const bookTour = async (tourId) => {
  try {
    // 1) Get heckout session
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
    );
    // 2) Create checkout form + charge the credit-card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('err', err);
  }
};
