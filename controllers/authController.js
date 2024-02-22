import User from "../models/user.js"
import bcrypt from "bcrypt"
import dotenv from 'dotenv'
dotenv.config()
import hashPassword from "../utils/password_hash.js"


class AuthController {
    static signUp = async (req, res) => {
        if (req.session.user) {
            return res.redirect("/")
        }
        res.render('signup', { errors: [], title: "sign-up" })
    }

    static createUser = async (req, res) => {
        if (req.session.user) {
            return res.redirect("/")
        }
        // res.send("signup url")
        const errors = []
        const { username, email, password1, password2 } = req.body
        let pd = ""

        if (password1 !== password2) {
            errors.push("Two password fields doesnot match")

        } else {


            try {

                // const hash = await hashPassword(password1)
                const hash = await bcrypt.hash(password1, 10)
                const data = {
                    username: username,
                    email: email,
                    password: hash

                }

                console.log("data====", data)
                const user = await User.create(data)

                return res.redirect("/account/login")
            } catch (error) {
                errors.push("User not created.")
                console.log(error)
                return res.render('signup', { errors: errors })
            }



        }





        res.render('signup', { errors: errors, title: "sign-up" })
    }

    static login = async (req, res) => {

        if (req.session.user) {
            return res.redirect("/")
        }

        if (req.method == 'GET') {
            return res.render('login', { title: "login", errors: [] })
        }


        const { email, password } = req.body
        let errors = []
        try {
            const user = await User.findOne({ email: email })
            console.log(user)

            if (!user) {
                return res.render('login', { title: "login", errors: ["Provided credentials do not match our records."] })
            }

            // Load hash from your password DB.
            const match = await bcrypt.compare(password, user.password)

            if (match) {
                // login user
                req.session.user = user
                return res.redirect("/")
            } else {
                res.render('login', { title: "login", errors: ["Provided credentials do not match our records."] })
            }

            // return res.render('login', { errors: [] })
        } catch (error) {
            console.log(error)
            res.render('login', { title: 'login', errors: [] })
        }
        // res.render('login', { errors: [] })
    }
}

export default AuthController