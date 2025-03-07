import express from 'express';
import axios from 'axios';

const app = express();
const port = 3000;
const config = {
    headers: { 'x-api-key': 'eaeee1c562cc47d1a68a7f33b56729b5' },
};

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {   
    res.render("index.ejs");
});

app.post("/getRandomRecipe", async (req, res) => {
    const userSearch = req.body.search;
    try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/random?tags=${userSearch}&number=1`, config);
        const randomRecipe = response.data;
        const recipeId = randomRecipe.recipes[0].id;
        const recipeResponse = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/card`, config);
        const recipeImg = recipeResponse.data;
        res.render("index.ejs", { message: `Here's your ${userSearch} recipe.`, recipeUrl: randomRecipe.recipes[0].sourceUrl,  recipeImg: recipeImg.url});
    } catch (error) {
        console.error('Error fetching recipe:', error.message);
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Error data:', error.response.data);
            console.error('Error status:', error.response.status);
            console.error('Error headers:', error.response.headers);
            res.render("index.ejs", { message: `Error: ${error.response.data.message || 'An error occurred while fetching the recipe.'}` });
        } else if (error.request) {
            // The request was made but no response was received
            console.error('Error request:', error.request);
            res.render("index.ejs", { message: 'Error: No response received from the API.' });
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error message:', error.message);
            res.render("index.ejs", { message: `Error: ${error.message}` });
        }
    }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});