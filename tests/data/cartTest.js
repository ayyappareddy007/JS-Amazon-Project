//import { addToCart, cart, loadFromStorage, removeFromCart, updateDeliveryOption } from "../../data/cart.js";
import { cart } from "../../data/cart-class.js";

describe('Test suite: add to cart', () => {
    beforeEach(() => {
        spyOn(localStorage,'setItem')
    })
    it('add an existing item to the cart' ,() => {    
        cart.cartItems = [{
            productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity : 1,
            deliveryOptionId : 1
        }];
        //console.log(localStorage.getItem('cart'))
        cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6',1)
        expect(cart.cartItems.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1)
        expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
        expect(cart.cartItems[0].quantity).toEqual(2);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop', JSON.stringify([{
                productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity : 2,
                deliveryOptionId : 1
        }]))

    });

    it('add an new item to the cart' ,() => {
        cart.cartItems = [];
        cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6',1)
        expect(cart.cartItems.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1)
        expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
        expect(cart.cartItems[0].quantity).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop', JSON.stringify([{
                productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity : 1,
                deliveryOptionId : '1'
        }]))
    })
});


describe('test suite: remove from cart', () => {
    beforeEach(() => {
        spyOn(localStorage, 'setItem');
        cart.cartItems = [{
            productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity : 1,
            deliveryOptionId : 1
        }];
    });

    it('remove a product from cart', () => {
        cart.removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.cartItems.length).toEqual(0);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop', JSON.stringify([]));
    });

    it("remove a product that doesn't exist from cart", () => {
        cart.removeFromCart('product');
        expect(cart.cartItems.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop', JSON.stringify([{
                productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity : 1,
                deliveryOptionId : 1
            }]));
    });
});

describe('test suite: updateDeliveryOption function', () => {
    const productId = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    beforeEach(() => {
        spyOn(localStorage, 'setItem');
        cart.cartItems = [{
            productId : productId,
            quantity : 1,
            deliveryOptionId : '1'
        }];
    });

    it('update delivery option', () => {
        cart.updateDeliveryOption(productId, '2');
        expect(cart.cartItems.length).toEqual(1);
        expect(cart.cartItems[0].productId).toEqual(productId);
        expect(cart.cartItems[0].quantity).toEqual(1);
        expect(cart.cartItems[0].deliveryOptionId).toEqual('2');
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop', JSON.stringify([{
                productId : productId,
                quantity : 1,
                deliveryOptionId : '2'
            }]));
    });

    it('does nothing if the product is not in the cart', () => {
        cart.updateDeliveryOption('abc', '1');
        expect(cart.cartItems.length).toEqual(1);
        expect(cart.cartItems[0].productId).toEqual(productId);
        expect(cart.cartItems[0].quantity).toEqual(1);
        expect(cart.cartItems[0].deliveryOptionId).toEqual('1');
        expect(localStorage.setItem).toHaveBeenCalledTimes(0);
    });

    it('does nothing if the deliveryId is not in the cart', () => {
        cart.updateDeliveryOption(productId, '5');
        expect(cart.cartItems.length).toEqual(1);
        expect(cart.cartItems[0].productId).toEqual(productId);
        expect(cart.cartItems[0].quantity).toEqual(1);
        expect(cart.cartItems[0].deliveryOptionId).toEqual('1');
        expect(localStorage.setItem).toHaveBeenCalledTimes(0);
    });
});