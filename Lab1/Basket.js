var products = [{
  name : "test",
  price : 12.9,
  inventory : 20
}, {
  name : "test2",
  price : 30,
  inventory : 80
}];

class ProductLineItem {
  constructor(product) {
    this.name = product.name;
    this.price = product.price;
    this.inventory = product.inventory;
    this.quantity = 1;
  }
}

var basket = (function(){
  let buyList = [];
  return {
    findElement: function(name) {
      for (let i = 0; i < buyList.length; i++) {
        if (buyList[i].name == name)
          return buyList[i];
      }
      return undefined;
    },

    addProduct: function(productID){
      if (this.findElement(productID.name)) {
        console.log("Предмет уже в корзине");
        return;
      }
      if (productID.inventory == 0) {
        console.log("Инвентарь пуст")
        return;
      }
      productID.inventory--;
      buyList.push(productID);
    },

    removeProduct: function(productID){
      let item = this.findElement(productID.name);
      if (item == undefined) {
        console.log("Товара нет в корзине");
        return;
      }
      productID.inventory += item.quantity;
      buyList.splice(buyList.indexOf(item), 1);
    },

    updateProductQuantity: function(productID, quantity) {
      let item = this.findElement(productID.name);
      if (item == undefined) {
        console.log("Товара нет в корзине");
        return;
      }
      if (productID.inventory == 0)
        console.log("Инвентарь пуст");
      else if (productID.inventory - quantity < 0) {
        console.log("Столько товара нет");
        return; 
      }      
      productID.inventory -= quantity;
      item.quantity += quantity;
    },

    getTotalPrice: function(){
      let totalPrice = 0;
      buyList.forEach(function(item) {
        totalPrice += item.price * item.quantity;
      });
    return totalPrice;
    },

    displayLst: function(){
      console.table(buyList);
      console.log("Общая сумма: " + this.getTotalPrice());
    }
  }
})();