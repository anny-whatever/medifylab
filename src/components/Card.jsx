import React from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";

// function CardComponent({ img, title, price, discountPercent }) {
function CardComponent() {
  // console.log(img, title, price, discountPercent);
  return (
    <Card className="py-4">
      <CardBody className="py-2 overflow-visible">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="https://nextui.org/images/hero-card-complete.jpeg"
          width={270}
        />
      </CardBody>
      <CardHeader className="flex-col items-start px-4 pt-2 pb-0">
        <p className="font-bold uppercase text-md">$5/pill</p>
        <small className="line-through text-default-500">$10/pill</small>
        <h4 className="font-bold text-large">Some pill idk</h4>
      </CardHeader>
    </Card>
  );
}

export default CardComponent;
