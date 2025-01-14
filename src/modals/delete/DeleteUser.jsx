import  { useState } from "react";
import { Button, Popconfirm, message } from "antd";
import { FiXCircle } from "react-icons/fi";

const DeleteUser = ({ configId }) => {
  const [loading, setLoading] = useState(false);

  const deleteConfig = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/api/users/${configId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete user account.");
      }

      message.success("user account deleted successfully!");
    } catch (error) {
      console.error(error);
      message.error("Failed to delete user account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = async () => {
    await deleteConfig();
  };

  return (
    <Popconfirm
      title="Are you sure you want to delete this account?"
      description="This action cannot be undone."
      onConfirm={confirmDelete}
      okText="Yes, delete"
      cancelText="Cancel"
      okButtonProps={{ loading }}
    >
      {/* <Button danger>Delete</Button> */}
       <button
              className="py-2 flex gap-2 items-center border border-[#c8c8c8] px-4 rounded hover:bg-gray-50"
            >
              <FiXCircle color="#6d63d4" />
              Delete User
            </button>
    </Popconfirm>
  );
};

export default DeleteUser;
