const sel = {
    smallSize: '[id="swatch-0-size"]',
    addToCartButton: '[class="_2AkmmA _2Npkh4 _2MWPVK"]',
    price: '[class="_1vC4OE _3qQ9m1"]',
};

const addToCart = async (pageInstance) => {
    await pageInstance.waitForSelector(sel.smallSize);
    await pageInstance.click(sel.smallSize);
    // selecting size will do an internal refresh
    await pageInstance.waitFor(3000);
    const priceHandle = await pageInstance.waitForSelector(sel.price);
    const itemPrice = await pageInstance.evaluate(handle => handle.innerText, priceHandle);
    await pageInstance.click(sel.addToCartButton);
    return itemPrice;
};

module.exports = {
    addToCart,
};