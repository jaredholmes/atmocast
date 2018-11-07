import Vue from 'vue';
import axios from 'axios';

new Vue({
  el: '#accountApp',
  delimiters: ['[[', ']]'],
  data: {
    cartItems: [],
    radioNewUser: '',
    newUser: false,
    showAuthAlert: false,
  },
  methods: {
    addToCart(target, item, cartID) {
      if (target) {
        if (target.classList.contains('clicked')) {
          target.classList.remove('clicked');
          target.innerText = 'Add to cart';
          // // Remove item from cartItems
          for (var i = 0; i < this.cartItems.length; i++) {
            if (this.cartItems[i].name == item.name) {
              this.cartItems.splice(i, 1);
            }
          }
        } else {
          target.classList.add('clicked');
          target.innerText = 'Remove from cart';
          this.cartItems.push(item);
        }
        this.submitCart(cartID);
      }
    },
    submitCart(cartID) {
      // Prevent from submitting if cart is empty
      // if (event.target.classList.contains('disabled')) {
      //   event.preventDefault();
      // } else {
        axios.put(
          '/rest/cart/' + cartID + '/',
          { params: {products: this.cartItems} },
          { headers: {
            // CSRF Token is set in script tag in template. It prevents 403 status code
            'X-CSRFToken': csrf,
            }
          }
        );
      // }
    },
    checkAuth(ev, isAuth) {
      if (!isAuth) {
        ev.preventDefault();
        this.showAuthAlert = true;
      }
    }
  },
  watch: {
    radioNewUser() {
      this.newUser = (this.radioNewUser == 'true');
    },
  },
});
