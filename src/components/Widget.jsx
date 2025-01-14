// import { MdOutlineCancel, MdCheckCircle, MdWarning } from 'react-icons/md';

// const Widget = ({ apiName, status, lastUpdate }) => {
//   const statusStyles = {
//     active: {
//       bgColor: '#e7f8f6',
//       textColor: '#10b39f',
//       icon: <MdCheckCircle size={20} />,
//       message: `${apiName} is active and working as expected.`,
//     },
//     inactive: {
//       bgColor: '#feecef',
//       textColor: '#f33d5c',
//       icon: <MdOutlineCancel size={20} />,
//       message: `${apiName} is inactive and needs attention.`,
//     },
//     warning: {
//       bgColor: '#fff7e5',
//       textColor: '#f39c12',
//       icon: <MdWarning size={20} />,
//       message: `${apiName} has warnings and may require further checks.`,
//     },
//   };

//   return (
//     <div className="bg-white p-6 border border-gray-150 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out">
//       <div className="flex justify-between items-center mb-4">
//         <h3 className="text-xl font-semibold text-[#515050]">{apiName}</h3>
//         <div
//           className={`flex items-center gap-3 px-4 py-2 rounded-lg`}
//           style={{
//             backgroundColor: statusStyles[status].bgColor,
//             color: statusStyles[status].textColor,
//           }}
//         >
//           {statusStyles[status].icon}
//           <span className="text-sm font-medium">{status}</span>
//         </div>
//       </div>

//       <div className="mb-3">
//         <label htmlFor="" className="text-sm text-gray-600">
//           Last Check
//         </label>
//         <h3 className="text-md text-gray-700 font-medium">{lastUpdate}</h3>
//       </div>

//       <div className="mt-4 text-md text-gray-600">
//         {statusStyles[status].message}
//       </div>
//     </div>
//   );
// };

// export default Widget;


import { MdOutlineCancel, MdCheckCircle, MdWarning } from 'react-icons/md';

const Widget = ({ apiName, status, lastUpdate }) => {
  const statusStyles = {
    active: {
      bgColor: '#e7f8f6',
      textColor: '#10b39f',
      icon: <MdCheckCircle size={20} />,
      message: `${apiName} is active and working as expected.`,
    },
    inactive: {
      bgColor: '#feecef',
      textColor: '#f33d5c',
      icon: <MdOutlineCancel size={20} />,
      message: `${apiName} is inactive and needs attention.`,
    },
    warning: {
      bgColor: '#fff7e5',
      textColor: '#f39c12',
      icon: <MdWarning size={20} />,
      message: `${apiName} has warnings and may require further checks.`,
    },
  };

  return (
    <div className="bg-white p-6 border border-gray-150 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">{apiName}</h3>
        <div
          className={`flex items-center gap-3 px-4 py-2 rounded-lg`}
          style={{
            backgroundColor: statusStyles[status].bgColor,
            color: statusStyles[status].textColor,
          }}
        >
          {statusStyles[status].icon}
          <span className="text-sm font-medium">{status}</span>
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="" className="text-sm text-gray-600">
          Last Check
        </label>
        <h3 className="text-md text-gray-700 font-medium">{lastUpdate}</h3>
      </div>

      <div className="mt-4 text-md text-gray-600">
        {statusStyles[status].message}
      </div>
    </div>
  );
};

export default Widget;
