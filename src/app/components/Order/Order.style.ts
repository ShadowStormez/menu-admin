import styled from "@emotion/styled"
export const OrderStyle=styled.div`
.order-container{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border: none;
  border-radius:8px;
  padding: 10px;
  margin: 10px;
  height:250px;
  -webkit-box-shadow: 5px 5px 20px -5px rgba(0,0,0,1);
-moz-box-shadow: 5px 5px 20px -5px rgba(0,0,0,1);
box-shadow: 5px 5px 20px -5px rgba(0,0,0,1);
}
.complete-order-button{
  margin-top: 10px;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    background-color: var(--primary-color);
    color: white;
    cursor: pointer;
    font-size: 14px;

    &:hover {
      background-color: var(--secondary-color);
    }
}
`