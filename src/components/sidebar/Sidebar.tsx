import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  // State to keep track of open items
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
    // Add more items here
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
      <div key={item.id}>
        {/* Item label and icon */}
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

        {/* Subitems */}
        {isOpen && renderSubitems(item.subitems)}
      </div>
    );
  };

  // Function to render all items
  const renderItems = () => {
    return items.map(renderItem);
  };

  return (
    <div className="bg-gray-800 h-screen w-64 px-4 py-8">{renderItems()}</div>
  );
};

export default Sidebar;
