import React from "react";

import CardLineChart from "@/components/Card/CardLineChart";
import CardBarChart from "@/components/Card/CardBarChart";
import CardPageVisits from "@/components/Card/CardPageVisits";
import CardSocialTraffic from "@/components/Card/CardSocialTraffic";
import Admin from "@/layouts/Admin";

interface DashProps {
  layout: React.ComponentType<any>; // Define a type for the layout property
}

const Dashboard: React.FC<DashProps> = () => {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardLineChart />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardBarChart />
        </div>
      </div>
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardPageVisits />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardSocialTraffic />
        </div>
      </div>
    </>
  );
}

(Dashboard as any).Auth = true;
(Dashboard as any).layout = Admin;

export default Dashboard;
