import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import {
  Container,
  Wrapper,
  Title,
  Top,
  TopTexts,
  TopText,
  TopButton,
  Info,
  Product,
  ProductDetail,
  Bottom,
  Image,
  Details,
  ProductName,
  ProductId,
  ProductColor,
  ProductSize,
  PriceDetail,
  ProductAmountContainer,
  ProductAmount,
  ProductPrice,
  Hr,
  Summary,
  SummaryItem,
  SummaryItemPrice,
  SummaryItemText,
  SummaryTitle,
  Button,
} from "./styles";

const CartComponent = () => {
  const history = useHistory();
  const [cartItems, setCartItems] = useState([]);

  const CartPlusIcon = () => (
    <img
      src="../assets/images/cart-plus.svg"
      alt="cartPlusIcon"
      style={{ width: 16, height: 16 }}
    />
  );

  const CartMinusIcon = () => (
    <img
      src="../assets/images/cart-minus.svg"
      alt="cartMinusIcon"
      style={{ width: 16, height: 16 }}
    />
  );

  const calcSubTotal = () => {
    let subTotal = 0;
    cartItems.forEach((item) => {
      subTotal += item.product.varient.unit_price;
    });

    return subTotal;
  };
  //
  useEffect(() => {
    axios.get("/user/cart").then((res) => {
      setCartItems(res.data.cart);
    });
  }, []);

  return (
    <Container>
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>Shopping Bag(2)</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          <TopButton type="filled" onClick={() => history.push("/checkout")}>
            CHECKOUT NOW
          </TopButton>
        </Top>
        <Bottom>
          <Info>
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <Product>
                  <ProductDetail>
                    <Image src="https://i.pinimg.com/originals/2d/af/f8/2daff8e0823e51dd752704a47d5b795c.png" />
                    <Details>
                      <ProductName>
                        <b>Product:</b> {item.product.i18nResourceBundle.name}
                      </ProductName>
                      <ProductColor color="gray" />
                      <ProductSize>
                        <b>Size:</b> M
                      </ProductSize>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductAmountContainer>
                      <CartPlusIcon />
                      <ProductAmount>1</ProductAmount>
                      <CartMinusIcon />
                    </ProductAmountContainer>
                    <ProductPrice>
                      AED {item.product.varient.unit_price}
                    </ProductPrice>
                  </PriceDetail>
                </Product>
              ))
            ) : (
              <span>Empty</span>
            )}
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>AED {calcSubTotal()}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>FREE</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>AED {calcSubTotal()}</SummaryItemPrice>
            </SummaryItem>
            <Button onClick={() => history.push("/checkout")}>
              CHECKOUT NOW
            </Button>
          </Summary>
        </Bottom>
      </Wrapper>
    </Container>
  );
};

export default CartComponent;
