/**
 * @param {Date} birthday - date to calculate in age
 * @return {Number} age
 * */
export function calculateAge(birthday) {
  const ageDifMs = Date.now() - birthday.getTime();
  let ageDate = new Date(ageDifMs);

  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

/**
 * get the avatar by the id given by parameter
 * @param {number} avatarId - the id of the avatar we want find
 * @param {object} avatarsList - the list of avatars to check, from the props
 * @return {object} the avatar find in the list
 * */
export function getAvatarById(avatarId, avatarsList) {
	var avatarSelected;

	for (var i = 0; i < avatarsList.length; i++) {
		var avatar = avatarsList[i];
		if (avatar.avatarId === avatarId) {
			avatarSelected = avatar;
			break;
		}
	}

	return avatarSelected;
}

/**
 * Check if a file / image exist on the disk
 * @pram {string} url - the url of the file to check
 * @return {boolean} true if file exist
 * */
export function fileExists(url) {
	if (url) {
		var req = new XMLHttpRequest();
		req.open('GET', url, false);
		req.send();

		return req.status === 200;
	} else {
		return false;
	}
}