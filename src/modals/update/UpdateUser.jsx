import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdCancel } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
import { Modal, Input, Button, Form } from 'antd';
import axios from 'axios';

function UpdateUser({ configId }) {
  console.log(configId)
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const onSubmitHandler = async (values) => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/api/users/${configId}`,
        values
      );

      if (response.status === 200) {
        toast.success('User updated successfully!');
        setTimeout(() => {
          closeModal();
        }, 1500);
      } else {
        setError('Failed to update user.');
      }
    } catch (error) {
      console.error('Network error:', error);
      setError('Failed to update user details. Please try again.');
    }
  };

  return (
    <div>
      <button
        onClick={openModal}
        className="py-2 flex gap-2 items-center border border-[#c8c8c8] px-4 rounded hover:bg-gray-50"
      >
        <FiEdit color="#6d63d4" />
        Edit User
      </button>

      <Modal
        title="Update user details"
        visible={isOpen}
        onCancel={closeModal}
        footer={null}
        width={600}
        closeIcon={<MdCancel size={32} />}
      >
        <ToastContainer position="top-left" autoClose={2000} />
        <Form
          name="update-user"
          onFinish={onSubmitHandler}
          layout="vertical"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input the email!' }]}
          >
            <Input onFocus={() => setError(null)} />
          </Form.Item>

          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: 'Please input the role!' }]}
          >
            <Input onFocus={() => setError(null)} />
          </Form.Item>

          <Form.Item
            label="Notification Method"
            name="notification_method"
            rules={[
              { required: true, message: 'Please input the notification method!' },
            ]}
          >
            <Input onFocus={() => setError(null)} />
          </Form.Item>

          {error && <p className="text-center text-red-500">{error}</p>}

          <div className="text-center">
            {/* <Button type="primary" htmlType="submit">
              Submit
            </Button> */}
            <button type='submit'>Submit</button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}

export default UpdateUser;
