import React from "react";
import tw from "tailwind-styled-components";

type LayoutProps = {
  children: React.ReactNode;
  className?: string;
};

const Container = tw.div`
    my-3
  `;

const ComponentLayout = ({ children, className }: LayoutProps) => {
  return <Container className={className}>{children}</Container>;
};

export default ComponentLayout;
