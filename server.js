const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://kchan42:3GeGnH3Lurf6bC14@companydb.um6lc.mongodb.net/?retryWrites=true&w=majority&appName=companyDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB Connection Error', error));

const favoriteSchema = new mongoose.Schema({
    name: String,
    date: String,
    venue: String,
});

const Favorite = mongoose.model('Favorite', favoriteSchema);

app.get('/favorites', async(req, res) => {
    try {
        const favorites = await Favorite.find();
        res.json(favorites);
    } catch (error) {
        console.error('error fetching favorite', error);
        res.status(500).json({ message: 'error fetching favorite' });
    }
});

app.post('/favorites', async(req, res) => {
    try {
        console.log('request adding received', req.body);
        const { name, date, venue } = req.body;
        const newFavorite= new Favorite({
            name,
            date,
            venue
        });
        await newFavorite.save();
        res.json(newFavorite);
    } catch (error) {
        console.error('error adding favorite', error);
        res.status(500).json({ message: 'error adding favorite' });
    }

});

app.delete('/favorites/:id', async(req, res) => {
    try {
        await Favorite.findByIdAndDelete(req.params.id);
        res.json({ message: 'Musical Removed' });
    } catch (error) {
        console.error('error deleting favorite', error);
        res.status(500).json({ message: 'error deleting favorite' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});