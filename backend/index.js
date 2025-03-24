const express=require('express')
const app=express();
const bodyparser=require('body-parser')
const cors=require('cors')
const mongoose=require('mongoose')
const PORT=5000;

app.use(cors({
    origin: "http://localhost:5173",
    credentials:true
}))

app.use(bodyparser.json())

mongoose.connect('mongodb://localhost:27017/ecommerce_svelte', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  
  const cartSchema = new mongoose.Schema({
    user_email: String,
    items: [
      {
        _id:false,
        id: Number,
        title: String,
        quantity: Number,
        price: Number,
        brand:String,
        thumbnail:String
      }
    ],
    totalPrice: Number,
    createdAt: { type: Date, default: Date.now }
  });
  
  const Cart = mongoose.model('Cart', cartSchema);

  app.get('/',(req,res)=>{
    res.send('Hello World!')
})
  
  app.post('/api/checkout', async (req, res) => {
    console.log("hello")
    console.log(req.body)
    const { user_email, items, totalPrice } = req.body;
    try {
      const newCart = new Cart({
        user_email,
        items,
        totalPrice
      });
      await newCart.save();
      res.status(201).send({ message: 'Cart saved successfully', data: newCart });
    } catch (err) {
      res.status(500).send({ message: 'Error saving cart', error: err });
    }
  });


app.listen(PORT,()=>{
    console.log(`Server listening on port ${PORT}`)
})









