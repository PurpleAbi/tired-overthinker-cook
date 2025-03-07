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
        res.render("index.ejs", { message: JSON.stringify(error.response.data) });
    }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});