import {
  CheckCircle,
  User,
  MapPin,
  AlertCircle,
  FileText,
  Wrench,
  CreditCard,
} from "lucide-react";
import { ServiceStatus } from "../_components/Tracker";

export const STATUSES: ServiceStatus[] = [
  {
    id: 1,
    title: "Request Received",
    description:
      "We've received your service request. Preparing the job details.",
    icon: CheckCircle,
    completed: false,
    active: false,
  },
  {
    id: 2,
    title: "Service Order Created",
    description: "Your service order has been created and is being processed.",
    icon: CheckCircle,
    completed: false,
    active: false,
  },
  {
    id: 3,
    title: "Service Order Created",
    description: "Your service order has been created and is being processed.",
    icon: CheckCircle,
    completed: false,
    active: false,
  },
  {
    id: 4,
    title: "Technician Assigned",
    description: "Jake has been assigned as your technician.",
    icon: User,
    completed: false,
    active: false,
  },
  {
    id: 5,
    title: "Technician En Route",
    description: "Jake is on the way to your location. ETA: {eta}",
    icon: MapPin,
    completed: false,
    active: false,
  },
  {
    id: 6,
    title: "Technician Arrived",
    description:
      "Jake has arrived at your location and is preparing to begin diagnosis.",
    icon: CheckCircle,
    completed: false,
    active: false,
  },
];
