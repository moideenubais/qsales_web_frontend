import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
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
  SmallButton,
  ButtonWrapper,
} from "./styles";
import { getCartInLocalStorage } from "../../heper";

const CartComponent = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const CartPlusIcon = () => (
    <ButtonWrapper>
      <img
        src="../assets/images/cart-plus.svg"
        alt="cartPlusIcon"
        style={{ width: 16, height: 16, color: "white" }}
      />
    </ButtonWrapper>
  );

  const CartMinusIcon = () => (
    <ButtonWrapper>
      <img
        src="../assets/images/cart-minus.svg"
        alt="cartMinusIcon"
        style={{ width: 16, height: 16 }}
      />
    </ButtonWrapper>
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
    setLoading(true);
    axios
      .get("/user/cart")
      .then((res) => {
        setCartItems(res.data.cart);
        console.log(res.data.cart);

        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div
        style={{
          height: "65vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="spinner" />
      </div>
    );
  }

  const removeFromCart = () => {
    console.log("cart", getCartInLocalStorage());
  };

  return (
    <Container>
      <Wrapper>
        <Title>{t("yourCart")}</Title>
        <Top>
          <TopButton onClick={() => history.push("/")}>
            {t("continueShopping")}
          </TopButton>
          <TopTexts>
            <TopText></TopText>
          </TopTexts>
          <TopButton type="filled" onClick={() => null}>
            {t("shoppingCart")} ({cartItems.length})
          </TopButton>
        </Top>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <Bottom>
              <Info>
                <Product>
                  <ProductDetail>
                    <Image src="https://i.pinimg.com/originals/2d/af/f8/2daff8e0823e51dd752704a47d5b795c.png" />
                    <Details>
                      <ProductName>
                        {item.product.i18nResourceBundle.name}
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
                      {t("dirhamsText")} {item.product.varient.unit_price}
                    </ProductPrice>
                    <SmallButton onClick={() => removeFromCart()}>
                      {t("remove")}
                    </SmallButton>
                  </PriceDetail>
                </Product>
              </Info>
              <Summary>
                <SummaryTitle>{t("orderSummary")}</SummaryTitle>
                <SummaryItem>
                  <SummaryItemText>{t("subTotal")}</SummaryItemText>
                  <SummaryItemPrice>AED {calcSubTotal()}</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem>
                  <SummaryItemText>{t("estimatedShipping")}</SummaryItemText>
                  <SummaryItemPrice>FREE</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem type="total">
                  <SummaryItemText>{t("total")}</SummaryItemText>
                  <SummaryItemPrice>AED {calcSubTotal()}</SummaryItemPrice>
                </SummaryItem>
                <Button onClick={() => history.push("/checkout")}>
                  {t("checkoutNow")}
                </Button>
              </Summary>
            </Bottom>
          ))
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              // alignItems: "center",
              width: "100%",
              height: "59vh",
              position: "relative",
              backgroundColor: "white",
            }}
          >
            <img
              src="../assets/images/empty-cart.svg"
              width={200}
              height={200}
            />
            <Title style={{ position: "absolute", top: 250 }}>
              {t("emptyCartText")}
            </Title>
          </div>
        )}
      </Wrapper>
    </Container>
  );
};

export default CartComponent;
