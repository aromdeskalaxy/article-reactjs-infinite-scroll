import { forwardRef } from "react";

export const Card = forwardRef(({ index, title }, ref) => {
  return (
    <div ref={ref}>
      <p>{index}</p>
      <p>{title}</p>
    </div>
  );
});

export default Card;
