import mongoose from 'mongoose';

const articleShema = mongoose.Schema(
    {
        name: { type: String, required: true },
        upvotes: { type: Number, required: true },
        comments: [{ 
            username: { type: String, required: false },
            text: { type: String, required: false }
        }]
    }
);

module.exports = mongoose.model('Article', articleShema);
