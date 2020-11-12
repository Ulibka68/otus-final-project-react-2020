import React from "react";

interface Props {
  description: string;
}

const GoodsDescription: ({ description }: Props) => any = ({
  description,
}: Props) => {
  const descArr = description.split("\n");
  if (descArr.length === 1) return <p>{descArr[0]}</p>;
  const descArrElement = descArr.map((val, ind) => <p key={ind}>{val}</p>);
  return <>{descArrElement}</>;
};

export { GoodsDescription };
