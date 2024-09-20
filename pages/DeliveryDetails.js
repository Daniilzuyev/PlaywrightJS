import { expect } from "@playwright/test"

export class DeliveryDetails{
    constructor(page){
        this.page = page
        this.firstNameInput = page.getByPlaceholder('First name')
        this.lastNameInput = page.getByPlaceholder('Last name')
        this.streetInput = page.getByPlaceholder('Street')
        this.postCodeInput = page.getByPlaceholder('Post code')
        this.cityInput = page.getByPlaceholder('City')
        this.country = page.locator('[data-qa="country-dropdown"]')
        this.continueToPaymentBtn= page.getByRole('button', { name: 'Continue to payment' })
        this.saveAddressBtn = page.getByRole('button', { name: 'Save address for next time' })
        this.saveAddressContainer = page.locator('[data-qa="saved-address-container"]')
        this.saveAddressFirstName = page.locator('[data-qa*=firstName]')
        this.saveAddressLastName = page.locator('[data-qa*=lastName]')
        this.saveAddressStreet = page.locator('[data-qa="saved-address-street"]')
        this.saveAddressZip = page.locator('[data-qa="saved-address-postcode"]')
        this.saveAddressCity = page.locator('[data-qa="saved-address-city"]')
        this.saveAddressCountry = page.locator('[data-qa="saved-address-country"]')
    }

    fillDetails = async (userAddress) => {
        await this.firstNameInput.waitFor()
        await this.firstNameInput.fill(userAddress.firstName)
        await this.lastNameInput.waitFor()
        await this.lastNameInput.fill(userAddress.lastName)
        await this.streetInput.waitFor()
        await this.streetInput.fill(userAddress.street)
        await this.postCodeInput.waitFor()
        await this.postCodeInput.fill(userAddress.zip)
        await this.cityInput.waitFor()
        await this.cityInput.fill(userAddress.city)
        await this.country.waitFor()
        await this.country.selectOption(userAddress.country)
    }

    saveDetails = async () => {
        const addressCountBeforeSaving = await this.saveAddressContainer.count()
        await this.saveAddressBtn.waitFor()
        await this.saveAddressBtn.click()
        await this.saveAddressContainer.waitFor()
        const addressCountAfterSaving = await this.saveAddressContainer.count()
        expect(addressCountBeforeSaving).not.toEqual(addressCountAfterSaving)
        expect(this.saveAddressContainer).toHaveCount(addressCountBeforeSaving + 1)
        
        await this.saveAddressFirstName.first().waitFor()
        expect(await this.saveAddressFirstName.first().innerText()).toBe(await this.firstNameInput.inputValue())
        
        await this.saveAddressLastName.first().waitFor()
        expect(await this.saveAddressLastName.first().innerText()).toBe(await this.lastNameInput.inputValue())

        await this.saveAddressStreet.first().waitFor()
        expect(await this.saveAddressStreet.first().innerText()).toBe(await this.streetInput.inputValue())

        await this.saveAddressZip.first().waitFor()
        expect(await this.saveAddressZip.first().innerText()).toBe(await this.postCodeInput.inputValue())

        await this.saveAddressCity.first().waitFor()
        expect(await this.saveAddressCity.first().innerText()).toBe(await this.cityInput.inputValue())

        await this.saveAddressCountry.first().waitFor()
        expect(await this.saveAddressCountry.first().innerText()).toBe(await this.country.inputValue())
        // await this.page.pause();
        // const actualDetails = {
        //     firstName: await this.saveAddressFirstName.textContent(),
        //     lastName: await this.saveAddressLastName.textContent(),
        //     street: await this.saveAddressStreet.textContent(),
        //     zip: await this.saveAddressZip.textContent(),
        //     city: await this.saveAddressCity.textContent(),
        //     country: await this.saveAddressCountry.textContent()
        // }
        // console.warn(actualDetails);
    }

    continueToPayment = async () => {
        await this.continueToPaymentBtn.waitFor()
        await this.continueToPaymentBtn.click()
        await this.page.waitForURL(/\/payment/, {timeout: 3000})
        // await this.page.pause()
    }
}