import ChatChannel from '../models/chatChannel';


/**
 * GET /api/tchat/channel/all
 * */
export function allChannels(req, res) {
	ChatChannel.find({}).exec((err, channels) => {
		if (err) {
			return res.status(500).json({message: 'Something went wrong getting the data !'});
		}

		return res.status(200).json({message: 'channels bien fetché !', channels});
	});
}

/**
 * POST /api/tchat/channel
 * */
export function addChannel(req, res, next) {
	const data = req.body;
	const channel = new ChatChannel(data);

	ChatChannel.findOne({id: data.id}, (findErr, existingChannel) => {
		// conflict errors :
		if (existingChannel) {
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
	allChannels,
	addChannel,
};
