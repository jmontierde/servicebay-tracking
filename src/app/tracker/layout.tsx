import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ServiceBay Tracker",
  description:
    "Real-time service request tracking. Monitor your repair progress from dispatch to completion.",
  icons: {
    icon: "/servicebay-blue.svg",
  },
};

export default function TrackerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="font-poppins">{children}</div>;
}
