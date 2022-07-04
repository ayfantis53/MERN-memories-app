import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/users.model.js';


// @desc    loginUser
// @route   POST /user/signin
// @access  private
export const signin = async (req, res) => {
    const { email, password } = req.body;

    try{
        const existingUser = await User.findOne({ email });
        // Check to see if user  doesnt exists
        if(!existingUser){
            return res.status(404).json({ message: 'user doesnt exist!' });
        }
        // Check to see if user  password matches password in Mongodb
        const isPasswordCorrect = await bcrypt.compare(password.toString(), existingUser.password.toString());
        if(!isPasswordCorrect){
            return res.status(400).json({message: 'invalid credentials'});
        }

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: '1h' });

        res.status(200).json({ result: existingUser, token });
    }
    catch(error){
        res.status(500).json({ message: 'something went wrong' });
    }
}

// @desc    registerUser
// @route   POST /user/signup
// @access  public
export const signup = async (req, res) => {
    const { email, password,  confirmPassword, firstName, lastName } = req.body;

    try{
        // Check to see if user exists already
        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(404).json({ message: 'user already exists!' });
        }
        // Check to see if user passwords match
        if(password.toString() !== confirmPassword.toString()){
            return res.status(400).json({message: 'Passwords do not match'});
        } 

        // Encrypt password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password.toString(), salt);
        // Create user by converting all the destructured objects to strings
        const result = await User.create({ email: email.toString(), password: hashedPassword.toString(), name: `${firstName} ${lastName}` });
        const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: '1h' });

        res.status(200).json({ result, token });
    }
    catch(error){
        res.status(500).json({ message: 'something went wrong' });
        console.log(error);
    }
}