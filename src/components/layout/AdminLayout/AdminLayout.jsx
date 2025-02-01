// import { useContext } from 'react';
// import { SidebarContext } from '../../../contexts/SidebarContext';
// import AdminSidebar from '../../Sidebar/AdminSidebar';
// import AdminNavbar from '../../Admin/AdminNavbar';

// export const AdminLayout = ({ children }) => {
//   const { isSidebarOpen } = useContext(SidebarContext);

//   return (
//     <div className={`admin-layout ${isSidebarOpen ? 'sidebar-open' : ''}`}>
//       <AdminSidebar />
//       <div className="admin-content">
//         <AdminNavbar />
//         <main className="main-content">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }; 
//-----------------gpt

import React from 'react';
import { useSidebar } from '../../../contexts/SidebarContext'; // Import the custom hook
import AdminSidebar from '../../Sidebar/AdminSidebar';
import AdminNavbar from '../../Admin/AdminNavbar';

const AdminLayout = ({ children }) => {
  const { isOpen, toggleSidebar } = useSidebar();  // Use the context here

  return (
    <div className={`admin-layout ${isOpen ? 'sidebar-open' : ''}`}>
      <AdminSidebar />
      <div className="admin-content">
        <AdminNavbar />
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
