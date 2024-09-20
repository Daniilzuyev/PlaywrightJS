import { expect } from "@playwright/test"

export class CheckoutPage {
    constructor(page) {
        this.page = page
        this.basketCard = page.locator('[data-qa="basket-card"]')
        this.basketItemPrice = page.locator('[data-qa="basket-item-price"]')
        this.removeFromBasket = page.locator('[data-qa="basket-card-remove-item"]')
    }

    removeCheapestItem = async () => {
        await this.basketCard.first().waitFor()
        const itemBeforeRemoval = await this.basketCard.count()
        console.warn({itemBeforeRemoval})
        await this.basketItemPrice.first().waitFor()
        const allPriceTexts = await this.basketItemPrice.allInnerTexts()
        // [ '499$', '599$', '320$' ]
        const allIntPrices = allPriceTexts.map((e) => {
            const withoutUsdSign = e.replace("$", "")

            return parseInt(withoutUsdSign)
        })

        const minPriceValue = Math.min(...allIntPrices);
        const minPriceInd = allIntPrices.indexOf(minPriceValue)

        const specRemoveBtn = this.removeFromBasket.nth(minPriceInd);
        await specRemoveBtn.waitFor()
        await specRemoveBtn.click()
        // console.warn({minPriceValue})
        await expect(this.basketCard).toHaveCount(itemBeforeRemoval - 1)
    }




}