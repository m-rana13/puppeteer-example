const sel = {
    searchbar: '[name=q]',
    searchResults: '[class="_3togXc"]',
};

const performSearch = async (keyword, pageInstance) => {
    await pageInstance.waitForSelector(sel.searchbar);
    await pageInstance.type(sel.searchbar, keyword);
    await pageInstance.keyboard.press('Enter');
};

const openSearchResult = async (item, pageInstance) => {
    await pageInstance.waitForSelector(sel.searchResults);
    const allResults = await pageInstance.$$(sel.searchResults);
    await allResults[item+1].click();
}
module.exports = {
    performSearch,
    openSearchResult,
};