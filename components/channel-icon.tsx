import { Instagram, Mail, MessageCircle, MessagesSquare } from "lucide-react";
import type { Channel } from "@/lib/demo-data";

export function ChannelIcon({
  channel,
  size = 14,
}: {
  channel: Channel;
  size?: number;
}) {
  const Icon =
    channel === "Instagram"
      ? Instagram
      : channel === "Email"
        ? Mail
        : channel === "Webchat"
          ? MessagesSquare
          : MessageCircle;
  return (
    <span
      className={`pd-channel pd-channel-${channel.toLowerCase()}`}
      aria-hidden="true"
    >
      <Icon size={size} aria-hidden="true" />
    </span>
  );
}
