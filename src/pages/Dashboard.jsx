// import { useEffect, useState } from 'react';
// import Widget from '../components/Widget';
// import Layout from '../layout/Layout';
// import axios from 'axios';
// import moment from 'moment';

// const Dashboard = () => {
//   const [apis, setApis] = useState([]);

//   useEffect(() => {
//     const fetchApis = async () => {
//       try {
//         const response = await axios.get(
//           'http://localhost:3000/api/api_configs'
//         );
//         const data = response.data;

//         setApis((prevApis) => {
//           if (JSON.stringify(prevApis) !== JSON.stringify(data.apis)) {
//             return data.apis || [];
//           }
//           return prevApis;
//         });
//       } catch (error) {
//         console.error('Error fetching APIs:', error);
//       }
//     };

//     fetchApis();
//   }, []);

//   return (
//     <>
//       <Layout>
//         <div className="px-6 py-2">
//           <h1 className="text-3xl font-bold">Dashboard</h1>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
//             {apis.map((api) => (
//               <Widget
//                 key={api.name}
//                 apiName={api.name}
//                 status={api.status}
//                 const
//                 lastUpdate={
//                   api.lastChecked
//                     ? moment(api.lastChecked).format('ddd Do MMM, h:mm A')
//                     : 'No data available'
//                 }
//               />
//             ))}
//           </div>
//         </div>

//         <div className="mt-8 bg-gray-50 p-6">
//   <table className="min-w-full table-auto border-collapse text-sm text-gray-700">
//     <thead>
//       <tr className="bg-gray-100 border-b">
//         <th className="px-4 py-2 text-left">Name</th>
//         <th className="px-4 py-2 text-left">Method</th>
//         <th className="px-4 py-2 text-left">Subscription Type</th>
//         <th className="px-4 py-2 text-left">Subscription Date</th>
//         <th className="px-4 py-2 text-left">Status</th>
//         <th className="px-4 py-2 text-left">Last Checked</th>
//         <th className="px-4 py-2 text-left">Created At</th>
//         <th className="px-4 py-2 text-left">Actions</th>
//       </tr>
//     </thead>
//     <tbody>
//       {apis.map((api) => (
//         <tr key={api.name} className="border-b hover:bg-gray-50">
//           <td className="px-4 py-2">{api.name}</td>
//           <td className="px-4 py-2">{api.method}</td>
//           <td className="px-4 py-2">{api.subscriptionType}</td>
//           <td className="px-4 py-2">
//             {api.subscriptionDate
//               ? moment(api.subscriptionDate).format('ddd Do MMM, YYYY')
//               : 'N/A'}
//           </td>
//           <td className="px-4 py-2">{api.status}</td>
//           <td className="px-4 py-2">
//             {api.lastChecked
//               ? moment(api.lastChecked).format('ddd Do MMM, h:mm A')
//               : 'No data available'}
//           </td>
//           <td className="px-4 py-2">
//             {api.createdAt
//               ? moment(api.createdAt).format('ddd Do MMM, YYYY')
//               : 'N/A'}
//           </td>
//           <td className="px-4 py-2 flex space-x-2 justify-start">
//             <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 focus:outline-none">
//               Update
//             </button>
//             <button className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 focus:outline-none">
//               Delete
//             </button>
//           </td>
//         </tr>
//       ))}
//     </tbody>
//     <tfoot>
//       <tr>
//         <td colSpan="8" className="px-4 py-2 text-center text-gray-500">
//           {new Date().getFullYear()}
//         </td>
//       </tr>
//     </tfoot>
//   </table>
// </div>

//       </Layout>
//     </>
//   );
// };

// export default Dashboard;


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
        const response = await axios.get('http://localhost:3000/api/api_configs');
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
    <Layout>
      <div className="px-6 py-6">
        <h1 className="text-4xl font-semibold text-gray-800 mb-6">Dashboard</h1>

        {/* Widgets Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apis.map((api) => (
            <Widget
              key={api.name}
              apiName={api.name}
              status={api.status}
              lastUpdate={
                api.lastChecked
                  ? moment(api.lastChecked).format('ddd Do MMM, h:mm A')
                  : 'No data available'
              }
            />
          ))}
        </div>

        <h1 className='mt-8 font-semibold'>Configured apis</h1>


        {/* Table Section */}
        <div className="mt-4 bg-white shadow-lg p-6 rounded-lg border border-gray-200">
          <table className="min-w-full table-auto border-collapse text-sm text-gray-700">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Method</th>
                <th className="px-4 py-3 text-left">Subscription Type</th>
                <th className="px-4 py-3 text-left">Subscription Date</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Last Checked</th>
                <th className="px-4 py-3 text-left">Created At</th>
                {/* <th className="px-4 py-3 text-left">Actions</th> */}
              </tr>
            </thead>
            <tbody>
              {apis.map((api) => (
                <tr key={api.name} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{api.name}</td>
                  <td className="px-4 py-3">{api.method}</td>
                  <td className="px-4 py-3">{api.subscription_type}</td>
                  <td className="px-4 py-3">
                    {api.subscription_date
                      ? moment(api.subscription_date).format('ddd Do MMM, YYYY')
                      : 'N/A'}
                  </td>
                  <td className="px-4 py-3">{api.status}</td>
                  <td className="px-4 py-3">
                    {api.lastChecked
                      ? moment(api.lastChecked).format('ddd Do MMM, h:mm A')
                      : 'No data available'}
                  </td>
                  <td className="px-4 py-3">
                    {api.createdAt
                      ? moment(api.createdAt).format('ddd Do MMM, YYYY')
                      : 'N/A'}
                  </td>
                  {/* <td className="px-4 py-3">
                    <div className="flex space-x-2 justify-start">
                      <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 focus:outline-none">
                        Update
                      </button>
                      <button className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 focus:outline-none">
                        Delete
                      </button>
                    </div>
                  </td> */}
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="8" className="px-4 py-3 text-center text-gray-500">
                  {new Date().getFullYear()}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
