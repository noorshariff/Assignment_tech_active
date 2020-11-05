const { User } = require('./usermodel')


class userController {
    static async registerUser(req, res, next) {
        const user = new User(req.body);
        await user.save((err, doc) => {
            if (err) {
                return res.status(422).json({ errors: err })
            } else {
                const userData = {
                    firtsName: doc.firstName,
                    lastName: doc.lastName,
                    email: doc.email,
                }
                return res.status(200).json(
                    {
                        success: true,
                        message: 'Successfully Signed Up',
                        userData
                    }
                )
            }
        });
    }
    static async loginUser(req, res, next) {
        User.findOne({ 'email': req.body.email }, (err, user) => {
            if (!user) {
                return res.status(404).json({ success: false, message: 'User email not found!' });
            } else {
                user.comparePassword(req.body.password, (err, isMatch) => {
                    console.log(isMatch);
                    //isMatch is eaither true or false
                    if (!isMatch) {
                        return res.status(400).json({ success: false, message: 'Wrong Password!' });
                    } else {
                        user.generateToken((err, user) => {
                            if (err) {
                                return res.status(400).send({ err });
                            } else {
                                const data = {
                                    userID: user._id,
                                    firstName: user.firstName,
                                    lastName: user.lastName,
                                    email: user.email,
                                    token: user.token
                                }
                                //saving token to cookie
                                res.cookie('authToken', user.token).status(200).json(
                                    {
                                        success: true,
                                        message: 'Successfully Logged In!',
                                        userData: data
                                    })
                            }
                        });
                    }
                });
            }
        });
    }
    static async logoutUser(req, res, next) {
        User.findByIdAndUpdate(
            { _id: req.user._id }
            , { token: '' },
            (err) => {
                if (err) return res.json({ success: false, err })
                return res.status(200).send({ success: true, message: 'Successfully Logged Out!' });
            })
    }
}

module.exports = userController