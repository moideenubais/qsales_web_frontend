import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
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
  ProductColor,
  ProductSize,
  PriceDetail,
  ProductAmountContainer,
  ProductAmount,
  ProductPrice,
  Summary,
  SummaryItem,
  SummaryItemPrice,
  SummaryItemText,
  SummaryTitle,
  Button,
  SmallButton,
  ButtonWrapper,
} from "./styles";
import { getCartInLocalStorage, removeCartFromLocalStorage } from "../../heper";
import { getData, updateData } from "../../redux/actions/index";

const CartComponent = (props) => {
  const {
    getData: propsGetData,
    updateData: propsUpdateData,
    checkoutPage = false,
  } = props;
  const { t } = useTranslation();
  const history = useHistory();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const updateCartState = () => {
    propsGetData("GET_CARTS", "user/cart").then((res) => {
      if (res.error) return;
      setCartItems(res.payload.data.cart);
    });
  };

  const getAttributesData = () => {};

  useEffect(() => {
    updateCartState();
  }, []);

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
      subTotal += item.product.varient.unit_price * item.quantity;
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

  const removeFromCart = (varient_id) => {
    removeCartFromLocalStorage(varient_id);
    const cart = getCartInLocalStorage();
    const clear = !Object.values(cart).length;
    propsUpdateData("UPDATE_CART", `/user/cart`, {
      cart: Object.values(cart),
      clear,
    }).then((res) => {
      updateCartState();
    });
  };

  const getAttributesValue = (varient) => {
    const { attribute_value, color } = varient;
    return (
      <>
        <ProductColor color={color?.value} />
        {attribute_value?.map(({ name, value }) => (
          <ProductSize>
            <b>{name}:</b> {value}
          </ProductSize>
        ))}
      </>
    );
  };

  return (
    <Container>
      <Wrapper>
        {!checkoutPage && (
          <>
            <Title>{t("yourCart")}</Title>
            <Top>
              <TopButton onClick={() => history.push("/")}>
                {t("continueShopping")}
              </TopButton>
              <TopTexts>
                <TopText>
                  {t("shoppingCart")} ({cartItems.length})
                </TopText>
              </TopTexts>
              <TopButton
                type="filled"
                onClick={() => history.push("/checkout")}
              >
                {t("checkoutNow")}
              </TopButton>
            </Top>
          </>
        )}
        {cartItems.length > 0 ? (
          <>
            {cartItems.map((item, i) => (
              <Bottom>
                <Info>
                  <Product>
                    <ProductDetail>
                      <Image
                        src={`${process.env.REACT_APP_IMAGE_URL}/${item.product.product_image_small_url}`}
                      />
                      <Details>
                        <ProductName>
                          {item.product.i18nResourceBundle.name}
                        </ProductName>
                        {getAttributesValue(item.product.varient)}
                      </Details>
                    </ProductDetail>
                    <PriceDetail>
                      <ProductAmountContainer>
                        <CartPlusIcon />
                        <ProductAmount>Quantity: {item.quantity}</ProductAmount>
                        <CartMinusIcon />
                      </ProductAmountContainer>
                      <ProductPrice>
                        {t("riyalText")} {item.product.varient.unit_price}
                      </ProductPrice>
                      <SmallButton
                        onClick={() => removeFromCart(item.varient_id)}
                      >
                        {t("remove")}
                      </SmallButton>
                    </PriceDetail>
                  </Product>
                </Info>
              </Bottom>
            ))}
          </>
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
              alt="empty"
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

export default connect(() => ({}), {
  getData,
  updateData,
})(CartComponent);
