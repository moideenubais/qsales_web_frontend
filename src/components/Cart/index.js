import React, { useEffect } from "react";
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

  useEffect(() => {
    axios.get("/user/cart").then((res) => {
      console.log(res.data);
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
            <Product>
              <ProductDetail>
                <Image src="https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1614188818-TD1MTHU_SHOE_ANGLE_GLOBAL_MENS_TREE_DASHERS_THUNDER_b01b1013-cd8d-48e7-bed9-52db26515dc4.png?crop=1xw:1.00xh;center,top&resize=480%3A%2A" />
                <Details>
                  <ProductName>
                    <b>Product:</b> JESSIE THUNDER SHOES
                  </ProductName>
                  <ProductColor color="black" />
                  <ProductSize>
                    <b>Size:</b> 37.5
                  </ProductSize>
                </Details>
              </ProductDetail>
              <PriceDetail>
                <ProductAmountContainer>
                  <img
                    src="../assets/images/cart-plus.svg"
                    alt="cartPlusIcon"
                    style={{ width: 16, height: 16 }}
                  />
                  <ProductAmount>2</ProductAmount>
                  <img
                    src="../assets/images/cart-minus.svg"
                    alt="cartMinusIcon"
                    style={{ width: 16, height: 16 }}
                  />
                </ProductAmountContainer>
                <ProductPrice>$ 30</ProductPrice>
              </PriceDetail>
            </Product>
            <Hr />
            <Product>
              <ProductDetail>
                <Image src="https://i.pinimg.com/originals/2d/af/f8/2daff8e0823e51dd752704a47d5b795c.png" />
                <Details>
                  <ProductName>
                    <b>Product:</b> HAKURA T-SHIRT
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
                <ProductPrice>$ 20</ProductPrice>
              </PriceDetail>
            </Product>
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ 80</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ 80</SummaryItemPrice>
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
