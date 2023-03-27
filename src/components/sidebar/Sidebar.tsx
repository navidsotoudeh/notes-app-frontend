import React, { useState } from "react";
import Router from "next/router";
import { Transition } from "@headlessui/react";

import {
  ChevronDownIcon,
  ChevronUpIcon,
  HomeIcon,
  UserIcon,
  DocumentTextIcon,
} from "@heroicons/react/solid";

const Sidebar = ({ sidebarStatus, onClose }) => {
  const [openItems, setOpenItems] = useState([]);

  const toggleItem = (itemId) => {
    setOpenItems((prevOpenItems) => {
      if (prevOpenItems.includes(itemId)) {
        return prevOpenItems.filter((id) => id !== itemId);
      } else {
        return [...prevOpenItems, itemId];
      }
    });
  };

  // Array of items to display in the sidebar
  const items = [
    {
      parent_id: 1,
      label: "Dashboard",
      link: "./dashboard",
      icon: <HomeIcon className="h-6 w-6 text-white" />,
      subItems: [],
    },
    {
      parent_id: 2,
      label: "Notes",

      icon: <DocumentTextIcon className="h-6 w-6 text-white" />,
      subItems: [
        { id: 1, label: "Notes", link: "./notes" },
        { id: 2, label: "New Notes", link: "./notes/new-note" },
      ],
    },
    {
      parent_id: 3,
      label: "Users",

      icon: <UserIcon className="h-6 w-6 text-white" />,
      subItems: [
        { id: 1, label: "Users", link: "./users" },
        { id: 2, label: "New User", link: "./users/new-user" },
      ],
    },
  ];

  const renderSubItems = (subItems, isOpen) => {
    return (
      <div className="ml-6 my-2">
        <Transition
          show={isOpen}
          enter="transition-transform origin-top duration-300"
          enterFrom="scale-y-0"
          enterTo="scale-y-100"
          leave="transition-transform origin-top duration-300"
          leaveFrom="scale-y-100"
          leaveTo="scale-y-0"
        >
          {subItems.map((subItem) => (
            <button
              key={subItem.id}
              className="block"
              onClick={() => Router.replace(`${subItem.link}`)}
            >
              <span className="text-gray-400">{subItem.label}</span>
            </button>
          ))}
        </Transition>
      </div>
    );
  };

  const renderItem = (item) => {
    const isOpen = openItems.includes(item.parent_id);

    return (
      <div key={item.parent_id} className="">
        <div
          className="flex items-center my-4 cursor-pointer"
          onClick={() => toggleItem(item.parent_id)}
        >
          {item.icon}
          <span className="ml-2 text-white">{item.label}</span>
          <span className="ml-auto">
            {isOpen ? (
              <ChevronUpIcon className="h-6 w-6 text-white" />
            ) : (
              <ChevronDownIcon className="h-6 w-6 text-white" />
            )}
          </span>
        </div>
        {item.subItems && renderSubItems(item.subItems, isOpen)}
      </div>
    );
  };

  // Function to render all items
  const renderItems = () => {
    return items.map(renderItem);
  };

  return (
    <div
      className={`h-full bg-gray-800 z-10 transition-all duration-300 ease-in-out ${
        sidebarStatus ? "w-[300px]" : "w-[120px]"
      }`}
    >
      <button className="p-4 text-white" onClick={onClose}>
        <svg
          className="w-6 h-6 fill-current"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Close</title>
          <path
            fillRule="evenodd"
            d="M10 8.586L6.707 5.293a1 1 0 1 0-1.414 1.414L8.586 10l-3.293 3.293a1 1 0 1 0 1.414 1.414L10 11.414l3.293 3.293a1 1 0 1 0 1.414-1.414L11.414 10l3.293-3.293a1 1 0 0 0-1.414-1.414L10 8.586z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {renderItems()}
    </div>
  );
};

export default Sidebar;
