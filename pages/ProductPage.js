import { expect } from "@playwright/test"
import { NavigationPage } from "./NavigationPage";

export class ProductPage {
    constructor(page) {
        this.page = page
        this.addButton = page.locator('[data-qa="product-button"]');
        // this.basketCounter = page.locator('[data-qa*="count"]');
        this.sortByDropdown = page.locator('[data-qa="sort-dropdown"]')
        this.productTitle = page.locator('[data-qa="product-title"]')
    }

    visit = async () => {
        await this.page.goto("/")
    }

    addProductToBasket = async (num) => {
        const specAddButton = this.addButton.nth(num - 1) 
        await specAddButton.waitFor();
        await expect(specAddButton).toHaveText("Add to Basket")
        const navigation = new NavigationPage(this.page);
        const basketCounterBeforeAdding = await navigation.getBasketCount()
        await specAddButton.click();
        await expect(specAddButton).toHaveText("Remove from Basket")
        const basketCounterAfterAdding = await navigation.getBasketCount()
        expect(basketCounterAfterAdding).toBeGreaterThan(basketCounterBeforeAdding)
    }

    sortByCheapest = async () => {
        await this.sortByDropdown.waitFor()
        await this.productTitle.first().waitFor()
        const productTitleBeforeSorting = await this.productTitle.allInnerTexts()
        await this.sortByDropdown.selectOption('price-asc')
        const productTitleAfterSorting = await this.productTitle.allInnerTexts()

        expect(productTitleBeforeSorting).not.toEqual(productTitleAfterSorting)
    }


}