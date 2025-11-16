import { addToCart, cart, loadFromStorage, removeFromCart, updateDeliveryOption } from "../../data/cart.js";

describe('Test suite: add to cart', () => {
    beforeEach(() => {
        spyOn(localStorage,'setItem')
    })
    it('add an existing item to the cart' ,() => {    
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity : 1,
                deliveryOptionId : 1
            }])
        });

        loadFromStorage()
        //console.log(localStorage.getItem('cart'))
        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6',1)
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1)
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
        expect(cart[0].quantity).toEqual(2);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
                productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity : 2,
                deliveryOptionId : 1
        }]))

    });

    it('add an new item to the cart' ,() => {
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        });
        loadFromStorage()
        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6',1)
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1)
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
        expect(cart[0].quantity).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
                productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity : 1,
                deliveryOptionId : '1'
        }]))
    })
});

// describe('Test suite: remove from cart', () => {
//     beforeEach(() => {
//         spyOn(localStorage, 'setItem');
//     });
//     it('remove a product from cart', () => {
//         spyOn(localStorage, 'getItem').and.callFake(() => {
//             return JSON.stringify([{
//                 productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
//                 quantity : 1,
//                 deliveryOptionId : 1
//             }])
//         });
//         loadFromStorage();
//         removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
//         expect(cart.length).toEqual(0);
//         expect(localStorage.setItem).toHaveBeenCalledTimes(1);
//         expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([]))
//     });
//     it('does nothing if product is not in the cart', () => {
//         spyOn(localStorage, 'getItem').and.callFake(() => {
//             return JSON.stringify([{
//                 productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
//                 quantity : 1,
//                 deliveryOptionId : 1
//             }])
//         });
//         loadFromStorage();
//         removeFromCart('empty');
//         expect(cart.length).toEqual(1);
//         expect(localStorage.setItem).toHaveBeenCalledTimes(1);
//         expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
//                 productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
//                 quantity : 1,
//                 deliveryOptionId : 1
//             }]))
//     })
// })

describe('test suite: remove from cart', () => {
    beforeEach(() => {
        spyOn(localStorage, 'setItem');
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity : 1,
                deliveryOptionId : 1
            }]);
        });
        loadFromStorage();
    });

    it('remove a product from cart', () => {
        removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(0);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([]));
    });

    it("remove a product that doesn't exist from cart", () => {
        removeFromCart('product');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
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
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId : productId,
                quantity : 1,
                deliveryOptionId : '1'
            }]);
        });
        loadFromStorage();
    });

    it('update delivery option', () => {
        updateDeliveryOption(productId, '2');
        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual(productId);
        expect(cart[0].quantity).toEqual(1);
        expect(cart[0].deliveryOptionId).toEqual('2');
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
                productId : productId,
                quantity : 1,
                deliveryOptionId : '2'
            }]));
    });

    it('does nothing if the product is not in the cart', () => {
        updateDeliveryOption('abc', '1');
        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual(productId);
        expect(cart[0].quantity).toEqual(1);
        expect(cart[0].deliveryOptionId).toEqual('1');
        expect(localStorage.setItem).toHaveBeenCalledTimes(0);
    });

    it('does nothing if the deliveryId is not in the cart', () => {
        updateDeliveryOption(productId, '5');
        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual(productId);
        expect(cart[0].quantity).toEqual(1);
        expect(cart[0].deliveryOptionId).toEqual('1');
        expect(localStorage.setItem).toHaveBeenCalledTimes(0);
    });
});