// import express from "express";
import cors from "cors";
import 'dotenv/config';
import express from "express";
import { MongoClient } from 'mongodb';
const app=express();
app.use(cors())
app.use(express.json());
const port=process.env.PORT || 3000;
const mongoUrl=process.env.MONGO_URI ;

let db;
async function connectToDb() {
    try {
        const client = new MongoClient(mongoUrl);
        await client.connect();
        db = client.db('PassOP'); // Replace 'mydatabase' with your database name
        console.log('Connected to database');
    } catch (error) {
        console.error('Failed to connect to the database', error);
    }
}

app.listen(port,async()=>{
    await connectToDb();
    console.log(`App is listening at ${port}`);
})

app.get("/", async (req, res) => {
    try {
        const collection = db.collection('passwords');
        const findResult = await collection.find({}).toArray();
        res.status(200).json(
            findResult
        )
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch documents",
            error: error.message,
        });
    }
});
app.post("/save", async (req, res) => {
    try {
        const password=req.body;
        const collection = db.collection('passwords');
        const result = await collection.insertOne(password);
        res.status(200).json({
            ...password,
            _id: result.insertedId,
            result,
            message: "Success",
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch documents",
            error: error.message,
        });
    }
});
app.delete("/delete", async (req, res) => {
    try {
        const {_id}=req.body;
        console.log(_id)
        if(!_id){
            return res.status(400).json({ message: 'Missing _id in request body' });
        }
        const collection = db.collection('passwords');
        const result = await collection.deleteOne({ id: _id });
        if (result.deletedCount === 1) {
            res.status(200).json({
                message: "Document deleted successfully",
            });
        } else {
            res.status(404).json({
                message: "Document not found",
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete documents",
            error: error.message,
        });
    }
});
