export class RegisterPage {
    constructor(page){
        this.page = page
        this.emailInput = page.getByPlaceholder('e-mail')
        this.password = page. getByPlaceholder('password')
        this.submitBtn = page.getByRole('button', { name: 'register' })
    }

    signUpNewUser = async (email, password) => {
        await this.emailInput.waitFor()
        await this.emailInput.fill(email)
        await this.password.waitFor()
        await this.password.fill(password)
        await this.submitBtn.waitFor()
        await this.submitBtn.click()
        
    }
}