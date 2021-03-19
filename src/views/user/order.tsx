import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { ComponentLayout } from "components/layout";
import { Card } from "components/global/Card";
import { Redirect, RouteComponentProps } from "react-router-dom";
import { TextField, SelectInput } from "components/global/Input";
import { Button } from "components/global/Button";
import { useStore, useUser } from "context";

import { ItemType } from "context/context-store/store-types";
import { LocalStorageTransaction } from "utils/localStorage";

interface OrderProps extends RouteComponentProps {}

const Order: React.FC<OrderProps> = ({ history }) => {
  const [orderItems, setOrderItems] = useState<object>({});
  const [newItems, setNewItems] = useState<ItemType[]>([]);
  const [category, setCategory] = useState<string>("");

  const {
    loading,
    items,
    getAllItems,
    setTransactions,
    transaction,
  } = useStore();
  const { credentials } = useUser();

  useEffect(() => {
    if (items.length === 0) getAllItems();
  }, [getAllItems]);

  const onAddCount = React.useCallback(() => {
    if (items.length !== 0) {
      const tempItems = [...items];
      tempItems.forEach(item => {
        item.count = 0;
      });
      setNewItems(tempItems);
    }
  }, [items]);

  useEffect(onAddCount, [onAddCount]);

  const handleChangeInput = (input: string, key: number) => {
    let order: any = {};
    if (/^[0-9]*$/.test(input)) {
      const tempItems = [...newItems];
      tempItems[key].count = Number(input);
      tempItems.forEach(data => {
        if (data.count !== 0) {
          order[data.itemId] = data.count;
        }
        return order;
      });
      setNewItems(tempItems);
      setOrderItems(order);
    }
  };

  const handleClickOrder = () => {
    const _items = orderItems;
    setTransactions({ ...transaction, items: _items, category });
    history.push("/payment");
  };

  const _localStorageTransaction = LocalStorageTransaction();
  if (_localStorageTransaction === null) return <Redirect to="/option" />;

  return (
    <ComponentLayout isLogin={true}>
      <StyledOrder>
        <Card bgColor="mix-blue" style={{ height: "100%" }}>
          {loading ? (
            <Card className="order-card" style={{ background: "white" }}>
              <p>please wait, getting items laundry...</p>
            </Card>
          ) : (
            <Card className="order-card" style={{ background: "white" }}>
              <div className="order-card__top-inputs">
                <div className="order-card__top-input">
                  <p>nama</p>
                  <p> :</p>
                  <TextField
                    value={credentials.username}
                    onChange={e => ""}
                    disabled={true}
                    type="text"
                  />
                </div>
                <div className="order-card__top-input">
                  <p>Kategori</p>
                  <p> :</p>
                  <SelectInput
                    value={category}
                    values={["per_piece", "per_kilo"]}
                    onChange={e => setCategory(e.target.value)}
                    label="Select kategori"
                    isRemoveLabel={category !== "" ? true : false}
                  />
                </div>
              </div>
              <div className="order-card__bottom-inputs">
                <div className="order-card__bottom-table">
                  <div className="order-card__bottom-table-header">
                    <p>Pakaian</p>
                  </div>
                  <div className="order-card__bottom-table-header">
                    <p>Jumlah</p>
                  </div>
                </div>
                {newItems.map((data, key) => {
                  return (
                    <div
                      className="order-card__bottom-table-child"
                      key={data.itemName}
                    >
                      <div className="order-card__bottom-table-child-header">
                        <p>{data.itemName}</p>
                      </div>
                      <div className="order-card__bottom-table-child-header">
                        <input
                          value={newItems[key].count}
                          onChange={e => handleChangeInput(e.target.value, key)}
                          style={{
                            border: "none",
                            width: "100%",
                            textAlign: "center",
                            outline: "none",
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          )}
          <div className="order-button">
            <Button
              text="Order"
              type="button"
              background="primary"
              onClick={handleClickOrder}
              disabled={
                Object.keys(orderItems).length === 0 || category === ""
                  ? true
                  : false
              }
            />
          </div>
        </Card>
      </StyledOrder>
    </ComponentLayout>
  );
};

const StyledOrder = styled.div`
  height: 100%;

  .order-button {
    margin-top: 10px;
    text-align: center;
    width: 100%;

    button {
      width: 200px;
    }
  }

  .order-card {
    &__top-input {
      display: grid;
      grid-template-columns: 0.4fr 0.1fr 1fr;
      align-items: center;
    }

    &__bottom-inputs {
      overflow-y: scroll;
      margin-top: 10px;
    }

    &__bottom-table,
    &__bottom-table-child {
      display: grid;
      grid-template-columns: 1fr 1fr;
      text-align: center;
      align-items: center;
    }
    &__bottom-table-header,
    &__bottom-table-child-header {
      padding: 5px 6px;
      border: 1px solid rgba(0, 0, 0, 0.5);
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    @media only screen and (min-height: 665.99px) {
      &__bottom-inputs {
        height: 220px;
      }
    }
    @media only screen and (min-height: 735.99px) {
      &__bottom-inputs {
        height: 255px;
      }
    }
    @media only screen and (min-height: 811.99px) {
      &__bottom-inputs {
        height: 315px;
      }
    }
  }
`;

export default Order;
