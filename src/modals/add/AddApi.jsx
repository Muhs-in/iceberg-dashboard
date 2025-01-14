import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdCancel } from 'react-icons/md';
import { FiPlusCircle } from 'react-icons/fi';
import { Modal, Input, Checkbox, Button, Form } from 'antd';

function AddApi() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputs, setInputs] = useState({
    name: '',
    method: '',
    subscription_type: '',
    subscription_date: '',
    recipient_ids: [],
  });

  const [recipients, setRecipients] = useState([]);
  const [error, setError] = useState(null);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  useEffect(() => {
    const fetchRecipients = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/recipients');
        const data = await response.json();
        setRecipients(data.recipients || []);
      } catch (error) {
        console.error('Error fetching recipients:', error);
        setError('Failed to fetch recipients.');
      }
    };
    fetchRecipients();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const onSubmitHandler = async (values) => {
    try {
      const response = await fetch('http://localhost:3000/api/api_configs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || 'Failed to create API configuration.');
      } else {
        toast.success('API Configuration created successfully!');
        setTimeout(() => {
          closeModal();
        }, 1500);
      }
    } catch (error) {
      console.error('Network error:', error);
      setError('Failed to create API configuration. Please try again.');
    }
  };

  return (
    <div>
      <button
        onClick={openModal}
        className="py-2 flex gap-2 items-center border border-[#c8c8c8] px-4 rounded hover:bg-gray-50"
      >
        <FiPlusCircle color="#6d63d4" />
        Create Api
      </button>

      <Modal
        title="Create API Config"
        visible={isOpen}
        onCancel={closeModal}
        footer={null}
        width={600}
        closeIcon={<MdCancel size={32} />}
      >
        <ToastContainer position="top-left" autoClose={2000} />
        <Form
          name="add-api"
          initialValues={inputs}
          onFinish={onSubmitHandler}
          layout="vertical"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input the name!' }]}
          >
            <Input
              value={inputs.name}
              onFocus={() => setError(null)}
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item
            label="Method"
            name="method"
            rules={[{ required: true, message: 'Please input the method!' }]}
          >
            <Input
              value={inputs.method}
              onFocus={() => setError(null)}
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item
            label="Subscription Date"
            name="subscription_date"
            rules={[
              {
                required: true,
                message: 'Please input the subscription date!',
              },
            ]}
          >
            <Input
              type="date"
              value={inputs.subscription_date}
              onFocus={() => setError(null)}
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item
            label="Subscription Type"
            name="subscription_type"
            rules={[
              {
                required: true,
                message: 'Please input the subscription type!',
              },
            ]}
          >
            <Input
              value={inputs.subscription_type}
              onFocus={() => setError(null)}
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item label="Recipients" name="recipient_ids">
            <Checkbox.Group
              value={inputs.recipient_ids}
              onChange={(checkedValues) =>
                setInputs({ ...inputs, recipient_ids: checkedValues })
              }
            >
              <div className="grid grid-cols-2 gap-2">
                {recipients.map((recipient) => (
                  <Checkbox key={recipient.id} value={recipient.id}>
                    {recipient.name}
                  </Checkbox>
                ))}
              </div>
            </Checkbox.Group>
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

export default AddApi;
