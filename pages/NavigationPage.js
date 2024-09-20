export class NavigationPage {
    constructor(page) {
        this.page = page
        this.basketCounter = page.locator('[data-qa*="count"]');
        this.checkoutLink = page.getByRole('link', { name: 'Checkout' }) 
    }

    getBasketCount = async () => {
        await this.basketCounter.waitFor()
        const text = await this.basketCounter.innerText()
        return parseInt(text)
    }

    goToCheckout = async () => {
        await this.checkoutLink.waitFor()
        await this.checkoutLink.click()
        
        await this.page.waitForURL("/basket")
    }
}