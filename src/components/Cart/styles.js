import styled from "styled-components";
import { mobile } from "../../heper/responsive";

export const Container = styled.div``;

export const Wrapper = styled.div`
  padding: 20px !important;
  background-color: white;
  ${mobile({ padding: "10px" })}
`;

export const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

export const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px !important;
`;

export const TopButton = styled.button`
  padding: 10px !important;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "#8f1d3f" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

export const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;

export const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px !important;
`;

export const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 5px !important;
  ${mobile({ flexDirection: "column" })}
`;

export const Info = styled.div`
  flex: 3;
`;

export const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

export const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

export const Image = styled.img`
  width: 200px;
`;

export const Details = styled.div`
  padding: 20px !important;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const ProductName = styled.span``;

export const ProductId = styled.span``;

export const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

export const ProductSize = styled.span``;

export const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0px !important;
`;

export const ProductAmount = styled.div`
  font-size: 18px;
  margin: 10px !important;
  ${mobile({ margin: "5px 15px !important" })}
`;

export const ProductPrice = styled.div`
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 10px !important;
  ${mobile({ marginBottom: "20px !important" })}
`;

export const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

export const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px !important;
  height: 50vh;
`;

export const SummaryTitle = styled.h1`
  font-weight: 200;
`;

export const SummaryItem = styled.div`
  margin: 30px 0px !important;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

export const SummaryItemText = styled.span``;

export const SummaryItemPrice = styled.span``;

export const Button = styled.button`
  width: 100%;
  padding: 10px !important;
  background-color: var(--primary);
  border-color: var(--primary) !important;
  color: white;
  font-weight: 600;
`;

export const SmallButton = styled.button`
  padding: 4px !important;
  font-size: 14px;
  background-color: var(--primary);
  border-color: var(--primary) !important;
  color: white;
  font-weight: 600;
`;

export const ButtonWrapper = styled.div`
background-color: #8f1d3f,
border-radius: 20px,
height: 30px,
width: 30px,
display: flex,
justify-content: center,
align-items: center,
`;

export const SpinnerWrapper = styled.div`
height: 65vh,
display: flex,
align-items: center,
justify-content: center,
`;

export const CheckoutPageSmallWrapper = styled.span`
  width: 25px;
  height: 25px;
  background-color: #c0c0c0;
  color: white;
  border-radius: 13px;
  padding: 10px;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CheckoutPagePriceWrapper = styled.div`
  background-color: #8f1d3f;
  color: white;
  height: 30px;
  width: 80px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
`;
