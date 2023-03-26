import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({ sidebarStatus, onClose }) => {
  console.log("sidebarStatus", sidebarStatus);

  const [openItems, setOpenItems] = useState([]);

  // Handler function to toggle an item's open state
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
      id: 1,
      label: "Dashboard",
      icon: "...",
      subitems: [
        { id: 1, label: "Overview" },
        { id: 2, label: "Analytics" },
        { id: 3, label: "Sales" },
      ],
    },
    {
      id: 2,
      label: "Orders",
      icon: "...",
      subitems: [
        { id: 1, label: "New Orders" },
        { id: 2, label: "Pending Orders" },
        { id: 3, label: "Completed Orders" },
      ],
    },
    {
      id: 3,
      label: "Users",
      icon: "...",
      subitems: [
        { id: 1, label: "Users" },
        { id: 2, label: "New User" },
      ],
    },
  ];

  // Function to render an item's subitems
  const renderSubitems = (subitems) => {
    return subitems.map((subitem) => (
      <div key={subitem.id} className="ml-6 my-2">
        <span className="text-gray-400">{subitem.label}</span>
      </div>
    ));
  };

  // Function to render an item and its subitems
  const renderItem = (item) => {
    const isOpen = openItems.includes(item.id);

    return (
      <div key={item.id} className="">
        <div
          className="flex items-center my-4 cursor-pointer"
          onClick={() => toggleItem(item.id)}
        >
          {item.icon}
          <span className="ml-2 text-white">{item.label}</span>
          <span className="ml-auto">
            {isOpen ? (
              <FontAwesomeIcon icon={faChevronUp} size="lg" color="#ffffff" />
            ) : (
              <FontAwesomeIcon icon={faChevronDown} size="lg" color="#ffffff" />
            )}
          </span>
        </div>
        {isOpen && renderSubitems(item.subitems)}
      </div>
    );
  };

  // Function to render all items
  const renderItems = () => {
    return items.map(renderItem);
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-gray-800 z-10 transition-all duration-300 ease-in-out ${
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
