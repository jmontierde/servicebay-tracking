import { CheckCircle, User, MapPin, FileText } from "lucide-react";
import { ServiceStatus } from "../_components/Tracker";

export const STATUSES: ServiceStatus[] = [
  {
    id: 1,
    title: "Request Received",
    description:
      "We've received your service request and are preparing the job details for processing.",
    icon: CheckCircle,
    completed: false,
    active: false,
  },
  {
    id: 2,
    title: "Service Order Created",
    description:
      "Your service order has been created and is being processed by our dispatch team.",
    icon: FileText,
    completed: false,
    active: false,
  },
  {
    id: 3,
    title: "Technician Assigned",
    description:
      "Jake Thompson has been assigned as your technician and is reviewing your service request.",
    icon: User,
    completed: false,
    active: false,
  },
  {
    id: 4,
    title: "Technician En Route",
    description:
      "Jake is on the way to your location. Estimated arrival time: 15 minutes.",
    icon: MapPin,
    completed: false,
    active: false,
  },
  {
    id: 5,
    title: "Technician Arrived",
    description:
      "Jake has arrived at your location and is preparing to begin diagnosis of your equipment.",
    icon: CheckCircle,
    completed: false,
    active: false,
  },
];
