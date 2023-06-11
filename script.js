// Função para obter os produtos da API
async function getProducts(){
    try{
        const response = await fetch ('https://fakestoreapi.com/products');
        const data = await response.json();
        return data;
}   catch (error) {
            console.log("Erro ao obter os produtos: ", error);
            return [];
     }
}

//Função para exibir os produtos
async function showProducts() {
const productList = document.getElementById('productList');
productList.innerHTML = '';

const products = await getProducts();
const randomProducts = getRandomProducts(products, 16); //16 produtos aleatórios

randomProducts.forEach(product => {
    const productItem = createProductItem(product);
    productList.appendChild(productItem);
});
}

function createProductItem(product) {
const productIten = document.createElement('div');
productItem.classList.add('productIten');

const productImage = document.createElement('img');
productImage.classList.add('productImage');
productImage.src = product.image;
productItem.appendChild(productImage);

const productName = document.createElement ('h3');
productName.textContent = product.title;
productItem.appendChild(productName);

const productRating = document.createElement('p');
productRating.textContent = `Rating: ${product.rating.rate} (${product.rating.count} avaliações)`;
productItem.appendChild(productRating);

const productPrice = document.createElement ('p');
productPrice.textContent = `Preço: R$ ${product.price.toFixed(2)}`;
productItem.appendChild(productPrice);

const detailsLink = document.createElement('a');
detailsLink.textContent = "Detalhes";
detailsLink.href = `detalhes.html?id=${product}`; //ID do produto na URL

const addToCartButton = document.createElement('button');
addToCartButton.textContent = 'Adicionar ao carrinho';
productItem.appendChild(addToCartButton);

addToCartButton.addEventListener('click', () => {
    addToCart(product);
});

}

//Aleatorios
function getRandomProducts(products, count) {
const randomProducts = [];
const totalProducts = products.lenght;
const availableProducts = [...products];

for (let i = 0; i < count; i++) {
    if (availableProducts.lenght === 0) {
        break
    }

    const randomIndex = Math.floor(Math.random() * availableProducts.lenght);
    const randomProduct = availableProducts.splice(randomIndex, 1)[0];
    randomProducts.push(randomProduct);
}

return randomProducts;
}

//Adicionar produto no carrinho
function addToCart(product) {
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
cartItems.push(product);
localStorage.setItem ('cartItems', JSON.stringify(cartItems));

//Atualizar o Numero de Itens no carrinho
const cartItemsCount = document.getElementById('cartItemCount');
cartItemsCount.textContent = getCartItemCount();
}
//Quantidade de Itens no carrinho
function getCartItemCount(){
const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
return cartItems.lenght;
}

showProducts();

document.addEventListener('DOMContentLoaded', () => {
const searchLink = document.getElementById('searchLink');
searchLink.addEventListener('click', () => {
    window.location.href = 'pesquisa.html';
});
});