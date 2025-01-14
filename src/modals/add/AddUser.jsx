import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdCancel } from 'react-icons/md';
import { FiPlusCircle } from 'react-icons/fi';
import { Modal, Input, Button, Form } from 'antd';

function AddUser() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputs, setInputs] = useState({
    fullname: '',
    email: '',
    role: '',
    notification_method: '',
  });

  const [error, setError] = useState(null);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const onSubmitHandler = async (values) => {
    try {
      const response = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || 'Failed to create user.');
      } else {
        toast.success('user created successfully!');
        setTimeout(() => {
          closeModal();
        }, 1500);
      }
    } catch (error) {
      console.error('Network error:', error);
      setError('Failed to create user. Please try again.');
    }
  };

  return (
    <div>
      <button
        onClick={openModal}
        className="py-2 flex gap-2 items-center border border-[#c8c8c8] px-4 rounded hover:bg-gray-50"
      >
        <FiPlusCircle color="#6d63d4" />
        Create User
      </button>

      <Modal
        title="Create user"
        visible={isOpen}
        onCancel={closeModal}
        footer={null}
        width={600}
        closeIcon={<MdCancel size={32} />}
      >
        <ToastContainer position="top-left" autoClose={2000} />
        <Form
          name="add-user"
          initialValues={inputs}
          onFinish={onSubmitHandler}
          layout="vertical"
        >
          <Form.Item
            label="Fullname"
            name="fullname"
            rules={[{ required: true, message: 'Please input the name!' }]}
          >
            <Input
              value={inputs.name}
              onFocus={() => setError(null)}
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input the email!' }]}
          >
            <Input
              value={inputs.email}
              onFocus={() => setError(null)}
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item
            label="Role"
            name="role"
            rules={[
              {
                required: true,
                message: 'Please input the role!',
              },
            ]}
          >
            <Input
              // type="date"
              value={inputs.role}
              onFocus={() => setError(null)}
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item
            label="Notification Method"
            name="notification_method"
            rules={[
              {
                required: true,
                message: 'Please input the notification method!',
              },
            ]}
          >
            <Input
              value={inputs.notification_method}
              onFocus={() => setError(null)}
              onChange={handleChange}
            />
          </Form.Item>

         

          {error && <p className="text-center text-red-500">{error}</p>}

          <div className="text-center">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}

export default AddUser;
