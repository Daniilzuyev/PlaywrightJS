import { test, expect } from "@playwright/test"

test.skip("Product Page add to basket", async ({ page }) => {
    await page.goto("/")

    // const addToBasket = page.getByRole('button', { name: 'Add to Basket' }).first()     //nth(4)
    const addToBasket = page.locator('[data-qa="product-button"]').first()     //nth(4)
    const basketCounter = page.locator('[data-qa*="count"]')
    await addToBasket.waitFor()

    await expect(addToBasket).toHaveText("Add to Basket")
    await expect(basketCounter).toHaveText("0")

    await addToBasket.click()

    await expect(addToBasket).toHaveText("Remove from Basket")
    await expect(basketCounter).toHaveText("1")

    const checkoutLink = page.getByRole('link', { name: 'Checkout' }) 
    // getByRole('link', { name: 'Checkout' })
    await checkoutLink.waitFor();
    await checkoutLink.click();
    // await page.pause();
    await page.waitForURL("/basket")
})

// productPage.visit()
// productPage.sortProductByCheapest()
// productPage.addItemToBasket()
// navigation.moveToCheckout()
// basket.removeCheapestItem()