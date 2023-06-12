import { Flowbite } from "flowbite-react";
import React, { ReactNode } from "react";
type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
  <Flowbite>
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="w-full p-6 mx-auto min-h-screen">
        <div className="layout">{props.children}</div>
      </div>
    </section>
  </Flowbite>
);

export default Layout;
