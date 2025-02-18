const express=require ('express')
const {userRouter} =require('./routes/user')
const cors=require('cors');
const { Users, Products, Categories, OrderItems, Review, SubCategories } = require('./db');
const ProductRouter = require('./routes/product');
const categoryRouter = require('./routes/category');
const path = require("path");



const app=express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "dist")));


app.use('/user',userRouter);
app.use('/products',ProductRouter);
app.use('/categories',categoryRouter);
app.post('/data',async (req,res)=>{
    try {
        const [users, products, categories,subCategories, orders, reviews] = await Promise.all([
            Users.find({}),
            Products.find({}),
            Categories.find({}),
            SubCategories.find({}),
            OrderItems.find({}),
            Review.find({})
        ]);
        console.log(users, products, categories, orders, reviews);
        return res.json({users, products, categories,subCategories, orders, reviews});
    } catch (error) {
        console.error("Error fetching data:", error);
    }

})


const PORT = process.env.PORT || 10000;
app.listen(PORT,()=>{
    console.log('listening on admin-authassignment.vercel.app')
})
