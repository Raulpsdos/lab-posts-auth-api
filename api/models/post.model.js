const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postsSchema = new Schema(
    {
        id: {
            type: String
        },
        createdAt: {
            type: Date
        },
        updatedAt: {
            type: Date
        },
        title: {
            type: String,
            required: true,
            min: [5, 'Minimum 5 characters']
        },
        text: {
            type: String,
            required: true,
            min: [5, 'Minimum 5 characters']
        },
        author: {
            type: String,
            required: true
        }
    },
    { 
        timestamps: true,
        toJSON: {
            transform: (doc, ret) => {
                ret.id = ret._id
                delete ret._id
                delete ret.__v
                return ret
            }
        }
    }
)

const Post = mongoose.model('Post', postsSchema)
module.exports = Post;