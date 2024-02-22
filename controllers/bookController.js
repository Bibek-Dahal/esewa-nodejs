import Book from "../models/books.js"
import dotenv from "dotenv"
import Order from "../models/order.js"
dotenv.config()
import CryptoJS from "crypto-js";
import { v4 as uuidv4 } from 'uuid';

class BookController {
    static create = async (req, res) => {

        if (req.method == 'GET') {
            return res.render("book", { title: "Book", errors: [] })
        }
        const { title, description, price } = req.body
        await Book.create({
            title,
            description,
            price,
            image: ""
        })

        res.redirect("/book")
        try {

        } catch (error) {
            console.log(error)
        }
    }

    static buy = async (req, res) => {
        const id = req.params.id

        const book = await Book.findById(id)
        const uid = uuidv4();
        const message = `total_amount=${book.price},transaction_uuid=${uid},product_code=EPAYTEST`
        const hash = CryptoJS.HmacSHA256(message, process.env.ESEWASECRET);
        const hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
        console.log(uid)

        // res.send(`${id},${book.title},secret:${process.env.ESEWASECRET},hash:${hashInBase64}`)
        res.render("order", { description: book.description, image: book.image, id: book.id, title: book.title, uid: uid, price: book.price, signature: hashInBase64 })

    }

    static verifyEsewa = async (req, res) => {
        const id = req.params.id
        const data = req.query.data
        let decodedString = atob(data);
        console.log("dec_string", decodedString)
        console.log("ds==", typeof (decodedString))
        const obj = JSON.parse(decodedString)
        console.log("obj==", typeof (obj))
        decodedString = JSON.parse(decodedString)


        switch (decodedString.status) {
            // compare the signature once again for better security
            case "COMPLETE":
                try {
                    console.log(req.session.user)
                    const user_id = req.session.user._id
                    const book = await Book.findById(id)
                    const uid = uuidv4();
                    const message = `transaction_code=${decodedString.transaction_code},status=${decodedString.status},total_amount=${decodedString.total_amount},transaction_uuid=${decodedString.transaction_uuid},product_code=${decodedString.product_code},signed_field_names=${decodedString.signed_field_names}`
                    console.log(message)
                    const hash = CryptoJS.HmacSHA256(message, process.env.ESEWASECRET);
                    const hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
                    console.log(hashInBase64)
                    console.log(hashInBase64 == decodedString.signature)
                    const result = hashInBase64 == decodedString.signature
                    if (result == false) {
                        throw "Hash value not matched"
                    }
                    await Order.create({
                        orderedBy: user_id,
                        bookId: book.id,
                        quantity: 1,
                        price: book.price

                    })
                    res.redirect("/account/login")

                } catch (error) {
                    console.log("error occoured", error)
                }
                break;

            case "PENDING":
                break;

            case "FULL_REFUND":
                break;

            case "CANCELED":
                break;

        }
    }
}

export default BookController