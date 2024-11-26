import mongoose from "mongoose";

const UserChatSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    chats: [
        {
            _id: {
                type: String,
                required: true
            },
            title: {
                type: String,
                required: true
            },
            createdAt: {
                type: Date,
                default: Date.now(),
            },
        }
    ]
},
    { timestamps: true }
)

export const UserChat = mongoose.model("UserChat", UserChatSchema);