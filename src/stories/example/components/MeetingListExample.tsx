import { loremIpsum } from "lorem-ipsum";
import { useEffect, useState } from "react";
import { getAvatar, photo, token } from "../utils/common";
import MeetingList from "../../../MeetingList/MeetingList";
import type { IMeetingItemProps } from "../../../types";

function MeetingListExample() {
	const [meetingListArray, setMeetingListArray] = useState<IMeetingItemProps[]>(
		[],
	);

	useEffect(() => {
		if (meetingListArray?.length === 5) {
			return;
		}
		setMeetingListArray([
			...meetingListArray,
			{
				id: String(Math.random()),
				closable: true,
				avatars: Array(token() + 2)
					.fill(1)
					.map((x) => ({
						src: getAvatar(),
						title: "react, rce",
					})),
				avatarFlexible: true,
				date: new Date(),
				subject: loremIpsum({ count: 2, units: "words" }),
				subjectLimit: 25,
				avatarLimit: 5,
			} as IMeetingItemProps,
		]);
	}, [meetingListArray]);

	return (
		<MeetingList
			onMeetingClick={console.log}
			onShareClick={console.log}
			dataSource={meetingListArray}
		/>
	);
}

export default MeetingListExample;
