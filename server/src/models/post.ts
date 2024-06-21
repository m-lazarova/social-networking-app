import mongoose from 'mongoose';
const { Schema } = mongoose;


const postSchema = new Schema(
    {
        title: String,
        imageUrl: String,
        content: String,
        creator: {
            name: String,
        },
    },

    {
        timestamps: true,
    }
);

const Post =  mongoose.model('Post', postSchema);
export default Post;