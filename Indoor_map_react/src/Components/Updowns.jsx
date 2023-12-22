import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { updateUpdown } from "../Redux/state";

export default function Contents({ id, caption, move_up, move_down }) {
  var backupmoveup = move_up;
  var backupmovedown = move_down;
  const [newup, setnewup] = useState();
  const [newdown, setnewdown] = useState();
  const [upvalue, setupvalue] = useState();
  const [downvalue, setdownvalue] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    setupvalue(move_up);
    setdownvalue(move_down);
    setnewup();
    setnewdown();
  }, [move_up, move_down]);

  const updateItem = () => {
    if (newup && newdown) dispatch(updateUpdown(id, caption, newup, newdown));
    else if (newup) {
      dispatch(updateUpdown(id, caption, newup, backupmovedown));
    } else if (newdown) {
      dispatch(updateUpdown(id, caption, backupmoveup, newdown));
    } else dispatch(updateUpdown(id, caption, backupmoveup, backupmovedown));
  };

  return (
    <Wrapper>
      <Info>
        <Namebox>{id} </Namebox>
        <Nameboxcap>{caption}: </Nameboxcap>
        <Nameboxdown> down</Nameboxdown>
        <Date
          placeholder={downvalue || "0"}
          value={newdown || ""}
          onChange={(e) => {
            setnewdown(e.target.value);
          }}
          onBlur={updateItem}
        />
        <Namebox>up</Namebox>
        <Date
          placeholder={upvalue || "0"}
          value={newup || ""}
          onChange={(e) => {
            setnewup(e.target.value);
          }}
          onBlur={updateItem}
        />
      </Info>
    </Wrapper>
  );
}

const Wrapper = styled.span`
  position: relative;
  border-color: black solid 1px;
`;
const Info = styled.div`
  width: 350px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Namebox = styled.div`
  font-size: 15px;
  padding-left: 20px;
  width: 20px;
  font-weight: bold;
  font-family: "굴림";
`;
const Nameboxcap = styled.div`
  font-size: 15px;
  padding-left: 20px;
  width: 100px;
  font-weight: bold;
  font-family: "굴림";
`;
const Nameboxdown = styled.div`
  font-size: 15px;
  padding-left: 20px;
  width: 37px;
  font-weight: bold;
  font-family: "굴림";
`;
const Date = styled.input`
  margin-left: 5px;
  width: 20px;
  font-size: 13px;
  border: solid, 1px;
`;
