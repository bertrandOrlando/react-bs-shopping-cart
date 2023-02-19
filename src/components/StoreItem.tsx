import { Button, Card } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import formatCurrency from "../utilities/formatCurrency";

type StoreItemProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};

export const StoreItem = ({ id, name, price, imgUrl }: StoreItemProps) => {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();
  const quantity = getItemQuantity(id);
  return (
    <Card>
      <Card.Img
        src={imgUrl}
        height="200px"
        variant="top"
        style={{ objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex  justify-content-between align-items-baseline mb-4">
          <span className="fs-2">{name}</span>
          <span className="ms-2 text-muted">{formatCurrency(price)}</span>
        </Card.Title>
        {quantity === 0 ? (
          <Button onClick={() => increaseCartQuantity(id)}>
            {" "}
            + Add to Cart
          </Button>
        ) : (
          <div
            className="d-flex flex-column align-items-center "
            style={{ gap: ".5rem" }}
          >
            <div className="d-flex " style={{ gap: ".5rem" }}>
              <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
              <div>
                <span className="fs-4">{quantity}</span>
                <span>in a cart</span>
              </div>
              <Button onClick={() => increaseCartQuantity(id)}>+</Button>
            </div>
            <Button
              onClick={() => removeFromCart(id)}
              variant="danger"
              size="sm"
            >
              Remove
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};
