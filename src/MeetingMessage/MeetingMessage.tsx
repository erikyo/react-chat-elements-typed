import type React from "react";
import { type FC, type MouseEvent, useState } from "react";
import "./MeetingMessage.css";

import { FaCalendar, FaCaretDown, FaCaretRight } from "react-icons/fa";
import { HiOutlineVideoCamera } from "react-icons/hi";
import { IoMdChatboxes } from "react-icons/io";
import { MdMoreHoriz } from "react-icons/md";

import { format } from "date-fns";

import Avatar from "../Avatar/Avatar";
import Dropdown from "../Dropdown/Dropdown";

import classNames from "classnames";
import type { IMeetingMessageProps } from "../types";
import { DATE_FORMAT } from "../constants";
import Button from "../Button/Button";

const MeetingMessage: FC<IMeetingMessageProps> = (props) => {
	const [attributes, setAttributes] = useState(props);
	const [toggle, setToggle] = useState(false);

	const PARTICIPANT_LIMIT: number =
		props.participantsLimit || Number.POSITIVE_INFINITY;
	const dateText = attributes.dateString
		? attributes.dateString
		: attributes.date && format(attributes.date, DATE_FORMAT);

	return (
		<div className="rce-mbox-mtmg">
			<div className="rce-mtmg">
				<div className="rce-mtmg-subject">
					{attributes.subject || "Unknown Meeting"}
				</div>
				<div className="rce-mtmg-body">
					<div className="rce-mtmg-item">
						<FaCalendar />
						<div className="rce-mtmg-content">
							<span className="rce-mtmg-title">{attributes.title}</span>
							<span className="rce-mtmg-date">{attributes.dateString}</span>
						</div>
					</div>

					{attributes.onMeetingMoreSelect &&
						attributes.moreItems &&
						attributes.moreItems.length > 0 && (
							<div>
								<Dropdown
									animationType="bottom"
									animationPosition="northeast"
									buttonProps={{
										className: "rce-mtmg-right-icon",
										icon: {
											component: <MdMoreHoriz />,
											size: 24,
										},
									}}
									items={attributes.moreItems}
									onSelect={(e) =>
										attributes.onMeetingMoreSelect?.(
											e,
											attributes,
											setAttributes,
										)
									}
								/>
							</div>
						)}
				</div>
				<Button
					className="rce-mtmg-body-bottom"
					link
					onClick={() => setToggle(!toggle)}
					icon={{
						component: toggle ? <FaCaretDown /> : <FaCaretRight />,
					}}
					text={
						toggle ? (
							<div className="rce-mtmg-bottom--tptitle">
								<span>{attributes.collapseTitle}</span>
							</div>
						) : (
							<div className="rce-mtmg-body-bottom--bttitle">
								<span>
									{attributes.participants
										?.slice(0, PARTICIPANT_LIMIT)
										.map((x) => x.title || "Unknown")
										.join(", ")}
									{attributes.participants &&
										PARTICIPANT_LIMIT &&
										attributes.participants.length > PARTICIPANT_LIMIT &&
										`, +${attributes.participants.length - PARTICIPANT_LIMIT}`}
								</span>
							</div>
						)
					}
				/>
				<div
					className={classNames("rce-mtmg-toogleContent", {
						"rce-mtmg-toogleContent--click": toggle,
					})}
				>
					{attributes.dataSource?.map((x, i) => {
						return (
							<div key={x.id ?? i.toString()}>
								{!x.event && (
									<div className="rce-mitem">
										<div
											className={classNames("rce-mitem avatar", {
												"rce-mitem no-avatar": !x.avatar,
											})}
										>
											{x.avatar ? (
												<Avatar title={x.title || "Unknown"} src={x.avatar} />
											) : (
												<IoMdChatboxes />
											)}
										</div>
										<div className="rce-mitem-body">
											<div className="rce-mitem-body--top">
												<div
													className="rce-mitem-body--top-title"
													onClick={(e) =>
														attributes.onMeetingLink?.(
															e,
															attributes,
															setAttributes,
														)
													}
													onKeyDown={console.log}
												>
													{x.title}
												</div>
												<div className="rce-mitem-body--top-time">
													{x.dateString
														? x.dateString
														: x.date && x.date && format(x.date, DATE_FORMAT)}
												</div>
											</div>
											<div className="rce-mitem-body--bottom">
												<div className="rce-mitem-body--bottom-title">
													{x.message}
												</div>
											</div>
										</div>
									</div>
								)}
								{x.event && (
									<div className="rce-mitem-event">
										<div className="rce-mitem-bottom-body">
											<div className="rce-mitem-event-wrapper">
												<div className="rce-mitem-body avatar">
													<HiOutlineVideoCamera />
												</div>
												<div className="rce-mitem-bottom-body-top">
													{x.event.title}
													<div className="rce-mitem-body--top-time">
														{x.dateString
															? x.dateString
															: x.date && format(x.date, "yyyy-MM-dd HH:mm")}
													</div>
													<div className="rce-mitem-avatar-content">
														{
															<div className="rce-mitem-avatar">
																{x.event.avatars
																	?.slice(0, PARTICIPANT_LIMIT)
																	.map((x, i) => (
																		<Avatar
																			title={x.title}
																			key={i.toString()}
																			src={x.src}
																			size={"small"}
																		/>
																	))}
																{x.event.avatars &&
																	x.event.avatarsLimit &&
																	x.event.avatars.length >
																		x.event.avatarsLimit && (
																		<div
																			className="rce-mitem-length rce-mitem-tooltip"
																			tooltip={x.event.avatars
																				.slice(
																					x.event.avatarsLimit,
																					x.event.avatars.length,
																				)
																				.map((avatar) => avatar.title)
																				.join(",")
																				.toString()}
																		>
																			<span className="rce-mitem-tooltip-text">
																				{`+${
																					x.event.avatars.length -
																					x.event.avatarsLimit
																				}`}
																			</span>
																		</div>
																	)}
															</div>
														}
													</div>
												</div>
											</div>
											{x.record && (
												<div className="rce-mtmg-call-record">
													<div className="rce-mtmg-call-body">
														<div
															onClick={(e) =>
																attributes.onMeetingVideoLink?.(
																	e,
																	attributes,
																	setAttributes,
																)
															}
															onKeyDown={(e) =>
																attributes.onMeetingVideoLink?.(
																	e,
																	attributes,
																	setAttributes,
																)
															}
															className="rce-mtmg-call-avatars"
														>
															<img
																alt="Meeting poster"
																className={"rce-mtmg-call-avatars"}
																src={x.record.cover}
															/>
															<div className={"rce-mtmg-record-time"}>
																{x.record.time}
															</div>
														</div>
														<div className="rce-mtmg-call-body-title">
															<span>{x.record.title}</span>
															<div className="rce-mtmg-call-body-bottom">
																{x.record.savedBy}
															</div>
														</div>
													</div>
												</div>
											)}
										</div>
									</div>
								)}
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default MeetingMessage;
