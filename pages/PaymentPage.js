import { expect } from "@playwright/test"

export class PaymentPage{
    constructor(page){
        this.page = page
        this.discountCode = page.frameLocator('[data-qa="active-discount-container"]').locator('[data-qa="discount-code"]')
        this.discountInput = page.getByPlaceholder("Discount code")
        this.activateDiscountBtn = page.locator('[data-qa="submit-discount-button"]')
        this.totalValue = page.locator('[data-qa="total-value"]')
        this.totalIncludingDiscount = page.locator('[data-qa="total-with-discount-value"]')
        this.totalDiscountActivatedMessage = page.locator('[data-qa="discount-active-message"]')
    }

    activateDiscount = async () => {
        await this.discountCode.waitFor()
        const code = await this.discountCode.innerText()
        // variant 1
        await this.discountInput.waitFor()
        await this.discountInput.fill(code)
        await expect(this.discountInput).toHaveValue(code)
        // variant 2
        // await this.discountInput.focus()
        // await this.page.keyboard.type(code, {delay: 500})
        // expect(await this.discountInput.inputValue()).toBe(code)

        await this.activateDiscountBtn.waitFor()
        await this.activateDiscountBtn.click()

        await this.totalDiscountActivatedMessage.waitFor()

        await this.totalValue.waitFor()
        const discountValueText = await this.totalValue.innerText()
        const discountValueOnlyNumberString = discountValueText.replace("$", "")
        const discountValueNumber = parseInt(discountValueOnlyNumberString, 10)
        console.warn({discountValueNumber})
        // await this.totalValue.waitFor()
        // const totalValueText = await this.totalValue.innerText()
        // const totalValueOnlyNumberString = totalValueText.replace("$", "")
        // const totalValueNumber = parseInt(totalValueOnlyNumberString, 10)

        // expect(discountValueNumber).toBeLessThan(totalValueNumber)

        // await this.page.pause()
    }
}