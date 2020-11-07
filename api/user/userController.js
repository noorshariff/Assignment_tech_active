const User = require('./usermodel')


class userController {
    static async registerUser(req, res, next) {
        // console.log(req.body)
        // const user = new User(req.body);
        // await user.save((err, doc) => {
        //     console.log(doc)
        //     if (err) {
        //         return res.status(422).json({ errors: err })
        //     } else {
        //         const userData = {
        //             firtsName: doc.firstName,
        //             lastName: doc.lastName,
        //             email: doc.email
        //         }
        //         return res.status(200).json(
        //             {
        //                 success: true,
        //                 message: 'Successfully Signed Up',
        //                 userData
        //             }
        //         )
        //     }
        // });
        try {
            const user = new User(req.body)
            await user.save()
            const token = await user.generateAuthToken()
            res.status(201).send({ user, token })
        } catch (error) {
            console.log(error)
            res.status(400).send(error)
        }
    }
    static async loginUser(req, res, next) {
        try {
            const { email, password } = req.body
            const user = await User.findByCredentials(email, password)
            if (!user) {
                return res.status(401).send({ error: 'Login failed! Check authentication credentials' })
            }
            const token = await user.generateAuthToken()
            res.send({ user, token })
        } catch (error) {
            res.status(400).send(error);

        }
    }
    static async logoutUser(req, res, next) {
        try {
            req.user.tokens = req.user.tokens.filter((token) => {
                return token.token != req.token
            })
            await req.user.save()
            res.send()
        } catch (error) {
            res.status(500).send(error)
        }
    }
}

module.exports = userController