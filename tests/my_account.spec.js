import { test } from "@playwright/test"
import { MyAccountPage } from "../pages/MyAccount"
import { getLoginToken } from "../api-calls/getLoginToken"
import { adminDetails } from "../data/userDetails.js"

test.only('My account cookie injection', async ({ page }) => {
    const loginToken = await getLoginToken(adminDetails.username, adminDetails.password)
    console.warn({loginToken})
    const myAccount = new MyAccountPage(page)
    await myAccount.visit()
})