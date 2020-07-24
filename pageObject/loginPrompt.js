const sel = {
    closeButton: '[class="_2AkmmA _29YdH8"]',
};

const closeLoginPrompt = async (pageInstance) => {
    await pageInstance.waitForSelector(sel.closeButton);
    await pageInstance.click(sel.closeButton);
};

module.exports = {
    closeLoginPrompt,
}