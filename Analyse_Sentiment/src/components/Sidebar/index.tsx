import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import SidebarLinkGroup from './SidebarLinkGroup';
import Logo from '../../images/pp.png';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
/>
const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <NavLink to="/">
        <img src={Logo} alt="Logo" width="200px"/>
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              MENU
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Dashboard --> */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === '/' || pathname.includes('dashboard')
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          (pathname === '/' ||
                            pathname.includes('dashboard')) &&
                          'bg-graydark dark:bg-meta-4'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                          <svg
      className="fill-current"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 3L1 12h3v8a1 1 0 001 1h6V14h4v7h6a1 1 0 001-1v-8h3L12 3z"
        fill=""
      />
    </svg>
                        Home
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && 'rotate-180'
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          
                        </svg>
                      </NavLink>
                      {/* <!-- Dropdown Menu Start --> */}
                     
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* <!-- Menu Item Dashboard --> */}

         

             

              

              {/* <!-- Menu Item Twitter --> */}
              <li>
  <NavLink
    to="/tables"
    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
      pathname.includes('tables') && 'bg-graydark dark:bg-meta-4'
    }`}
  >
    {/* Twitter Icon */}
    <svg
      className="fill-current"
      width="18"
      height="19"
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.55 0.665c-0.557 0.252-1.16 0.421-1.79 0.496 0.645-0.387 1.137-1.001 1.368-1.739-0.602 0.357-1.268 0.616-1.97 0.756-0.567-0.602-1.379-0.978-2.279-0.978-1.724 0-3.12 1.398-3.12 3.121 0 0.24 0.027 0.474 0.077 0.699-2.594-0.129-4.891-1.372-6.428-3.259-0.269 0.461-0.424 0.997-0.424 1.571 0 1.085 0.552 2.042 1.396 2.605-0.514-0.016-1.003-0.157-1.43-0.391v0.039c0 1.514 1.077 2.782 2.512 3.073-0.262 0.071-0.537 0.108-0.818 0.108-0.199 0-0.394-0.019-0.583-0.055 0.394 1.231 1.537 2.125 2.894 2.15-1.058 0.83-2.397 1.322-3.832 1.322-0.249 0-0.495-0.015-0.737-0.043 1.371 0.877 3.004 1.389 4.739 1.389 5.684 0 8.806-4.709 8.806-8.806 0-0.135-0.003-0.269-0.009-0.402 0.599-0.433 1.114-0.975 1.521-1.593z"
        fill=""
      />
    </svg>
    Twitter
  </NavLink>
</li>

              




              {/* <!-- Menu Item Twitter --> */}

            {/* <!-- Menu Item YouTube --> */}
            <li>
  <NavLink
    to="/youtube"
    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
      pathname.includes('youtube') && 'bg-graydark dark:bg-meta-4'
    }`}
  >
<svg
  className="fill-current text-gray-600 dark:text-gray-200"
  width="18"
  height="18"
  viewBox="0 0 24 24"
  xmlns="http://www.w3.org/2000/svg"
>
  <path d="M23.498 6.186c-.281-1.072-1.125-1.917-2.197-2.197C19.736 3.5 12 3.5 12 3.5s-7.736 0-9.301.489c-1.072.281-1.917 1.125-2.197 2.197C0 7.751 0 12 0 12s0 4.249.502 5.814c.281 1.072 1.125 1.917 2.197 2.197C4.264 20.5 12 20.5 12 20.5s7.736 0 9.301-.489c1.072-.281 1.917-1.125 2.197-2.197.502-1.565.502-5.814.502-5.814s0-4.249-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
</svg>

    <span>YouTube</span>
  </NavLink>
</li>


              {/* <!-- Menu Item Youtube --> */}



              {/* <!-- Menu Item Instagram --> */}
          
{/* <!-- Menu Item Instagram --> */}
<li>
  <NavLink
    to="/instagram"
    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
      pathname.includes('instagram') && 'bg-graydark dark:bg-meta-4'
    }`}
  >
 <svg
  className="fill-current text-gray-600 dark:text-gray-200"
  width="18"
  height="18"
  viewBox="0 0 24 24"
  xmlns="http://www.w3.org/2000/svg"
>
  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.97.24 2.432.405a4.92 4.92 0 0 1 1.789 1.155 4.923 4.923 0 0 1 1.155 1.789c.165.462.351 1.262.405 2.432.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.24 1.97-.405 2.432a4.92 4.92 0 0 1-1.155 1.789 4.923 4.923 0 0 1-1.789 1.155c-.462.165-1.262.351-2.432.405-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.97-.24-2.432-.405a4.92 4.92 0 0 1-1.789-1.155 4.923 4.923 0 0 1-1.155-1.789c-.165-.462-.351-1.262-.405-2.432-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.054-1.17.24-1.97.405-2.432a4.92 4.92 0 0 1 1.155-1.789 4.923 4.923 0 0 1 1.789-1.155c.462-.165 1.262-.351 2.432-.405C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.736 0 8.332.013 7.052.072 5.744.131 4.79.368 4.05.635 3.262.92 2.546 1.38 1.927 1.999.307 3.619 0 5.77 0 12s.307 8.381 1.927 10.001c.619.619 1.335 1.079 2.123 1.364.74.267 1.694.504 3.002.563 1.28.059 1.684.072 4.948.072s3.668-.013 4.948-.072c1.308-.059 2.262-.296 3.002-.563.788-.285 1.504-.745 2.123-1.364C23.693 20.381 24 18.23 24 12s-.307-8.381-1.927-10.001c-.619-.619-1.335-1.079-2.123-1.364-.74-.267-1.694-.504-3.002-.563C15.668.013 15.264 0 12 0zM12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" />
</svg>

    <span>Instagram</span>
  </NavLink>
</li>
{/* <!-- Menu Item Instagram --> */}


               {/* <!-- Menu Item Instagram --> */}
            </ul>
          </div>


        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
