import React from "react";
import tw from "tailwind-styled-components";

type LayoutProps = {
  children: React.ReactNode;
};

const Container = tw.div`
    border-2 border-black
    my-3
  `;

const ComponentLayout = ({ children }: LayoutProps) => {
  return <Container>{children}</Container>;
};

export default ComponentLayout;
