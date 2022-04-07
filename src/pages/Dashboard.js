import React, { useEffect, useState, useContext } from "react";
import { Header, Sidebar, Timeline } from "../components";
import { ViewCommentsContext } from "../context/viewComments";

const Dashboard = () => {
  const {
    viewCommentsState: { viewCommentsOpen },
  } = useContext(ViewCommentsContext);

  const [active, setActive] = useState(false);

  useEffect(() => {
    document.title = "Instagram";
  }, []);

  return (
    <div
      className={`bg-gray-background ${
        viewCommentsOpen && "overflow-y-hidden h-screen"
      }`}
      onClick={() => active && setActive(false)}
    >
      <div className="sticky top-0 z-10" >
        <Header active={active} setActive={setActive} />
      </div>
      <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
        <Timeline />
        <Sidebar />
      </div>
    </div>
  );
};

export default Dashboard;
