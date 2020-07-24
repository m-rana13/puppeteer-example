const sel = {
    cartPrice: '[class="pMSy0p XU9vZa"]',
};

const getPriceFromCart = async (pageInstance) => {
    const priceHandle = await pageInstance.waitForSelector(sel.cartPrice);
    const amount = await pageInstance.evaluate(handle => handle.innerText, priceHandle);
    return amount;
};

module.exports = {
    getPriceFromCart,
}