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
    box-shadow: 9px 9px 25px -3px rgba(0, 0, 0, 0.75);
    position: relative; /* Ensure overlay is relative to this container */

    .table-number-container {
      width: 100%;
      background: radial-gradient(circle at -1% 57.5%, #001a6e 0%, #074799 90%) no-repeat center center fixed;
      padding: 10px;
      border-radius: 8px 8px 0 0;
      display: flex;
      justify-content: center;
      align-items: center;

      .table-number {
        background: white;
        padding: 5px;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--secondary-color);
      }
    }

    .orders-grid {
      display: grid;
      gap: 16px;
      grid-template-columns: 1fr 1fr;
      width: 100%;
      overflow: hidden;
    }

    .orders{
      position:relative;
    }

    .show-overlay-button {
      margin:0;
      width:100%;
      padding: 8px 16px;
      border: none;
      border-radius: 0 0 8px 8px;
      background-color: var(--primary-color);
      color: white;
      cursor: pointer;
      font-size: 14px;

      &:hover {
        background-color: var(--secondary-color);
      }
    }
  }
`;

export const OverlayStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: absolute; /* Overlay is positioned within the table */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height:100%;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  border-radius: 0 0 8px 8px;
  padding: 10px;

  .overlay-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;

    .overlay-orders {
      direction: rtl;
    }
  }

  .overlay-buttons{
    display:flex;
    flex-direction:row;
    justify-content:center;
    align-items:center;
    gap:10px;
  }

  .complete-button, .close-overlay-button {
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
`;

