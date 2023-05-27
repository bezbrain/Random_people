import {
  FaUser,
  FaEnvelopeOpen,
  FaBox,
  FaStreetView,
  FaPhone,
  FaLock,
} from "react-icons/fa";

export const icons = [
  {
    id: 1,
    iconName: "user",
    icon: <FaUser />,
    statement: "My name is:",
  },
  {
    id: 2,
    iconName: "email",
    icon: <FaEnvelopeOpen />,
    statement: "My email is:",
  },
  {
    id: 3,
    iconName: "gender",
    icon: <FaBox />,
    statement: "My gender is:",
  },
  {
    id: 4,
    iconName: "address",
    icon: <FaStreetView />,
    statement: "My address is:",
  },
  {
    id: 5,
    iconName: "phone",
    icon: <FaPhone />,
    statement: "My phone number is:",
  },
  {
    id: 6,
    iconName: "socials",
    icon: <FaLock />,
    statement: "My facebook handle is:",
  },
];
