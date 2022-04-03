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
  SmallButton,
  ButtonWrapper,
} from "./styles";
import {
  getCartInLocalStorage,
  getDiscountedPrice,
  removeCartFromLocalStorage,
  updateCartToLocalStorage,
} from "../../heper";
import { getData, updateData, createData } from "../../redux/actions/index";
import { useCartContext } from "../../context/cartContext";
import toast from "react-hot-toast";

const CartComponent = (props) => {
  const {
    getData: propsGetData,
    updateData: propsUpdateData,
    createData: propsCreateData,
    checkoutPage = false,
    user,
  } = props;
  const { setCartInLocal } = useCartContext();
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
    if (!user?._id) return;

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

    return () => {
      setCartItems([]);
    };
  }, []);

  useEffect(() => {
    if (!user?._id) {
      const cart = getCartInLocalStorage();
      propsCreateData("GET_CART_DETAILS", "user/cartDetails", {
        cart: Object.values(cart),
      }).then((res) => {
        if (res.error) return;
        setCartItems(res.payload.data.cart);
      });
    } else {
      updateCartState();
    }
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
      subTotal += item.product?.varient.unit_price * item.quantity;
    });
    return subTotal;
  };

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
    // debugger;
    removeCartFromLocalStorage(varient_id);
    const cart = getCartInLocalStorage();

    const clear = !Object.values(cart).length;
    setCartInLocal(Object.values(cart));
    setCartItems(
      cartItems.filter((product) => product.varient_id !== varient_id)
    );
    propsUpdateData("UPDATE_CART", `/user/cart`, {
      cart: Object.values(cart),
      clear,
    }).then((res) => {
      updateCartState();
    });
  };

  const increaseItemInCart = (item) => {
    updateCartToLocalStorage({
      product_id: item.product_id,
      varient_id: item.varient_id,
      quantity: ++item.quantity,
    });
    const cart = getCartInLocalStorage();
    setCartInLocal(cart);
    const clear = !Object.values(cart).length;
    propsUpdateData("UPDATE_CART", `/user/cart`, {
      cart: Object.values(cart),
      clear,
    }).then((res) => {});
  };

  const decreaseItemInCart = (item) => {
    updateCartToLocalStorage({
      product_id: item.product_id,
      varient_id: item.varient_id,
      quantity: item.quantity <= 1 ? 1 : --item.quantity,
    });
    const cart = getCartInLocalStorage();
    setCartInLocal(cart);

    propsUpdateData("UPDATE_CART", `/user/cart`, {
      cart: Object.values(cart),
    }).then((res) => {});
  };

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      history.push("/checkout");
    } else {
      toast.error("Cart is Empty", {
        className: "my-toast",
      });
    }
  };

  const getAttributesValue = (varient) => {
    if (varient == null) return <></>;
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
                  {t("shoppingCart")} ({cartItems.length} items)
                </TopText>
              </TopTexts>
              <TopButton type="filled" onClick={() => handleCheckout()}>
                {t("checkoutNow")}
              </TopButton>
            </Top>
            <hr />
          </>
        )}
        {cartItems.length > 0 ? (
          <>
            {cartItems.map((item, i) => (
              <>
                <Bottom>
                  <Info>
                    <Product>
                      <ProductDetail>
                        <Image
                          src={`${item.product?.product_image_small_url}`}
                        />
                        <Details>
                          <ProductName>
                            {item.product?.i18nResourceBundle.name}
                          </ProductName>
                          {/* {getAttributesValue(item.product?.varient)} */}
                        </Details>
                      </ProductDetail>
                      <PriceDetail>
                        <ProductAmountContainer>
                          {/* <CartPlusIcon /> */}
                          <ProductAmount>
                            <div className="cart-buttons">
                              <button
                                className="btn btn-qs-primary rounded-0 p-2 mx-2"
                                onClick={() => decreaseItemInCart(item)}
                              >
                                -
                              </button>
                              {item.quantity}
                              <button
                                className="btn btn-qs-primary rounded-0 p-2 mx-2"
                                onClick={() => increaseItemInCart(item)}
                              >
                                +
                              </button>
                            </div>
                            {/* {t("quantity")}:  */}
                          </ProductAmount>
                          {/* <CartMinusIcon /> */}
                        </ProductAmountContainer>
                        <ProductPrice>
                          {t("riyalText")}{" "}
                          {getDiscountedPrice(
                            item.product?.flash?.discount_type ||
                              item.product?.varient?.discount_type,
                            item.product?.flash?.discount_amount ||
                              item.product?.varient?.discount_amount,
                            item.product?.varient?.unit_price
                          )}
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
                <hr className="mb-2 w-90 mx-auto" />
              </>
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

export default connect(
  (state) => ({
    ...state.authReducer,
  }),
  {
    getData,
    createData,
    updateData,
  }
)(CartComponent);
