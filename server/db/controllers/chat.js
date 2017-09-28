import ChatChannel from '../models/chatChannel';


/**
 * POST /api/chat/channel
 * */
export function addChannel(req, res, next) {
	const data = req.body;
	console.log('###### HEUY ######');
	console.log(data);

	const channel = new ChatChannel(data);

	ChatChannel.findOne({_id: data.id}, (findErr, existingUser) => {
		// conflict errors :
		if (existingUser) {
			return res.status(409).json({message: 'Ce channel existe déja !'});
		}

		// create channel :
		return channel.save((saveErr) => {
			if (saveErr) return next(saveErr);

			return res.status(200).json({message: 'Channel bien ajouté.', newChannel: data});
		});
	});
}

export default {
	addChannel
};
