import { useEffect, useState } from 'react';
import Widget from '../components/Widget';
import Layout from '../layout/Layout';
import axios from 'axios';
import moment from 'moment';

const Dashboard = () => {
  const [apis, setApis] = useState([]);

  useEffect(() => {
    const fetchApis = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/api/api_configs'
        );
        const data = response.data;

        setApis((prevApis) => {
          if (JSON.stringify(prevApis) !== JSON.stringify(data.apis)) {
            return data.apis || [];
          }
          return prevApis;
        });
      } catch (error) {
        console.error('Error fetching APIs:', error);
      }
    };

    fetchApis();
  }, []);

  return (
    <>
      <Layout>
        <div className="px-6 py-2">
          <h1 className="text-3xl font-bold">Dashboard</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {apis.map((api) => (
              <Widget
                key={api.name}
                apiName={api.name}
                status={api.status}
                const
                lastUpdate={
                  api.lastChecked
                    ? moment(api.lastChecked).format('ddd Do MMM, h:mm A')
                    : 'No data available'
                }
              />
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Dashboard;
