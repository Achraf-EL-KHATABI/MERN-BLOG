import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import path from 'path';
import Article from './articleShema';
const uri = "mongodb+srv://user_article:password_article@articles.6biy6.mongodb.net/my-blog?retryWrites=true&w=majority";
const app = express();

app.use(express.static(path.join(__dirname , '/build') ));

mongoose.connect(uri,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Connexion à MongoDB réussie !');
    })
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(bodyParser.json());

app.get('/api/articles/:name', (req, res) => {
    Article.findOne({ name: req.params.name })
        .then(article => res.status(200).json(article))
        .catch(error => res.status(400).json({ error: error }));
});

app.post('/api/articles/:name/upvote', async (req, res) => {
    try {
        const article = await Article.findOne({ name: req.params.name })
        article.upvotes = article.upvotes + 1;
        const result = await article.save();
        const articleUpdated = await Article.findOne({ name: req.params.name });
        res.status(200).json(articleUpdated);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});

app.post('/api/articles/:name/add-comment', async (req, res) => {
    try {
        const { username, text } = req.body;
        console.log(req.body);
        const article = await Article.findOne({ name: req.params.name });
        console.log(article);
        article.comments = article.comments.concat({ username, text });
        console.log(article.comments);
        const result = await article.save();
        console.log(result);
        const updatedArticle = await Article.findOne({ name: req.params.name });
        console.log(updatedArticle);
        res.status(200).json(updatedArticle);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});

app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname , '/build/index.html'));
});

app.listen(8000, () => console.log('Listening on port 8000'));


/*const listArticle = [
    {
        'name': 'learn-react',
        'upvotes': 0,
        'comments': []
    },
    {
        'name': 'learn-node',
        'upvotes': 0,
        'comments': []
    },
    {
        'name': 'my-thoughts-on-resumes',
        'upvotes': 0,
        'comments': []
    }
];



Article.insertMany(
    listArticle
).then(function () {
    console.log("Data inserted")
}).catch(function (error) {
    console.log("Error when inserting data : " + error)
});

*/