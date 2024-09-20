export class LoginPage {
    constructor(page) {
        this.page = page
        this.submitButton = page.locator('[data-qa="continue-to-checkout"]')
        this.registerBtn = page.locator('[data-qa="go-to-signup-button"]')
    }

    continueToCheckout = async () => {
        await this.submitButton.waitFor()
        await this.submitButton.click()
        await this.page.waitForURL(/\/login/, {timeout: 3000})
    }

    goToRegisterPage = async () => {
        await this.registerBtn.waitFor()
        await this.registerBtn.click()
        await this.page.waitForURL(/\/signup/, {timeout: 3000})
    }
}