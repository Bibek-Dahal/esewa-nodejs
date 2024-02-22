import Book from "../models/books.js"

class HomeController {
    static home = async (req, res) => {
        console.log("user====", req.session.user)
        try {
            const books = await Book.find({})
            console.log("books", books)
            res.render('home', { errors: [], title: 'home', books: books })
        } catch (error) {
            res.redirect("/")
        }
    }

}

export default HomeController