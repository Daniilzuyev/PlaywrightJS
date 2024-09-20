import { test } from "@playwright/test"
import { v4 as uuidv4 } from 'uuid'
import { ProductPage } from "../pages/ProductPage.js"
import { NavigationPage } from "../pages/NavigationPage.js"
import { CheckoutPage } from "../pages/CheckoutPage.js"
import { LoginPage } from "../pages/LoginPage.js"
import { RegisterPage } from "../pages/RegisterPage.js"
import { DeliveryDetails } from "../pages/DeliveryDetails.js"
import { deliveryDetails as userAddress } from "../data/deliveryDetails.js"
import { PaymentPage } from "./../pages/PaymentPage.js"


test("New user full end-to-end journey", async ({ page }) => {
    const productPage = new ProductPage(page)
    await productPage.visit()
    await productPage.sortByCheapest()
    await productPage.addProductToBasket(1)
    await productPage.addProductToBasket(2)
    await productPage.addProductToBasket(3)
    const navigation = new NavigationPage(page)
    await navigation.goToCheckout()
    const checkout = new CheckoutPage(page)
    await checkout.removeCheapestItem()
    
    const login = new LoginPage(page)
    await login.continueToCheckout()
    await login.goToRegisterPage()

    const register = new RegisterPage(page)
    const email = uuidv4() + 'gmail.com'
    const password = uuidv4()
    await register.signUpNewUser(email, password)

    const deliveryDetails = new DeliveryDetails(page)
    await deliveryDetails.fillDetails(userAddress)
    await deliveryDetails.saveDetails()
    await deliveryDetails.continueToPayment()

    const payment = new PaymentPage(page)
    await payment.activateDiscount()
})