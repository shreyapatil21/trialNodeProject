import User from '../models/userModel.js'
import jwt from 'jsonwebtoken';

async function generateAccessTokens(userId){
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found'); // Handle the case where the user is not found
        }
        const accessToken = user.generateAccessToken()
        return { accessToken };
    } catch (error) {
        console.error('Error generating access token:', error.message);
        throw new Error('Something went wrong while generating access token.');
    }
}
async function handleLoginOfUser(req, res){
    // Get data from user
    const { email, username, password } = req.body;
    console.log("Login data: ",req.body);
    // username or email 
    if (!(username || email)) {
        return res.status(400).json({ error: "Username or email is required." });
    }    
    console.log('Received Request Body:', req.body);

    try {
        // find the user 
        const user = await User.findOne({ $or: [{ username }, { email }] });
        if (!user) {
            return res.status(404).json({ error: "User does not exist." });
        }

        // password check
        const isPasswordValid = await user.isPasswordCorrect(password);
        console.log("isPasswordValid: ",isPasswordValid);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        console.log('Before Token (User):', user);

        const { accessToken } = await generateAccessTokens(user._id);

        // Send cookies
        const userId = user._id;
        // const loggedUser = await User.findById({ userId }).select("-password")
        await User.findByIdAndUpdate(
            userId,
            {
                $set: {
                    is_loggedIn: true
                }
            }
        );
        // Send Response
        //return res.status(200).json({ message: "User logged-in Successfully!" });
        
        const options = {
            path:"/",
            httpOnly: false,
            secure: true,
            sameSite:"strict"
        };
        return res
        .status(200)
        .cookie("accessToken",accessToken,options)
        .json({ message: "User logged-in Successfully!" ,user})
        
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function handleLogOutOfUser (req,res) {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                is_loggedIn: false
            }
        },
        {
            new: true
        }
    )
    const options = {
        httpOnly: true,
        secure: true
    }
    return res
    .status(200)
    .clearCookie("accessToken",options)
    .json({ message: "User logged out Successfully" })
}

export {
    handleLoginOfUser,
    handleLogOutOfUser,
    generateAccessTokens,
}