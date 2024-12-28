import styled from '@emotion/styled';

export const TableStyle = styled.div`
  .table {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: none;
    margin: 20px;
    border-radius: 8px;
    -webkit-box-shadow: 9px 9px 25px -3px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 9px 9px 25px -3px rgba(0, 0, 0, 0.75);
    box-shadow: 9px 9px 25px -3px rgba(0, 0, 0, 0.75);

    &:hover .overlay {
      transform: translateY(0);
    }

    .table-number-container {
      width: 100%;
      background: radial-gradient(circle at -1% 57.5%, #001a6e 0%, #074799 90%) no-repeat center center fixed;
      padding: 10px;
      border-radius: 8px 8px 0 0;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      .table-number {
        background: white;
        padding: 5px;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        color: var(--secondary-color);
      }
    }

    .orders-grid {
      position:relative;
      display: grid;
      gap: 16px;
      grid-template-columns: 1fr 1fr;
      width: 100%;
      overflow:hidden;
    }
  }
`;

export const OverlayStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  transform: translateY(100%);
  transition: transform 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  height:100%;
  border-radius:0 0 8px 8px;
  padding:10px;

  .overlay-content {
    width: 100%;
    display:flex;
    flex-direction:column;
    justify-content: flex-start;
    align-items: flex-start;
    text-align: right;
    gap: 10px;
    padding: 10px;

    .overlay-orders{
      display:flex;
      flex-direction:column;
      justify-content:flex-start;
      align-items:flex-start;
      direction:rtl;
    }
  }
  .complete-button {
      margin-top: 10px;
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      background-color: var(--primary-color);
      color: white;
      cursor: pointer;
      font-size: 14px;

      &:hover {
        background-color:var(--secondary-color);
      }
    }
`;
