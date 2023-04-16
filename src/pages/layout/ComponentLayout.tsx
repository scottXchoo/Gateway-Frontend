import React from "react";
import tw from "tailwind-styled-components";

type LayoutProps = {
  children: React.ReactNode;
};

const Container = tw.div`
    my-3
  `;

const ComponentLayout = ({ children }: LayoutProps) => {
  return <Container>{children}</Container>;
};

export default ComponentLayout;
