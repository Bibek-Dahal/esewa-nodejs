import bcrypt from "bcrypt"
async function hashPassword(password1) {
    try {
        let hash = await new Promise(function (resolve, reject) {
            bcrypt.hash(password1, 10, function (err, hash) {
                if (!err) {
                    resolve(hash);
                } else {
                    reject(err);
                }
            });
        });
        return hash;
    } catch (error) {
        // Handle errors
        console.error("Error hashing password:", error);
        throw error; // Re-throw the error if necessary
    }
}

export default hashPassword