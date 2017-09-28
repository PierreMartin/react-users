import mongoose from 'mongoose';

const ChatChannelSchema = new mongoose.Schema({
	id: { type:String, unique: true },
	private: { type: Boolean, default: true },
	between: Array
});

export default mongoose.model('ChatChannel', ChatChannelSchema);
